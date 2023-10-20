/** Class for a dialogue to handle dice rolling options. */
export default class RollDialogue extends FormApplication {
    constructor(actor, category, label, value, ...args) {
        super(...args);
        this.actor = actor;
        this.category = category;
        this.label = label;
        this.value = value;
    }

  /**
   * Extend and override the default options used by the 5e Actor Sheet
   * @returns {Object}
   */ 
	static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["pendragon", "dialogue"],
      template: "systems/pendragon6/templates/dialogues/roll-dialogue.hbs",
      resizable: false,
      title: game.i18n.localize("PENDRAGON.RollOptions")
    });
  }

  /** @inheritdoc */
  getData() {
    return {
        category: this.category,
        label: this.label,
        value: this.value,
        rollModes: Object.entries(CONST.DICE_ROLL_MODES).reduce((obj, e) => {
          let [k, v] = e;
          obj[v] = `CHAT.Roll${k.titleCase()}`;
          return obj;
        }, {}),
        defaultRollMode: game.settings.get('core', 'rollMode')
    };
  }

  /** @inheritdoc */
  activateListeners(html) {
    super.activateListeners(html);
  }

  /** @override */
  async _updateObject(event, formData) {
    console.log(formData);
    console.log(CONST.DICE_ROLL_MODES);
    let roll = new Roll(`1d20cs<=${this.value}`)
    roll.toMessage({
      speaker: ChatMessage.getSpeaker({actor: this.actor}),
      // rollMode: formData.rollMode
    }, {rollMode: formData.rollMode})
  }
  
}