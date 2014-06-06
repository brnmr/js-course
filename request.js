/** 
 * @namespace Request
 *
 * @requires `extend`
 * @requires `QueryString`
 * @requires `Class`
**/

var Request = {};

Request.XHR = new Class({
   
   // default parameters
   params      : {
      async       : true,
      url         : '',
      method      : 'get',
      data        : '',
      onSuccess   : function ( response ) {}
   },
   
   // our XHR object
   xhr         : null,
   
   initialize  : function ( params ) {
      extend( this.params, params );
      // `url` is required
      if ( ! this.params.url ) {
         throw new Error('Please provide `url` parameter');
      }
      // create the XHR
      this.xhr = new XMLHttpRequest();
      // add event handler
      this.xhr.onload = function ( e ) {
         this.params.onSuccess( this.xhr.responseText );
      }.bind( this );
   },
   
   send        : function ( data ) {
      // stringify data object
      data = QueryString.stringify( extend( this.params.data, data || {} ) );
      // in case the method is GET, embed the params into the url
      if ( this.params.method.toLowerCase() == 'get' ) {
         this.params.url += ( this.params.url.indexOf('?') > 0 ? '&' : '?' ) + data;
      }
      // open state
      this.xhr.open( this.params.method.toUpperCase(), this.params.url, this.params.async );
      // set proper header
      this.xhr.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
      // finally send the request
      this.xhr.send( data );
   }
   
});