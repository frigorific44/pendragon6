

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

    return data;
  }

  /* -------------------------------------------- */

  /**
   * Removes a point from the other trait of the dual, and adds a point to the trait specified.
   * A point will not be removed if it would take the trait below zero.
   * A point will not be added if the other trait is above 20 prior to the operation.
   * @param {String} dual  The dual property key
   * @param {String} trait  The trait property key
   */
  shiftOneTowardsTrait(dual, trait) {
    const system = this.system;
    const toKey = trait;
    const fromKey = Object.keys(system.traits[dual]).filter((t) => t != toKey)[0];
    const toVal = system.traits[dual][toKey].value;
    const fromVal = system.traits[dual][fromKey].value;

    let updateData = {};
    if (toVal - fromVal >= -20) {
      updateData[`system.traits.${dual}.${toKey}.value`] = toVal + 1;
    }
    if (fromVal > 0) {
      updateData[`system.traits.${dual}.${fromKey}.value`] = fromVal - 1;
    }

    this.update(updateData);
  }
}
