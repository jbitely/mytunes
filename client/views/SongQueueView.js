// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({

  tagName: "table",

  initialize: function() {
    this.collection.on('add remove', this.render, this);
    this.render();
  },

  render: function() {
    this.$el.children().detach();

    this.$el.addClass('songlist queue').html('<th class="songlist-heading">Queue</th>').append(
      this.collection.map(function(song){
        return new SongQueueEntryView({model: song}).render();
      })
    );
  }

});


// this.THING.on('EVENTNAME', callback, context)
// this.listenTo('THINGTOLISTENTO', 'EVENTNAME', callback)
