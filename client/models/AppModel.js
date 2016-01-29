// App.js - Defines a backbone model class for the whole app.
var AppModel = Backbone.Model.extend({
  defaults: {
    supportsLocalStorage: false
  },
  initialize: function(params){
    this.set('currentSong', new SongModel());
    this.set('songQueue', new SongQueue());

    // local storage hook
    this.set('supportsLocalStorage', this.supports_html5_storage());
    this.resumeApp();

    /* Note that 'this' is passed as the third argument. That third argument is
    the context. The 'play' handler will always be bound to that context we pass in.
    In this example, we're binding it to the App. This is helpful because otherwise
    the 'this' we use that's actually in the function (this.set('currentSong', song)) would
    end up referring to the window. That's just what happens with all JS events. The handlers end up
    getting called from the window (unless we override it, as we do here). */

    params.library.on('play', function(song){
      this.set('currentSong', song);
      this.saveAppState();
    }, this);
    this.get('library').on('enqueue', function(song){
      // add song to songQueue
      this.get('songQueue').add(song);
    }, this);
    this.get('songQueue').on('stop', function(song){
      this.set('currentSong', null);
    }, this);
  },

  supports_html5_storage: function(){
    try {
      console.log('trying local storage');
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      console.log('local storage unsupported');
      return false;
    }
  },

  saveAppState: function(){
    if(!this.get('supportsLocalStorage')){ return false }; // if local storage isn't supported, peace out
    console.log('saving some stuff to storage');
    console.log(this);
    localStorage["app.savedState"] = true; // acknowledge saved state
    localStorage["app.currentSong"] = this.get('currentSong'); // save current song
    return true;
  },

  resumeApp: function(){
    if(!this.get('supportsLocalStorage')){ return false }; // if local storage isn't supported, peace out
    if(localStorage["app.savedState"] !== true) { return false } // if no state saved, peace out
    console.log('getting some stuff from storage');
    app.set('currentSong', localStorage["app.currentSong"]); // set current song

    return true;
  }
});
