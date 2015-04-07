var reactiveDate = function (date) {
  if (!this._dep) {
    this._dep = new Tracker.Dependency();
  }

  if (date) {
    if (date !== this._value) {
      this._value = date;
      this._dep.changed();
    }
  } else {
    this._dep.depend();
    return this._value;
  }
};

Template.example5.events({
  'click #example5-runExample': function () {
    Tracker.autorun(function () {
      console.log(reactiveDate());
    });
  },

  'click #example5-updateTime': function () {
    reactiveDate( new Date() );
  }
})