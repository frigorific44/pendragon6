

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class PendragonActorSheet extends ActorSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["pendragon", "sheet", "actor"],
      template: "systems/pendragon6/templates/actor-sheet.html",
      width: 600,
      height: 600,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}],
      scrollY: [".biography"],
      dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async getData(options) {
    const context = await super.getData(options);
    context.biographyHTML = await TextEditor.enrichHTML(context.data.system.biography, {
      secrets: this.document.isOwner,
      async: true
    });
    return context;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  activateListeners(html) {
    super.activateListeners(html);

    html.find(".traits").on("click", ".rollable", this._onTraitRoll.bind(this));
    html.find(".traits").on("click", ".trait-plus", this._onTraitAdd.bind(this));
  }

  /* -------------------------------------------- */

  /**
   * Listen for roll buttons on traits.
   * @param {MouseEvent} event  The originating left click
   */
  _onTraitRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    if (dataset.label && dataset.value) {
      let roll = new Roll("d20", this.actor.getRollData());
      let label = `Rolling ${dataset.label}, under ${dataset.value}`;
      return roll.toMessage({
        user: game.user.id,
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label
      });
    }
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

}
