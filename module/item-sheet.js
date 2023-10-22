

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class PendragonItemSheet extends ItemSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["pendragon", "sheet", "item"],
      width: 520,
      height: 480,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}],
      scrollY: [],
    });
  }

  /* -------------------------------------------- */
  
  /**
   * Return a dynamic reference to the HTML template path used to render this Item Sheet
   * @return {string}
   */
  get template() {
    const path = "systems/pendragon6/templates/items";
    return `${path}/${this.item.type}-sheet.hbs`;
  }

  /** @inheritdoc */
  async getData(options) {
    const context = await super.getData(options);
    context.systemData = context.data.system;
    context.descriptionHTML = await TextEditor.enrichHTML(context.systemData.description, {
      secrets: this.document.isOwner,
      async: true
    });

    this._prepareWeaponData(context);

    return context;
  }

  /* -------------------------------------------- */

  /**
   * Prepare data for Weapon Items.
   * @param {Object} sheetData 
   */
  _prepareWeaponData(sheetData) {
    sheetData.skillOptions = CONFIG.PENDRAGON.combat_skills;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if ( !this.isEditable ) return;
  }

  /* -------------------------------------------- */

}
