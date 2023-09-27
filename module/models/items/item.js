/**
 * Model definition for an Item, representing physical items.
 */
export class ItemData extends foundry.abstract.DataModel {
    static defineSchema() {
        return {
            description: new foundry.data.fields.HTMLField({required: true, nullable: true}),
            weight: new foundry.data.fields.NumberField({
                required: true, nullable: false, integer: true, min: 0, initial: 1
            }),
            weight: new foundry.data.fields.NumberField({
                required: true, nullable: false, min: 0, initial: 0
            })
        }
    }
}