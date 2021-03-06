/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview PL blocks for PbtA pattern language.
 * @author maybenalex@gmail.com (Alexander Mayben)
 */
'use strict';
Blockly.FieldCheckbox.CHECK_CHAR = "X";

//sets contents of dropdown fields for factors
var generateFactors = function() {
  var options = [["<select>","no_value"]];
  var sourceBlock = this.getSourceBlock();
  if (sourceBlock && sourceBlock.workspace) {
    console.log("gf: parent block/workspace acquired");
    var currBlock;
    var name;
    var parentSet = sourceBlock.workspace.getBlocksByType("mechanics");
    for (var i = 0; i < parentSet.length; i++) {
      if (parentSet[i].previousConnection.isConnected()
        && parentSet[i].getInput("factor").connection.isConnected()) {
        currBlock = parentSet[i].getInput("factor")
          .connection.targetConnection.getSourceBlock();
        break;
      }
    }
    while (currBlock) {
      name = currBlock.getField("name").getValue();
      if (name != ""
        && name != "<name>"
        && !name.includes("-0-")){
        options.push(new Array(name, currBlock.id));
      }
      currBlock = currBlock.getNextBlock();
    }
  } else {
    console.log("gf: parent block/workspace not acquired");
  }
  return options;
};

//does the same for factors marked as additive
var generateAddFactors = function() {
  var options = [["<select>","no_value"]];
  var sourceBlock = this.getSourceBlock();
  if (sourceBlock && sourceBlock.workspace) {
    console.log("gaf: parent block/workspace acquired");
    var currBlock;
    var name;
    var parentSet = sourceBlock.workspace.getBlocksByType("mechanics");
    for (var i = 0; i < parentSet.length; i++) {
      if (parentSet[i].previousConnection.isConnected()
        && parentSet[i].getInput("factor").connection.isConnected()) {
        currBlock = parentSet[i].getInput("factor")
          .connection.targetConnection.getSourceBlock();
        break;
      }
    }
    while (currBlock) {
      name = currBlock.getField("name").getValue();
      if (name != ""
        && name != "<name>"
        && !name.includes("-0-")
        && currBlock.getField("isAdditive").getValue() == "TRUE"){
        options.push(new Array(name, currBlock.id));
      }
      currBlock = currBlock.getNextBlock();
    }
  } else {
    console.log("gaf: parent block/workspace not acquired");
  }
  return options;
};

//catch-all validator for dynamic dropdown fields involving factor blocks
var dropdownValidator = function(newValue) {  
  var sourceBlock = this.getSourceBlock();
  if (newValue != "no_value") {
    var options = this.getOptions();
    var displayText = "";
    for (var i = 0; i < options.length; i++) {
      if (options[i][1] == newValue) {
        displayText = options[i][0];
        break;
      }
    }
    if (displayText == "") {
      console.log("dropdownValidator called on empty displayText");
    } else {
      sourceBlock.factors.push(displayText);
      console.log(sourceBlock.type + " dropdown updated with " + sourceBlock.factors.toString());
      sourceBlock.updateFactors();
    }
  }
  return "no_value";
};

//catch-all validator for delete operations involving factor blocks
var deleteButtonValidator = function(newValue) {
  var sourceBlock = this.getSourceBlock();
  var arr = sourceBlock.factors;
  var input = this.getParentInput();
  if (newValue == "FALSE") {
    //replace element in array with a dummy statement
    //tells updateFactors which inputs to remove before running mutator code
    //will be removed from array by updateFactors
    arr[input.index] = "-0-";
    console.log("dbv: Removing input " + input.name);
    sourceBlock.removeInput(input.name);
    this.dispose();
  }
  return newValue;
}

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
        .appendField(new Blockly.FieldTextInput("<region, social group, etc.>"), "name");
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

Blockly.Blocks['era'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Era: ")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Description:")
        .appendField(new Blockly.FieldTextInput("<description>"), "desc");
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
        .appendField("Questions:")
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
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Landmarks? ")
        .appendField(new Blockly.FieldCheckbox("FALSE", this.landmarkValidator), "hasLandmarks");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "region");
    this.setNextStatement(true, "region");
    this.setColour(75);
    this.setTooltip("A notable region in which action of the game is set, or can be set.");
    this.setHelpUrl("");
  },
  landmarkValidator: function(newValue) {
    var sourceBlock = this.getSourceBlock();
    sourceBlock.showInput_ = newValue == 'TRUE';
    sourceBlock.updateInput();
    return newValue;
  },
  updateInput: function() {
    this.removeInput('landmark', true);
    if (this.showInput_) this.appendStatementInput('landmark').setCheck('landmark');
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
        .appendField(new Blockly.FieldDropdown(
          [["Scalar","Scalar"],
          ["Reroll","Reroll"],
          ["Revision","Revision"],
          ["Meta","Meta"]]
          ), "type");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Description:")
        .appendField(new Blockly.FieldTextInput("<description>"), "desc");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Result? ")
        .appendField(new Blockly.FieldCheckbox("FALSE", this.addsListValidator), "isAdditive");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "factor");
    this.setNextStatement(true, "factor");
    this.setColour(315);
    this.setTooltip("A situational variable that factors into the outcome of a move.");
    this.setHelpUrl("");
  }
};

