	/* 
	 * Create a function which will create a web based calculator with basic functionality.
	 * The function will be called when the body is loaded (onload)
	*/

	function createCalculator2 () {

		var calcContainer    = document.getElementById( 'calc2' ); // Calculator's container
		var calcDisplay      = document.createElement( 'div' ); // Calcilators' display
		var calcFragmentWrap = document.createDocumentFragment(); // our Fragment

		calcDisplay.setAttribute( 'class', 'display' );
		calcFragmentWrap.appendChild( calcDisplay ); // add Calculator's Dispaly to the Fragment

		// Calculator Actions Obj
		var actions = {
			'equal'    : '=',
			'plus'     : '+',
			'minus'    : '-',
			'divide'   : '/',
			'multiply' : '*'
		}

		// Calculator Buttons Obj
		var numbers = {
			'button_00' : '0',
			'button_01' : '1',
			'button_02' : '2',
			'button_03' : '3',
			'button_04' : '4',
			'button_05' : '5',
			'button_06' : '6',
			'button_07' : '7',
			'button_08' : '8',
			'button_09' : '9'
		}

		
		// create all Action's buttons and add them to the Fragment
		for ( var property in actions ) {
			
			if ( actions.hasOwnProperty( property ) ) {
				var htmlEl = document.createElement( 'div' );
				htmlEl.innerHTML = actions[ property ];								
				htmlEl.setAttribute( 'class', 'button action' );
				calcFragmentWrap.appendChild( htmlEl );
				
			}
		}

		// create all Number's buttons and add them to the Fragment
		for ( var property in numbers ) {
			if ( numbers.hasOwnProperty( property ) ) {
				var htmlEl = document.createElement( 'div' );
				htmlEl.innerHTML = numbers[ property ];
				htmlEl.setAttribute( 'class', 'button');
				calcFragmentWrap.appendChild( htmlEl);
			}
		}

		// Append the Fragment with all Calculator's components to Calculator's container
		calcContainer.appendChild( calcFragmentWrap );
		// inject the Calculator's container to the body
		document.body.inject( document.querySelector( 'body' ), 'bottom', calcContainer );	
}