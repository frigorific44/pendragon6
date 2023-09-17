# Development

## Character

### Data

#### Biography

Age: Integer

Culture:

Religion:

Homeland:

Current Class:

Current Lord:

Distinctive Features:

Family Characteristic:

#### Characteristics

Size: Integer

Dexterity: Integer

Strength: Integer

Constitution: Integer

Appearance: Integer

Movement: Integer

Armor Points: Integer, **PADDING + ARMOR + HELMET + SHIELD**

- Padding
  - Type: String
  - Armor: Integer
- Armor
  - Type: String
  - Armor: Integer
- Helmet
  - Type: String
  - Armor: Integer
- Shield
  - Type: String
  - Armor: Integer


#### Health

Hit Points

- Value: Integer
- Max: Integer, Equal to **SIZ + CON**

Healing Rate: Integer, **STR + CON / 10**

Knockdown: Integer, Equal to **SIZ**

Major Wound: Integer, Equal to **CON**

Unconscious: Integer, Equal to **Hit Points / 4** rounded down

Debilitated: Boolean

Deterioration Damage: Integer

Aggravated Damage: Integer

Wounds List

- Wound
  - Damage: Integer
  - Description: String

#### Traits

Each value can be no less than zero. Sum of two values in a dual pair must equal to twenty, otherwise if one value is above twenty then the other must be zero.

- Chaste/Lustful
- Energetic/Lazy
- Forgiving/Vengeful
- Generous/Selfish
- Honest/Deceitful
- Just/Arbitrary
- Merciful/Cruel
- Modest/Proud
- Prudent/Reckless
- Spiritual/Worldly
- Temperate/Indulgent
- Trusting/Suspicious
- Valorous/Cowardly

#### Skills

Skill

- Value: Integer
- Checked: Boolean

##### General

- Awareness
- Chirugery
- Compose
- Courtesy
- Dancing
- Falconry
- Fashion
- First Aid
- Flirting
- Folklore
- Gaming
- Hunting
- Intrigue
- Literacy
- Orate
- Play
- Recognize
- Religion
- Sing
- Stewardship

##### Combat

Weapon skills begin at **DEX/2**

- Battle
- Bow
- Brawling
- Charge
- Crossbow
- Hafted
- Two-Handed Hafted
- Horsemanship
- Spear
- Sword
- Thrown Weapon

#### Weapons

Weapon

- name: String
- skill: StringKey
- damage: Formula

#### Passions

Passion

- checked: Boolean
- name: String
- value: Integer

#### Joust Score

Wins: Integer

Losses: Integer

#### Horses

#### Equipment

#### History/Events

#### Glory

#### Squire

Name: String

Age: Integer

Skill: Integer, 14

### Rolls

This is to outline rolls that will be made, and the data necessary to roll them, so that this data can be elevated to the top level for ease of use when preparing roll data.

#### Probability Based: Skill, Trait, Stat, and Passion Rolls

Roll 1d20 against the stat, with modifiers

#### Damage Rolls

Number of dice determined by the weapon, minus the armor of the recipient.

## To-Do

- Delete confirmation dialogue

## In Question

- Initiative?
- Creating Drag-and-Drop macros in the macrobar?
- Token tracked values
- If there is no "short" label, just insert "label"