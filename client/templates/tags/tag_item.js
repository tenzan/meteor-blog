Template.tagItem.helpers({
    ownTag: function () {
        return this.userId === Meteor.userId();
    }
});