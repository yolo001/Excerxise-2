var btns = document.getElementById('keypad');
var inputs = [];
var hold = [];

// IE does not know about the target attribute. It looks for srcElement
function getEventTarget(e) {
	e = e || window.event;
	return e.target || e.srcElement;
}

btns.onclick = function(event) {
	//Get Target
	var target = getEventTarget(event);
  // Get the screen and button values
	var screen = document.querySelector('.screen');
	var screenVal = screen.innerHTML;
	var btnVal = target.innerHTML;
	var d = document.getElementsByClassName("active");
  

	if (screenVal === '0' && btnVal != '.') {

		screen.innerHTML = '';
	}


	var calculate = screenVal;

	// If clear is pressed
	if (btnVal == 'C') {
		screen.innerHTML = '0';
		inputs = [];
	}
  // If +/- is pressed (make value negative or positive)
  else if (btnVal == '+/-') {

	if (hold[0] === undefined) {
		screen.innerHTML = '-' + calculate;
		hold.push('-' + calculate);
	} else {
		calculate = calculate.replace(/-/g, '');
		screen.innerHTML = calculate;
		hold = [];
	}

	}
	// If x is pressed
	else if (btnVal == 'x') {
		if (calculate !== '0') {
			inputs.push(calculate);
			if (calculate === '' && inputs[3] === undefined) {
				inputs[1] = '*';
			} else {

				inputs.push('*');
			}
			screen.innerHTML = '';
		} else {
			inputs[1] = '*';
		}

		while (d[0]) {
			d[0].className = 'symbol';
		}

		target.className = 'symbol active';
	
	}
	// If / pressed
	else if (btnVal == '/') {

		if (calculate != '0') {
			inputs.push(calculate);
			if (calculate === '' && inputs[3] === undefined) {
				inputs[1] = '/';
			} else {

				inputs.push('/');
			}
			screen.innerHTML = '';
		} else {
			inputs[1] = '/';
		}

		while (d[0]) {
			d[0].className = 'symbol';
		}

		target.className = 'symbol active';

	}
	// If - is pressed
	else if (btnVal == '-') {

		if (calculate == '0') {

			screen.innerHTML = '-';

		} else {
			inputs.push(calculate);
			if (calculate === '' && inputs[3] === undefined) {
				inputs[1] = '-';
			} else {

				inputs.push('-');
			}
			screen.innerHTML = '';

		}

		while (d[0]) {
			d[0].className = 'symbol';
		}

		target.className = 'symbol active';
	}
	// If + is pressed
	else if (btnVal == '+') {

		if (calculate != '0') {

			inputs.push(calculate);
			if (calculate === '' && inputs[3] === undefined) {
				inputs[1] = '+';
			} else {

				inputs.push('+');
			}

			screen.innerHTML = '';

		} else {
			inputs[1] = '+';
		}

		while (d[0]) {
			d[0].className = 'symbol';
		}

		target.className = 'symbol active';

	}
	// If = is pressed calculate the answer
	else if (btnVal == '=') {

		while (d[0]) {
			d[0].className = 'symbol'
		}


		inputs.push(calculate);
		calculate = inputs.toString();


		var lastChar = calculate[calculate.length - 1];

		// Replace x with * and , width ''.
		calculate = calculate.replace(/x/g, '*').replace(/,/g, '');

    
    //remove . if it is the last character
		if (lastChar == '.') {
			calculate = calculate.replace(/./, '');
		}
    //calculate percent
		if (lastChar == '%') {
			var getNum = inputs[0].toString();
			var getSy = inputs[1].toString();
			var getPar = inputs[2].toString();
			getPar = getPar.replace(/%/g, '');

			var calculatePar = getPar / "100" * getNum;
			calculate = getNum + getSy + calculatePar;

		}
    //clear inputs for next calculation
		inputs = [];
     
		if (calculate) {
			var answer = eval(calculate);

			if (answer.toFixed(2) === answer + ".00") {
				screen.innerHTML = answer;
			} else {
				screen.innerHTML = answer.toFixed(2);
			}

		}
	}
	// if any other key is pressed
	else {
		screen.innerHTML += btnVal;

	}
  
	e.preventDefault();
};