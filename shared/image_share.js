Images = new Mongo.Collection("images");
console.log(Images.find().count());




//if (Meteor.isServer) {
//  Meteor.startup(function () {
//  });
//}