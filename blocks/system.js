/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview PL blocks for PbtA pattern language.
 *
 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author amayben@ucsc.edu (Alexander Mayben)
 */
'use strict';

//goog.require('Blockly');
//goog.require('Blockly.Blocks');
//goog.require('Blockly.FieldColour');
//goog.require('Blockly.FieldLabel');

Blockly.defineBlocksWithJsonArray([{
  "type": "setting",
  "message0": "Setting:  %1 %2 Societies:  %3 Histories:  %4 Mysteries:  %5 Regions:  %6",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_statement",
      "name": "society",
      "check": "society"
    },
    {
      "type": "input_statement",
      "name": "history",
      "check": "history"
    },
    {
      "type": "input_statement",
      "name": "mystery",
      "check": "mystery"
    },
    {
      "type": "input_statement",
      "name": "region",
      "check": "region"
    }
  ],
  "inputsInline": false,
  "previousStatement": "setting",
  "nextStatement": "setting",
  "colour": 60,
  "tooltip": "Defines the world of a given RPG system.",
  "helpUrl": ""
},
{
  "type": "society",
  "message0": "Society of  %1 %2 %3",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<region, race, social group, etc.>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "desc",
      "text": "<Describe how people in this social group live.>"
    }
  ],
  "inputsInline": false,
  "previousStatement": "society",
  "nextStatement": "society",
  "colour": 75,
  "tooltip": "What form does this society take?  How do people spend their lives?  What technology is used?",
  "helpUrl": ""
},
{
  "type": "history",
  "message0": "History of  %1 %2 Eras:  %3 Notable Entities:  %4 Notable Events: %5",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<subject>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_statement",
      "name": "era",
      "check": "era"
    },
    {
      "type": "input_statement",
      "name": "entity",
      "check": "entity"
    },
    {
      "type": "input_statement",
      "name": "event",
      "check": "event"
    }
  ],
  "inputsInline": false,
  "previousStatement": "history",
  "nextStatement": "history",
  "colour": 75,
  "tooltip": "What happened or is happening in the world that is relevant to the players?",
  "helpUrl": ""
},
{
  "type": "entity",
  "lastDummyAlign0": "CENTRE",
  "message0": "Entity: %1 %2 Role: %3 %4 Current Status (if any): %5",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "role",
      "text": "<description>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "status",
      "text": "<description>"
    }
  ],
  "inputsInline": false,
  "previousStatement": "entity",
  "nextStatement": "entity",
  "colour": 90,
  "tooltip": "A relevant historical group or figure.",
  "helpUrl": ""
},
{
  "type": "event",
  "lastDummyAlign0": "CENTRE",
  "message0": "Event: %1 %2 Description: %3 %4 Significance:  %5",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "desc",
      "text": "<description>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "significance",
      "text": "<significance>"
    }
  ],
  "inputsInline": false,
  "previousStatement": "event",
  "nextStatement": "event",
  "colour": 90,
  "tooltip": "A relevant moment in history, and its significance to the world.",
  "helpUrl": ""
},
{
  "type": "mystery",
  "lastDummyAlign0": "CENTRE",
  "message0": "Mystery: %1 %2 Description: %3",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "desc",
      "text": "<description>"
    }
  ],
  "inputsInline": false,
  "previousStatement": "mystery",
  "nextStatement": "mystery",
  "colour": 75,
  "tooltip": "An unknown element that has been identified (but not defined) within the setting.",
  "helpUrl": ""
},
{
  "type": "region",
  "message0": "Region: %1 %2 Description: %3 %4 Landmarks: %5",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "desc",
      "text": "<description>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_statement",
      "name": "landmark",
      "check": "landmark"
    }
  ],
  "inputsInline": false,
  "previousStatement": "region",
  "nextStatement": "region",
  "colour": 75,
  "tooltip": "A notable region in which action of the game is set, or can be set.",
  "helpUrl": ""
},
{
  "type": "landmark",
  "lastDummyAlign0": "CENTRE",
  "message0": "Landmark: %1 %2 Description: %3 %4 Significance: %5",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "desc",
      "text": "<description>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "significance",
      "text": "<description>"
    }
  ],
  "inputsInline": false,
  "previousStatement": "landmark",
  "nextStatement": "landmark",
  "colour": 120,
  "tooltip": "A notable feature within a given geographic region around which action may revolve.",
  "helpUrl": ""
},
{
  "type": "system",
  "message0": "System: %1 %2 Themes: %3 Setting:  %4 Mechanics: %5",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<system name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_statement",
      "name": "theme",
      "check": "theme"
    },
    {
      "type": "input_statement",
      "name": "setting",
      "check": "setting"
    },
    {
      "type": "input_statement",
      "name": "mechanics",
      "check": "mechanics"
    }
  ],
  "inputsInline": false,
  "colour": 30,
  "tooltip": "The system you are composing.",
  "helpUrl": ""
},
{
  "type": "theme",
  "message0": "Theme: %1 %2 Description: %3 %4 Functions: %5",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "desc",
      "text": "<description>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_statement",
      "name": "function",
      "check": "function"
    }
  ],
  "inputsInline": false,
  "previousStatement": "theme",
  "nextStatement": "theme",
  "colour": 0,
  "tooltip": "What is one idea that will drive the design of the system, and what functions do you intend it to serve?",
  "helpUrl": ""
},
{
  "type": "function",
  "lastDummyAlign0": "CENTRE",
  "message0": "Function: %1 %2 Description: %3",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "desc",
      "text": "<description>"
    }
  ],
  "inputsInline": false,
  "previousStatement": "function",
  "nextStatement": "function",
  "colour": 345,
  "tooltip": "A manifestation of a certain theme within a system's story, its mechanics, or both.",
  "helpUrl": ""
},
{
  "type": "mechanics",
  "message0": "Mechanics %1 Move Factors:  %2 Moves:  %3 Special Parameters:  %4 Player Rules:  %5",
  "args0": [
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_statement",
      "name": "factor",
      "check": "factor"
    },
    {
      "type": "input_statement",
      "name": "move",
      "check": "move"
    },
    {
      "type": "input_statement",
      "name": "parameter",
      "check": "parameter"
    },
    {
      "type": "input_statement",
      "name": "player_rules",
      "check": "player_rules"
    }
  ],
  "inputsInline": false,
  "previousStatement": "mechanics",
  "colour": 210,
  "tooltip": "Defines the rules of a given RPG system.",
  "helpUrl": ""
},
{
  "type": "factor",
  "lastDummyAlign0": "CENTRE",
  "message0": "Factor: %1 %2 Type: %3 %4 Effect: %5 %6 Additive? %7",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_dropdown",
      "name": "type",
      "options": [
        [
          "Scalar",
          "Scalar"
        ],
        [
          "Reroll",
          "Reroll"
        ],
        [
          "Revision",
          "Revision"
        ],
        [
          "Meta",
          "Meta"
        ]
      ]
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "desc",
      "text": "<description>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_checkbox",
      "name": "isAdditive",
      "checked": false
    }
  ],
  "inputsInline": false,
  "previousStatement": "factor",
  "nextStatement": "factor",
  "colour": 315,
  "tooltip": "A situational variable that factors into the outcome of a move. (Types: Scalar factors give a value that add or subtract to a move, Reroll factors involve a rolling or rerolling of dice, Revision factors involve an immediate or pre-decided outcome, and Meta factors describe non-numerical qualities of the move or situation.) (Additive factors are effects that can result from move outcomes.)",
  "helpUrl": ""
},
{
  "type": "move",
  "lastDummyAlign0": "CENTRE",
  "message0": "Move: %1 %2 Factors: %3 %4 %5 Description: %6 %7 Adds Factor? %8",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_dropdown",
      "name": "factors",
      "options": [
        [
          "option",
          "factor1"
        ]
      ]
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "desc",
      "text": "<description>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_checkbox",
      "name": "adds_factor",
      "checked": false
    }
  ],
  "inputsInline": false,
  "previousStatement": "move",
  "nextStatement": "move",
  "colour": 315,
  "tooltip": "An action available to a player character.",
  "helpUrl": "todo: communication with factors"
},
{
  "type": "parameter",
  "lastDummyAlign0": "CENTRE",
  "message0": "Parameter:  %1 %2 Range:  %3  to  %4",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<outcome>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_number",
      "name": "lrange",
      "value": 0
    },
    {
      "type": "field_number",
      "name": "rrange",
      "value": 1
    }
  ],
  "inputsInline": false,
  "previousStatement": "parameter",
  "nextStatement": "parameter",
  "colour": 315,
  "tooltip": "An outcome defined by a range of possible valid rolls.",
  "helpUrl": ""
},
{
  "type": "era",
  "lastDummyAlign0": "CENTRE",
  "message0": "Era:  %1 %2 Current Era?  %3",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<era name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_checkbox",
      "name": "isCurrent",
      "checked": true
    }
  ],
  "inputsInline": false,
  "previousStatement": "era",
  "nextStatement": "era",
  "colour": 90,
  "tooltip": "What historical period are you describing?",
  "helpUrl": ""
},
{
  "type": "player_rules",
  "message0": "Player Rules %1 Character Creation:  %2 Playbooks:  %3 Resources:  %4 Equipment:  %5 Extra Mechanics:  %6",
  "args0": [
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_statement",
      "name": "character_creation",
      "check": "character_creation"
    },
    {
      "type": "input_statement",
      "name": "playbook",
      "check": "playbook"
    },
    {
      "type": "input_statement",
      "name": "resource",
      "check": "resource"
    },
    {
      "type": "input_statement",
      "name": "equipment",
      "check": "equipment"
    },
    {
      "type": "input_statement",
      "name": "extra_mechanic",
      "check": "extra_mechanic"
    }
  ],
  "inputsInline": false,
  "previousStatement": "player_rules",
  "colour": 225,
  "tooltip": "How player decision-making is defined and bounded by the system.",
  "helpUrl": ""
},
{
  "type": "character_creation",
  "message0": "Character Creation %1 Creation Process: %2 Playbook Creation Rules: %3",
  "args0": [
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_statement",
      "name": "creation_step",
      "check": "creation_step"
    },
    {
      "type": "input_statement",
      "name": "playbook_creation",
      "check": "playbook_creation"
    }
  ],
  "inputsInline": false,
  "previousStatement": "character_creation",
  "colour": 240,
  "tooltip": "The step-by-step process by which players define their own characters.  The common \"creation process\" applies to all by default; special rules apply to certain playbooks.",
  "helpUrl": "TODO: connection with playbooks"
},
{
  "type": "playbook_creation",
  "message0": "Steps for Playbook:  %1 %2 %3",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<playbook>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_statement",
      "name": "creation_step",
      "check": "creation_step"
    }
  ],
  "inputsInline": false,
  "previousStatement": "playbook_creation",
  "nextStatement": "playbook_creation",
  "colour": 225,
  "tooltip": "A set of additional steps or revisions that must be made when creating a character of the specified playbook.",
  "helpUrl": ""
},
{
  "type": "creation_step",
  "lastDummyAlign0": "CENTRE",
  "message0": "Step:  %1 %2 Description: %3 %4 Factors:  %5 %6",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "desc",
      "text": "<description>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_dropdown",
      "name": "factors",
      "options": [
        [
          "option",
          "factor1"
        ]
      ]
    }
  ],
  "inputsInline": false,
  "previousStatement": "creation_step",
  "nextStatement": "creation_step",
  "colour": 270,
  "tooltip": "One step of the creation process.",
  "helpUrl": ""
},
{
  "type": "playbook",
  "lastDummyAlign0": "CENTRE",
  "message0": "Playbook:  %1 %2 Introduction:  %3 Playbook Moves and Features: %4 Starting Equipment: %5",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_statement",
      "name": "playbook_introduction",
      "check": "playbook_introduction"
    },
    {
      "type": "input_statement",
      "name": "feature",
      "check": [
        "playbook_move",
        "feature"
      ]
    },
    {
      "type": "field_input",
      "name": "equipment",
      "text": "<equipment>"
    }
  ],
  "inputsInline": false,
  "previousStatement": "playbook",
  "nextStatement": "playbook",
  "colour": 240,
  "tooltip": "Defines a character playbook or class in the system.",
  "helpUrl": ""
},
{
  "type": "playbook_introduction",
  "lastDummyAlign0": "CENTRE",
  "message0": "Introduction %1 Flavor Pitch: %2 %3 Social Role: %4 %5 Mechanical Role:  %6",
  "args0": [
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "pitch",
      "text": "<description for players>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "soc_role",
      "text": "<personality/social interactions>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "mech_role",
      "text": "<system/mechanical interactions>"
    }
  ],
  "inputsInline": false,
  "previousStatement": "playbook_introduction",
  "colour": 270,
  "tooltip": "A description of the playbook's role(s) in the system.",
  "helpUrl": ""
},
{
  "type": "resource",
  "lastDummyAlign0": "CENTRE",
  "message0": "Resource:  %1 %2 Description:  %3 %4 Factors:  %5 %6 %7 Range:  %8  to  %9 %10 Initial Value:  %11",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "desc",
      "text": "<description>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_dropdown",
      "name": "factors",
      "options": [
        [
          "option",
          "factor1"
        ]
      ]
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_number",
      "name": "lrange",
      "value": 0
    },
    {
      "type": "field_number",
      "name": "rrange",
      "value": 0
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_number",
      "name": "init",
      "value": 0
    }
  ],
  "inputsInline": false,
  "previousStatement": "resource",
  "nextStatement": "resource",
  "colour": 240,
  "tooltip": "A statistic that a player tracks which can factor into certain moves.",
  "helpUrl": ""
},
{
  "type": "feature",
  "lastDummyAlign0": "CENTRE",
  "message0": "Feature:  %1 %2 Description: %3 %4 Factors: %5 %6",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "desc",
      "text": "<description>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_dropdown",
      "name": "factors",
      "options": [
        [
          "option",
          "factor1"
        ]
      ]
    }
  ],
  "inputsInline": false,
  "previousStatement": [
    "feature",
    "playbook_move"
  ],
  "nextStatement": [
    "feature",
    "playbook_move"
  ],
  "colour": 270,
  "tooltip": "An ability or effect unique to a certain playbook.",
  "helpUrl": ""
},
{
  "type": "equipment_type",
  "lastDummyAlign0": "CENTRE",
  "message0": "Equipment Type:  %1 %2 Description: %3 %4 Factors:  %5 %6 %7 Subtypes?  %8",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "desc",
      "text": "<description>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_dropdown",
      "name": "factors",
      "options": [
        [
          "option",
          "factor1"
        ]
      ]
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_checkbox",
      "name": "hasSubtypes",
      "checked": false
    }
  ],
  "inputsInline": false,
  "previousStatement": "equipment_type",
  "nextStatement": "equipment_type",
  "colour": 270,
  "tooltip": "A category of certain equipment items, as well as that category's pertinent factors for its items to be used, and what subtypes it may be divided into.",
  "helpUrl": ""
},
{
  "type": "subtype",
  "message0": "Subtype:  %1 %2 Description: %3 %4 Factors:  %5 %6 %7 Required by Parent Type?  %8 %9 Subtypes?  %10",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "desc",
      "text": "<description>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_dropdown",
      "name": "factors",
      "options": [
        [
          "option",
          "factor1"
        ]
      ]
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_checkbox",
      "name": "isRequired",
      "checked": false
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_checkbox",
      "name": "hasSubtypes",
      "checked": true
    }
  ],
  "previousStatement": "subtype",
  "nextStatement": "subtype",
  "colour": 270,
  "tooltip": "A category of certain equipment items, as well as that category's pertinent factors for its items to be used, and what subtypes it may be divided into.",
  "helpUrl": ""
},
{
  "type": "extra_mechanic",
  "lastDummyAlign0": "CENTRE",
  "message0": "Extra Mechanic: %1 %2 Description:  %3 %4 Factors: %5 %6 %7 Special Resources? %8 %9 Special Moves? %10",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "desc",
      "text": "<description>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_dropdown",
      "name": "factors",
      "options": [
        [
          "option",
          "factor1"
        ]
      ]
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_checkbox",
      "name": "hasResources",
      "checked": false
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_checkbox",
      "name": "hasMoves",
      "checked": false
    }
  ],
  "previousStatement": "extra_mechanic",
  "nextStatement": "extra_mechanic",
  "colour": 240,
  "tooltip": "An additional mechanic relevant to player action.",
  "helpUrl": ""
},
{
  "type": "playbook_move",
  "lastDummyAlign0": "CENTRE",
  "message0": "Playbook Move: %1 %2 Factors: %3 %4 %5 Description: %6 %7 Adds Factor? %8",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_dropdown",
      "name": "factors",
      "options": [
        [
          "option",
          "dummy1"
        ]
      ]
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "desc",
      "text": "<description>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_checkbox",
      "name": "addsFactor",
      "checked": false
    }
  ],
  "inputsInline": false,
  "previousStatement": [
    "playbook_move",
    "feature"
  ],
  "nextStatement": [
    "playbook_move",
    "feature"
  ],
  "colour": 65,
  "tooltip": "An action only available to a certain playbook.",
  "helpUrl": "todo: communication with factors"
},
{
  "type": "equipment",
  "message0": "Equipment %1 Equipment Types: %2 Item List: %3",
  "args0": [
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_statement",
      "name": "equipment_type",
      "check": "equipment_type"
    },
    {
      "type": "input_statement",
      "name": "item",
      "check": "item"
    }
  ],
  "inputsInline": false,
  "previousStatement": "equipment",
  "colour": 240,
  "tooltip": "Items usable by the players.",
  "helpUrl": ""
},
{
  "type": "item",
  "lastDummyAlign0": "CENTRE",
  "message0": "Item:  %1 %2 Types:  %3 %4 %5 Subtypes: %6 %7 %8 Description: %9",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_dropdown",
      "name": "types",
      "options": [
        [
          "option",
          "type1"
        ]
      ]
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_dropdown",
      "name": "subtypes",
      "options": [
        [
          "option",
          "subtype1"
        ]
      ]
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "desc",
      "text": "<description>"
    }
  ],
  "inputsInline": false,
  "previousStatement": "item",
  "nextStatement": "item",
  "colour": 270,
  "tooltip": "A category of certain equipment items, as well as that category's pertinent factors for its items to be used, and what subtypes it may be divided into.",
  "helpUrl": ""
}]);  // END JSON EXTRACT (Do not delete this comment.)
