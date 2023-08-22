

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class PendragonItemSheet extends ItemSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["pendragon", "sheet", "item"],
      template: "systems/pendragon6/templates/item-sheet.html",
      width: 520,
      height: 480,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}],
      scrollY: [],
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async getData(options) {
    const context = await super.getData(options);
    context.systemData = context.data.system;
    context.descriptionHTML = await TextEditor.enrichHTML(context.systemData.description, {
      secrets: this.document.isOwner,
      async: true
    });
    return context;
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
