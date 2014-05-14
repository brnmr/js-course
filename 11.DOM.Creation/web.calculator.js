
	/* 
	 * Create a function which will create a web based calculator with basic functionality.
	 * The function will be called when the body is loaded (onload)
	*/

	function createCalculator () {

		var calcFragment = document.createDocumentFragment(); // create fragment that will hold calculator's elements
		var calc = document.createElement( 'div' ); // create the calculator wrapper
		var calcDisplay = document.createElement ( 'div' ); // create calculator display	

		calcFragment.appendChild( calcDisplay ); // add the calculator's display to the Fragment

		// create all buttons within the calculator and assigning content
		for ( i = 0; i < 17; i += 1 ) {

			var button = document.createElement( 'div' );
			button.setAttribute( 'class', 'button' );
			button.innerHTML = i;

			switch ( i ) {
				case 0 :
					button.innerHTML = '8';
					break;
				case 1 :
					button.innerHTML = '9';
					break;
				case 2 :
					button.innerHTML = '-/+';
					break;
				case 3 :
					button.innerHTML = '6';
					break;
				case 4 :
					button.innerHTML = '7';
					break;
				case 5 :
					button.innerHTML = '/';
					break;
				case 6 :
					button.innerHTML = '4';
					break;
				case 7 :
					button.innerHTML = '5';
					break;
				case 8 :
					button.innerHTML = '*';
					break;
				case 9 :
					button.innerHTML = '2';
					break;
				case 10 :
					button.innerHTML = '3';
					break;
				case 11 :
					button.innerHTML = '-';
					break;
				case 12 :
					button.innerHTML = '0';
					break;
				case 13 :
					button.innerHTML = '1';
					break;
				case 14 :
					button.innerHTML = '+';
					break;
				case 15 :
					button.innerHTML = 'C';
					break;
				case 16 :
					button.innerHTML = '=';
					button.setAttribute( 'class', 'button equalize' );
					break;
			}
			
			calcFragment.appendChild( button ); // add all buttons to the Fragment

		}
		calc.setAttribute( 'class', 'calculator' );
		calcDisplay.setAttribute( 'class', 'display' );				
		calc.appendChild( calcFragment ); //

		// Inject the content of calculator's into body
		document.body.inject( document.querySelector( 'body' ), 'bottom', calc );
	}