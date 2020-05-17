/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview PL blocks for PbtA pattern language.
 * @author amayben@ucsc.edu (Alexander Mayben)
 */
'use strict';

//goog.require('Blockly');
//goog.require('Blockly.Blocks');
//goog.require('Blockly.FieldColour');
//goog.require('Blockly.FieldLabel');

//global arrays (shared between blocks for communication)
var factorsList = [];

//sets contents of "factor" dropdown fields
//TODO: can this be generalized?
var generateFactors = function() {
  var options = [["<choose factor>","nofactor"]];
  if (factorsList.length > 0) {
    for (var i = 0; i < factorsList.length; i++) {
      options.push(factorsList[i]);
    }
  }
  console.log("generateFactors called with output: " + options.toString());
  return options;
};

//takes array of blocks and their type as input (type is a string just used for error tracking)
//updates all dropdown fields in each block based on the content of factorsList
//TODO: apply to all factors dropdown fields within a block if/when there are multiple
//TODO: can this be generalized to all dynamic dropdown types?
var fixBlockFactors = function(blockList, type) {
  if (blockList.length == 0) {
    console.log("fixBlockFactors() called with empty array, block type: " + type);
  } else if (factorsList.length == 0) {
    console.log("fixBlockFactors() called with factorsList empty.");
  } else {
    var currField;
    var currValue;
    var inList = false;
    for (var i = 0; i < blockList.length; i++) {
      //TODO: currField as an array
      currField = blockList[i].getField("factors");
      currValue = currField.getValue();
      //console.log("currValue: " + currValue);
      //if the stored ID is still in the dropdown, set current field to that ID
      for (var j = 0; j < factorsList.length; j++) {
        if (currValue == factorsList[j][1]) {
          inList = true;
          break;
        }
      }
      //regenerates contents of currField (done internally with generateFactors(), based on factorsList)
      currField.getOptions(false);
      currField.setValue(currValue);
      currField.forceRerender();
      inList = false;
    }
  }
};

var fixAllFactors = function(workspace) {
  //acquire all blocks with "factors" fields and call our helper function, fixBlockFactors()
  //sadly this has to be done one at a time for each block type that uses factors fields
  fixBlockFactors(workspace.getBlocksByType("move"), "move");
  fixBlockFactors(workspace.getBlocksByType("creation_step"), "creation_step");
  fixBlockFactors(workspace.getBlocksByType("resource"), "resource");
  fixBlockFactors(workspace.getBlocksByType("feature"), "feature");
  fixBlockFactors(workspace.getBlocksByType("equipment_type"), "equipment_type");
  fixBlockFactors(workspace.getBlocksByType("subtype"), "subtype");
  fixBlockFactors(workspace.getBlocksByType("extra_mechanic"), "extra_mechanic");
  fixBlockFactors(workspace.getBlocksByType("playbook_move"), "playbook_move");
  //template: fixBlockFactors(this.workspace.getBlocksByType(<type>), <type>);
}

