var postsData = [
    {
        title: 'First blog',
        body: 'And the very first comment!'
    },
    {
        title: 'Meteor',
        body: 'Another Javascript framework'
    },
    {
        title: 'Mysterious rib',
        body: 'Brakes randomly!'
    }
];
Template.postsList.helpers({
    posts: postsData
});