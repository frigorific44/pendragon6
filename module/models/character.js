import { MappingField } from "./fields.js"


export class CharacterData extends foundry.abstract.DataModel {
    static defineSchema() {
        const { BooleanField, NumberField, SchemaField, StringField } = foundry.data.fields;
        return {
            personal: new MappingField(new SchemaField({
                value: new StringField({
                    required: true, nullable: false, initial: ""
                })
            }), {initialKeys: CONFIG.PENDRAGON.personal, initialKeysOnly: true}),
            characteristics: new MappingField(new SchemaField({
                value: new NumberField({
                    required: true, nullable: false, integer: true, min: 0, initial: 0
                })
            }), {initialKeys: CONFIG.PENDRAGON.characteristics, initialKeysOnly: true}),
            traits: new SchemaField({
                ...CONFIG.PENDRAGON.traits.map((dual) => {
                    return new MappingField( new SchemaField({
                        value: new NumberField({
                            required: true, nullable: false, integer: true, min: 0, initial: 10
                        }),
                        isChecked: new BooleanField({
                            required: true, nullable: false, initial: false
                        })
                    }), {initialKeys: dual, initialKeysOnly: true});
                })
            }),
            skills: new SchemaField({
                combat: new MappingField(new SchemaField({
                    value: new NumberField({
                        required: true, nullable: false, integer: true, min: 0, initial: 0
                    }),
                    isChecked: new BooleanField({
                        required: true, nullable: false, initial: false
                    })
                }), {initialKeys: CONFIG.PENDRAGON.combat_skills, initialKeysOnly: true}),
                general: new MappingField(new SchemaField({
                    value: new NumberField({
                        required: true, nullable: false, integer: true, min: 0, initial: 0
                    }),
                    isChecked: new BooleanField({
                        required: true, nullable: false, initial: false
                    })
                }), {initialKeys: CONFIG.PENDRAGON.general_skills, initialKeysOnly: true})
            }),
            wounds: new SchemaField({
                ...Array(CONFIG.PENDRAGON.maxWounds).fill(0).map((x) =>
                    new SchemaField({
                        damage: new NumberField({
                            required: true, nullable: false, integer: true, initial: 0
                        }),
                        description: new StringField({
                            required: true, nullable: false, initial: ""
                        })
                    })
                )
            })
        }
    }
}