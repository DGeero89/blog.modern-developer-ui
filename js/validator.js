(function(window){

	var validator = {};


	/*
	*
	* Checks if input is an email address. An email address consists of two strings combined by an @ symbol.
	*
	*/

	validator.isEmailAddress = function(input){
        
        //Check if input is string, has minimum # of characters, contains an "@" and contains no spaces
		if(typeof input !== 'string' || input.length < 5 || input.indexOf("@") === -1 || input.indexOf(" ") !== -1 ) throw "Please enter a valid input.";

		//Split Input
		var isEmail = false,
			arr = input.split("@"),
            local = arr[0],
			domain = arr[1].split(".");
      
        //Check if arr.length is 2 to make sure only 1 "@" symbol, 
        //if domain length is 2 so only 1 "." 
        //and there is at least one character after the "@"  and before the "."
      
		if (arr.length === 2 && domain.length === 2 && domain[0].length > 0){
			isEmail = true;
		}
        
		return isEmail;
      

	};

	/*
	*
	* Checks if input is a valid address
	*
	*/

	validator.isAddress = function(input){

		if(!input){
			throw "Please enter a valid address.";
		}

		var address = input.split(' '),
				length = address.length,
				streetNumber = input[0],
				streetName = "",
				numberLength = streetNumber.length,
				isAnAddress;

		for(var i = 1; i < length; i++){
			streetName += address[i] + " ";
		}

		if( length >= 2 && Number(streetNumber) && streetName.length > 2 && !(Number(streetName)) ){
			isAnAddress = true;
		} else {
			isAnAddress = false;
		}

		return isAnAddress;
	};

	/*
	*
	* Checks if the input parameter is a valid phone number for your country.
	*
	*/

	validator.isPhoneNumber = function(input){

		//Check if there is input and if length of input matches possible USA phone number length
		if(input === undefined || !input ){
			throw "Please enter a valid phone number.";
		}
      
   	//Declare variables
   	var phoneNum = [],
   			isPhoneNum = false;

   	//Check validity if length is 13 (541)-111-2222
   	if(input.length === 13 && (input[0] !== '(' || input[4] !== ')' || input[8] !== '-' )) {
   		return isPhoneNum;
   	}

   	//Check that dash marks are only symbols used if length is 12
   	if(input.length === 12 && (input[3] !== "-" || input[7] !== "-")){
   		return isPhoneNum;
   	}
      
    //Loop over input and push valid numbers to phoneNum array
    for(var i = 0; i < input.length; i++){
      if(Number(input[i])){
        phoneNum.push(input[i]);
      }
    }
      
    //Check if length is 10 and is valid phone number. Return true or false
    if(phoneNum.length === 10){
    	isPhoneNum = true;
      return isPhoneNum;
    } else {
    	return isPhoneNum;
    }

    return isPhoneNum;
      
	};

	/*
	*
	* Returns the input parameter text with all symbols removed. Symbols refer to any non-alphanumeric character. 
	* A character is considered alphanumeric if it matches one of the following: a—z, A—Z, or 0—9. Ignore whitespace.
	*
	*/

	validator.withoutSymbols = function(input){

		//Check for valid input
		if(!input || input === undefined || typeof input !== "string"){
			throw "Please enter valid input.";
		}
	      
	    //Create new sentence
	    var sentence = "";
	      
	    //Loop over input, if not a symbol add character to the new sentence
	    for(var i = 0; i < input.length; i++){
	    	if(input[i].toLowerCase() !== input[i].toUpperCase() || input[i] === " " || input[i] === ","){
	    		sentence += input[i];
	    	}
	    }
	    return sentence;
    
	};

	/*
	*
	* Checks if the input parameter text is a valid date.
	*
	*/

	validator.isDate = function(input){
      
      	//Check for valid input
      	if(!input || input === undefined){
        	throw "Please enter valid input.";
      	}
     
      	//Return true or false if valid date
      	return !isNaN(Date.parse(input));
      
	};

	/*
	*
	* Checks if the input parameter is a date that comes after the reference date. 
	* Both the input and the reference can be strings or Date Objects. This function 
	* relies on two valid dates; if two are not found, it should throw a new error.
	*
	*/

	validator.isBeforeDate = function(input, reference){
    	
    	//Check valid input
	    if(isNaN(Date.parse(input)) || isNaN(Date.parse(input))){
	      throw "Please enter two valid dates.";
	    }
   		
   		//Return true of false if input is after 
    	return Date.parse(input) < Date.parse(reference);
      
	};

	/*
	*
	* Checks if the input parameter is a date that comes before the reference date. 
	* Both the input and the reference can be strings or Date Objects. This function 
	* relies on two valid dates; if two are not found, it should throw a new error.
	*
	*/

	validator.isAfterDate = function(input, reference){
    
	    //Check valid input
	    if(isNaN(Date.parse(input)) || isNaN(Date.parse(reference))){
	      throw "Please enter two valid dates.";
	    }
   
    	return Date.parse(input) > Date.parse(reference);
      
	};

	/*
	*
	* Checks if the input parameter is a date that comes before today. The input 
	* can be either a string or a Date Object. This function relies on one valid date; 
	* if one is not found, it should throw a new error.
	*
	*/

	validator.isBeforeToday = function(input){
    	
    	//Check valid input
	    if(isNaN(Date.parse(input))){
	      throw "Please enter a valid input.";
	    }
  
        var today = new Date(Date.now());
   		
   		//Return true of false if input is before today
    	return Date.parse(input) < today;
      
	};

	/*
	*
	* Checks if the input parameter is a date that comes after today. The input 
	* can be either a string or a Date Object. This function relies on one valid date; 
	* if one is not found, it should throw a new error.
	*
	*/

	validator.isAfterToday = function(input){
    	
    	//Check valid input
	    if(isNaN(Date.parse(input))){
	      throw "Please enter a valid input.";
	    }
  
        var today = new Date(Date.now());
   		
   		//Return true of false if input is before today
    	return Date.parse(input) > today;
      
	};

	/*
	*
	* Checks the input parameter and returns true if it is an empty string–a string 
	* with no length or characters that is represented as "" or only contains whitespace(s).
	*
	*/

	validator.isEmpty = function(input){
    	
	    var empty = false;
	    
	    if(typeof input === "string" && input.length === 0){
	      empty = true;
	    }else if(typeof input === "string" && input.length >= 1){
	      
	      for(var i = 0; i < input.length; i++){
	        
	      	if(input[i] !== " "){
		      return empty;
		    }

	      }

	      empty = true;
	    }
	     
	      return empty;
        
    };

    /*
	*
    * Checks if the input text parameter contains one or more of the words within 
    * the words array. A word is defined as the following: having undefined, whitespace, 
    * or punctuation before and after it. The function should be case-insensitive.
	*
	*/


	validator.contains = function (input,words) {
	  
		if (!input || !words) {
	    	throw "Please enter two valid arguments.";
		}

		var found;
		var sentence = input.toLowerCase();
		var beforeChar;
		var afterChar;
		var lowerCaseWord;
		var i;
	  
		//Loop over words array
	  	for (i = 0; i < words.length; i++) {
	    
		    //Check if word is found in sentence
		    if (sentence.indexOf(lowerCaseWord >= 0)){
		      
			   	//Set the word to look for to lower case
			    lowerCaseWord = words[i].toLowerCase();

			    //Assign the value of the character before the word found in the sentence
			    beforeChar = sentence.charAt(sentence.indexOf(lowerCaseWord)-1);

			    //Assign the value of the character after the word found in the sentence
			    afterChar = sentence.charAt(sentence.indexOf(lowerCaseWord) + lowerCaseWord.length);
		    
		    	//Check that the character before is not a letter
		    	if (!(beforeChar >= "a" && beforeChar <= "z")) {

		    		//Check that the character after is not a letter
		        	if(!(afterChar >= "a" && afterChar <= "z")) {
		          		found = true;
		        	} else {
		        		found = false;
		        		return found;
		        	}	

		      	} else {
		          found = false;
		          return found;
		      	}

		    } else {
		    	found = false;
		     	return found;
		   	}
	    
		}
	   
	  return found;
	  
	};

	/*
	*
	* Checks if the input text parameter does not contain any of the words within 
	* the words array. Use the “word” definition used in the above .contains description. 
	* The function should be case-insensitive. A function like this could be used 
	* for checking blacklisted words.
	*
	*/

	validator.lacks = function (input, words){
	    
		if (!input || !words) {
	    	throw "Please enter two valid arguments.";
	    }
	 
		return this.contains(input,words);   
	    
	};

	/*
	*
	* Checks that the input text parameter contains only strings found within the 
	* strings array. Note that this function doesn’t use a strong word definition 
	* the way .contains and .lacks does. The function should be case-insensitive.
	*
	*/

	validator.isComposedOf = function (input , strings) {

		if (!input || !strings) {
			throw "Please enter two valid arguments.";
	  	} 
	  
	  	var composedOf = false;
	  	var lowerCaseString = this.withoutSymbols(input.toLowerCase());
	  	var lowerCaseWord = "";
	  
	  	//Loop over arrary of strings
	  	for (var i = 0; i < strings.length; i++){
	    	
	    	lowerCaseWord = strings[i].toLowerCase();
	    	
	    	//If the array is in the input string remove the word from the string
	    	if ( lowerCaseString.indexOf(lowerCaseWord) >= 0) {
	      		lowerCaseString = lowerCaseString.replace(lowerCaseWord,"");
	   		}
	  	
	  	}
	  	
	  	//Assign a boolean value based on whether the input is no empty.
	  	composedOf = this.isEmpty(lowerCaseString);
	  
	  	return composedOf;

	};

	/*
	*
	* Checks if the input parameter’s character count is less than or equal to the n parameter.
	*
	*/

	validator.isLength = function (input, n){

		if (!input) {
			throw "Please enter two valid arguments.";
	  	} 

	  	return (input.length <= n);
	
	};

	/*
	*
	* Checks if the input parameter’s character count is greater than or equal to the n parameter.
	*
	*/

	validator.isOfLength = function (input, n){

		if (!input) {
			throw "Please enter two valid arguments.";
	  	} 

	  	return (input.length >= n);
	
	};

	/*
	*
	* Counts the number of words in the input parameter. Refer to the definition 
	* of word used in the description of the .contains function above.
	*
	*/

	validator.countWords = function (input) {

		if (this.isEmpty(input)) {
			return input.length;
		}else if(!input ){
          throw "Please enter a valid input.";
        }

		var i = 0;
		var length = input.length;

		input = input.toLowerCase();

		for(i; i < length; i++){
            
			if(!(input[i] >= "a" && input[i] <= "z") ){
				input = input.replace(input[i], " ");
			}

		}
		
		input = input.trim().split(" ");
        
		return input.length;

	};

	/*
	*
	* Checks if the input parameter has a word count less than or equal to the n parameter.
	*
	*/

	validator.lessWordsThan = function (input, n){

		if (!input || !n){
			throw "Please enter two valid inputs.";
		}

		return (this.countWords(input) <= n);

	};

	/*
	*
	* Checks if the input parameter has a word count greater than or equal to the n parameter.
	*
	*/

	validator.moreWordsThan = function (input, n) {

		if (!input || !n){
			throw "Please enter two valid inputs.";
		}

		return (this.countWords(input) >= n);

	};

	/*
	*
	* Checks that the input parameter matches all of the following:
	* 1) input is greater than or equal to the floor parameter
	* 2) input is less than or equal to the ceil parameter.
	*
	*/

	validator.isBetween = function (input, floor, ceil){

		if (arguments.length < 3){
			throw "Please enter 3 valid inputs.";
		}

		return this.countWords(input) >= floor && this.countWords(input) <= ceil;
		
	};

	/*
	*
	* Checks that the input parameter string is only composed of the following 
	* characters: a—z, A—Z, or 0—9. Unicode characters are intentionally disregarded.
	*
	*/

	validator.isAlphanumeric = function (input) {

		var i = 0;
		var length = input.length;
		var char;
  
		for (i; i < length; i++){
        	char = input.charCodeAt(i);

			if( !(char >= 65 && char <= 90) && 
               !(char >= 97 && char <= 122 ) && 
               !(char >= 48 && char <= 57) ) {
				return false;
			}

		}

		return true;

	};

	/* 
	*
	* Checks if the input parameter is a credit card or bank card number. A credit 
	* card number will be defined as four sets of four alphanumeric characters 
	* separated by hyphens (-), or a single string of alphanumeric characters (without hyphens).
	*
	*/

	validator.isCreditCard = function (input) {

		if (!input){
			throw "Please enter a valid credit card number.";
		}

		var numSplit;
		var i;

		if (input.length === 16 && this.isAlphanumeric(input)) {
			return true;
		
		} else if (input.length === 19){

			numSplit = input.split("-");

			if(numSplit.length !== 4){
				return false;
			}else {

				for (i = 0; i < 4; i++){
					if( !(this.isAlphanumeric(numSplit[i])) ){
						return false;
					}
				}

				return true;
			
			}

		} else{
			return false;
		}

	};

	/*
	*
	* Checks if the input string is a hexadecimal color, such as #3677bb. Hexadecimal 
	* colors are strings with a length of 7 (including the #), using the characters 0—9 and A—F. 
	* isHex should also work on shorthand hexadecimal colors, such as #333. The 
	* input must start with a # to be considered valid.
	*
	*/

	validator.isHex = function (input) {

		if (!input) {
			throw "Please enter a valid input.";
		}
  
		var char;

        if (input.charAt(0) === "#" && (input.length === 7 || input.length === 4)) {
            
            for(var i = 1; i < input.length; i++){
				
				char = input.toUpperCase().charCodeAt(i);
               
				if ( !(char >= 65 && char <= 70) && !(char >= 48 && char <= 57) ) {
					return false;
				}
			
			}
          
		} else {
          
          return false; 	

		}

		return true;

	};

	/*
	*
	* Checks if the input string is an RGB color, such as rgb(200, 26, 131). An RGB color consists of:
	*
	*/

	validator.isRGB = function (input) {

		if (!input) {
			throw "Please enter a valid input.";
		}

		var arr = [];

		if (input.indexOf("rgb(") === 0){

			input = input.replace("rgb(", "").replace(")", "");
			console.log(input);

			arr = input.split(",");
			if ( arr.length === 3) {

				for (var i = 0; i < arr.length; i++){
					if (!(arr[i] >= 0 && arr[i] <= 250)){
						return false;
					}
				}

			}else {
				return false;
			}

		}else{
			return false;
		}

		return true;

	};

	/*
	*
	* Checks if the input string is an HSL color, such as hsl(122, 1, 1). An HSL color consists of:
	* Three numbers:
	* 	the first number, Hue, is between 0 and 360
	*	the second and third numbers, Saturation and Lightness, are between 0 and 1
	* A comma between each number
	* The three numbers should be contained within “hsl(” and “)“.
	*
	*/

	validator.isHSL = function (input) {

		if (!input) {
			throw "Please enter a valid input.";
		}

		var arr = [];
		var hue;
		var saturation;
		var lightnesss;

		if (input.indexOf("hsl(") === 0){

			input = input.replace("hsl(", "").replace(")", "");
			console.log(input);

			arr = input.split(",");

			if ( arr.length === 3) {

				hue = arr[0];
				saturation = arr[1];
				lightnesss = arr[2];

				if ( (hue >= 0 && hue <= 360) && (saturation >= 0 && saturation <= 1) && (lightnesss >= 0 && lightnesss <= 1) ){
					return true;
				}else{
					return false;
				}

			}else {
				return false;
			}

		}else{
			return false;
		}


	};

	/*
	*
	* Checks if the input parameter is a hex, RGB, or HSL color type.
	*
	*/

	validator.isColor = function (input){

		if (!input){
			throw "Please enter a valid input.";
		}

		return this.isHex(input) || this.isRGB(input) || this.isHSL(input);

	};

	/*
	*
	* Checks if the input parameter has leading or trailing whitespaces or too 
	* many spaces between words. Leading refers to before while trailing refers 
	* to after. This function will help validate cases where extra spaces were 
	* added accidentally by the user.
	*
	*/

	validator.isTrimmed = function (input) {

		if (!input){
			throw "Please enter a valid input.";
		}

		if (input[0] === " " || input[input.length-1] === " "){

			return false;

		}

		for(var i = 0; i < input.length; i++){

			if (input[i] === " "){
				if (input[i + 1] === " "){
					return false;
				}
			}

		}

		return true;

	};

window.validator = validator;

})(window);