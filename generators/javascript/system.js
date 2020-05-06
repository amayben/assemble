/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating JavaScript for loop blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.require('Blockly.JavaScript');

Blockly.JavaScript['setting'] = function(block) {
  var text_name = block.getFieldValue('name');
  var statements_society = Blockly.JavaScript.statementToCode(block, 'society');
  var statements_history = Blockly.JavaScript.statementToCode(block, 'history');
  var statements_mystery = Blockly.JavaScript.statementToCode(block, 'mystery');
  var statements_region = Blockly.JavaScript.statementToCode(block, 'region');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['society'] = function(block) {
  var text_name = block.getFieldValue('name');
  var text_desc = block.getFieldValue('desc');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['history'] = function(block) {
  var text_name = block.getFieldValue('name');
  var statements_era = Blockly.JavaScript.statementToCode(block, 'era');
  var statements_entity = Blockly.JavaScript.statementToCode(block, 'entity');
  var statements_event = Blockly.JavaScript.statementToCode(block, 'event');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['entity'] = function(block) {
  var text_name = block.getFieldValue('name');
  var text_role = block.getFieldValue('role');
  var text_status = block.getFieldValue('status');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['event'] = function(block) {
  var text_name = block.getFieldValue('name');
  var text_desc = block.getFieldValue('desc');
  var text_significance = block.getFieldValue('significance');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['mystery'] = function(block) {
  var text_name = block.getFieldValue('name');
  var text_desc = block.getFieldValue('desc');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['region'] = function(block) {
  var text_name = block.getFieldValue('name');
  var text_desc = block.getFieldValue('desc');
  var statements_landmark = Blockly.JavaScript.statementToCode(block, 'landmark');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['landmark'] = function(block) {
  var text_name = block.getFieldValue('name');
  var text_desc = block.getFieldValue('desc');
  var text_significance = block.getFieldValue('significance');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['system'] = function(block) {
  var text_name = block.getFieldValue('name');
  var statements_theme = Blockly.JavaScript.statementToCode(block, 'theme');
  var statements_setting = Blockly.JavaScript.statementToCode(block, 'setting');
  var statements_mechanics = Blockly.JavaScript.statementToCode(block, 'mechanics');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['theme'] = function(block) {
  var text_name = block.getFieldValue('name');
  var text_desc = block.getFieldValue('desc');
  var statements_function = Blockly.JavaScript.statementToCode(block, 'function');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['function'] = function(block) {
  var text_name = block.getFieldValue('name');
  var text_desc = block.getFieldValue('desc');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['mechanics'] = function(block) {
  var statements_factor = Blockly.JavaScript.statementToCode(block, 'factor');
  var statements_move = Blockly.JavaScript.statementToCode(block, 'move');
  var statements_parameter = Blockly.JavaScript.statementToCode(block, 'parameter');
  var statements_player_rules = Blockly.JavaScript.statementToCode(block, 'player_rules');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['factor'] = function(block) {
  var text_name = block.getFieldValue('name');
  var dropdown_type = block.getFieldValue('type');
  var text_desc = block.getFieldValue('desc');
  var checkbox_isadditive = block.getFieldValue('isAdditive') == 'TRUE';
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['move'] = function(block) {
  var text_name = block.getFieldValue('name');
  var dropdown_factors = block.getFieldValue('factors');
  var text_desc = block.getFieldValue('desc');
  var checkbox_adds_factor = block.getFieldValue('adds_factor') == 'TRUE';
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['parameter'] = function(block) {
  var text_name = block.getFieldValue('name');
  var number_lrange = block.getFieldValue('lrange');
  var number_rrange = block.getFieldValue('rrange');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['era'] = function(block) {
  var text_name = block.getFieldValue('name');
  var checkbox_iscurrent = block.getFieldValue('isCurrent') == 'TRUE';
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['player_rules'] = function(block) {
  var statements_character_creation = Blockly.JavaScript.statementToCode(block, 'character_creation');
  var statements_playbook = Blockly.JavaScript.statementToCode(block, 'playbook');
  var statements_resource = Blockly.JavaScript.statementToCode(block, 'resource');
  var statements_equipment = Blockly.JavaScript.statementToCode(block, 'equipment');
  var statements_extra_mechanic = Blockly.JavaScript.statementToCode(block, 'extra_mechanic');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['character_creation'] = function(block) {
  var statements_creation_step = Blockly.JavaScript.statementToCode(block, 'creation_step');
  var statements_playbook_creation = Blockly.JavaScript.statementToCode(block, 'playbook_creation');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['playbook_creation'] = function(block) {
  var text_name = block.getFieldValue('name');
  var statements_creation_step = Blockly.JavaScript.statementToCode(block, 'creation_step');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['creation_step'] = function(block) {
  var text_name = block.getFieldValue('name');
  var text_desc = block.getFieldValue('desc');
  var dropdown_factors = block.getFieldValue('factors');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['playbook'] = function(block) {
  var text_name = block.getFieldValue('name');
  var statements_playbook_introduction = Blockly.JavaScript.statementToCode(block, 'playbook_introduction');
  var statements_feature = Blockly.JavaScript.statementToCode(block, 'feature');
  var text_equipment = block.getFieldValue('equipment');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['playbook_introduction'] = function(block) {
  var text_pitch = block.getFieldValue('pitch');
  var text_soc_role = block.getFieldValue('soc_role');
  var text_mech_role = block.getFieldValue('mech_role');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['resource'] = function(block) {
  var text_name = block.getFieldValue('name');
  var text_desc = block.getFieldValue('desc');
  var dropdown_factors = block.getFieldValue('factors');
  var number_lrange = block.getFieldValue('lrange');
  var number_rrange = block.getFieldValue('rrange');
  var number_init = block.getFieldValue('init');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['feature'] = function(block) {
  var text_name = block.getFieldValue('name');
  var text_desc = block.getFieldValue('desc');
  var dropdown_factors = block.getFieldValue('factors');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['equipment_type'] = function(block) {
  var text_name = block.getFieldValue('name');
  var text_desc = block.getFieldValue('desc');
  var dropdown_factors = block.getFieldValue('factors');
  var checkbox_hassubtypes = block.getFieldValue('hasSubtypes') == 'TRUE';
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['subtype'] = function(block) {
  var text_name = block.getFieldValue('name');
  var text_desc = block.getFieldValue('desc');
  var dropdown_factors = block.getFieldValue('factors');
  var checkbox_isrequired = block.getFieldValue('isRequired') == 'TRUE';
  var checkbox_hassubtypes = block.getFieldValue('hasSubtypes') == 'TRUE';
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['extra_mechanic'] = function(block) {
  var text_name = block.getFieldValue('name');
  var text_desc = block.getFieldValue('desc');
  var dropdown_factors = block.getFieldValue('factors');
  var checkbox_hasresources = block.getFieldValue('hasResources') == 'TRUE';
  var checkbox_hasmoves = block.getFieldValue('hasMoves') == 'TRUE';
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['playbook_move'] = function(block) {
  var text_name = block.getFieldValue('name');
  var dropdown_factors = block.getFieldValue('factors');
  var text_desc = block.getFieldValue('desc');
  var checkbox_addsfactor = block.getFieldValue('addsFactor') == 'TRUE';
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['equipment'] = function(block) {
  var statements_equipment_type = Blockly.JavaScript.statementToCode(block, 'equipment_type');
  var statements_item = Blockly.JavaScript.statementToCode(block, 'item');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['item'] = function(block) {
  var text_name = block.getFieldValue('name');
  var dropdown_types = block.getFieldValue('types');
  var dropdown_subtypes = block.getFieldValue('subtypes');
  var text_desc = block.getFieldValue('desc');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};
