/**
 * Model definition for an Event Item.
 */
export class EventData extends foundry.abstract.DataModel {
    static defineSchema() {
        return {
            description: new foundry.data.fields.HTMLField({required: true, nullable: true}),
            date: new StringField({
                required: true, nullable: false, blank: true, initial: ""
            }),
            glory: new foundry.data.fields.NumberField({
                required: true, nullable: false, integer: true, min: 0, initial: 0
            })
        }
    }
}