Blockly.Blocks['setting'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Setting: ")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendStatementInput("society")
        .setCheck("society")
        .appendField("Societies: ");
    this.appendStatementInput("history")
        .setCheck("history")
        .appendField("Histories: ");
    this.appendStatementInput("mystery")
        .setCheck("mystery")
        .appendField("Mysteries: ");
    this.appendStatementInput("region")
        .setCheck("region")
        .appendField("Regions: ");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "setting");
    this.setNextStatement(true, "setting");
    this.setColour(60);
    this.setTooltip("Defines the world of a given RPG system.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['society'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Society of ")
        .appendField(new Blockly.FieldTextInput("<region, race, social group, etc.>"), "name");
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("<Describe how people in this social group live.>"), "desc");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "society");
    this.setNextStatement(true, "society");
    this.setColour(75);
    this.setTooltip("What form does this society take?  How do people spend their lives?  What technology is used?");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['history'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("History of ")
        .appendField(new Blockly.FieldTextInput("<subject>"), "name");
    this.appendStatementInput("era")
        .setCheck("era")
        .appendField("Eras: ");
    this.appendStatementInput("entity")
        .setCheck("entity")
        .appendField("Notable Entities: ");
    this.appendStatementInput("event")
        .setCheck("event")
        .appendField("Notable Events:");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "history");
    this.setNextStatement(true, "history");
    this.setColour(75);
    this.setTooltip("What happened or is happening in the world that is relevant to the players?");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['entity'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Entity:")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Role:")
        .appendField(new Blockly.FieldTextInput("<description>"), "role");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Current Status (if any):")
        .appendField(new Blockly.FieldTextInput("<description>"), "status");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "entity");
    this.setNextStatement(true, "entity");
    this.setColour(90);
    this.setTooltip("A relevant historical group or figure.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['event'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Event:")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Description:")
        .appendField(new Blockly.FieldTextInput("<description>"), "desc");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Significance: ")
        .appendField(new Blockly.FieldTextInput("<significance>"), "significance");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "event");
    this.setNextStatement(true, "event");
    this.setColour(90);
    this.setTooltip("A relevant moment in history, and its significance to the world.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['mystery'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Mystery:")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Description:")
        .appendField(new Blockly.FieldTextInput("<description>"), "desc");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "mystery");
    this.setNextStatement(true, "mystery");
    this.setColour(75);
    this.setTooltip("An unknown element that has been identified (but not defined) within the setting.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['region'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Region:")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Description:")
        .appendField(new Blockly.FieldTextInput("<description>"), "desc");
    this.appendStatementInput("landmark")
        .setCheck("landmark")
        .appendField("Landmarks:");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "region");
    this.setNextStatement(true, "region");
    this.setColour(75);
    this.setTooltip("A notable region in which action of the game is set, or can be set.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['landmark'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Landmark:")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Description:")
        .appendField(new Blockly.FieldTextInput("<description>"), "desc");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Significance:")
        .appendField(new Blockly.FieldTextInput("<description>"), "significance");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "landmark");
    this.setNextStatement(true, "landmark");
    this.setColour(120);
    this.setTooltip("A notable feature within a given geographic region around which action may revolve.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['system'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("System:")
        .appendField(new Blockly.FieldTextInput("<system name>"), "name");
    this.appendStatementInput("theme")
        .setCheck("theme")
        .appendField("Themes:");
    this.appendStatementInput("setting")
        .setCheck("setting")
        .appendField("Setting: ");
    this.appendStatementInput("mechanics")
        .setCheck("mechanics")
        .appendField("Mechanics:");
    this.setInputsInline(false);
    this.setColour(30);
    this.setTooltip("The system you are composing.");
    this.setHelpUrl("");
    this.setDeletable(false);
    this.setMovable(false);
  }
};

