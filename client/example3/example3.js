
Template.example3.events({
  'click #example3-runExample': function () {

    var run = Tracker.autorun(function () {
      console.log(Session.get("example3-date"));
    });

    Session.set("example3-date", "ONE - " + new Date());

    Tracker.flush(); // Execute Tracker pending runs

    Session.set("example3-date", "TWO - " + new Date());

    run.stop(); // Remove from Tracker list

  },

  'click #example3-updateTime': function () {

    Session.set("example3-date", "THREE - " + new Date());

  }
})