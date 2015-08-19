Posts = new Mongo.Collection('posts');

Posts.allow({
    update: function (userId, post) {
        return ownsDocument(userId, post);
    },
    remove: function (userId, post) {
        return ownsDocument(userId, post);
    },
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

// ------------  REST API -----------------------------

if (Meteor.isServer) {

    // Global API configuration
    var Api = new Restivus({
        useDefaultAuth: true,
        prettyJson: true
    });

    // Generates: GET, POST on /api/post and GET, PUT, DELETE on
    // /api/items/:id for the Posts collection
    Api.addCollection(Posts);

    // Generates: POST on /api/users and GET, DELETE /api/users/:id for
    // Meteor.users collection
    Api.addCollection(Meteor.users, {
        excludedEndpoints: ['getAll', 'put'],
        routeOptions: {
            authRequired: true
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