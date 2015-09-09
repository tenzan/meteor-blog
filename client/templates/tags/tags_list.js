Template.tagsList.helpers({
    tags: function () {
        return Tags.find({}, {sort: {submitted: -1}});
    }
});