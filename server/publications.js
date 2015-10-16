//
// Meteor.publish('comments', function(postId) {
//     check(postId, String);
//     return Comments.find({postId: postId});
// });

var liveDb = new LiveMysql({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'postag_development'
});

var closeAndExit = function () {
    liveDb.end();
    process.exit();
};
// Close connections on hot code push
process.on('SIGTERM', closeAndExit);
// Close connections on exit (ctrl + c)
process.on('SIGINT', closeAndExit);


Meteor.publish('posts', function () {
    return liveDb.select(
        'SELECT * FROM posts ORDER BY created_at DESC',
        [{table: 'posts'}]
    );
});

Meteor.publish('tags', function () {
    return liveDb.select(
        'SELECT * FROM tags ORDER BY name ASC',
        [{table: 'tags'}]
    );
});

