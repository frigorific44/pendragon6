

// Namespace Configuration Values
export const PENDRAGON = {};

/**
 * The maximum number of wounds that can be represented on the character sheet.
 * @type {Number}
 */
PENDRAGON.maxWounds = 8;


/**
 * The set of personal features of a character.
 * This config affects the data model.
 * @type {Array}
 */
PENDRAGON.personal = [
    "age",
    "culture",
    "religion",
    "homeland",
    "currentClass",
    "currentLord",
    "distinctiveFeatures"
];

/**
 * The set of Traits used within the system.
 * This config affects the data model.
 * @type {Array}
 */
PENDRAGON.traits = [
    ["chaste", "lustful"],
    ["energetic", "lazy"],
    ["forgiving", "vengeful"],
    ["generous", "selfish"],
    ["honest", "deceitful"],
    ["just", "arbitrary"],
    ["merciful", "cruel"],
    ["modest", "proud"],
    ["prudent", "reckless"],
    ["spiritual", "worldly"],
    ["temperate", "indulgent"],
    ["trusting", "suspicious"],
    ["valorous", "cowardly"]
];

/**
 * The set of Characteristics used within the system.
 * This config affects the data model.
 * @type {Array}
 */
PENDRAGON.characteristics = [
    "size",
    "dexterity",
    "strength",
    "constitution",
    "appearance"
];

/**
 * The set of Skills used within the system.
 * This config affects the data model.
 * @type {Array}
 */
PENDRAGON.general_skills = [
    "awareness",
    "chirugery",
    "compose",
    "courtesy",
    "dancing",
    "falconry",
    "fashion",
    "firstAid",
    "flirting",
    "folklore",
    "gaming",
    "hunting",
    "intrigue",
    "literacy",
    "orate",
    "play",
    "recognize",
    "religion",
    "sing",
    "stewardship"
];
PENDRAGON.combat_skills = [
    "battle",
    "bow",
    "brawling",
    "charge",
    "crossbow",
    "hafted",
    "twoHandedHafted",
    "horsemanship",
    "spear",
    "sword",
    "thrownWeapon"
];

/**
 * Armor components which make up the total Armor Points.
 * This config affects the data model.
 * @type {Array}
 */
PENDRAGON.armor_parts = [
    "padding",
    "armor",
    "helmet",
    "shield"
]

/**
 * The set of knightly events.
 * This config affects the data model.
 * @type {Array}
 */
PENDRAGON.knightly_events = [
    "born",
    "squired",
    "knighted",
    "landed",
    "roundTable",
    "ennobled",
    "died"
]

/**
 * Sources of passive Glory.
 * This config affects the data model.
 * @type {Array}
 */
PENDRAGON.passive_glory = [
    "traits",
    "passions",
    "ideals", 
    "fairAppeal",
    "estate"
]