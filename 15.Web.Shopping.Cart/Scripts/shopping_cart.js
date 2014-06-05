var ShoppingCart = {
   
   options : {
      currency : 'USD',
      shipping : function () { return 0; },
      tax      : function () { return 0; }
   },
   
   items : [],
   
   getOptions : function () {
      return extend( {}, this.options );
   },
   
   setOptions : function ( options ) {
      extend( this.options, options || {} );
   },
   
   add : function ( options, quantity ) {
      // Try to get existing Item
      var item = this.getItemByID( options.id );
      if ( item ) {
         this.increase( item, quantity );
         return;
      }
      // Create new Item
      this.createItem( options );
   },
   
   increase : function ( item, quantity ) {
      item.increase( quantity );
   },
   
   getItemByID : function ( id ) {
      for ( var i=0; i<this.items.length; i += 1 ) {
         if ( this.items[i].get('id') == id ) {
            return this.items[i];
         }
      }
      return null;
   },
   
   createItem : function ( options ) {
      this.items.push( new Item( options ) );
   },
   
   remove : function ( item ) {
      if ( typeof item == 'string' ) {
         // we assume that `item` is actually the item ID
         item = this.getItemByID( item );
      }
      var index = this.items.indexOf( item );
      if ( index > -1 ) {
         this.items.splice( index, 1 );
      }
   },
   
   decrease : function ( item, quantity ) {
      // If current quantity <= `quantity`, remove the item
      if ( item.get('quantity') <= quantity ) {
         this.remove( item );
         return;
      }
      item.decrease( quantity );
   },
   
   getItems : function () {
      return [].slice.call(this.items);
   },
   
   getSubtotal : function () {
      
   },
   
   getShipping : function () {
      
   },
   
   getTax : function () {
      
   },
   
   getTotal : function () {
      this.getSubtotal() + this.getShipping() + this.getTax();
   },
   
   purchase : function () {
      this.clear();
      console.log( 'Purchase has been made' );
      this.listItems();
   },
   
   clear : function () {
      this.items.length = 0;
   }
   
};