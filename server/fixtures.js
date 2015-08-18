if (Posts.find().count() === 0) {
    Posts.insert({
        title: 'First blog',
        body: 'And the very first comment!'
    });

    Posts.insert({
        title: 'Meteor',
        body: 'Another Javascript framework'
    });

    Posts.insert({
        title: 'A mysterious rib',
        body: 'Brakes randomly!'
    });
}