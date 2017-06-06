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
////////////////////////////////////////////////////////////////////////////////
// Testing Suite for the Sensor Data DB Model
////////////////////////////////////////////////////////////////////////////////

var config = require ('./config.json');
var data_fixtures = require('../fixtures/data.js');
var sensor_fixtures = require('../fixtures/sensor.js');

// Load the export and should testing styles
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

// Connect to the MongoDB
var mongoose = require('mongoose');
var sensorSchema = require('../schema/sensorSchema.js');
var Sensor = mongoose.model('Sensor', sensorSchema);

mongoose.connect(config.mongodb);
var db = mongoose.connection;

// set Promise provider to bluebird
mongoose.Promise = require('bluebird');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    //   console.log("Connection to MongoDB successful");
});


describe("When a sensor is saved", function() {
    describe("with valid data", function() {

        before (function() {
            Sensor.remove({}, function() {
              //  console.log("Sensors cleared");
            });
        });

        it("should be successful", function(done) {
            var sensor = new Sensor(sensor_fixtures.valid_sensor_1);
            sensor.save(function(err, sensor) {
                try {
                    Sensor.find({}, function(err, sensors) {
                        expect(err).to.be.null;
                        sensors.length.should.equal(1);
                    });
                    done();
                } catch( err ) {
                    done( err );
                }
            });
        });

        it("there should be 1 sensor", function(done) {
            var sensor = new Sensor(sensor_fixtures.valid_sensor_1);
            sensor.save(function(err, sensor) {
                try {
                    Sensor.find({}, function(err, sensors) {
                        expect(err).to.be.null;
                        sensors.length.should.equal(1);
                    });
                    done();
                } catch( err ) {
                    done( err );
                }
                var num = Sensor.count();
                expect(num).to.be.equal(1);
            });
        });

    });
});

describe("When a sensor is serialized", function() {
    it("should be JSON", function(done) {
        var sensor = new Sensor(sensor_fixtures.valid_sensor_1);
        //            console.log(sensor.json());
        expect(sensor.json()).to.deep.equal(
            {
                name: 'temperature',
                description: 'A temperature sensor.',
                maxfrequency: 1,
                frequency: 1,
                active: true,
                ioType: 'aio'
            });
    });

});
