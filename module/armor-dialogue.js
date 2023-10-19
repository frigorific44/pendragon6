/** Class for a dialogue to edit a sheet's armor parts. */
export default class ArmorDialogue extends FormApplication {
    constructor(actor, ...args) {
        super(...args);
        this.actor = actor;
    }

    /**
     * Extend and override the default options.
     * @returns {Object}
     */ 
	static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["pendragon", "dialogue"],
      template: "systems/pendragon6/templates/dialogues/armor-dialogue.hbs",
      resizable: false,
      closeOnSubmit: false,
      submitOnClose: true,
      submitOnChange: true,
      title: game.i18n.localize("PENDRAGON.ArmorComponents")
    });
  }

  /** @inheritdoc */
  getData() {
    return {"parts": this.actor.system.armor.parts};
  }
  
  async _updateObject(event, formData) {
    console.log(formData);
    await this.actor.update(formData);
  }

}