//factor dropdown used here
Blockly.Blocks['move'] = {
  init: function() {
    this.factors = [];
    this.addFactors = [];
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Move:")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Effect:")
        .appendField(new Blockly.FieldTextInput("<effect>"), "effect");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Factors:");
    this.appendDummyInput("dropdown1")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown(generateFactors, dropdownValidator), "factors");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Description:")
        .appendField(new Blockly.FieldTextInput("<description>"), "desc");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Result Factor(s)? ")
        .appendField(new Blockly.FieldCheckbox("FALSE", this.additiveValidator), "adds_factor");
    this.appendDummyInput("dropdown2")
        .setVisible(false);
    this.setInputsInline(false);
    this.setPreviousStatement(true, "move");
    this.setNextStatement(true, "move");
    this.setColour(315);
    this.setTooltip("An action available to a player character.");
    this.setHelpUrl("");
  },
  additiveValidator: function(newValue) {
    var sourceBlock = this.getSourceBlock();
    sourceBlock.showInput_ = newValue == 'TRUE';
    sourceBlock.updateInput();
    return newValue;
  },
  updateInput: function() {
    if (this.showInput_) {
      this.appendDummyInput("addFactorDropdown")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown(generateAddFactors, this.addDropdownValidator), "addFactors");
    } else {
      this.removeInput("addFactorDropdown", true);
      if (this.addFactors.length > 1
        || (this.addFactors.length == 1 && this.addFactors[0] != "")) {
        for (var i = 0; i < this.addFactors.length; i++) {
          console.log("ui: adding -0-!");
          this.addFactors[i] = "-0-";
          console.log(this.addFactors.toString());
        }
        this.updateFactors();
      }
    }
  },
  addDropdownValidator: function(newValue) {
    var sourceBlock = this.getSourceBlock();
    if (newValue != "no_value") {
      var options = this.getOptions();
      var displayText = "";
      for (var i = 0; i < options.length; i++) {
        if (options[i][1] == newValue) {
          displayText = options[i][0];
          break;
        }
      }
      if (displayText == "") {
        console.log("dropdownValidator called on empty displayText");
      } else {
        sourceBlock.addFactors.push(displayText);
        console.log(sourceBlock.type + " dropdown updated with " + sourceBlock.addFactors.toString());
        sourceBlock.updateFactors();
      }
    }
    return "no_value";
  },
  addDBV: function (newValue) {
    var sourceBlock = this.getSourceBlock();
    var input = this.getParentInput();
    if (newValue == "FALSE") {
      //replace element in array with a dummy statement
      //tells updateFactors which inputs to remove before running mutator code
      //will be removed from array by updateFactors
      sourceBlock.addFactors[input.index] = "-0-";
      console.log("dbv: Removing input " + input.name);
      sourceBlock.removeInput(input.name);
      this.dispose();
    }
    return newValue;
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var mutObj = {factors: this.factors, addFactors: this.addFactors};
    var mutJSON = JSON.stringify(mutObj);
    container.setAttribute('factors', mutJSON);
    console.log("factors field set to " + mutJSON);
    return container;
  },
  domToMutation: function(xmlElement) {
    var mutJSON = xmlElement.getAttribute('factors');
    if (mutJSON) {
      var mutObj = JSON.parse(mutJSON);
      this.factors = mutObj.factors;
      this.addFactors = mutObj.addFactors;
    }
    this.updateFactors();
  },
  updateFactors: function() {
    //update regular factors
    console.log("factors field read with content: " + this.factors.toString());
    //first scrub out all inputs
    for (var i = 0; i < this.factors.length; i++) {
      this.removeInput("a" + i, true);
      console.log("cleanup: removed input a" + i);
    }
    //filter "-0-" from factors
    this.factors = this.factors.filter(
      function (e) {
        return e != "-0-";
      }
    );
    console.log("factors filtered, new content: " + this.factors.toString());
    //now populate block with only current inputs
    for (var i = 0; i < this.factors.length; i++) {
      //remove existing factor from block first
      if (this.getInput("a" + i) != null) {
        this.removeInput("a" + i, true);
        console.log("input a" + i + " removed.");
      }
      if (this.factors[i] && this.factors[i] != "") {
        console.log("Appending new input a" + i);
        this.appendDummyInput("a" + i)
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField(this.factors[i] + " ")
          .appendField(new Blockly.FieldCheckbox(true, deleteButtonValidator), "a" + i);
        this.getInput("a" + i).index = i;
        this.moveInputBefore("a" + i, "dropdown1");
      }
    }

    //update additive factors
    console.log("addFactors field read with content: " + this.addFactors.toString());
    //first scrub out all inputs
    for (var i = 0; i < this.addFactors.length; i++) {
      this.removeInput("b" + i, true);
      console.log("cleanup: removed input b" + i);
    }
    //filter "-0-" from addFactors
    this.addFactors = this.addFactors.filter(
      function (e) {
        return e != "-0-";
      }
    );
    console.log("addFactors filtered, new content: " + this.addFactors.toString());
    //now populate block with only current inputs
    if (!(this.addFactors.length == 1 && this.addFactors[0]=="")) {
      for (var i = 0; i < this.addFactors.length; i++) {
        //remove existing factor from block first
        if (this.getInput("b" + i) != null) {
          this.removeInput("b" + i, true);
          console.log("input b" + i + " removed.");
        }
        if (this.addFactors[i] && this.addFactors[i] != "") {
          console.log("Appending new input b" + i);
          this.appendDummyInput("b" + i)
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(this.addFactors[i] + " ")
            .appendField(new Blockly.FieldCheckbox(true, this.addDBV), "b" + i);
          this.getInput("b" + i).index = i;
          this.moveInputBefore("b" + i, "dropdown2");
        }
      }
    }
  }
};

