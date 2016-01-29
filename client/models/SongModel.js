// SongModel.js - Defines a backbone model class for songs.
var SongModel = Backbone.Model.extend({
  localStorage: new Backbone.LocalStorage("Songs"),
  defaults: {
    "playCount": 0 // track number of times played
  },

  play: function(){
    // Triggering an event here will also trigger the event on the collection
    this.set('playCount', this.get('playCount') +1); // increment playCount on play
    this.trigger('play', this);
  },

  enqueue: function(){

    this.trigger('enqueue', this)
  },

  dequeue: function(){
    this.trigger('dequeue', this)
  },

  ended: function(){
    this.trigger('ended', this)
  }

});
