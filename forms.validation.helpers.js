/*
  * @function checkRequired
  *
  * Helper Function for Checking to see if an input element has had information entered
  *
  * @param elem { HTML Element }
  *
*/
function checkRequired ( elem ) {
	if ( elem.type == 'checkbox' || elem.type == 'radio' ) {
		return getInputsByName( elem.name ).numChecked;
	} else {
		return elem.value.length > 0 && elem.value != elem.defaultValue;
	}
}

/*
  * @function checkRequired
  *
  * Helper Function for Finding All Input Elements that Have a Specified Name
  * (good for finding and dealing with checkboxes or radio buttons)
  *
  * @param name { String }
  *
*/
function getInputsByName( name ) {
	// The array of input elements that will be matched
	var results = [];

	// Keep track of how many of them were checked
	results.numChecked = 0;

	// Find all the input elements in the document
	var input = document.getElementsByTagName( 'input' );
	for ( var i = 0; i < input.length; i++ ) {
		// Find all the fields that have the specified name
		if ( input[ i ].name == name ) {
			results.push( input[ i ] );

			// Remember how many if the fields were checked
			if ( input[ i ].checked ) {
				results.numChecked++;
			}
		}
	}

	// Return the set of matched fields
	return results;
}