Blockly.Blocks['playbook_move'] = {
  init: function() {
    this.factors = [];
    this.addFactors = [];
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Playbook Move:")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Effect:")
        .appendField(new Blockly.FieldTextInput("<effect>"), "effect");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Factors:");
    this.appendDummyInput("dropdown1")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown(generateFactors, dropdownValidator), "factors");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Description:")
        .appendField(new Blockly.FieldTextInput("<description>"), "desc");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Result Factor(s)?")
        .appendField(new Blockly.FieldCheckbox("FALSE", this.additiveValidator), "adds_factor");
    this.appendDummyInput("dropdown2")
        .setVisible(false);
    this.setInputsInline(false);
    this.setPreviousStatement(true, ["playbook_move", "feature"]);
    this.setNextStatement(true, ["playbook_move", "feature"]);
    this.setColour(315);
    this.setTooltip("An action only available to a certain playbook.");
    this.setHelpUrl("");
  },
  additiveValidator: function(newValue) {
    var sourceBlock = this.getSourceBlock();
    sourceBlock.showInput_ = newValue == 'TRUE';
    sourceBlock.updateInput();
    return newValue;
  },
  updateInput: function() {
    if (this.showInput_) {
      this.appendDummyInput("addFactorDropdown")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown(generateAddFactors, this.addDropdownValidator), "addFactors");
    } else {
      this.removeInput("addFactorDropdown", true);
      if (this.addFactors.length > 1
        || (this.addFactors.length = 1 && this.addFactors[0] != "")) {
        for (var i = 0; i < this.addFactors.length; i++) {
          console.log("ui: adding -0-!");
          this.addFactors[i] = "-0-";
          console.log(this.addFactors.toString());
        }
        this.updateFactors();
      }
    }
  },
  addDropdownValidator: function(newValue) {
    var sourceBlock = this.getSourceBlock();
    if (newValue != "no_value") {
      var options = this.getOptions();
      var displayText = "";
      for (var i = 0; i < options.length; i++) {
        if (options[i][1] == newValue) {
          displayText = options[i][0];
          break;
        }
      }
      if (displayText == "") {
        console.log("dropdownValidator called on empty displayText");
      } else {
        sourceBlock.addFactors.push(displayText);
        console.log(sourceBlock.type + " dropdown updated with " + sourceBlock.addFactors.toString());
        sourceBlock.updateFactors();
      }
    }
    return "no_value";
  },
  addDBV: function (newValue) {
    var sourceBlock = this.getSourceBlock();
    var arr = sourceBlock.addFactors;
    var input = this.getParentInput();
    if (newValue == "FALSE") {
      //replace element in array with a dummy statement
      //tells updateFactors which inputs to remove before running mutator code
      //will be removed from array by updateFactors
      arr[input.index] = "-0-";
      console.log("dbv: Removing input " + input.name);
      sourceBlock.removeInput(input.name);
      this.dispose();
    }
    return newValue;
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var mutObj = {factors: this.factors, addFactors: this.addFactors};
    var mutJSON = JSON.stringify(mutObj);
    container.setAttribute('factors', mutJSON);
    console.log("factors field set to " + mutJSON);
    return container;
  },
  domToMutation: function(xmlElement) {
    var mutJSON = xmlElement.getAttribute('factors');
    if (mutJSON) {
      var mutObj = JSON.parse(mutJSON);
      this.factors = mutObj.factors;
      this.addFactors = mutObj.addFactors;
    }
    this.updateFactors();
  },
  updateFactors: function() {
    //update regular factors
    console.log("factors field read with content: " + this.factors.toString());
    //first scrub out all inputs
    for (var i = 0; i < this.factors.length; i++) {
      this.removeInput("a" + i, true);
      console.log("cleanup: removed input a" + i);
    }
    //filter "-0-" from factors
    this.factors = this.factors.filter(
      function (e) {
        return e != "-0-";
      }
    );
    console.log("factors filtered, new content: " + this.factors.toString());
    //now populate block with only current inputs
    for (var i = 0; i < this.factors.length; i++) {
      //remove existing factor from block first
      if (this.getInput("a" + i) != null) {
        this.removeInput("a" + i, true);
        console.log("input a" + i + " removed.");
      }
      if (this.factors[i] && this.factors[i] != "") {
        console.log("Appending new input a" + i);
        this.appendDummyInput("a" + i)
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField(this.factors[i] + " ")
          .appendField(new Blockly.FieldCheckbox(true, deleteButtonValidator), "a" + i);
        this.getInput("a" + i).index = i;
        this.moveInputBefore("a" + i, "dropdown1");
      }
    }

    //update additive factors
    console.log("addFactors field read with content: " + this.addFactors.toString());
    //first scrub out all inputs
    for (var i = 0; i < this.addFactors.length; i++) {
      this.removeInput("b" + i, true);
      console.log("cleanup: removed input b" + i);
    }
    //filter "-0-" from factors
    this.addFactors = this.addFactors.filter(
      function (e) {
        return e != "-0-";
      }
    );
    console.log("addFactors filtered, new content: " + this.addFactors.toString());
    //now populate block with only current inputs
    if (!(this.addFactors.length == 1 && this.addFactors[0]=="")) {
      for (var i = 0; i < this.addFactors.length; i++) {
        //remove existing factor from block first
        if (this.getInput("b" + i) != null) {
          this.removeInput("b" + i, true);
          console.log("input b" + i + " removed.");
        }
        if (this.addFactors[i] && this.addFactors[i] != "") {
          console.log("Appending new input b" + i);
          this.appendDummyInput("b" + i)
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(this.addFactors[i] + " ")
            .appendField(new Blockly.FieldCheckbox(true, this.addDBV), "b" + i);
          this.getInput("b" + i).index = i;
          this.moveInputBefore("b" + i, "dropdown2");
        }
      }
    }
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

Blockly.Blocks['player_rules'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Player Rules");
    this.appendStatementInput("playbook")
        .setCheck("playbook")
        .appendField("Playbooks: ");
    this.appendStatementInput("character_creation")
        .setCheck("character_creation")
        .appendField("Creation: ");
    this.appendStatementInput("character_improvement")
        .setCheck("character_improvement")
        .appendField("Improvement: ");
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

Blockly.Blocks['playbook'] = {
  init: function() {
    this.items = [];
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Playbook: ")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendStatementInput("playbook_introduction")
        .setCheck("playbook_introduction")
        .appendField("Introduction: ");
    this.appendStatementInput("feature")
        .setCheck(["playbook_move", "feature"])
        .appendField("Moves/Features:");
    this.appendDummyInput()
        .appendField("Resources? ")
        .appendField(new Blockly.FieldCheckbox("FALSE", this.resourceValidator), "hasResources");
    this.appendDummyInput("options")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Starting Item Options:");
    this.appendDummyInput("dropdown")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown(this.generateItems, this.dropdownValidator), "equipment");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "playbook");
    this.setNextStatement(true, "playbook");
    this.setColour(240);
    this.setTooltip("Defines a character playbook or class in the system.");
    this.setHelpUrl("");
  },
  resourceValidator: function(newValue) {
    var sourceBlock = this.getSourceBlock();
    sourceBlock.showInput_ = newValue == 'TRUE';
    sourceBlock.updateInput();
    return newValue;
  },
  updateInput: function() {
    this.removeInput('resource', true);
    if (this.showInput_) {
      this.appendStatementInput('resource').setCheck('resource');
      this.moveInputBefore('resource', 'options');
    }
  },
  generateItems: function() {
    var options = [["<select>","no_value"]];
    var sourceBlock = this.getSourceBlock();
    if (sourceBlock && sourceBlock.workspace) {
      console.log("gi: parent block/workspace acquired");
      var currBlock;
      var name;
      //var inItems; //TODO?: implement with item count feature
      var parentSet = sourceBlock.workspace.getBlocksByType("equipment");
      for (var i = 0; i < parentSet.length; i++) {
        if (parentSet[i].previousConnection.isConnected()
          && parentSet[i].getInput("item").connection.isConnected()) {
          currBlock = parentSet[i].getInput("item")
            .connection.targetConnection.getSourceBlock();
          break;
        }
      }
      while (currBlock) {
        name = currBlock.getField("name").getValue();
        if (name != ""
          && name != "<name>"
          && !name.includes("-0-")){
          options.push(new Array(name, currBlock.id));
        }
        currBlock = currBlock.getNextBlock();
      }
    } else {
      console.log("gi: parent block/workspace not acquired");
    }
    return options;
  },
  dropdownValidator: function(newValue) {  
    var sourceBlock = this.getSourceBlock();
    if (newValue != "no_value") {
      var options = this.getOptions();
      var displayText = "";
      for (var i = 0; i < options.length; i++) {
        if (options[i][1] == newValue) {
          displayText = options[i][0];
          break;
        }
      }
      if (displayText == "") {
        console.log("dropdownValidator called on empty displayText");
      } else {
        var index = -1;
        //if selection is already part of playbook, increment count of that item
        for (var i = 0; i < sourceBlock.items.length; i++) {
          if (sourceBlock.items[i][0] == displayText) {
            sourceBlock.items[i][1]++;
            index = i;
            break;
          }
        }
        //else it's a new item, so push it
        if (index == -1) {
          sourceBlock.items.push(new Array(displayText, 1));
        }
        console.log(sourceBlock.type + " dropdown updated with " + sourceBlock.items.toString());
        sourceBlock.updateItems();
      }
    }
    return "no_value";
  },
  deleteButtonValidator: function(newValue) {
    var sourceBlock = this.getSourceBlock();
    var arr = sourceBlock.items;
    var input = this.getParentInput();
    if (newValue == "FALSE") {
      //replace element in array with a dummy statement
      //tells updateFactors which inputs to remove before running mutator code
      //will be removed from array by updateFactors
      arr[input.index][0] = "-0-";
      arr[input.index][1] = 0;
      console.log("dbv: Removing input " + input.name);
      sourceBlock.removeInput(input.name);
      this.dispose();
    }
    return newValue;
  },
  countValidator: function(newValue) {
    var sourceBlock = this.getSourceBlock();
    if (sourceBlock) {
      var input = this.getParentInput();
      if (newValue > 0) {
        sourceBlock.items[input.index][1] = newValue;
        return newValue;
      } else {
        sourceBlock.items[input.index][1] = 1;
        return 1;
      }
    } else {
      return newValue;
    }
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var mutObj = {items: this.items};
    var mutJSON = JSON.stringify(mutObj);
    container.setAttribute('items', mutJSON);
    return container;
  },
  domToMutation: function(xmlElement) {
    var mutJSON = xmlElement.getAttribute('items');
    if (mutJSON) {
      var mutObj = JSON.parse(mutJSON);
      this.items = mutObj.items;
    }
    this.updateItems();
  },
  updateItems: function() {
    console.log("items field read with content: " + this.items.toString());
    //first scrub out all inputs
    for (var i = 0; i < this.items.length; i++) {
      this.removeInput("a" + i, true);
      console.log("cleanup: removed input a" + i);
    }
    //filter "-0-" from items
    this.items = this.items.filter(
      function (e) {
        return e[0] != "-0-";
      }
    );
    console.log("items filtered, new content: " + this.items.toString());
    //now populate block with only current inputs
    for (var i = 0; i < this.items.length; i++) {
      //remove existing factor from block first
      if (this.getInput("a" + i) != null) {
        this.removeInput("a" + i, true);
        console.log("input a" + i + " removed.");
      }
      if (this.items[i][0] && this.items[i][0] != "") {
        console.log("Appending new input a" + i);
        this.appendDummyInput("a" + i)
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField(new Blockly.FieldNumber(this.items[i][1], 1, Infinity, 1, this.countValidator))
          .appendField("× " + this.items[i][0] + "   ")
          .appendField(new Blockly.FieldCheckbox(true, this.deleteButtonValidator));
        this.getInput("a" + i).index = i;
        this.moveInputBefore("a" + i, "dropdown");
      }
    }
  }
};

