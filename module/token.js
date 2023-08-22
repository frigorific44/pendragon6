/**
 * Extend the base TokenDocument to support resource type attributes.
 * @extends {TokenDocument}
 */
export class PendragonTokenDocument extends TokenDocument {

}


/* -------------------------------------------- */


/**
 * Extend the base Token class to implement additional system-specific logic.
 * @extends {Token}
 */
export class PendragonToken extends Token {
  _drawBar(number, bar, data) {
    if ( "min" in data ) {
      // Copy the data to avoid mutating what the caller gave us.
      data = {...data};
      // Shift the value and max by the min to draw the bar percentage accurately for a non-zero min
      data.value -= data.min;
      data.max -= data.min;
    }
    return super._drawBar(number, bar, data);
  }
}
