import { MappingField } from "./fields.js"


export class CharacterData extends foundry.abstract.DataModel {
    static defineSchema() {
        return {
            personal: new MappingField(new foundry.data.fields.SchemaField({
                value: new foundry.data.fields.StringField({
                    required: true, nullable: false, min: 0, initial: ""
                })
            }), {initialKeys: CONFIG.PENDRAGON.personal, initialKeysOnly: true}),
            characteristics: new MappingField(new foundry.data.fields.SchemaField({
                value: new foundry.data.fields.NumberField({
                    required: true, nullable: false, integer: true, min: 0, initial: 0
                })
            }), {initialKeys: CONFIG.PENDRAGON.characteristics, initialKeysOnly: true}),
            traits: new foundry.data.fields.SchemaField({
                ...CONFIG.PENDRAGON.traits.map((dual) => {
                    return new MappingField( new foundry.data.fields.SchemaField({
                        value: new foundry.data.fields.NumberField({
                            required: true, nullable: false, integer: true, min: 0, initial: 10
                        }),
                        isChecked: new foundry.data.fields.BooleanField({
                            required: true, nullable: false, initial: false
                        })
                    }), {initialKeys: dual, initialKeysOnly: true});
                })
            }),
            skills: new foundry.data.fields.SchemaField({
                combat: new MappingField(new foundry.data.fields.SchemaField({
                    value: new foundry.data.fields.NumberField({
                        required: true, nullable: false, integer: true, min: 0, initial: 0
                    }),
                    isChecked: new foundry.data.fields.BooleanField({
                        required: true, nullable: false, initial: false
                    })
                }), {initialKeys: CONFIG.PENDRAGON.combat_skills, initialKeysOnly: true}),
                general: new MappingField(new foundry.data.fields.SchemaField({
                    value: new foundry.data.fields.NumberField({
                        required: true, nullable: false, integer: true, min: 0, initial: 0
                    }),
                    isChecked: new foundry.data.fields.BooleanField({
                        required: true, nullable: false, initial: false
                    })
                }), {initialKeys: CONFIG.PENDRAGON.general_skills, initialKeysOnly: true})
            })
        }
    }
}