/*
* Author: Daniel Holmlund <daniel.w.holmlund@Intel.com>
* Copyright (c) 2015 Intel Corporation.
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//Library needed for data parsing
var _ = require("lodash");
var config = require("./config.json")

module.exports = {

  generateSensorJSON : function() {
    var sensors_table = [
      {
        "id":"temperature",
        "name":"temperature",
        "description":"read the temp",
        "maxfrequency":"200",
        "frequency":"1000",
        "active":"true",
        "ioType":"Analog"
      },
      {
        "id":"light",
        "name":"light",
        "description":"read the ambient light",
        "maxfrequency":"200",
        "frequency":"1000",
        "active":"true",
        "ioType":"Analog"
      },
      {
        "id":"sound",
        "name":"sound",
        "description":"read the ambient noise har har har",
        "maxfrequency":"200",
        "frequency":"1000",
        "active":"true",
        "ioType":"Analog"
      }
    ];
    return sensors_table;
  },

  generateDataJSON : function(count) {
    var i = 0, result = [];
    console.log(count);
    while (i < count)
    {
      result.push({ sensor_id : _.sample(config.sensor_ids),
        value : Math.floor((Math.random() * 30) + 60),
        timestamp : Math.floor((Math.random() * 69000) + (Date.now() - 5))
      });
      i++;
    }
    return result;
  },

  generateActuatorJSON : function() {
    return config.actuators;
  },

  generateTriggerJSON : function() {
    var triggers = [
        {
            id : "temperature_changed_condition",
            name : "temperature_changed_condition",
            sensor_id : "temperature2",
            condition :  "( function(sensor_value) { return this.temperature_changed_condition(sensor_value) } )",
            triggerFunc: "( function() { this.temperature_too_hot(); })",
            active: true
        },

        {
            id : "temperature_greater_than_27_light_on",
            name : "temperature_greater_than_27_light_on",
            sensor_id : "temperature",
            condition :  "( function(temperature) { return this.temperature_greater_than_27_light_on_condition(temperature) } )",
            triggerFunc: "( function() { this.temperature_heating_error(); } )",
            active: true
        },
        {
            id : "temperature_less_than_20_fan_on",
            name : "temperature_less_than_20_fan_on",
            sensor_id : "temperature",
            condition :  "( function(temperature) { return this.temperature_less_than_20_fan_on_condition(temperature); } )",
            triggerFunc: "( function() { this.temperature_cooling_error(); })",
            active: true
        },

        {
            id : "temperature_greater_than_27_fan_off",
            name : "temperature_greater_than_27_fan_off",
            sensor_id : "temperature",
            condition :  "( function(temperature) { return this.temperature_greater_than_27_fan_off_condition(temperature) } )",
            triggerFunc: "( function() { this.temperature_heating_error(); } )",
            active: true
        },
        {
            id : "temperature_less_than_20_light_off",
            name : "temperature_less_than_20_light_off",
            sensor_id : "temperature",
            condition :  "( function(temperature) { return this.temperature_less_than_20_light_off_condition(temperature); } )",
            triggerFunc: "( function() { this.temperature_cooling_error(); })",
            active: true
        },

        {
            id : "temperature_less_than_20",
            name : "temperature_less_than_20",
            sensor_id : "temperature",
            condition : "( function(temperature) { return this.temperature_less_than_20_condition(temperature); } )",
            triggerFunc : "( function() { this.temperature_too_cold(); } )",
            active: true
        },

        {
            id : "temperature_ok",
            name : "temperature_ok",
            sensor_id : "temperature",
            condition :  "( function(temperature) { return this.temperature_ok_condition(temperature); } )",
            triggerFunc: "( function() { this.temperature_ok(); } )",
            active: true
        }];

        return triggers;
  }


};