Blockly.Blocks['theme'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Theme:")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Description:")
        .appendField(new Blockly.FieldTextInput("<description>"), "desc");
    this.appendStatementInput("function")
        .setCheck("function")
        .appendField("Functions:");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "theme");
    this.setNextStatement(true, "theme");
    this.setColour(0);
    this.setTooltip("What is one idea that will drive the design of the system, and what functions do you intend it to serve?");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['function'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Function:")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Description:")
        .appendField(new Blockly.FieldTextInput("<description>"), "desc");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "function");
    this.setNextStatement(true, "function");
    this.setColour(345);
    this.setTooltip("A manifestation of a certain theme within a system's story, its mechanics, or both.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['mechanics'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Mechanics");
    this.appendStatementInput("factor")
        .setCheck("factor")
        .appendField("Move Factors: ");
    this.appendStatementInput("move")
        .setCheck("move")
        .appendField("Moves: ");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Special Parameters? ")
        .appendField(new Blockly.FieldCheckbox("FALSE", this.paramValidator), "hasParameters");
    this.appendStatementInput("player_rules")
        .setCheck("player_rules")
        .appendField("Player Rules: ");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "mechanics");
    this.setColour(210);
    this.setTooltip("Defines the rules of a given RPG system.");
    this.setHelpUrl("");
    this.setDeletable(false);
    this.setMovable(false);
    /* ""legacy"" handling code for factor updates in mechanics; now done in factors but keeping for posterity
    this.setOnChange(function(changeEvent){
      //if a block is moved into or out of the factor input of this block:
      //TODO: OR the name of a factor is changed
      if (changeEvent.type == Blockly.Events.BLOCK_MOVE
        && (this.workspace.getBlockById(changeEvent.blockId)
          && this.workspace.getBlockById(changeEvent.blockId).type == "factor")
        && (changeEvent.oldParentId == this.id || changeEvent.newParentId == this.id)) {
        this.updateFactors();
      }
    });
  },
  updateFactors: function() {
    //empty factorsList
    factorsList = [];
    //repopulate factorsList with the factors currently within this input
    var factorBlock = this.getInputTargetBlock("factor");
    console.log("factorBlock's parent id is " + factorBlock.parentBlock_.id);
    while (factorBlock) {
      if (factorBlock.getField("name").value_ != "<name>")
        factorsList.push(new Array(factorBlock.getField("name").value_, factorBlock.id));
      factorBlock = factorBlock.getNextBlock();
    }
    console.log("factorsList updated with content: " + factorsList.toString());
    fixAllFactors(this.workspace);
    */
  },
  paramValidator: function(newValue) {
    var sourceBlock = this.getSourceBlock();
    sourceBlock.showInput_ = newValue == 'TRUE';
    sourceBlock.updateInput();
    return newValue;
  },
  updateInput: function() {
    this.removeInput('parameter', true);
    if (this.showInput_) {
      this.appendStatementInput('parameter').setCheck('parameter');
      this.moveInputBefore('parameter', 'player_rules');
    }
  }
};

Blockly.Blocks['factor'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Factor:")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Type:")
        .appendField(new Blockly.FieldDropdown([["Scalar","Scalar"], ["Reroll","Reroll"], ["Revision","Revision"], ["Meta","Meta"]]), "type");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Effect:")
        .appendField(new Blockly.FieldTextInput("<description>"), "desc");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Additive?")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "isAdditive");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "factor");
    this.setNextStatement(true, "factor");
    this.setColour(315);
    this.setTooltip("A situational variable that factors into the outcome of a move. (Types: Scalar factors give a value that add or subtract to a move, Reroll factors involve a rolling or rerolling of dice, Revision factors involve an immediate or pre-decided outcome, and Meta factors describe non-numerical qualities of the move or situation.) (Additive factors are effects that can result from move outcomes.)");
    this.setHelpUrl("");
    this.setOnChange(function(changeEvent) {
      //if a factor block
      if (this.workspace.getBlockById(changeEvent.blockId)
        && this.workspace.getBlockById(changeEvent.blockId).type == "factor") {
      //moves
        if (changeEvent.type == Blockly.Events.BLOCK_MOVE && changeEvent.oldParentId != changeEvent.newParentId) {
      //below this block
          if (changeEvent.newParentId == this.id) {
            console.log("updateFactors() called because of block becoming parent")
            this.updateFactors();
      //or this block moves below a mechanics block,
          } else if (this.workspace.getBlockById(changeEvent.blockId) == this
            && this.workspace.getBlockById(changeEvent.newParentId)
            && this.workspace.getBlockById(changeEvent.newParentId).type == "mechanics") {
      //then update around this block
            console.log("updateFactors() called because of block being moved below mechanics");
            this.updateFactors();
      //of if this block has moved but does not have a parent,
          } else if (this.workspace.getBlockById(changeEvent.blockId) == this && !this.previousConnection.isConnected()) {
            console.log("updateFactors() called because of moved block becoming disconnected");
            this.updateFactors(this);
          }
      //of if a block's name field is changed      
        } else if (changeEvent.type == Blockly.Events.BLOCK_CHANGE && changeEvent.name == "name") {
          console.log("updateFactors() called because of name change");
          this.updateFactors();
        }
      }
    });
  },
  updateFactors: function(frustratingBug) {
    //empty factorsList since we're updating it
    factorsList = [];
    //find the first block in the factors input of mechanics
    var factorBlock;
    var mechanicsSet = this.workspace.getBlocksByType("mechanics");
    for (var i = 0; i < mechanicsSet.length; i++) {
      if (mechanicsSet[i].getInput("factor").connection.isConnected()) {
        factorBlock = mechanicsSet[i].getInput("factor").connection.targetConnection.sourceBlock_;
      }
    }
    while (factorBlock) {
      if (factorBlock.getField("name").value_ != "<name>"){
        factorsList.push(new Array(factorBlock.getField("name").value_, factorBlock.id));
      }
      factorBlock = factorBlock.getNextBlock();
    }
    //if this function has an argument, then there will be one or some deleted blocks that must be removed from factorsList first
    if (frustratingBug) factorsList.pop();
    //then reset factors in workspace blocks
    console.log("factorsList updated with content: " + factorsList.toString());
    fixAllFactors(this.workspace);
  }
};

