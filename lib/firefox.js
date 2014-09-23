
const PROFILE = require("./profile");


exports.open = function(options) {

	return exports.provision().then(function (profile) {

		// TODO: Allow opening in detached mode.
		return profile.start().then(function(process) {

			return profile;
		});
	});
}

exports.provision = function(options) {

	options = options || {};

	var profile = new PROFILE.Profile(options.profilePath || null, options);

	return profile.init().then(function() {

		return profile;
	});
}
