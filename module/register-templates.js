/** Register Handlebars template partials */
export function registerTemplates() {
    const templatePaths = [
        // Actor Sheet Partials
        "systems/pendragon6/templates/actors/partials/skills.hbs"
    ];

    loadTemplates(templatePaths);
}