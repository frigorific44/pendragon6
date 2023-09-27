/**
 * Model definition for a Weapon Item.
 */
export class WeaponData extends foundry.abstract.DataModel {
    static defineSchema() {
        return {
            description: new foundry.data.fields.HTMLField({required: true, nullable: true}),
            skill: new StringField({
                required: true, nullable: false, blank: false,
                initial: CONFIG.PENDRAGON.combat_skills[0], choices: CONFIG.PENDRAGON.combat_skills
            }),
            formula: new StringField({required: true, nullable: false, blank: true, initial: ""})
        }
    }
}