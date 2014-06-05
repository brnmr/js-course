var Product = new Class({
   
   options     : {},
   
   initialize  : function ( options ) {
      // Extend default options
      this.options = extend({
         id          : generateID('product'),
         description : '',
         price       : 0,
         shipping    : 0
      }, options);
      
      // Throw error if name is not provided
      if ( ! options.name ) {
         throw new Error('Please give this `Product` a name!');
      }
      
      // Make sure price is always >= 0
      if ( options.price < 0 ) {
         throw new Error('Please enter positive price or zero!');
      }
   },
   
   get : function ( property ) {
      return this.options[ property ] || '';
   },
   
   getOptions : function () {
      return extend({}, this.options);
   },
   
   set : function ( property, value ) {
      // Make sure we allow only properties by specification
      if ( ['name', 'description', 'price'].indexOf( property ) > -1 ) {
         this.options[ property ] = value;
      }
   },
   
   addToCart : function ( quantity ) {
      ShoppingCart.add( this.getOptions(), 1 );
   }
   
});