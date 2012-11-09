/**
 * Created with PyCharm.
 * User: peter
 * Date: 11/8/12
 * Time: 1:59 PM
 * To change this template use File | Settings | File Templates.
 */
$(function(){

    window.Snippet = Backbone.Model.extend({

        clear: function() {
            this.destroy();
            this.view.remove();
        }

    });

    window.Snippets = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: Snippet

    });

    window.SnippetView = Backbone.View.extend({

        //... is a list tag.
        tagName:  "li",

        // Cache the template function for a single item.
        template: _.template($('#snippet-template').html()),

        // The DOM events specific to an item.
        events: {
            "click a.snippet-actions-delete"   : "clear"
        },

        // The TaskView listens for changes to its model, re-rendering. Since there's
        // a one-to-one correspondence between a **Task** and a **TaskView** in this
        // app, we set a direct reference on the model for convenience.
        initialize: function() {
            _.bindAll(this, 'render', 'close');
            this.model.bind('change', this.render);
            this.model.view = this;
        },

        // Re-render the contents of the task item.
        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            this.setTodo();
            return this;
        },

        // To avoid XSS (not that it would be harmful in this particular app),
        // we use `jQuery.text` to set the contents of the task item.
        setTodo: function() {
            var todo = this.model.get('todo');
            this.$('.task-content').text(todo);
            this.input = this.$('.task-input');
            this.input.bind('blur', this.close);
            this.input.val(todo);
        },

        // Switch this view into `"editing"` mode, displaying the input field.
        edit: function() {
            $(this.el).addClass("editing");
            this.input.focus();
        },

        // Close the `"editing"` mode, saving changes to the task.
        close: function() {
            this.model.save({todo: this.input.val()});
            $(this.el).removeClass("editing");
        },

        // If you hit `enter`, we're through editing the item.
        updateOnEnter: function(e) {
            if (e.keyCode == 13) this.close();
        },

        // Remove this view from the DOM.
        remove: function() {
            $(this.el).remove();
        },

        // Remove the item, destroy the model.
        clear: function() {
            this.model.clear();
        }

    });

    // The Application
    // ---------------

    // Our overall **AppView** is the top-level piece of UI.
    window.AppView = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: $("#container"),

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "click #snippet-actions-save":  "createOnEnter"
        },

        // At initialization we bind to the relevant events on the `Tasks`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting tasks that might be saved in *localStorage*.
        initialize: function() {
            this.$(".title").append(view.render().el);

            _.bindAll(this, 'addOne', 'addAll', 'render');

            this.input    = this.$("#new-task");

            Snippets.bind('add',     this.addOne);
            Snippets.bind('reset', this.addAll);
            Snippets.bind('all',     this.render);

            Snippets.fetch();
        },

        // Re-rendering the App just means refreshing the statistics -- the rest
        // of the app doesn't change.
        render: function() {
        },

        // Add a single snippet item to the list by creating a view for it, and
        // appending its element to the `<ul>`.
        addOne: function(snippet) {
            var view = new SnippetView({model: snippet});
            this.$("#snippets").append(view.render().el);
        },

        // Add all items in the **Snippets** collection at once.
        addAll: function() {
            Snippets.each(this.addOne);
        },

        // If you hit return in the main input field, create new **Task** model,
        // persisting it to *localStorage*.
        createOnEnter: function(e) {
            Tasks.create(this.newAttributes());
            this.input.val('');
        }

    });

    // Finally, we kick things off by creating the **App**.
    window.App = new AppView;

});

