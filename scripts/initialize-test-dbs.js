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
var config = require("./config.json");

// Import the Utilities functions
var utils = require("./utils.js");

// Require the MongoDB libraries and connect to the database
var mongoose = require('mongoose');

// Import the Database Model Objects
var DataModel = require('../index.js').DataModel;
var SensorModel = require('../index.js').SensorModel;
var SensorCloudModel = require('../index.js').SensorCloudModel;
var ActuatorModel = require('../index.js').ActuatorModel;
var TriggerModel = require('../index.js').TriggerModel;

mongoose.connect(config.mongodb.testHost);
var db = mongoose.connection;

// Report database errors to the console
db.on('error', console.error.bind(console, 'connection error:'));

// Log when a connection is established to the MongoDB server
db.once('open', function (callback) {
  console.info("Connection to MongoDB successful");
});

SensorModel.remove({}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Removed all Data from SensorModel');
  }
});

DataModel.remove({}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Removed all Data from DataModel');
  }
});

ActuatorModel.remove({}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Removed all Data from ActuatorModel');
  }
});

TriggerModel.remove({}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Removed all Data from TriggerModel');
  }
});

SensorCloudModel.remove({}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Removed all Data from SensorCloudModel');
  }
});

var actuator_json = utils.generateActuatorJSON();
console.log("Actuator Model : ");
console.log(JSON.stringify(actuator_json, null, '  '));

actuator_json.forEach(function(row) {
  var actuator = new ActuatorModel(row);
  actuator.save(function(err, actuator) {
    if (err)
    console.log(err);
    else {
      console.log("Wrote actuator to ActuatorModel:");
      console.log(actuator);
    }
  });
});

var trigger_json = utils.generateTriggerJSON();
console.log("Sensor Model : ");
console.log(JSON.stringify(trigger_json, null, '  '));

trigger_json.forEach(function(row) {
  var trigger = new TriggerModel(row);
  trigger.save(function(err, trigger) {
    if (err)
    console.log(err);
    else{
      console.log("Wrote sensor to TriggerModel:");
      console.log(trigger);
    }
  });
});


var sensor_json = utils.generateSensorJSON();
console.log("Sensor Model : ");
console.log(JSON.stringify(sensor_json, null, '  '));

sensor_json.forEach(function(row) {
  var sensor = new SensorModel(row);
  sensor.save(function(err, sensor) {
    if (err)
    console.log(err);
    else
    console.log("Wrote sensor to SensorModel:" + sensor.toString());
  });
});

var data_json = utils.generateDataJSON(10);
console.log("Data Model : ");

data_json.forEach(function(row) {
  var value = new DataModel(row);
  // console.log(JSON.stringify(row, null, '  '));

  value.save(function(err, data) {
    if (err){
      console.log("Data Model save failed!");
      console.log(data.sensor_id + ":" + data.value);
      console.log(err);
    }
    else
    console.log("Wrote data to DataModel:");
    console.log(data);
  });
});

var relation_json = utils.generateSensorCloudJSON();
console.log("Sensor Cloud Model : ");
// console.log(JSON.stringify(relation_json, null, '  '));

relation_json.forEach(function(row) {
  var relation = new SensorCloudModel(row);
  relation.save(function(err, data) {
    if (err)
    console.log(err);
    else
    console.log("Wrote data to SensorCloudModel:");
    console.log(data);
  });
});
