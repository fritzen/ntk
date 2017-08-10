
module.exports = function(attributes) {

	var _ = require('underscore'),
		osc = require('node-osc'),
		events = require('events'),
		es6 = require('es6-shim'),
		address = attributes.address;
		//setThrottlerID;

	var constructor = function() {
		var options = attributes;

		this.OSCClients = {};
		var OSCServer = new osc.Server(57190);

		OSCServer.on("message", function (msg, rinfo) {
			var field = msg[0],
			value = msg[1];

			this.set(field, value);
		}.bind(this));


		this.OSCServer = OSCServer;

		return this;
	};

	// Base HardwareModel class
	var OSCHardwareModel = {
		get: function(field) {
			return this.receiving[field];
		},
		set: function(field, value) {
			// If data is coming in TOO fast then we need to throttle it to avoid overloading NTK's network
			//if(setThrottlerID !== undefined) {
				//clearTimeout(setThrottlerID);
			//}

			//setThrottlerID = setTimeout(function() {

				if(this.sending[field] !== undefined) {
					if(parseFloat(this.sending[field],10) !== parseFloat(value,10)) {

						var messageServerPort = field.split(':');
						var serverPort = messageServerPort[1] + ":" + messageServerPort[2];
						this.sending[field] = value;

						var client = this.OSCClients[ serverPort ];

						if(client == undefined) {
							this.OSCClients[serverPort] = new osc.Client(messageServerPort[1], messageServerPort[2]);
							client = this.OSCClients[serverPort];
						}

						client.send(messageServerPort[0], value);
					}
				}
				else if(this.receiving[field] !== undefined) {
					console.log('received', this.receiving[field]);

					if(parseFloat(this.receiving[field], 10) !== parseFloat( value, 10 )) {
						this.receiving[field] = value;
						this.emit('change', {field: field, value: this.receiving[field]});
					}
				}
				else {
					console.log("ELSE", field, value, this.sending);
				}

				setThrottlerID = undefined;
			//}.bind(this), 10);

			return this;
		},
		setPollSpeed: function(highLow) {
		},
		setIOMode: function setIOMode(pin, mode) {

			if(mode == 'in') {
				this.receiving[pin] = 0;
			}
			else if(mode == 'out') {
				this.sending[pin] = 0;
			}
		},
	};
	_.extend(constructor.prototype, OSCHardwareModel);

	// EVENTS
	events.EventEmitter.call(constructor.prototype);
	_.extend(constructor.prototype, events.EventEmitter.prototype);

	// MODEL PROPERTIES
	_.extend(constructor.prototype, {
		type: 'OSC',
		receiving: {
			'/ntk/in/1': 0,
			'/ntk/in/2': 0,
			'/ntk/in/3': 0,
			'/ntk/in/4': 0,
			'/ntk/in/5': 0,
			'/ntk/in/6': 0,
			'/ntk/in/7': 0,
			'/ntk/in/8': 0,
			'/ntk/in/9': 0,
			'/ntk/in/10': 0,
			'/ntk/in/11': 0,
			'/ntk/in/12': 0,
			'/ntk/in/13': 0,
			'/ntk/in/14': 0,
		},
		sending: {
			'/ntk/out/1:127.0.0.1:57120': 0,
			'/ntk/out/2:127.0.0.1:57120': 0,
			'/ntk/out/3:127.0.0.1:57120': 0,
			'/ntk/out/4:127.0.0.1:57120': 0,
			'/ntk/out/5:127.0.0.1:57120': 0,
			'/ntk/out/6:127.0.0.1:57120': 0,
			'/ntk/out/7:127.0.0.1:57120': 0,
			'/ntk/out/8:127.0.0.1:57120': 0,
			'/ntk/out/9:127.0.0.1:57120': 0,
			'/ntk/out/10:127.0.0.1:57120': 0,
			'/ntk/out/11:127.0.0.1:57120': 0,
			'/ntk/out/12:127.0.0.1:57120': 0,
			'/ntk/out/13:127.0.0.1:57120': 0,
			'/ntk/out/14:127.0.0.1:57120': 0,
		},
	});

	_.extend(constructor.prototype, attributes);

	return new constructor();
};
