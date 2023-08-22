

/**
 * Extend the base Actor document.
 * @extends {Actor}
 */
export class PendragonActor extends Actor {

  /** @inheritdoc */
  prepareDerivedData() {
    super.prepareDerivedData();
  }

  /* -------------------------------------------- */

  /* -------------------------------------------- */
  /*  Roll Data Preparation                       */
  /* -------------------------------------------- */

  /** @inheritdoc */
  getRollData() {

    // Copy the actor's system data
    const data = this.toObject(false).system;
    const shorthand = game.settings.get("pendragon", "macroShorthand");

    return data;
  }

  /* -------------------------------------------- */
}
