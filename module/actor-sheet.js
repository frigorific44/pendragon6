import ArmorDialogue from "./armor-dialogue.js";
import RollDialogue from "./roll-dialogue.js";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class PendragonActorSheet extends ActorSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["pendragon", "sheet", "actor"],
      template: "systems/pendragon6/templates/actors/actor-sheet.hbs",
      width: 600,
      height: 600,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}],
      scrollY: [".play", ".combat", ".possessions", ".history"],
      // dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
    });
  }


  /** @inheritdoc */
  async getData(options) {
    const context = await super.getData(options);
    context.biographyHTML = await TextEditor.enrichHTML(context.data.system.biography, {
      secrets: this.document.isOwner,
      async: true
    });

    // Prepare items
    this._prepareItems(context);

    return context;
  }

  /**
   * Organize and classify Items for Character sheets.
   * @param {Object} actorData The actor to prepare.
   */
  _prepareItems(sheetData) {
    // Initialize containters.
    const inventory = {};

    for (let i of sheetData.items) {
      let item = i;
      i.img = i.img || DEFAULT_TOKEN;

      if (!inventory[i.type]) {
        inventory[i.type] = [];
      }
      inventory[i.type].push(i);
    }

    sheetData.inventory = inventory;
  }

  /** @inheritdoc */
  activateListeners(html) {
    super.activateListeners(html);

    html.find(".rollable").on("click", this._onSheetRoll.bind(this));
    html.find(".traits").on("click", ".trait-plus", this._onTraitAdd.bind(this));

    // Render the item sheet for viewing/editing prior to the editable check.
    html.find('.item-edit').on("click", ev => {
      const id = ev.currentTarget.dataset.itemId;
      const item = this.actor.items.get(id);
      item.sheet.render(true);
    });

    // Checkbox toggle
    html.find('.item-checkbox').on("click", ev => {
      ev.preventDefault();
      const itemId = ev.currentTarget.dataset.itemId;
      const item = this.actor.items.get(itemId);
      let toggle = !item.system.isChecked;
      const updateData = {
        "system.isChecked": toggle
      };
      item.update(updateData);
    });

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Open Armor Component edit dialogue
    html.find(".armor-components").on("click", ev => {
      ev.preventDefault();
      new ArmorDialogue(this.actor).render(true);
    })

    // Add item
    html.find('.item-create').on("click", this._onItemCreate.bind(this));

    // Delete item
    html.find('.item-delete').on("click", ev => {
      const itemId = ev.currentTarget.dataset.itemId;
      this.actor.deleteEmbeddedDocuments("Item",[itemId]);
    });
  }

  /**
   * Listen for sheet's rollable buttons.
   * @param {MouseEvent} event The originating left click
   */
  _onSheetRoll(event) {
    event.preventDefault();
    const category = event.currentTarget.closest(".pen-container").dataset.category;
    const label = $.trim($(event.currentTarget).text());

    const prev = $(event.currentTarget).prev("input[type=number]");
    const valueSelection = $(event.currentTarget).next().add(prev);
    const value = $(event.currentTarget).next("input[type=number]").add(prev).eq(0).val();
    new RollDialogue(this.actor, category, label, value).render(true);
  }
  
  /**
   * Listen for add buttons on traits.
   * @param {MouseEvent} event  The originating left click
   */
  _onTraitAdd(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    if (dataset.dual && dataset.trait) {
      this.actor.shiftOneTowardsTrait(dataset.dual, dataset.trait);
    }
  }

  /**
   * Listen for item creation input events and
   * create the item type with default values.
   * @param {MouseEvent} event 
   * @returns {Item}
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const type = element.dataset.type;
    const name = game.i18n.localize(`PENDRAGON.New${type.capitalize()}Name`)
    const itemData = {
      name: name,
      type: type,
      data: duplicate(element.dataset)
    };

    delete itemData.data["type"];
    return this.actor.createEmbeddedDocuments("Item", [itemData]);
  }

}
