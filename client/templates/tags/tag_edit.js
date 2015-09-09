Template.tagEdit.events({
    'submit form': function (e) {
        e.preventDefault();

        var currentTagId = this._id;

        var tagProperties = {
            title: $(e.target).find('[name=title]').val()
        }

        Tags.update(currentTagId, {$set: tagProperties}, function (error) {
            if (error) {
                // display the error to the user
                alert(error.reason);
            } else {
                Router.go('tagPage', {_id: currentTagId});
            }
        });
    },

    'click .delete': function (e) {
        e.preventDefault();

        if (confirm("Delete this tag?")) {
            var currentTagId = this._id;
            Tags.remove(currentTagId);
            Router.go('tagsList');
        }
    }
});