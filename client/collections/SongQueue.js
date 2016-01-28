// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){
    this.on('add', function(song){
      if(this.length === 1){
        this.playFirst();
      }
    },this)

  },
  playFirst: function(){


  }
  // play first song method (playFirst)

  // remove song method



});
