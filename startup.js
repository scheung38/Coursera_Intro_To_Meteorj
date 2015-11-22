/**
 * Created by minminsanjose on 22/11/2015.
 */
if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Images.find().count() == 0) {
            Images.insert(
                {
                img_src: "CMS_Creative_164657191_Kingfisher.jpg",
                img_alt: "Some birds flying."
                }
                );
            Images.insert(
                {
                img_src: "cute-german-shepherd-puppy-new-wide-wallpapers-in-hd-widescreen.jpg",
                img_alt: "Some German Shephards."
                }
                );
            Images.insert(
                {
                img_src: "pugs.jpeg",
                img_alt: "Some pugs."
                }
                );

        } // end of if have no images
    });
}