//factor dropdown used here
//TODO: adds_factor checkbox validator
Blockly.Blocks['move'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Move:")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Factors:");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown(generateFactors), "factors");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Description:")
        .appendField(new Blockly.FieldTextInput("<description>"), "desc");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Adds Factor?")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "adds_factor");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "move");
    this.setNextStatement(true, "move");
    this.setColour(315);
    this.setTooltip("An action available to a player character.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['parameter'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Parameter: ")
        .appendField(new Blockly.FieldTextInput("<outcome>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Range: ")
        .appendField(new Blockly.FieldNumber(0), "lrange")
        .appendField(" to ")
        .appendField(new Blockly.FieldNumber(1), "rrange");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "parameter");
    this.setNextStatement(true, "parameter");
    this.setColour(315);
    this.setTooltip("An outcome defined by a range of possible valid rolls.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['era'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Era: ")
        .appendField(new Blockly.FieldTextInput("<era name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Current Era? ")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "isCurrent");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "era");
    this.setNextStatement(true, "era");
    this.setColour(90);
    this.setTooltip("What historical period are you describing?");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['player_rules'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Player Rules");
    this.appendStatementInput("character_creation")
        .setCheck("character_creation")
        .appendField("Character Creation: ");
    this.appendStatementInput("playbook")
        .setCheck("playbook")
        .appendField("Playbooks: ");
    this.appendStatementInput("resource")
        .setCheck("resource")
        .appendField("Resources: ");
    this.appendStatementInput("equipment")
        .setCheck("equipment")
        .appendField("Equipment: ");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Extra Mechanics? ")
        .appendField(new Blockly.FieldCheckbox("FALSE", this.extraValidator), "hasExtras");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "player_rules");
    this.setColour(225);
    this.setTooltip("How player decision-making is defined and bounded by the system.");
    this.setHelpUrl("");
  },
  extraValidator: function(newValue){
    var sourceBlock = this.getSourceBlock();
    sourceBlock.showInput_ = newValue == 'TRUE';
    sourceBlock.updateInput();
    return newValue;
  },
  updateInput: function(){
    this.removeInput('extra_mechanic', true);
    if (this.showInput_) this.appendStatementInput('extra_mechanic').setCheck('extra_mechanic');
  }
};

Blockly.Blocks['character_creation'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Character Creation");
    this.appendStatementInput("creation_step")
        .setCheck("creation_step")
        .appendField("Creation Process:");
    this.appendStatementInput("playbook_creation")
        .setCheck("playbook_creation")
        .appendField("Playbook Creation Rules:");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "character_creation");
    this.setColour(240);
    this.setTooltip("The step-by-step process by which players define their own characters.  The common \"creation process\" applies to all by default; special rules apply to certain playbooks.");
    this.setHelpUrl("");
  }
};

