!window.HTMLElement && (HTMLElement = Element); // IE8

/**
 * @function getElemsByTag
 *
 * Returns all matched elements by their tag name
 *
 * @param tag {String} tag name, default '*'
 * @param ancestor {Element} element, default `document`
 *
 * @returns {NodeList}
 **/
function getElemsByTag( tag, ancestor ) {
    tag = tag || '*'; // get all elements by default
    ancestor = ancestor || document;
    return ancestor.getElementsByTagName( tag );
}

/**
 * @function getElemsByClass
 *
 * Returns all matched elements having class name(s)
 *
 * @param name {String} class name(s)
 * @param ancestor {Element} element, default `document`
 *
 * @returns {NodeList}
 **/
function getElemsByClass( name, ancestor ) {
    ancestor = ancestor || document;
    return ancestor.getElementsByClassName( name );
}

/**
 * @function getPrevious
 *
 * Returns previous sibling, ignoring white space
 *
 * @param elem {HTMLElement} The element whose previous sibling we want to get
 *
 * @returns {HTMLElement}
 **/
function getPrevious( elem ) {
    do {
        elem = elem.previousSibling;
    } while ( elem && ! elem.tagName );
    return elem;
}

/**
 * @function getNext
 *
 * Returns next sibling, ignoring white space
 *
 * @param elem {HTMLElement} The element whose next sibling we want to get
 *
 * @returns {HTMLElement}
 **/
function getNext( elem ) {
    do {
        elem = elem.nextSibling;
    } while ( elem && ! elem.tagName );
    return elem;
}

/**
 * @function getChildren
 *
 * Returns element's children, ignoring white space
 *
 * @param elem {HTMLElement} The element whose children (HTML elements) we want to get
 *
 * @returns {Array}
 **/
function getChildren( elem ) {
    var children = [].slice.call( elem.childNodes );
    return children.filter( function ( child ) {
        return !! child.tagName;
    });
}

/** 
 * @function inject
 * 
 * Injects element related to another element in the DOM
 *
 * @param relative   {HTMLElement}  The element relative to which we want to place our element
 * @param where      {String}       The position related to the relative element, default "bottom"
 * @param elem       {HTMLElement}  The element we want to inject
**/
function inject( relative, where, elem ) {
   if ( ! elem || ! relative ) {
      throw new Error( '`inject` requires `elem` and `relative` params' );
   }
   // default position is "bottom"
   if ( ['top', 'bottom', 'before', 'after'].indexOf( where ) < 0 ) {
      where = 'bottom';
   }
   switch ( where ) {
   case 'bottom':
      relative.appendChild( elem );
      break;
   case 'top':
      // try insertBefore firstChild
      var first_child = getChildren( relative )[0];
      first_child && relative.insertBefore( elem, first_child ) ||
            relative.appendChild( elem );
      break;
   case 'before':
      var parent_node = relative.parentNode;
      // we just can't inject before `document`, <html>
      if ( [undefined, document, document.documentElement].indexOf( parent_node ) > -1 ) {
         throw new Error( 'Cannot `inject` "before"' );
      }
      parent_node.insertBefore( elem, relative );
      break;
   case 'after':
      var next_sibling = getNext( relative );
      if ( next_sibling ) {
         inject( next_sibling, 'before', elem );
      } else if ( relative.parentNode ) {
         // appendChild will do here
         relative.parentNode.appendChild( elem );
      } else {
         throw new Error( 'Cannot `inject` "after"' );
      }
   }
}

/** 
 * @function grab
 * 
 * Adopts given element
 *
 * @param child   {HTMLElement}  The element we want to adopt
 * @param where   {String}       The position we want to inject the child, default "bottom"
 * @param elem    {HTMLElement}  The parent element
**/
function grab( child, where, elem ) {
   if ( ['top', 'bottom'].indexOf( where ) < 0 ) {
      where = 'bottom';
   }
   inject( elem, where, child );
}

/** 
 * @function wrap
 * 
 * Injects element next to a specified element and then adopts that element
 *
 * @param child   {HTMLElement}  The element we want to adopt
 * @param where   {String}       The position we want to inject the child, default "bottom"
 * @param elem    {HTMLElement}  The parent element
**/
function wrap( child, where, elem ) {
   // first `inject` the `elem` next to the `child`
   inject( child, 'before', elem );
   // then grab the `child`
   grab( child, where, elem );
}

// Adding these methods to HTMLElement.prototype
[
   'getElemsByTag',
   'getElemsByClass',
   'getPrevious',
   'getNext',
   'getChildren',
   'getStyle',
   'setStyle',
   'inject',
   'grab',
   'wrap'
].forEach( function ( fn ) {
   HTMLElement.prototype[ fn ] = function () {
      var args = [].slice.call( arguments );
      args.push( this );
      return window[ fn ].apply( null, args );
   }
});

/*--------------------------------------------------------------- MISSING API */

/**
 * HTMLElement.prototype.remove
 *
 * Removes an element from DOM
 *
 * @returns {HTMLElement}
**/
! HTMLElement.prototype.remove && (HTMLElement.prototype.remove = function () {
   this.removeNode( true );
   return this;
});