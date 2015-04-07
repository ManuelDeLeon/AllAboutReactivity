// Don't change the real Tracker 
// (changes will only apply to this file)
var Tracker = {};

Tracker.Dependency = function () {
	this._dependentsById = {};
};

Tracker.Dependency.prototype.depend = function (computation) {
	if (!computation) {
		if (!Tracker.active)
			return false;
		computation = Tracker.currentComputation;
	}
	var self = this;
	var id = computation._id;
	if (!(id in self._dependentsById)) {
		self._dependentsById[id] = computation;
		computation.onInvalidate(function () {
			delete self._dependentsById[id];
		});
		return true;
	}
	return false;
};

Tracker.Dependency.prototype.changed = function () {
	var self = this;
	for (var id in self._dependentsById)
		self._dependentsById[id].invalidate();
};