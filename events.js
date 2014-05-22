/**
 * @function HTMLElement.prototype.triggerEvent
 *
 * Event Dispatcher
 *
 * @param name {String} Event name to dispatch/fire/trigger
 *
 * @returns {HTMLElement} this element
**/
HTMLElement.prototype.triggerEvent = function ( name ) {
   var event;
   if ( document.createEventObject ) {
      // dispatch for IE
      event = document.createEventObject();
      this.fireEvent( 'on' + name, event );
   } else {
      // dispatch for normal browsers
      var event = document.createEvent( 'HTMLEvents' );
      event.initEvent( name, true, true );   // event type, bubbling, cancelable
      this.dispatchEvent( event );
   }
   return this;
}

/*--------------------------------------------------------------- MISSING API */
;(function ( HTMLElement ) {
   
   // Create an object that will be used as event registry 
   var registry = extend([], {   // inherit from Array
      add : function ( event_name, element, event_handler, proxy_handler ) {
         // first try to remove the handler if already registered
         this.remove.apply( this, arguments );
         this.push({
            event    : event_name,
            element  : element,
            handler  : event_handler,
            proxy    : proxy_handler
         });
      },
      get : function ( event_name, element, event_handler ) {
         for ( var i=0, l=this.length; i<l; i += 1 ) {
            if ( this[i].event == event_name && this[i].element == element && this[i].handler == event_handler ) {
               return this[i];
            }
         }
         return null;
      },
      remove : function ( event_name, element, event_handler ) {
         var data = this.get.apply( this, arguments );
         if ( data ) {
            this.splice( this.indexOf( data ), 1 );
         }
      }
   });
   
   /** 
    * HTMLElement.prototype.addEventListener
    *
    * Registers event handler
    * Similar interface for platforms lacking this W3C method
    *
    * @param name    {String}    Event name/type
    * @param handler {Function}  Function that handles the event; accepts event object as argument
    *
    * @returns {HTMLElement} this element
   **/
   ! HTMLElement.prototype.addEventListener && (HTMLElement.prototype.addEventListener = function ( name, handler ) {
      // first make sure the platform supports `attachEvent`
      // `this` refers to the HTML element
      if ( this.attachEvent ) {
         // Register a "proxy" handler that will call the original handler &
         // set the proper context & pass the event object.
         var proxy_handler = function ( handler ) {
            // Call the handler, setting the HTML element as context and passing the
            // Event Object.
            handler.call( this, extend( window.event, {
               target            : window.event.srcElement,
               preventDefault    : function () {
                  this.returnValue = false;
               },
               stopPropagation   : function () {
                  this.cancelBubble = true;
               }
            }) );
         }.bind( this, handler );   // bind `this` element and the `handler`
         // attach the event
         this.attachEvent( 'on' + name, proxy_handler );
         // map the real handler with the originally passed handler
         registry.add( name, this, handler, proxy_handler );
      }
      return this;
   });
   
   /** 
    * HTMLElement.prototype.removeEventListener
    *
    * Removes event handler
    * Similar interface for platforms lacking this W3C method
    *
    * @param name    {String}    Event name/type
    * @param handler {Function}  Function that handles the event
    *
    * @returns {HTMLElement} this element
   **/
   ! HTMLElement.prototype.removeEventListener &&
   (HTMLElement.prototype.removeEventListener = function ( name, handler ) {
      // first make sure the platform supports `attachEvent`
      // `this` refers to the HTML element
      if ( this.detachEvent ) {
         // try to get data from the registry
         var data = registry.get( name, this, handler );
         if ( data ) {
            registry.remove( name, this, handler );
            // detach the event handler
            this.detachEvent( 'on' + name, data.proxy );
         }
      }
      return this;
   });
   
})( HTMLElement );