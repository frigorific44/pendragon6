/**
 * Pendragon 6th Edition
 * Author: PhloxenMoxen
 */

// Import configuration
import { PENDRAGON } from "./config.js";
// Import Modules
import { PendragonActor } from "./actor.js";
import { PendragonItem } from "./item.js";
import { PendragonItemSheet } from "./item-sheet.js";
import { PendragonActorSheet } from "./actor-sheet.js";
import { CharacterData } from "./models/character.js"
import { PendragonToken, PendragonTokenDocument } from "./token.js";
import { registerTemplates } from "./register-templates.js";

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
  CONFIG.PENDRAGON = PENDRAGON;

  game.pendragon = {
    PendragonActor
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = PendragonActor;
  CONFIG.Item.documentClass = PendragonItem;
  CONFIG.Token.documentClass = PendragonTokenDocument;
  CONFIG.Token.objectClass = PendragonToken;
  CONFIG.Actor.dataModels.character = CharacterData;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("pendragon", PendragonActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("pendragon", PendragonItemSheet, { makeDefault: true });

  // Register template partials
  registerTemplates();

  /**
   * Slugify a string.
   */
  Handlebars.registerHelper('slugify', function(value) {
    return value.slugify({strict: true});
  });

  /**
   * Equals block helper.
   */
  Handlebars.registerHelper("ifEquals", function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  });

  /**
   * Capitalize a string.
   */
  Handlebars.registerHelper("capital", function(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  });


});

/**
 * Macrobar hook.
 */
// Hooks.on("hotbarDrop", (bar, data, slot) => createPendragonMacro(data, slot));