Blockly.Blocks['character_creation'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Character Creation");
    this.appendStatementInput("step")
        .setCheck("step")
        .appendField("Creation Rules:");
    this.appendStatementInput("playbook_steps")
        .setCheck("playbook_steps")
        .appendField("Playbook Creation Rules:");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "character_creation");
    this.setColour(240);
    this.setTooltip("The step-by-step process by which players define their own characters. The common \"creation process\" applies to all by default; special rules apply to certain playbooks.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['character_improvement'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Character Improvement");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Main Conditions:")
        .appendField(new Blockly.FieldTextInput("none"), "main_conditions");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Playbook Conditions? ")
        .appendField(new Blockly.FieldCheckbox("FALSE", this.conditionValidator), "hasConditions");
    this.appendStatementInput("step")
        .setCheck("step")
        .appendField("Improvement Rules:");
    this.appendStatementInput("playbook_steps")
        .setCheck("playbook_steps")
        .appendField("Playbook Improvement Rules:");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "character_improvement");
    this.setColour(240);
    this.setTooltip("The step-by-step process by which players advance their own characters' abilities. The common \"improvement process\" applies to all by default; special rules apply to certain playbooks.");
    this.setHelpUrl("");
  },
  conditionValidator: function(newValue) {
    var sourceBlock = this.getSourceBlock();
    sourceBlock.showInput_ = newValue == 'TRUE';
    sourceBlock.updateInput();
    return newValue;
  },
  updateInput: function() {
    this.removeInput('playbook_condition', true);
    if (this.showInput_) {
      this.appendStatementInput('playbook_condition').setCheck('playbook_condition');
      this.moveInputBefore('playbook_condition', 'step');
    }
  }
};

Blockly.Blocks['playbook_condition'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Conditions for ")
        .appendField(new Blockly.FieldTextInput("<playbook>"/*, this.playbookValidator*/), "playbook");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldTextInput("none"), "main_conditions");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "playbook_condition");
    this.setNextStatement(true, "playbook_condition");
    this.setColour(225);
    this.setTooltip("A set of additional steps or revisions that must be made when creating or improving a character of the specified playbook.");
    this.setHelpUrl("");
  },
  playbookValidator: function(newValue) {
    var options = ["<playbook>"];
    var sourceBlock = this.getSourceBlock();
    if (sourceBlock && sourceBlock.workspace) {
      var currBlock;
      var name;
      var parentSet = sourceBlock.workspace.getBlocksByType("player_rules");
      //just handwave it if multiple/no player_rules
      if (!parentSet || parentSet.length != 1) return newValue;
      if (parentSet[0].previousConnection.isConnected()
        && parentSet[0].getInput("playbook").connection.isConnected()) {
        currBlock = parentSet[0].getInput("playbook")
          .connection.targetConnection.getSourceBlock();
      } else return newValue; //error catch on load
      while (currBlock) {
        name = currBlock.getField("name").getValue();
        if (name != ""
          && name != "<name>"){
          options.push(name);
        } currBlock = currBlock.getNextBlock();
      }
      for (var i = 0; i < options.length; i++) {
        //case insensitive comparison
        if (options[i].toLowerCase() === newValue.toLowerCase()) return options[i];
      } return "<playbook>";
    } else return newValue;
  }
};

