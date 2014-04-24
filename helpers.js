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


