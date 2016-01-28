// LibraryEntryView.js - Defines a backbone view class for the entries that will appear within the library views. These will be inserted using the "subview" pattern.
var LibraryEntryView = Backbone.View.extend({

  tagName: 'tr',

  template: _.template('<td class="artist">(<%= artist %>)</td><td class="title"><%= title %></td>'),

  events: {
    'click': function() {
      this.model.enqueue();
    }
  },

  render: function(){
    return this.$el.addClass('song').html(this.template(this.model.attributes));
  }

});
