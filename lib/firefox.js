
const PROFILE = require("./profile");


exports.open = function(options) {

	options = options || {};

	var profile = new PROFILE.Profile(options.profilePath || null, options);

	return profile.init().then(function() {

		// TODO: Allow opening in detached mode.
		return profile.start().then(function(process) {

			return profile;
		});
	});
}
