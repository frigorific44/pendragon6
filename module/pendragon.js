/**
 * Pendragon 6th Edition
 * Author: PhloxenMoxen
 */

// Import Modules
import { PendragonActor } from "./actor.js";
import { PendragonItem } from "./item.js";
import { PendragonItemSheet } from "./item-sheet.js";
import { PendragonActorSheet } from "./actor-sheet.js";
import { PendragonToken, PendragonTokenDocument } from "./token.js";

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

/**
 * Init hook.
 */
Hooks.once("init", async function() {
  console.log(`Initializing Pendragon System`);

  /**
   * Set an initiative formula for the system. This will be updated later.
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  };

  game.pendragon = {
    PendragonActor
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = PendragonActor;
  CONFIG.Item.documentClass = PendragonItem;
  CONFIG.Token.documentClass = PendragonTokenDocument;
  CONFIG.Token.objectClass = PendragonToken;

  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  }

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("pendragon", PendragonActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("pendragon", PendragonItemSheet, { makeDefault: true });

  /**
   * Slugify a string.
   */
  Handlebars.registerHelper('slugify', function(value) {
    return value.slugify({strict: true});
  });

  /**
   * Concatenate a list of strings.
   */
  Handlebars.registerHelper('concat', function(a, b) {
    return a + b;
  });

});

/**
 * Macrobar hook.
 */
// Hooks.on("hotbarDrop", (bar, data, slot) => createPendragonMacro(data, slot));