Blockly.Blocks['playbook_steps'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Steps for ")
        .appendField(new Blockly.FieldTextInput("<playbook>"/*, this.playbookValidator*/), "playbook");
    this.appendStatementInput("step")
        .setCheck("step");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "playbook_steps");
    this.setNextStatement(true, "playbook_steps");
    this.setColour(225);
    this.setTooltip("A set of additional steps or revisions that must be made when creating or improving a character of the specified playbook.");
    this.setHelpUrl("");
  },
  playbookValidator: function(newValue) {
    var options = ["<playbook>"];
    var sourceBlock = this.getSourceBlock();
    if (sourceBlock && sourceBlock.workspace) {
      var currBlock;
      var name;
      var parentSet = sourceBlock.workspace.getBlocksByType("player_rules");
      //just handwave it if multiple/no player_rules
      if (!parentSet || parentSet.length != 1) return newValue;
      if (parentSet[0].previousConnection.isConnected()
        && parentSet[0].getInput("playbook").connection.isConnected()) {
        currBlock = parentSet[0].getInput("playbook")
          .connection.targetConnection.getSourceBlock();
      } else return newValue; //error catch on load
      while (currBlock) {
        name = currBlock.getField("name").getValue();
        if (name != ""
          && name != "<name>"){
          options.push(name);
        } currBlock = currBlock.getNextBlock();
      }
      for (var i = 0; i < options.length; i++) {
        //case insensitive comparison
        if (options[i].toLowerCase() === newValue.toLowerCase()) return options[i];
      } return "<playbook>";
    } else return newValue;
  }
};

Blockly.Blocks['step'] = {
  init: function() {
    this.factors = [];
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
    this.appendDummyInput("dropdown")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown(generateFactors, dropdownValidator), "factors");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "step");
    this.setNextStatement(true, "step");
    this.setColour(270);
    this.setTooltip("One step of the creation or improvement process.");
    this.setHelpUrl("");
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var mutObj = {factors: this.factors};
    var mutJSON = JSON.stringify(mutObj);
    container.setAttribute('factors', mutJSON);
    return container;
  },
  domToMutation: function(xmlElement) {
    var mutJSON = xmlElement.getAttribute('factors');
    if (mutJSON) {
      var mutObj = JSON.parse(mutJSON);
      this.factors = mutObj.factors;
    }
    this.updateFactors();
  },
  updateFactors: function() {
    console.log("factors field read with content: " + this.factors.toString());
    //first scrub out all inputs
    for (var i = 0; i < this.factors.length; i++) {
      this.removeInput("a" + i, true);
      console.log("cleanup: removed input a" + i);
    }
    //filter "-0-" from factors
    this.factors = this.factors.filter(
      function (e) {
        return e != "-0-";
      }
    );
    console.log("factors filtered, new content: " + this.factors.toString());
    //now populate block with only current inputs
    for (var i = 0; i < this.factors.length; i++) {
      //remove existing factor from block first
      if (this.getInput("a" + i) != null) {
        this.removeInput("a" + i, true);
        console.log("input a" + i + " removed.");
      }
      if (this.factors[i] && this.factors[i] != "") {
        console.log("Appending new input a" + i);
        this.appendDummyInput("a" + i)
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField(this.factors[i] + " ")
          .appendField(new Blockly.FieldCheckbox(true, deleteButtonValidator));
        this.getInput("a" + i).index = i;
        this.moveInputBefore("a" + i, "dropdown");
      }
    }
  }
};

Blockly.Blocks['playbook_introduction'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Playbook Introduction");
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

Blockly.Blocks['feature'] = {
  init: function() {
    this.factors = [];
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Playbook Feature: ")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Description:")
        .appendField(new Blockly.FieldTextInput("<description>"), "desc");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Factors:");
    this.appendDummyInput("dropdown")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown(generateFactors, dropdownValidator), "factors");
    this.setInputsInline(false);
    this.setPreviousStatement(true, ["feature", "playbook_move"]);
    this.setNextStatement(true, ["feature", "playbook_move"]);
    this.setColour(270);
    this.setTooltip("An ability or effect unique to a certain playbook.");
    this.setHelpUrl("");
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var mutObj = {factors: this.factors};
    var mutJSON = JSON.stringify(mutObj);
    container.setAttribute('factors', mutJSON);
    return container;
  },
  domToMutation: function(xmlElement) {
    var mutJSON = xmlElement.getAttribute('factors');
    if (mutJSON) {
      var mutObj = JSON.parse(mutJSON);
      this.factors = mutObj.factors;
    }
    this.updateFactors();
  },
  updateFactors: function() {
    console.log("factors field read with content: " + this.factors.toString());
    //first scrub out all inputs
    for (var i = 0; i < this.factors.length; i++) {
      this.removeInput("a" + i, true);
      console.log("cleanup: removed input a" + i);
    }
    //filter "-0-" from factors
    this.factors = this.factors.filter(
      function (e) {
        return e != "-0-";
      }
    );
    console.log("factors filtered, new content: " + this.factors.toString());
    //now populate block with only current inputs
    for (var i = 0; i < this.factors.length; i++) {
      //remove existing factor from block first
      if (this.getInput("a" + i) != null) {
        this.removeInput("a" + i, true);
        console.log("input a" + i + " removed.");
      }
      if (this.factors[i] && this.factors[i] != "") {
        console.log("Appending new input a" + i);
        this.appendDummyInput("a" + i)
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField(this.factors[i] + " ")
          .appendField(new Blockly.FieldCheckbox(true, deleteButtonValidator));
        this.getInput("a" + i).index = i;
        this.moveInputBefore("a" + i, "dropdown");
      }
    }
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
        .appendField("Items:");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "equipment");
    this.setColour(240);
    this.setTooltip("Items usable by players.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['equipment_type'] = {
  init: function() {
    this.factors = [];
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
    this.appendDummyInput("dropdown")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown(generateFactors, dropdownValidator), "factors");
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
    if (this.showInput_) this.appendStatementInput('subtype').setCheck('equipment_type');
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var mutObj = {factors: this.factors};
    var mutJSON = JSON.stringify(mutObj);
    container.setAttribute('factors', mutJSON);
    return container;
  },
  domToMutation: function(xmlElement) {
    var mutJSON = xmlElement.getAttribute('factors');
    if (mutJSON) {
      var mutObj = JSON.parse(mutJSON);
      this.factors = mutObj.factors;
    }
    this.updateFactors();
  },
  updateFactors: function() {
    console.log("factors field read with content: " + this.factors.toString());
    //first scrub out all inputs
    for (var i = 0; i < this.factors.length; i++) {
      this.removeInput("a" + i, true);
      console.log("cleanup: removed input a" + i);
    }
    //filter "-0-" from factors
    this.factors = this.factors.filter(
      function (e) {
        return e != "-0-";
      }
    );
    console.log("factors filtered, new content: " + this.factors.toString());
    //now populate block with only current inputs
    for (var i = 0; i < this.factors.length; i++) {
      //remove existing factor from block first
      if (this.getInput("a" + i) != null) {
        this.removeInput("a" + i, true);
        console.log("input a" + i + " removed.");
      }
      if (this.factors[i] && this.factors[i] != "") {
        console.log("Appending new input a" + i);
        this.appendDummyInput("a" + i)
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField(this.factors[i] + " ")
          .appendField(new Blockly.FieldCheckbox(true, deleteButtonValidator));
        this.getInput("a" + i).index = i;
        this.moveInputBefore("a" + i, "dropdown");
      }
    }
  }
};

