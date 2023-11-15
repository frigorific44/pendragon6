/** Register Handlebars template partials */
export function registerTemplates() {
    const templatePaths = [
        // Actor Sheet Tabs
        "systems/pendragon6/templates/actors/tabs/play-tab.hbs",
        "systems/pendragon6/templates/actors/tabs/combat-tab.hbs",
        "systems/pendragon6/templates/actors/tabs/possessions-tab.hbs",
        "systems/pendragon6/templates/actors/tabs/history-tab.hbs",

        // Actor Sheet Partials
        "systems/pendragon6/templates/actors/partials/skills.hbs",
        "systems/pendragon6/templates/actors/partials/joust.hbs",
        "systems/pendragon6/templates/actors/partials/passions.hbs",
        "systems/pendragon6/templates/actors/partials/traits.hbs",
        "systems/pendragon6/templates/actors/partials/weapons.hbs",
        "systems/pendragon6/templates/actors/partials/wounds.hbs",
        "systems/pendragon6/templates/actors/partials/health.hbs",
        "systems/pendragon6/templates/actors/partials/move-and-armor.hbs",
        "systems/pendragon6/templates/actors/partials/personal.hbs",
        "systems/pendragon6/templates/actors/partials/characteristics.hbs",
        "systems/pendragon6/templates/actors/partials/passive-glory.hbs",
        "systems/pendragon6/templates/actors/partials/knightly-events.hbs",
        "systems/pendragon6/templates/actors/partials/events.hbs"
    ];

    loadTemplates(templatePaths);
}