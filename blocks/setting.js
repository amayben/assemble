/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Colour blocks for Blockly.
 *
 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author fraser@google.com (Neil Fraser)
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
      "name": "Name",
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
  "colour": 290,
  "tooltip": "Defines the world of a given RPG system.",
  "helpUrl": ""
},
{
  "type": "society",
  "message0": "Society of  %1 %2 %3",
  "args0": [
    {
      "type": "field_input",
      "name": "Name",
      "text": "<region, race, social group, etc.>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "Description",
      "text": "<Describe how people in this social group live.>"
    }
  ],
  "inputsInline": false,
  "previousStatement": "society",
  "nextStatement": "society",
  "colour": 230,
  "tooltip": "What form does this society take?  How do people spend their lives?  What technology is used?",
  "helpUrl": ""
},
{
  "type": "history",
  "message0": "History of  %1 %2 Eras:  %3 Notable Entities:  %4 Notable Events: %5",
  "args0": [
    {
      "type": "field_input",
      "name": "Name",
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
  "colour": 230,
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
      "name": "Name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "Past Role",
      "text": "<description>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "Current Status",
      "text": "<description>"
    }
  ],
  "inputsInline": false,
  "previousStatement": "entity",
  "nextStatement": "entity",
  "colour": 65,
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
      "name": "Name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "Description",
      "text": "<description>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "Significance",
      "text": "<significance>"
    }
  ],
  "inputsInline": false,
  "previousStatement": "event",
  "nextStatement": "event",
  "colour": 65,
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
      "name": "Name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "Description",
      "text": "<description>"
    }
  ],
  "inputsInline": false,
  "previousStatement": "mystery",
  "nextStatement": "mystery",
  "colour": 65,
  "tooltip": "An unknown element that has been identified (but not defined) within the setting.",
  "helpUrl": ""
},
{
  "type": "region",
  "message0": "Region: %1 %2 Description: %3 %4 Landmarks: %5",
  "args0": [
    {
      "type": "field_input",
      "name": "Name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "Description",
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
  "colour": 65,
  "tooltip": "A notable region in which action of the game is set, or can be set.",
  "helpUrl": ""
},
{
  "type": "landmark",
  "lastDummyAlign0": "CENTRE",
  "message0": "Landmark: %1 %2 Appearance: %3 %4 Significance: %5",
  "args0": [
    {
      "type": "field_input",
      "name": "Name",
      "text": "<name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "Appearance",
      "text": "<description>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_input",
      "name": "Significance",
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
  "type": "era",
  "lastDummyAlign0": "CENTRE",
  "message0": "Era:  %1 %2 Current Era?  %3",
  "args0": [
    {
      "type": "field_input",
      "name": "Name",
      "text": "<era name>"
    },
    {
      "type": "input_dummy",
      "align": "CENTRE"
    },
    {
      "type": "field_checkbox",
      "name": "Current",
      "checked": true
    }
  ],
  "inputsInline": false,
  "previousStatement": "era",
  "nextStatement": "era",
  "colour": 20,
  "tooltip": "What historical period are you describing?",
  "helpUrl": ""
}]);  // END JSON EXTRACT (Do not delete this comment.)