//TODO: connection with playbooks
Blockly.Blocks['playbook_creation'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Steps for Playbook: ")
        .appendField(new Blockly.FieldDropdown([["option","nofactor"]]), "name");
    this.appendStatementInput("creation_step")
        .setCheck("creation_step");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "playbook_creation");
    this.setNextStatement(true, "playbook_creation");
    this.setColour(225);
    this.setTooltip("A set of additional steps or revisions that must be made when creating a character of the specified playbook.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['creation_step'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Step: ")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Description:")
        .appendField(new Blockly.FieldTextInput("<description>"), "desc");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Factors: ");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown(generateFactors), "factors");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "creation_step");
    this.setNextStatement(true, "creation_step");
    this.setColour(270);
    this.setTooltip("One step of the creation process.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['playbook'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Playbook: ")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendStatementInput("playbook_introduction")
        .setCheck("playbook_introduction")
        .appendField("Introduction: ");
    this.appendStatementInput("feature")
        .setCheck(["playbook_move", "feature"])
        .appendField("Playbook Moves and Features:");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Starting Equipment:");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["option","nofactor"]]), "equipment");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "playbook");
    this.setNextStatement(true, "playbook");
    this.setColour(240);
    this.setTooltip("Defines a character playbook or class in the system.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['playbook_introduction'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Introduction");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Flavor Pitch:")
        .appendField(new Blockly.FieldTextInput("<description for players>"), "pitch");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Social Role:")
        .appendField(new Blockly.FieldTextInput("<personality/social interactions>"), "soc_role");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Mechanical Role: ")
        .appendField(new Blockly.FieldTextInput("<system/mechanical interactions>"), "mech_role");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "playbook_introduction");
    this.setColour(270);
    this.setTooltip("A description of the playbook's role(s) in the system.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['resource'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Resource: ")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Description: ")
        .appendField(new Blockly.FieldTextInput("<description>"), "desc");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Factors: ");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown(generateFactors), "factors");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Range: ")
        .appendField(new Blockly.FieldNumber(0), "lrange")
        .appendField(" to ")
        .appendField(new Blockly.FieldNumber(1), "rrange");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Initial Value: ")
        .appendField(new Blockly.FieldNumber(0), "init");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "resource");
    this.setNextStatement(true, "resource");
    this.setColour(240);
    this.setTooltip("A statistic that a player tracks which can factor into certain moves.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['feature'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Feature: ")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Description:")
        .appendField(new Blockly.FieldTextInput("<description>"), "desc");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Factors:");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown(generateFactors), "factors");
    this.setInputsInline(false);
    this.setPreviousStatement(true, ["feature", "playbook_move"]);
    this.setNextStatement(true, ["feature", "playbook_move"]);
    this.setColour(270);
    this.setTooltip("An ability or effect unique to a certain playbook.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['equipment_type'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Equipment Type: ")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Description:")
        .appendField(new Blockly.FieldTextInput("<description>"), "desc");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Factors: ");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown(generateFactors), "factors");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Subtypes? ")
        .appendField(new Blockly.FieldCheckbox("FALSE", this.subtypeValidator), "hasSubtypes");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "equipment_type");
    this.setNextStatement(true, "equipment_type");
    this.setColour(270);
    this.setTooltip("A category of certain equipment items, as well as that category's pertinent factors for its items to be used, and what subtypes it may be divided into.");
    this.setHelpUrl("");
  },
  subtypeValidator: function(newValue){
    var sourceBlock = this.getSourceBlock();
    sourceBlock.showInput_ = newValue == 'TRUE';
    sourceBlock.updateInput();
    return newValue;
  },
  updateInput: function(){
    this.removeInput('subtype', true);
    if (this.showInput_) this.appendStatementInput('subtype').setCheck('subtype');
  }
};

