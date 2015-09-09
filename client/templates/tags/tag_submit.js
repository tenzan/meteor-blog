Template.tagSubmit.events({
    'submit form': function (e) {
        e.preventDefault();

        var tag = {
            title: $(e.target).find('[name=title]').val()
        };

        Meteor.call('tagInsert', tag, function (error, result) {
            //display the error to the user and abort
            if (error)
                return alert(error.message);
            Router.go('tagsList');
        });
    }
});