Blockly.Blocks['item'] = {
  init: function() {
    //difference between this block and others:
    //types and subtypes are now stored as name, blockid (retains reference to block)
    this.types = [];
    this.subtypes = [];
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Item: ")
        .appendField(new Blockly.FieldTextInput("<name>"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Types: ");
    this.appendDummyInput("dropdown1")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown(this.generateTypes, this.typeDropdownValidator), "types");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Subtypes:");
    this.appendDummyInput("dropdown2")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown(this.generateSubtypes, this.subtypeDropdownValidator), "subtypes");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Description:")
        .appendField(new Blockly.FieldTextInput("<description>"), "desc");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "item");
    this.setNextStatement(true, "item");
    this.setColour(270);
    this.setTooltip("An item with predefined mechanics that can be acquired in the system.");
    this.setHelpUrl("");
  },
  generateTypes: function() {
    var options = [["<select>","no_value"]];
    var sourceBlock = this.getSourceBlock();
    if (sourceBlock && sourceBlock.workspace) {
      console.log("gt: parent block/workspace acquired");
      var currBlock;
      var name;
      var parentSet = sourceBlock.workspace.getBlocksByType("equipment");
      for (var i = 0; i < parentSet.length; i++) {
        if (parentSet[i].previousConnection.isConnected()
          && parentSet[i].getInput("equipment_type").connection.isConnected()) {
          currBlock = parentSet[i].getInput("equipment_type")
            .connection.targetConnection.getSourceBlock();
          break;
        }
      }
      while (currBlock) {
        name = currBlock.getField("name").getValue();
        if (name != ""
          && name != "<name>"
          && !name.includes("-0-")){
          options.push(new Array(name, currBlock.id));
        }
        currBlock = currBlock.getNextBlock();
      }
      //filter types from generated list if already in block
      options = options.filter(
        function (e) {
          for (var i = 0; i < sourceBlock.types.length; i++) {
            if (e[1] == sourceBlock.types[i][1]) return false;
          }
          return true;
        }
      );
    } else {
      console.log("gt: parent block/workspace not acquired");
    }
    return options;
  },
  generateSubtypes: function() {
    var options = [["<select>","no_value"]];
    var sourceBlock = this.getSourceBlock();
    if (sourceBlock && sourceBlock.workspace) {
      console.log("gs: parent block/workspace acquired");
      var currBlock;
      var name;
      var inSubtypes;
      //populate optionsList with all subtypes not in block
      //done by traversing equipment types in block tree
      for (var i = 0; i < sourceBlock.types.length; i++) {
        if (sourceBlock.types[i][1]
          && sourceBlock.types[i][1] != "") {
          currBlock = sourceBlock.workspace.getBlockById(sourceBlock.types[i][1]);
          if (currBlock
            && currBlock.getInput("subtype")
            && currBlock.getInput("subtype").connection.isConnected()) {
            currBlock = currBlock.getInput("subtype")
              .connection.targetConnection.getSourceBlock();
            //currBlock is now the first subtype of the top-level type block
            while (currBlock) {
              name = currBlock.getField("name").getValue();
              inSubtypes = false;
              for (var j = 0; j < sourceBlock.subtypes.length; j++) {
                if (currBlock.id == sourceBlock.subtypes[j][1]) {
                  inSubtypes = true;
                  break;
                }
              }
              if (!inSubtypes
                && name != ""
                && name != "<name>"
                && !name.includes("-0-")
                && !name.includes('|')) {
                options.push(new Array(name, currBlock.id));
              }
              currBlock = currBlock.getNextBlock();
            }
          }
        }
      }
      for (var i = 0; i < sourceBlock.subtypes.length; i++) {
        if (sourceBlock.subtypes[i][1]
          && sourceBlock.subtypes[i][1] != "") {
          currBlock = sourceBlock.workspace.getBlockById(sourceBlock.subtypes[i][1]);
          if (currBlock
            && currBlock.getInput("subtype")
            && currBlock.getInput("subtype").connection.isConnected()) {
            currBlock = currBlock.getInput("subtype")
              .connection.targetConnection.getSourceBlock();
            //currBlock is now the first subtype of the current selected subtype
            while (currBlock) {
              name = currBlock.getField("name").getValue();
              inSubtypes = false;
              for (var j = 0; j < sourceBlock.subtypes.length; j++) {
                if (currBlock.id == sourceBlock.subtypes[j][1]) {
                  inSubtypes = true;
                  break;
                }
              }
              if (!inSubtypes
                && name != ""
                && name != "<name>"
                && !name.includes("-0-")
                && !name.includes('|')) {
                options.push(new Array(name, currBlock.id));
              }
              currBlock = currBlock.getNextBlock();
            }
          }
        }
      }
    } else {
      console.log("gs: parent block/workspace not acquired");
    }
    return options;
  },
  typeDropdownValidator: function(newValue) {  
    var sourceBlock = this.getSourceBlock();
    if (newValue != "no_value") {
      var options = this.getOptions();
      var displayText = "";
      for (var i = 0; i < options.length; i++) {
        if (options[i][1] == newValue) {
          displayText = options[i][0];
          break;
        }
      }
      if (displayText == "") {
        console.log("typeDropdownValidator called on empty displayText");
      } else {
        sourceBlock.types.push(new Array(displayText, newValue));
        console.log("types field updated with " + sourceBlock.types.toString());
        sourceBlock.updateTypes();
      }
    }
    return "no_value";
  },
  subtypeDropdownValidator: function(newValue) {
    var sourceBlock = this.getSourceBlock();
    if (newValue != "no_value") {
      var options = this.getOptions();
      var displayText = "";
      for (var i = 0; i < options.length; i++) {
        if (options[i][1] == newValue) {
          displayText = options[i][0];
          break;
        }
      }
      if (displayText == "") {
        console.log("typeDropdownValidator called on empty displayText");
      } else {
        sourceBlock.subtypes.push(new Array(displayText, newValue));
        console.log("subtypes field updated with " + sourceBlock.subtypes.toString());
        sourceBlock.updateTypes();
      }
    }
    return "no_value";
  },
  typeDeleteValidator: function(newValue) {
    var sourceBlock = this.getSourceBlock();
    var input = this.getParentInput();
    if (newValue == "FALSE") {
      if (sourceBlock.workspace
        && (sourceBlock.subtypes.length > 1
          || (sourceBlock.subtypes.length == 1
            && sourceBlock.subtypes[0][0] != ""))) {
        console.log("tdv: workspace found and subtypes array is not empty");
        var deleteArr = [];
        var currBlock = sourceBlock.workspace.getBlockById(
          sourceBlock.types[input.index][1]);
        //currBlock set to the corresponding block of the deleted type
        if (currBlock
          && currBlock.getInput("subtype")
          && currBlock.getInput("subtype").connection.isConnected()) {
          //lookArr: array of all first-subtype block ids of current level
          //nextArr: same, but with next level (set to lookArr when for loop terminates)
          //initialize lookArr with the subtype directly connected to the deleted block
          var lookArr = [currBlock.getInput("subtype")
            .connection.targetConnection.getSourceBlock().id];
          var nextArr = [];
          while (lookArr.length != 0) {
            for (var i = 0; i < lookArr.length; i++) {
              currBlock = sourceBlock.workspace.getBlockById(lookArr[i]);
              while (currBlock) {
                deleteArr.push(currBlock.id);
                if (currBlock.getInput("subtype")
                    && currBlock.getInput("subtype").connection.isConnected()) {
                  nextArr.push(currBlock.getInput("subtype")
                    .connection.targetConnection.getSourceBlock().id);
                }
                currBlock = currBlock.getNextBlock();
              }
              console.log("tdv: while loop terminated for lookArr index " + i);
            }
            console.log("tdv: for loop terminated.");
            console.log("lookArr: " + lookArr.toString() + ", nextArr: " + nextArr.toString());
            lookArr = Array.from(nextArr);
            nextArr.length = 0;
            console.log("reset; lookArr: " + lookArr.toString() + ", nextArr: " + nextArr.toString());
          }
          console.log("tdv: outer loop terminated with deleteArr: " + deleteArr.toString());
          //once we know all the subtypes of the deleted block,
          //purge refs from subtypes array     
          for (var i = 0; i < sourceBlock.subtypes.length; i++) {
            //if a block id stored in subtypes array is also in deleteArr,
            //meaning it's a descendant of the deleted block,
            //remove its reference from subtypes and it will be deleted with updateTypes
            if (deleteArr.includes(sourceBlock.subtypes[i][1])) {
              sourceBlock.subtypes[i][0] = "-0-";
              sourceBlock.subtypes[i][1] = "";
            }
          }
        }
      }
      sourceBlock.types[input.index][0] = "-0-";
      sourceBlock.types[input.index][1] = "";
      sourceBlock.updateTypes();
      /*
      console.log("tdv: Removing input " + input.name);
      sourceBlock.removeInput(input.name);
      this.dispose();
      */
    }
    return newValue;
  },
  subtypeDeleteValidator: function(newValue) {
    var sourceBlock = this.getSourceBlock();
    var input = this.getParentInput();
    if (newValue == "FALSE") {
      if (sourceBlock.workspace
        && (sourceBlock.subtypes.length > 1
          || (sourceBlock.subtypes.length == 1
            && sourceBlock.subtypes[0][0] != ""))) {
        console.log("sdv: workspace found and subtypes array is not empty");
        var deleteArr = [];
        var currBlock = sourceBlock.workspace.getBlockById(
          sourceBlock.subtypes[input.index][1]);
        //currBlock set to the corresponding block of the deleted type
        if (currBlock
          && currBlock.getInput("subtype")
          && currBlock.getInput("subtype").connection.isConnected()) {
          //lookArr: array of all first-subtype block ids of current level
          //nextArr: same, but with next level (set to lookArr when for loop terminates)
          //initialize lookArr with the subtype directly connected to the deleted block
          var lookArr = [currBlock.getInput("subtype")
            .connection.targetConnection.getSourceBlock().id];
          var nextArr = [];
          while (lookArr.length != 0) {
            for (var i = 0; i < lookArr.length; i++) {
              currBlock = sourceBlock.workspace.getBlockById(lookArr[i]);
              while (currBlock) {
                deleteArr.push(currBlock.id);
                if (currBlock.getInput("subtype")
                    && currBlock.getInput("subtype").connection.isConnected()) {
                  nextArr.push(currBlock.getInput("subtype")
                    .connection.targetConnection.getSourceBlock().id);
                }
                currBlock = currBlock.getNextBlock();
              }
              console.log("sdv: while loop terminated for lookArr index " + i);
            }
            console.log("sdv: for loop terminated.");
            console.log("lookArr: " + lookArr.toString() + ", nextArr: " + nextArr.toString());
            lookArr = Array.from(nextArr);
            nextArr.length = 0;
            console.log("reset; lookArr: " + lookArr.toString() + ", nextArr: " + nextArr.toString());
          }
          console.log("sdv: outer loop terminated with deleteArr: " + deleteArr.toString());
          //once we know all the subtypes of the deleted block,
          //purge refs from subtypes array     
          for (var i = 0; i < sourceBlock.subtypes.length; i++) {
            //if a block id stored in subtypes array is also in deleteArr,
            //meaning it's a descendant of the deleted block,
            //remove its reference from subtypes and it will be deleted with updateTypes
            if (deleteArr.includes(sourceBlock.subtypes[i][1])) {
              sourceBlock.subtypes[i][0] = "-0-";
              sourceBlock.subtypes[i][1] = "";
            }
          }
        }
      }
      sourceBlock.subtypes[input.index][0] = "-0-";
      sourceBlock.subtypes[input.index][1] = "";
      sourceBlock.updateTypes();
      /*
      console.log("sdv: Removing input " + input.name);
      sourceBlock.removeInput(input.name);
      this.dispose();
      */
    }
    return newValue;
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var mutObj = {types: this.types, subtypes: this.subtypes};
    var mutJSON = JSON.stringify(mutObj);
    container.setAttribute('types', mutJSON);
    console.log("types field set to " + mutJSON);
    return container;
  },
  domToMutation: function(xmlElement) {
    var mutJSON = xmlElement.getAttribute('types');
    if (mutJSON) {
      var mutObj = JSON.parse(mutJSON);
      this.types = mutObj.types;
      this.subtypes = mutObj.subtypes;
    }
    this.updateTypes();
  },
  updateTypes: function() {
    //update regular types
    console.log("types field read with content: " + this.types.toString());
    //first scrub out all inputs
    for (var i = 0; i < this.types.length; i++) {
      this.removeInput("a" + i, true);
      console.log("cleanup: removed input a" + i);
    }
    //filter "-0-" from types
    this.types = this.types.filter(
      function (e) {
        return e[0] != "-0-";
      }
    );
    console.log("types filtered, new content: " + this.types.toString());
    //now populate block with only current inputs
    for (var i = 0; i < this.types.length; i++) {
      //remove existing type from block first
      if (this.getInput("a" + i) != null) {
        this.removeInput("a" + i, true);
        console.log("input a" + i + " removed.");
      }
      if (this.types[i][0] && this.types[i][0] != "") {
        console.log("Appending new input a" + i);
        this.appendDummyInput("a" + i)
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField(this.types[i][0] + " ", "a" + i)
          .appendField(new Blockly.FieldCheckbox(true, this.typeDeleteValidator));
        this.getInput("a" + i).index = i;
        this.moveInputBefore("a" + i, "dropdown1");
      }
    }

    //update subtypes
    console.log("subtypes field read with content: " + this.subtypes.toString());
    //first scrub out all inputs
    for (var i = 0; i < this.subtypes.length; i++) {
      this.removeInput("b" + i, true);
      console.log("cleanup: removed input b" + i);
    }
    //filter "-0-" from subtypes
    this.subtypes = this.subtypes.filter(
      function (e) {
        return e[0] != "-0-";
      }
    );
    console.log("subtypes filtered, new content: " + this.subtypes.toString());
    //now populate block with only current inputs
    if (!(this.subtypes.length == 1 && this.subtypes[0][0] == "")) {
      for (var i = 0; i < this.subtypes.length; i++) {
        //remove existing factor from block first
        if (this.getInput("b" + i) != null) {
          this.removeInput("b" + i, true);
          console.log("input b" + i + " removed.");
        }
        if (this.subtypes[i][0] && this.subtypes[i][0] != "") {
          console.log("Appending new input b" + i);
          this.appendDummyInput("b" + i)
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(this.subtypes[i][0] + " ", "b" + i)
            .appendField(new Blockly.FieldCheckbox(true, this.subtypeDeleteValidator));
          this.getInput("b" + i).index = i;
          this.moveInputBefore("b" + i, "dropdown2");
        }
      }
    }
  }
};

