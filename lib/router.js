Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function () {
        return Meteor.subscribe('posts');
        return Meteor.subscribe('tags');
    }
});

Router.route('/', function () {
    this.redirect('/posts');
});

Router.route('/posts', {name: 'postsList'});

Router.route('/posts/:_id', {
    name: 'postPage',
    waitOn: function () {
        return Meteor.subscribe('comments', this.params._id);
    },
    data: function () {
        return Posts.findOne(this.params._id);
    }
});

Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    data: function () {
        return Posts.findOne(this.params._id);
    }
});

Router.route('/submit', {name: 'postSubmit'});

// Tags Start

Router.route('/tags', {name: 'tagsList'});

Router.route('/tags/submit', {name: 'tagSubmit'});

Router.route('/tags/:_id', {
    name: 'tagPage',
    data: function () {
        return Tags.findOne(this.params._id);
    }
});

Router.route('/tags/:_id/edit', {
    name: 'tagEdit',
    data: function () {
        return Tags.findOne(this.params._id);
    }
});

// Tags End


// Authentication

var requireLogin = function () {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
};

Router.onBeforeAction(requireLogin, {only: ['postSubmit', 'tagSubmit']});