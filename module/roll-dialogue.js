/** Class for a dialogue to handle dice rolling options. */
export default class RollDialogue extends FormApplication {
    constructor(actor, category, label, base, ...args) {
        super(...args);
        this.actor = actor;
        this.category = category;
        this.label = label;
        this.base = Number(base);
    }

  /**
   * Extend and override the default options.
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
        base: this.base,
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

  /** 
   * Use the result of the form to roll to chat.
   * @override
   */
  async _updateObject(event, formData) {
    RollDialogue.rollToChat(Object.assign(formData, {
      base: this.base,
      actorOverride: this.actor,
      category: this.category,
      label: this.label
    }));
  }

  static async rollToChat({
    base=0, 
    reflexive=0, 
    other=0, 
    rollMode=game.settings.get('core', 'rollMode'),
    category="",
    label="",
    actorOverride=undefined
  }) {
    // The total of the modifiers
    const modifiers = other + reflexive;
    // The total modified value
    const total = Math.max(base + other + reflexive, 0);
    // How much greater than 20 it is
    const diff = Math.max(total - 20, 0);

    const formula = "1d20" + (diff ? "+@diff" : "");
    let roll = new Roll(formula, {diff: diff});
    await roll.evaluate();

    const speaker = actorOverride ? ChatMessage.getSpeaker({actor: actorOverride}) : ChatMessage.getSpeaker();

    const template = "systems/pendragon6/templates/chat/chat-roll.hbs";
    const flavor = await renderTemplate(template, {
      category: category,
      label: label,
      base: base,
      modifiers: modifiers,
      other: other,
      reflexive: reflexive,
      degree: RollDialogue.degreeOfSuccess(roll.total, total)
    });

    const chatData = {
      user: game.user.id,
      // type: CONST.CHAT_MESSAGE_TYPES.ROLL,
      content: "Content, baby!",
      speaker: speaker,
      flavor: flavor,
      sound: CONFIG.sounds.dice,
      // roll: rollReturn.roll,
      // rollMode: rollMode
    }

    roll.toMessage(chatData, {rollMode: rollMode});
  }

  static degreeOfSuccess(result, value) {
    const diff = Math.max(value - 20, 0);

    if (result <= value) {// It is a success
      if (result == value || result >= 20) {
        return "criticalSuccess";
      }
      return "success";
    } else {// It is a failure
      if (result - diff == 20) {// It is a fumble (critical failure)
        return "fumble";
      }
      return "failure";
    }
  }
  
}