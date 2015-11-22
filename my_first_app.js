if (Meteor.isClient) {
  Session.setDefault('show_country_variable', 'UK');
  Session.setDefault('show_current_time_variable', new Date());

  Template.hello.helpers({
    country: function () {
      return Session.get('show_country_variable');
    }
  });

  Template.time_template.helpers({
    show_current_time: function () {
      return Session.get('show_current_time_variable');
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}
