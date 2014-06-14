
const ASSERT = require("assert");
const PATH = require("path");
const FS = require("fs-extra");
const Q = require("q");
const PROFILE = require("../lib/profile");


describe('profile', function() {

	// Downloading the browser if it has not been cached before can take a while!	
	this.timeout(60 * 30 * 1000);

	var tmpPath = PATH.join(__dirname, ".tmp");

	it("01 - default", function(done) {
		var path = PATH.join(tmpPath, "profile-01");
		if (FS.existsSync(path)) {
			FS.removeSync(path);
		}		
		var profile = new PROFILE.Profile(path);
		return profile.init().then(function() {
			return profile.start().then(function(process) {
				return Q.delay(15 * 1000).then(function() {
					return profile.stop();
				});
			});
		}).then(function() {
			return done();
		}).fail(done);
	});

	it("02 - with homepage, extensions and preferences", function(done) {
		var path = PATH.join(tmpPath, "profile-02");
		if (FS.existsSync(path)) {
			FS.removeSync(path);
		}
		var profile = new PROFILE.Profile(path, {
			"homepage": "http://getfirebug.com",
			"extensions": {
				"firebug@software.joehewitt.com": "https://getfirebug.com/releases/firebug/2.0/firebug-2.0.xpi",
				"fbtrace@getfirebug.com": "https://getfirebug.com/releases/fbtrace/2.0/fbTrace-2.0b1.xpi"
			},
			"preferences": {
				"extensions.firebug.alwaysOpenTraceConsole": true
			}
		});
		return profile.init().then(function() {
			return profile.start().then(function(process) {
				return Q.delay(15 * 1000).then(function() {
					return profile.stop();
				});
			});
		}).then(function() {
			return done();
		}).fail(done);
	});

	it("03 - generated profile path", function(done) {
		var path = PATH.join(tmpPath, ".profiles");
		if (FS.existsSync(path)) {
			FS.removeSync(path);
		}
		var profile = new PROFILE.Profile(null, {
			workingPath: tmpPath,
			browserMappingKeyPath: "../../.browsers"
		});
		return profile.init().then(function() {

			ASSERT.equal(profile._options.browserMappingKeyPath, "../../.browsers");

		}).then(function() {
			return done();
		}).fail(done);
	});

});
