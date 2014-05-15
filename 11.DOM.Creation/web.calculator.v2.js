	/* 
	 * Create a function which will create a web based calculator with basic functionality.
	 * The function will be called when the body is loaded (onload)
	*/

	function createCalculator2 () {

		var calcContainer    = document.getElementById( 'calc2' );
		var calcDisplay      = document.createElement( 'div' );
		var calcFragmentWrap = document.createDocumentFragment(); 

		calcDisplay.setAttribute( 'class', 'display' );
		calcFragmentWrap.appendChild( calcDisplay );

		var actions = {
			'equal'    : '=',
			'plus'     : '+',
			'minus'    : '-',
			'divide'   : '/',
			'multiply' : '*'
		}

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

		

		for ( var property in actions ) {
			
			if ( actions.hasOwnProperty( property ) ) {
				var htmlEl = document.createElement( 'div' );
				htmlEl.innerHTML = actions[ property ];	
				//actions[ property ] = document.createElement( 'div' );					
				htmlEl.setAttribute( 'class', 'button action' );
				calcFragmentWrap.appendChild( htmlEl );
				
			}
		}

		for ( var property in numbers ) {
			if ( numbers.hasOwnProperty( property ) ) {
				var htmlEl = document.createElement( 'div' );
				htmlEl.innerHTML = numbers[ property ];
				htmlEl.setAttribute( 'class', 'button');
				calcFragmentWrap.appendChild( htmlEl);
			}
		}

		calcContainer.appendChild( calcFragmentWrap );
		document.body.inject( document.querySelector( 'body' ), 'bottom', calcContainer );	
}