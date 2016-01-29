// SongQueue.js - Defines a backbone model class for the song queue.
window.SongQueue = Songs.extend({
  localStorage: new Backbone.LocalStorage("SongQueue"),

  initialize: function(){
    this.on('add', this.enqueue, this);
    this.on('ended', this.playNext, this);
    this.on('dequeue', this.dequeue, this);
  },
  // on enqueue, play the song if it is the first song
  enqueue: function(song){
    if(this.length === 1){
      this.playFirst();
    }
  },
  // on dequeue, remove the song; if it is the first song play next
  dequeue: function(song){
    if(song === this.at(0)){
      this.playNext();
    } else {
      this.remove(song);
    }
  },
  // play first song
  playFirst: function(){
    this.at(0).play();
  },
  // play next song
  playNext: function(){
    this.remove(this.at(0));
    if(this.length > 0){
      this.playFirst();
    } else {
      this.trigger('stop');
    }
  }
});
