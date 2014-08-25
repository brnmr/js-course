/*
 * A Standard Set of Rules and Descriptive Error Messages for Building a Basic
 * Validation Engine.
 *
 */
 var errMsg = {
 	// Check for when a specified field is required
 	required : 
 	{
 		msg : 'This field is required.',
 		test : function( elem, load ) {
 			// Make sure that there is no text was entered in the field
 			// and we aren't checking on page load (showing 'field required'
 			// messages would be annoying on page load)
			return elem.value.length > 0 || load || elem.value == elem.defaultValue;
 		}
 	},

 	// Make sure that the field is a valid email address
 	email :
 	{
 		msg  : 'Not a valid email address.',
 		test : function( elem ) {
 			// Make sure that something was entered and that it looks like
 			// an email address
 			return !elem.value || /^[a-z0-9_+.-]+\@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/i.test( elem.value ); 
 		}
 	},

 	// Make sure the field is a phone number
 	phone :
 	{
 		msg  : 'Not a valid phone number.',
 		test : function( elem ) {
 			// Check to see if we have something that looks like
			// a valid phone number
			var m = /(\d{3}).*(\d{3}).*(\d{4})/.exec( elem.value );

			// If it is, seemingly, valid - force it into the specific
			// format that we desire: (123) 456-7890
			if ( m ) {
				elem.value = "(" + m[1] + ") " + m[2] + "-" + m[3];
			}
			return !elem.value || m;	
 		}
 	},

 	// Make sure that the field is a valid MM/DD/YYYY date
 	date : 
 	{
 		msg  : 'Not a valid date.',
 		test : function( elem ) {
 			// Make sure that something is entered, and that it
			// looks like a valid MM/DD/YYYY date
			return !elem.value || /^\d{2}\/\d{2}\/\d{2,4}$/.test(elem.value);	
 		}
 	},

 	// Make sure that the field is a valid URL
 	url : 
 	{
 		msg  : 'Not a valid URL.', 
 		test : function( elem ) {
 			// Make sure that some text was entered, and that it's
			// not the default http:// text
			return !obj.value || obj.value == 'http://' ||
					// Make sure that it looks like a valid URL
					/^https?:\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/.test( obj.value );	
 		}
 	}
 };