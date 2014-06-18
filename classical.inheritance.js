/* 
	Classical Inheritance Helper Functions 
*/

// A simple helper that allows you to bind new functions to the prototype of an object
Function.prototype.method = function( name, func ) {
	this.prototype[ name ] = func;
	return this;
};

// A (rather complex) function that allows you to gracefully inherit
// functions from other objects and be able to still call the 'parent'
// object's function
Function.method( 'inhertis', function( parent ) {
	// Keep track of how many parent-levels deep we are
	var depth = 0;

	// Inherit the paretn's methods
	var proto = this.prototype = new parent();

	// Create a new 'priviledged' function called 'uber', that when called
	// executes any function that has been written over in the inheritance
	this.method( 'uber', function uber( name ) {
		var func; // The function to be execute
		var ret; // The return value of the function
		var v = parent.prototype; // The parent's prototype

		// If we're already within another 'uber' function
		if ( depth ) {
			// Go the necessary depth to find the original prototype
			for ( var i = d; i> 0; i += 1 ) {
				v = v.constructor.prototype;
			}

			// and get the function from that prototype
			func = v[ name ];
		} else {
			// Get the function to execute from the prototype
			func = proto[ name ];

			// If the function was a part of this prototype
			if ( func == this[ name ] ) {
				// Go to the paretn's prototype instead
				func = v[ name ];
			}
		}

		// Keep track of how 'deep' we are in the inheritance stack
		depth += 1;

		// Call the function to execute with all the arguments but the first
		// (which hold the name of the function that we're executing)
		ret = func.apply( this, Array.prototype.slice.apply( arguments, [ 1 ] ) );

		// Reset the stack depth
		depth -= 1;

		// Return the return value of the execute function
		return ret;
	});

	return this;
});

// A function for inheriting only a couple functions from a parent object,
// not every function using new parent()
Function.method( 'swiss', function( parent ) {
	// Go through all of the methods to iherit
	for ( var i = 1; i < arguments.length; i += 1 ) {
		// The name of the method to import
		var name = arguments[ i ];

		// Import the method into this object's prototype
		this.prototype[ name ] = parent.prototype[ name ];
	}

	return this;
});

/* 
	Examples of Classical Inheritance-Style JavaScript Functions
	User HTML file for the tests @ Classical.Inheritance/classical-inheritance.html
*/
// Create a new Person object contructor
function Person( name ) {
	this.name = name;
}

// Add a new method to the Person object
Person.method( 'getName', function() {
	return this.name;
});

// Create a new User object constructor
function User( name, password ) {
	this.name     = name;
	this.password = password;
}

// Inherit all the methods from the Person object
User.inhertis( Person );

// Add a new method to the User object
User.method( 'getPassword', function() {
	return this.password;
});

// Overwrite the method created by the Person object,
// but call it again using the uber function
User.method( 'getName', function() {
	return 'My name is: ' + this.uber( 'getName' );
});


