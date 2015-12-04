Images = new Mongo.Collection("images");
console.log(Images.find().count());

if (Meteor.isClient) {

  Accounts.ui.config({
    passwordSignupFields:"USERNAME_AND_EMAIL"
  });

  Session.setDefault('show_country_variable', 'UK');
  Session.setDefault('show_current_time_variable', new Date());

  Template.hello_template.helpers({
    country: function () {
      return Session.get('show_country_variable');
    }
  });

  Template.time_template.helpers({
    show_current_time: function () {
      return Session.get('show_current_time_variable');
    }
  });


  Template.images_template.helpers({
    images:Images.find({}, {sort: {createdOn: -1, rating: -1}}),
    getUser: function (user_id) {
      var user = Meteor.users.findOne({_id:user_id});
      if (user) {
        return user.username;
      } else {
        return "anon";
      }
    }
  });


  Template.body.helpers({username: function () {

      if (Meteor.user()) {
        //return Meteor.user().emails[0].address;
        return Meteor.user().username;

      }
      else {
        return "anonymous internet user";
      }
    }
  });

  Template.images_template.events({
    'click .js-image': function (event) {
      alert('hello!!');
      console.log(event);
      $(event.target).css("width", "50px");
    },
    'click .js-del-image': function (event) {
      var image_id = this._id;
      console.log(image_id);
      $("#" + image_id).hide('slow', function () {
        Images.remove({"_id": image_id});
      });
    },
    'click .js-rate-image': function (event) {
      console.log("you clicked a star");
      var rating = $(event.currentTarget).data("userrating");
      console.log(rating);
      var image_id = this['data-id'];
      console.log(image_id);

      Images.update({_id: image_id}, {$set: {rating: rating}});
    },

    'click .js-show-image-form': function (event) {
      $("#image_add_form_template").modal('show');
    }
  });

  Template.image_add_form_template.events({
      'submit .js-add-image': function (event) {
        var img_src, img_alt;
        img_src = event.target.img_src.value;
        img_alt = event.target.img_alt.value;
        console.log("src: " + img_src + " alt:" + img_alt);

        if (Meteor.user()) {
          Images.insert({
            img_src: img_src,
            img_alt: img_alt,
            createdOn: new Date(),
            //createBy: Meteor.userId()
            createBy: Meteor.user()._id
          });
        }

        $("#image_add_form_template").modal('hide');

        return false;
      }
  }); // end of image_add_form_template

} // end of Meteor.isClient

//if (Meteor.isServer) {
//  Meteor.startup(function () {
//  });
//}