Blockly.Blocks['resource'] = {
  init: function() {
    this.factors = [];
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
    this.appendDummyInput("dropdown")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown(generateFactors, dropdownValidator), "factors");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Range: ")
        .appendField(new Blockly.FieldTextInput("0"), "lrange")
        .appendField(" to ")
        .appendField(new Blockly.FieldTextInput("1"), "rrange");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Initial Value: ")
        .appendField(new Blockly.FieldTextInput("0"), "init");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "resource");
    this.setNextStatement(true, "resource");
    this.setColour(270);
    this.setTooltip("A statistic that a player tracks which can factor into certain moves.");
    this.setHelpUrl("");
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var mutObj = {factors: this.factors};
    var mutJSON = JSON.stringify(mutObj);
    container.setAttribute('factors', mutJSON);
    return container;
  },
  domToMutation: function(xmlElement) {
    var mutJSON = xmlElement.getAttribute('factors');
    if (mutJSON) {
      var mutObj = JSON.parse(mutJSON);
      this.factors = mutObj.factors;
    }
    this.updateFactors();
  },
  updateFactors: function() {
    console.log("factors field read with content: " + this.factors.toString());
    //first scrub out all inputs
    for (var i = 0; i < this.factors.length; i++) {
      this.removeInput("a" + i, true);
      console.log("cleanup: removed input a" + i);
    }
    //filter "-0-" from factors
    this.factors = this.factors.filter(
      function (e) {
        return e != "-0-";
      }
    );
    console.log("factors filtered, new content: " + this.factors.toString());
    //now populate block with only current inputs
    for (var i = 0; i < this.factors.length; i++) {
      //remove existing factor from block first
      if (this.getInput("a" + i) != null) {
        this.removeInput("a" + i, true);
        console.log("input a" + i + " removed.");
      }
      if (this.factors[i] && this.factors[i] != "") {
        console.log("Appending new input a" + i);
        this.appendDummyInput("a" + i)
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField(this.factors[i] + " ")
          .appendField(new Blockly.FieldCheckbox(true, deleteButtonValidator));
        this.getInput("a" + i).index = i;
        this.moveInputBefore("a" + i, "dropdown");
      }
    }
  }
};

