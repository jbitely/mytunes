// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){
    this.on('add', function(song){
      console.log('song added');
      if(this.length === 1){
        this.playFirst();
      }
    },this),
    this.on('ended', function(){
      this.remove(this.at(0));
      if(this.length > 0){
        this.playFirst();
      }
    }, this)
    this.on('dequeue', function(song){
      if(this.at(0) === song){
        this.remove(song);
        this.playFirst();
      }
      this.remove(song);
    })

  },

  // play first song method (playFirst)
  playFirst: function(){
    this.at(0).play();
  }

});
