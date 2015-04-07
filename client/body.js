Template.body.events({
  'click h1': function (event) {
    $("h1").css({ 'color': 'grey', 'font-size': '24px' });
    $(event.currentTarget).css({ 'color': 'black', 'font-size': '38px' });
  }
})