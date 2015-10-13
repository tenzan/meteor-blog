Meteor.publish('posts', function () {
    return Posts.find();
});

Meteor.publish('tags', function () {
    return Tags.find();
});

Meteor.publish('comments', function(postId) {
    check(postId, String);
    return Comments.find({postId: postId});
});
