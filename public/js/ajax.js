ajax = {
    socket: null,
    open: function() {
      var promise, s;
      promise = new Promise();
      s = this.path;
      if (this.port) {
        s = this.path + ":" + this.port;
      }
      this.socket = new io(s, {
        'forceNew': true
      });
      this.socket.on('connect', function() {
        return promise.resolve();
      });
      return promise;
    },
    close: function() {
      var promise;
      promise = new Promise();
      this.socket.close();
      promise.resolve();
      return promise;
    },
    emit: function(fn) {
      var callbacks;
      this._errors(fn, 'emit');
      callbacks = this._callbacks(fn);
      this.socket.emit(this.__namespace, this.__data, function(r) {
        if (callbacks.done != null) {
          return callbacks.done(r);
        }
      });
      this._reset();
      return this;
    },
    "do": function(fn) {
      var callbacks;
      this._errors(fn, 'do');
      callbacks = this._callbacks(fn);
      this.socket.on(this.__namespace, function(r) {
        if (callbacks.done != null) {
          return callbacks.done(r);
        }
      });
      this._reset();
      return this;
    },
    once: function(fn) {
      var callbacks;
      this._errors(fn, 'once');
      callbacks = this._callbacks(fn);
      this.socket.once(this.__namespace, function(r) {
        if (callbacks.done != null) {
          return callbacks.done(r);
        }
      });
      this._reset();
      return this;
    }
  };