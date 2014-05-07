/**
 * @function typeOf
 *
 * Accepts mixed content & returns the correct type.
 *
 * @param variable {Mixed}
 *
 * @returns {String}
 **/
function typeOf( variable ) {
    var type = typeof variable;
    switch ( true ) {
        case String( variable ) == 'null':
            return 'null';
        case type == 'number' && isNaN( variable ):
            return 'NaN';
        case variable === window:
            return 'window';
        case variable === document:
            return 'document';
        case variable && !!variable.tagName:
            return 'element';
        case variable && variable.nodeType == 3:
            return 'textnode';
        case type == 'object':
            switch ( variable.constructor ) {
                case Array:
                    return 'array';
                case String:
                    return 'string';
                case Number:
                    return 'number';
                case Boolean:
                    return 'boolean';
            }
    }
    return type;
}

/**
 * @function toArray
 *
 * Accepts mixed parameters and transforms them into Array.
 *
 * @param mixed {Mixed}
 *
 * @returns {Array}
 **/
function toArray( mixed ) {
    if ( mixed.length ) {
        return Array.prototype.slice.call( mixed );
    }
    return [ mixed ];
}

/**
 * @function extend
 *
 * Extends one object with properties of other objects
 *
 * @param obj {Object} The object to extend
 *
 * @returns {Object} The extended object
 **/
function extend( obj ) {
    for ( var i=1, l=arguments.length; i<l; i += 1 ) {
        for ( var name in arguments[i] ) {
            if ( arguments[i].hasOwnProperty( name ) ) {
                obj[ name ] = arguments[i][ name ];
            }
        }
    }
    return obj;
}

/**
 * @function generateID
 *
 * Generates unique string
 * Uses `prefix` parameter as prefix or "id" by default
 *
 * @param prefix {String} String prefix, default "id"
 *
 * @returns {String}
 **/
function generateID( prefix ) {
    return ( prefix || 'id' ) + '-' + Math.round(Math.random() * 100000000000) +
        new Date().getTime();
}

/*--------------------------------------------------------------- MISSING API */

/**
 * Function.prototype.bind
 *
 * Creates new function and on execution calls that function, changing the context
 * and passing some arguments.
 *
 * @param context {Object} The new function context (represented by `this`)
 * @param argN {Mixed} Arguments that will be "hard-coded" in the new function
 *
 * @returns {Function}
 **/
! Function.prototype.bind && (Function.prototype.bind = function () {
    var args = [].slice.call( arguments ); // transform `arguments` into real array
    var obj = args.shift(); // `obj` is our function context
    var fn = this; // `fn` is the source function

    // Create new function that calls our original function, applying
    // `obj` as context and binding the remaining parameters.
    return function () {
        // On execution, we call the source `fn` function with `obj` as context.
        // We also concatinate the bound `args` with passed `arguments`.
        return fn.apply( obj, args.concat.apply( args, arguments ) );
    }
});

/**
 * Array.prototype.forEach
 *
 * Loops an array and executes a callback function for every element of the array
 *
 * @param callback {Function} The callback function to be executed
 * @param context {Object} The callback context (represented by `this`)
 *
 * @returns {Array} The same array
 **/
! Array.prototype.forEach && (Array.prototype.forEach = function ( callback, context ) {
    // `this` is our array
    // perform a standard for loop
    for ( var i=0, l=this.length; i<l; i += 1 ) {
        // For every element of the array, call the `callback` fn applying the `context`,
        // and pass the element, index, and the array itself as arguments.
        callback.call( context, this[i], i, this );
    }
    return this; // enable chaining
});

/**
 * Array.prototype.filter
 *
 * Loops an array and executes a callback filter function for every element of the array
 * Returns new array with filtered elements
 * The callback fn must return truthy value if we want the element in the new array
 *
 * @param callback {Function} The callback function to be executed
 * @param context {Object} The callback context (represented by `this`)
 *
 * @returns {Array} The same array
 **/
! Array.prototype.filter && (Array.prototype.filter = function ( callback, context ) {
    var filtered_arr = []; // our new filtered array
    // `this` is our array
    // perform a standard for loop
    for ( var i=0, l=this.length; i<l; i += 1 ) {
        // For every element of the array, call the `callback` fn applying the `context`,
        // and pass the element, index, and the array itself as arguments.
        // Push the element into the filtered array if the `callback` returns truthy value.
        callback.call( context, this[i], i, this ) && filtered_arr.push( this[i] );
    }
    return filtered_arr; // the new filtered array
});

/**
 * Array.prototype.indexOf
 *
 * Returns first index of an element (if exists) inside the array, otherwise returns -1
 *
 * @param item {Mixed} The element we're searching for
 *
 * @returns {Number}
 **/
! Array.prototype.indexOf && (Array.prototype.indexOf = function ( item ) {
    for ( var i=0, l=this.length; i<l; i += 1 ) {
        if ( item === this[i] ) {
            return i;
        }
    }
    return -1;
});

/**
 * Array.prototype.lastIndexOf
 *
 * Returns last index of an element (if exists) inside the array, otherwise returns -1
 *
 * @param item {Mixed} The element we're searching for
 *
 * @returns {Number}
 **/
! Array.prototype.lastIndexOf && (Array.prototype.lastIndexOf = function ( item ) {
    for ( var i=this.length-1; i>=0; i -= 1 ) {
        if ( item === this[i] ) {
            return i;
        }
    }
    return -1;
});