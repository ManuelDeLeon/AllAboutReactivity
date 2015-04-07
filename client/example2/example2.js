
Template.example2.events({
  'click #example2-runExample': function () {

    var run = Tracker.autorun(function () {
      console.log(Session.get("example2-date"));
    });

  },

  'click #example2-updateTime': function () {

    Session.set("example2-date", "ONE - " + new Date());
    Session.set("example2-date", "TWO - " + new Date());

  }
})