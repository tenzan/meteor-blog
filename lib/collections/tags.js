Tags = new Mongo.Collection('tags');

Tags.allow({
    update: function (userId, tag) {
        return ownsDocument(userId, tag);
    },
    remove: function (userId, tag) {
        return ownsDocument(userId, tag);
    }
});

Meteor.methods({
    tagInsert: function (tagAttributes) {
        check(Meteor.userId(), String);
        check(tagAttributes, {
            title: String
        });
        var user = Meteor.user();
        var tag = _.extend(tagAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });
        var tagId = Tags.insert(tag);
        return {
            _id: tagId
        };
    }
});
