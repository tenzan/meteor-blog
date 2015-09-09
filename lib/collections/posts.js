Posts = new Mongo.Collection('posts');

Posts.allow({
    update: function (userId, post) {
        return ownsDocument(userId, post);
    },
    remove: function (userId, post) {
        return ownsDocument(userId, post);
    }
});

Meteor.methods({
    postInsert: function (postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            title: String,
            body: String
        });
        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date(),
            commentsCount: 0
        });
        var postId = Posts.insert(post);
        return {
            _id: postId
        };
    }
});

// ------------  REST API Ver.1 -----------------------------

if (Meteor.isServer) {

    // Global API configuration
    var ApiV1 = new Restivus({
        version: 'v1',
        useDefaultAuth: true,
        prettyJson: true
    });

    // Generates: GET, POST on /api/post and GET, PUT, DELETE on
    // /api/items/:id for the Posts collection
    ApiV1.addCollection(Posts);

    ApiV1.addCollection(Comments);

    // Given a URL "/post/5/comments/100"
    ApiV1.addRoute('/posts/:postId/comments/:commentId', {
        get: function () {
            var id = this.urlParams.postId; // "5"
            var commentId = this.urlParams.commentId; // "100"
        }
    });

    // Generates: POST on /api/users and GET, DELETE /api/users/:id for
    // Meteor.users collection
    ApiV1.addCollection(Meteor.users, {
        excludedEndpoints: ['getAll', 'put'],
        routeOptions: {
            authRequired: false
        },
        endpoints: {
            post: {
                authRequired: false
            },
            delete: {
                roleRequired: 'admin'
            }
        }
    });

}