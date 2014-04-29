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
      // Try to get existing item
      var item = this.getItemById( options.id );
      if ( item ) {
         this.increase( item, quantity );
         return;
      }
      // Create new item 
      this.createItem( options );  
   },

   increase : function ( item, quantity ) {
      item.add( quantity );
   },
   
   createItem : function ( options ) {
      this.items.push( new Item( options ) );
   },

   getItemById : function (id) {
      for ( var i=0, i<items.length; i += 1) {
         if ( this.items[ i ].get( 'id' ) == id ) {
            return this.items[ i ];
         }
         return null;
      }
   },

   remove : function ( item ) {
      if ( typeof item == 'string' ) {
         // we assume that item is actually the item ID
         item = this.getItemById( item );
      } 
      var index = this.items.indexOf( item );
      if ( index > -1 ) {
         this.items.splice( index, 1);
      }   
   },

   decrease : function () {

   },
   
   getItems : function () {
      
   },
   
   getSubtotal : function () {
      
   },
   
   getShipping : function () {
      
   },
   
   getTax : function () {
      
   },
   
   getTotal : function () {
      
   },
   
   purchase : function () {
      
   }
   
};