Blockly.Blocks['subtype'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Subtype: ")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Description:")
        .appendField(new Blockly.FieldTextInput("<description>"), "desc");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Factors: ");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown(generateFactors), "factors");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Required by Parent Type? ")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "isRequired");
    this.appendDummyInput()
        .appendField("Subtypes? ")
        .appendField(new Blockly.FieldCheckbox("FALSE", this.subtypeValidator), "hasSubtypes");
    this.setPreviousStatement(true, "subtype");
    this.setNextStatement(true, "subtype");
    this.setColour(315);
    this.setTooltip("A category of certain equipment items, as well as that category's pertinent factors for its items to be used, and what subtypes it may be divided into.");
    this.setHelpUrl("");
  },
  subtypeValidator: function(newValue){
    var sourceBlock = this.getSourceBlock();
    sourceBlock.showInput_ = newValue == 'TRUE';
    sourceBlock.updateInput();
    return newValue;
  },
  updateInput: function(){
    this.removeInput('subtype', true);
    if (this.showInput_) this.appendStatementInput('subtype').setCheck('subtype');
  }
};

Blockly.Blocks['extra_mechanic'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Extra Mechanic:")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Description: ")
        .appendField(new Blockly.FieldTextInput("<description>"), "desc");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Factors:");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown(generateFactors), "factors");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Special Resources?")
        .appendField(new Blockly.FieldCheckbox("FALSE", this.resourceValidator), "hasResources");
    this.appendDummyInput('checkMoves') //named for use by updateResourceInput
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Special Moves?")
        .appendField(new Blockly.FieldCheckbox("FALSE", this.moveValidator), "hasMoves");
    this.setPreviousStatement(true, "extra_mechanic");
    this.setNextStatement(true, "extra_mechanic");
    this.setColour(240);
    this.setTooltip("An additional mechanic relevant to player action.");
    this.setHelpUrl("");
  },
  resourceValidator: function(newValue){
    var sourceBlock = this.getSourceBlock();
    sourceBlock.showResourceInput_ = newValue == 'TRUE';
    sourceBlock.updateResourceInput();
    return newValue;
  },
  moveValidator: function(newValue){
    var sourceBlock = this.getSourceBlock();
    sourceBlock.showMoveInput_ = newValue == 'TRUE';
    sourceBlock.updateMoveInput();
    return newValue;
  },
  updateResourceInput: function(){
    this.removeInput('resource', true);
    if (this.showResourceInput_) {
      this.appendStatementInput('resource').setCheck('resource');
      this.moveInputBefore('resource', 'checkMoves');
    }
  },
  updateMoveInput: function(){
    this.removeInput('move', true);
    if (this.showMoveInput_) this.appendStatementInput('move').setCheck('move');
  }
};

Blockly.Blocks['playbook_move'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Playbook Move:")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Description:")
        .appendField(new Blockly.FieldTextInput("<description>"), "desc");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Factors:");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown(generateFactors), "factors");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Adds Factor?")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "addsFactor");
    this.setInputsInline(false);
    this.setPreviousStatement(true, ["playbook_move", "feature"]);
    this.setNextStatement(true, ["playbook_move", "feature"]);
    this.setColour(315);
    this.setTooltip("An action only available to a certain playbook.");
    this.setHelpUrl("todo: communication with factors");
  }
};

Blockly.Blocks['equipment'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Equipment");
    this.appendStatementInput("equipment_type")
        .setCheck("equipment_type")
        .appendField("Equipment Types:");
    this.appendStatementInput("item")
        .setCheck("item")
        .appendField("Item List:");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "equipment");
    this.setColour(240);
    this.setTooltip("Items usable by the players.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['item'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Item: ")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Description:")
        .appendField(new Blockly.FieldTextInput("<description>"), "desc");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Types: ");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["option","type1"]]), "types");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Subtypes:");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["option","subtype1"]]), "subtypes");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "item");
    this.setNextStatement(true, "item");
    this.setColour(270);
    this.setTooltip("A category of certain equipment items, as well as that category's pertinent factors for its items to be used, and what subtypes it may be divided into.");
    this.setHelpUrl("");
  }
};
