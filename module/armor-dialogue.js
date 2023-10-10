export default class ArmorDialogue extends Application {
    constructor(actor, parts, ...args) {
        super(...args);
        this.actor = actor;
        // this.parts = parts;
    }

    /**
     * Extend and override the default options used by the 5e Actor Sheet
     * @returns {Object}
     */ 
	static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["pendragon", "dialogue"],
      template: "systems/pendragon6/templates/dialogues/armor-dialogue.hbs",
      resizable: false,
      title: game.i18n.localize("PENDRAGON.ArmorComponents")
    });
  }

  /** @inheritdoc */
  getData() {
    return {"parts": this.actor.system.armor.parts};
  }

  /** @inheritdoc */
  activateListeners(html) {
    super.activateListeners(html);

    html.find('input').change(ev => this._onChangePart(ev));
  }

  async _onChangePart(event) {
    const partKey = $(event.currentTarget).closest("div").data().part;
    const partField = event.currentTarget.dataset.field;
    let fieldValue = event.currentTarget.value;
    if (partField === "worn") {
      fieldValue = $(event.currentTarget).prop("checked");
    }
    let parts = duplicate(this.actor.system.armor.parts);
    parts[partKey][partField] = fieldValue;

    let updateData = {};
    updateData[`system.armor.parts.${partKey}.${partField}`] = fieldValue;
    await this.actor.update(updateData);

    this.render();
  }
  
}