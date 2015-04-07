var MySession = (function () {
  function MySession() { }

  var dependencies = {};
  var values = {};
  var checkDependency = function (key) {
    if (!dependencies[key]) {
      dependencies[key] = new Tracker.Dependency();
    }
  };

  MySession.set = function (key, value) {
    checkDependency(key);
    if (values[key] !== value) {
      values[key] = value;
      dependencies[key].changed();
    }
  }
  MySession.get = function (key) {
    checkDependency(key);
    dependencies[key].depend();
    return values[key];
  }

  return MySession;

})();

Template.example6.events({
  'click #example6-runExample': function () {

    Tracker.autorun(function () {
      console.log(MySession.get("example6-date"));
    });
  },

  'click #example6-updateTime': function () {
    MySession.set("example6-date", new Date());
  }
})