Blockly.Blocks['extra_mechanic'] = {
  init: function() {
    this.factors = [];
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
    this.appendDummyInput("dropdown")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown(generateFactors, dropdownValidator), "factors");
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
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var mutObj = {factors: this.factors};
    var mutJSON = JSON.stringify(mutObj);
    container.setAttribute('factors', mutJSON);
    return container;
  },
  domToMutation: function(xmlElement) {
    var mutJSON = xmlElement.getAttribute('factors');
    if (mutJSON) {
      var mutObj = JSON.parse(mutJSON);
      this.factors = mutObj.factors;
    }
    this.updateFactors();
  },
  updateFactors: function() {
    console.log("factors field read with content: " + this.factors.toString());
    //first scrub out all inputs
    for (var i = 0; i < this.factors.length; i++) {
      this.removeInput("a" + i, true);
      console.log("cleanup: removed input a" + i);
    }
    //filter "-0-" from factors
    this.factors = this.factors.filter(
      function (e) {
        return e != "-0-";
      }
    );
    console.log("factors filtered, new content: " + this.factors.toString());
    //now populate block with only current inputs
    for (var i = 0; i < this.factors.length; i++) {
      //remove existing factor from block first
      if (this.getInput("a" + i) != null) {
        this.removeInput("a" + i, true);
        console.log("input a" + i + " removed.");
      }
      if (this.factors[i] && this.factors[i] != "") {
        console.log("Appending new input a" + i);
        this.appendDummyInput("a" + i)
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField(this.factors[i] + " ")
          .appendField(new Blockly.FieldCheckbox(true, deleteButtonValidator));
        this.getInput("a" + i).index = i;
        this.moveInputBefore("a" + i, "dropdown");
      }
    }
  }
};
