var dependency = new Tracker.Dependency();

Template.example4.events({
  'click #example4-runExample': function () {

    // dependency.depend() outside autorun doesn't do anything
    var retVal = dependency.depend(); 
    console.log("dependency.depend() = " + retVal);

    // Tracker.currentComputation outside autorun is null
    console.log("Tracker.currentComputation = " + Tracker.currentComputation);
    

    Tracker.autorun(function () {
      console.log("Tracker.currentComputation = " + Tracker.currentComputation._id);

      dependency.depend();
      console.log(new Date());
    });
  },

  'click #example4-updateTime': function () {
    dependency.changed();
  }
})