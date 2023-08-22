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

  // Register system settings
  game.settings.register("pendragon", "macroShorthand", {
    name: "SETTINGS.PendragonMacroShorthandN",
    hint: "SETTINGS.PendragonMacroShorthandL",
    scope: "world",
    type: Boolean,
    default: true,
    config: true
  });

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

/**
 * Adds the actor template context menu.
 */
Hooks.on("getActorDirectoryEntryContext", (html, options) => {

  // Define an actor as a template.
  options.push({
    name: game.i18n.localize("PENDRAGON.DefineTemplate"),
    icon: '<i class="fas fa-stamp"></i>',
    condition: li => {
      const actor = game.actors.get(li.data("documentId"));
      return !actor.isTemplate;
    },
    callback: li => {
      const actor = game.actors.get(li.data("documentId"));
      actor.setFlag("pendragon6", "isTemplate", true);
    }
  });

  // Undefine an actor as a template.
  options.push({
    name: game.i18n.localize("PENDRAGON.UnsetTemplate"),
    icon: '<i class="fas fa-times"></i>',
    condition: li => {
      const actor = game.actors.get(li.data("documentId"));
      return actor.isTemplate;
    },
    callback: li => {
      const actor = game.actors.get(li.data("documentId"));
      actor.setFlag("pendragon6", "isTemplate", false);
    }
  });
});

/**
 * Adds the item template context menu.
 */
Hooks.on("getItemDirectoryEntryContext", (html, options) => {

  // Define an item as a template.
  options.push({
    name: game.i18n.localize("PENDRAGON.DefineTemplate"),
    icon: '<i class="fas fa-stamp"></i>',
    condition: li => {
      const item = game.items.get(li.data("documentId"));
      return !item.isTemplate;
    },
    callback: li => {
      const item = game.items.get(li.data("documentId"));
      item.setFlag("pendragon6", "isTemplate", true);
    }
  });

  // Undefine an item as a template.
  options.push({
    name: game.i18n.localize("PENDRAGON.UnsetTemplate"),
    icon: '<i class="fas fa-times"></i>',
    condition: li => {
      const item = game.items.get(li.data("documentId"));
      return item.isTemplate;
    },
    callback: li => {
      const item = game.items.get(li.data("documentId"));
      item.setFlag("pendragon6", "isTemplate", false);
    }
  });
});
