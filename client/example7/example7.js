var realDependency = null;
var addLogs = function () {
  Tracker.Dependency = function () {
    console.log("Initialize _dependentsById collection");
    this._dependentsById = {};
  };

  Tracker.Dependency.prototype.depend = function (computation) {
    console.log(".depend() - Start");
    if (!computation) {
      console.log(".depend() - No computation given");
      if (!Tracker.active) {
        console.log(".depend() - Not running in autorun.");
        console.log(".depend() - Returning false.");
        return false;
      }
      console.log(".depend() - Using Tracker.currentComputation: " + Tracker.currentComputation._id);
      computation = Tracker.currentComputation;
    }

    var self = this;
    var id = computation._id;
    if (!(id in self._dependentsById)) {
      console.log(".depend() - Computation " + id + " isn't in _dependentsById list.");
      self._dependentsById[id] = computation;
      computation.onInvalidate(function () {
        console.log(".depend() - Computation " + id + " has been invalidated. Removing from _dependentsById.");
        delete self._dependentsById[id];
      });
      console.log(".depend() - Added computation " + id + " to _dependentsById list.");
      console.log(".depend() - Returning true.");
      return true;
    }
    console.log(".depend() - Already tracking computation " + id + ".");
    console.log(".depend() - Returning false.");
    return false;
  };

  Tracker.Dependency.prototype.changed = function () {
    var self = this;
    if (! $.isEmptyObject(self._dependentsById) ) {
      console.log(".changed() - Invalidating computations in _dependentsById.");
      for (var id in self._dependentsById) {
        console.log(".changed() - Invalidate computation " + id + ".");
        self._dependentsById[id].invalidate();

        console.log("computation.invalidate() - Run pending computations on the next cpu cycle.");
        console.log("computation.invalidate() - Add this computation to the pending list.");
      }
      console.log("It's a brand new CPU cycle!"); // Not really. I put it here for the purpose of the presentation.
    }
    else {
      console.log(".changed() - _dependentsById is empty.");
    }
  };
};


var dependency = new Tracker.Dependency();
var computation = null;
Template.example7.events({
  'click #example7-runExample': function () {
    console.log("================");

    // Use the current Tracker.Dependency (real or with logs)
    dependency = new Tracker.Dependency();

    computation = Tracker.autorun(function () {
      console.log("Executing dependency.depend()");
      dependency.depend();
      console.log(new Date());
    });
  },

  'click #example7-updateTime': function () {
    console.log("================");
    console.log("Executing dependency.changed()");
    dependency.changed();
  },

  'click #example7-noAutorun': function () {
    console.log("================");
    console.log("Executing dependency.depend()");
    // dependency.depend() outside autorun doesn't do anything
    dependency.depend();
  },

  'click #example7-stopComputation': function () {
    console.log("================");
    console.log("Executing computation.stop()");
    computation.stop();
  },

  'click #example7-addLogs': function () {
    if (!realDependency) {
      realDependency = Tracker.Dependency;
      addLogs();
    }
  },

  'click #example7-removeLogs': function () {
    if (realDependency) {
      Tracker.Dependency = realDependency;
      realDependency = null;
    }
  }
})