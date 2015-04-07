var computation = null;

Template.example8.events({
  'click #example8-runExample': function () {

    Tracker.autorun(function () {
      computation = Tracker.currentComputation;
      computation.onInvalidate(function () {
        computation = null;
      });
      console.log(new Date());
    });

  },

  'click #example8-updateTime': function () {
    if (computation) {
      computation.invalidate();
    }
  }
})