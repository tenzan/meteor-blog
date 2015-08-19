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

// REST API stuff

if (Meteor.isServer) {
    Meteor.startup(function () {

        // All values listed below are default
        collectionApi = new CollectionAPI({
            authToken: undefined,              // Require this string to be passed in on each request
            apiPath: 'api',                    // API path prefix
            standAlone: false,                 // Run as a stand-alone HTTP(S) server
            allowCORS: false,                  // Allow CORS (Cross-Origin Resource Sharing)
            sslEnabled: false,                 // Disable/Enable SSL (stand-alone only)
            listenPort: 3005,                  // Port to listen to (stand-alone only)
            listenHost: undefined,             // Host to bind to (stand-alone only)
            privateKeyFile: 'privatekey.pem',  // SSL private key file (only used if SSL is enabled)
            certificateFile: 'certificate.pem' // SSL certificate key file (only used if SSL is enabled)
        });

        // Add the collection Posts to the API "/posts" path
        collectionApi.addCollection(Posts, 'posts', {
            // All values listed below are default
            authToken: undefined,                   // Require this string to be passed in on each request.
            authenticate: undefined, // function(token, method, requestMetadata) {return true/false}; More details can found in [Authenticate Function](#Authenticate-Function).
            methods: ['POST','GET','PUT','DELETE'],  // Allow creating, reading, updating, and deleting
            before: {  // This methods, if defined, will be called before the POST/GET/PUT/DELETE actions are performed on the collection.
                // If the function returns false the action will be canceled, if you return true the action will take place.
                POST: undefined,    // function(obj, requestMetadata, returnObject) {return true/false;},
                GET: undefined,     // function(objs, requestMetadata, returnObject) {return true/false;},
                PUT: undefined,     // function(obj, newValues, requestMetadata, returnObject) {return true/false;},
                DELETE: undefined   // function(obj, requestMetadata, returnObject) {return true/false;}
            },
            after: {  // This methods, if defined, will be called after the POST/GET/PUT/DELETE actions are performed on the collection.
                // Generally, you don't need this, unless you have global variable to reflect data inside collection.
                // The function doesn't need return value.
                POST: undefined,    // function() {console.log("After POST");},
                GET: undefined,     // function() {console.log("After GET");},
                PUT: undefined,     // function() {console.log("After PUT");},
                DELETE: undefined   // function() {console.log("After DELETE");},
            }
        });

        // Starts the API server
        collectionApi.start();
    });
}