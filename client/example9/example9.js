var computation = null;

Template.example9.events({
  'click #example9-runExample': function () {

    Tracker.autorun(function () {
      computation = Tracker.currentComputation;
      computation.onInvalidate(function () {
        computation = null;
      });
      console.log(new Date());
    });

  },

  'click #example9-updateTime': function () {
    if (computation) {
      computation.invalidate();
    }
  }
})