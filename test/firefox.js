
const ASSERT = require("assert");
const PATH = require("path");
const FS = require("fs-extra");
const Q = require("q");
const FIREFOX = require("../lib/firefox");


describe('firefox', function() {

	// Downloading the browser if it has not been cached before can take a while!	
	this.timeout(60 * 30 * 1000);

	var tmpPath = PATH.join(__dirname, ".tmp");

	it("01 - open", function(done) {
		var path = PATH.join(tmpPath, "firefox-01");
		if (FS.existsSync(path)) {
			FS.removeSync(path);
		}
		return FIREFOX.open({
			"profilePath": path,
			"homepage": "http://getfirebug.com",
			"extensions": {
				"firebug@software.joehewitt.com": "https://getfirebug.com/releases/firebug/2.0/firebug-2.0.xpi",
				"fbtrace@getfirebug.com": "https://getfirebug.com/releases/fbtrace/2.0/fbTrace-2.0b1.xpi"
			},
			"preferences": {
				"extensions.firebug.alwaysOpenTraceConsole": true
			}
		}).then(function(profile) {
			return Q.delay(15 * 1000).then(function() {
				return profile.stop();
			});
		}).then(function() {
			return done();
		}).fail(done);
	});

});
