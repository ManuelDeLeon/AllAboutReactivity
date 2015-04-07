
Template.example1.events({
  'click #example1-runExample': function () {

    Tracker.autorun(function () {
      console.log(Session.get("example1-date"));
    });

  },

  'click #example1-updateTime': function () {

    Session.set("example1-date", new Date());

  }
})