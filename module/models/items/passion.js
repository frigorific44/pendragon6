/**
 * Model definition for a Passion Item.
 */
export class PassionData extends foundry.abstract.DataModel {
    static defineSchema() {
        return {
            description: new foundry.data.fields.HTMLField({required: true, nullable: true}),
            target: new StringField({
                required: true, nullable: false, blank: true, initial: ""
            }),
            value: new foundry.data.fields.NumberField({
                required: true, nullable: false, integer: true, min: 0, initial: 0
            }),
            isChecked: new foundry.data.fields.BooleanField({
                required: true, nullable: false, initial: false
            })
        }
    }
}