/*************** Targeting the elements already present inside the page ***************/
const form = document.querySelector("form");

const firstFieldset = document.querySelector('fieldset');
const userNameInput = document.querySelector('input');
const userTitleSelect = document.querySelector('#title');
const jobRoleInput = document.querySelector('#other-title');

const shirtFieldset = document.querySelector('.shirt');
const userDesignSelect = document.querySelector('#design');
const selectColorsContainer = document.querySelector('.select-colors');
const userColorSelect = document.querySelector("#color");
const userColorValues = userColorSelect.querySelectorAll('option');

const activitiesFieldset = document.querySelector('.activities');
const activitiesCheckboxes =activitiesFieldset.querySelectorAll("input[type=checkbox]");

const paymentFiedlset = document.querySelector('.paymentContainer');
const paymentSelect = document.querySelector('#payment');
const creditCardPayment = document.querySelector('#credit-card');
const paypalPayment = document.querySelector(".paypal");
const bitcoinPayment = document.querySelector(".bitcoin");


/*************** Creating Global Variables ***************/
// Use the variable below for the total sum
let totalSum = 0;

/*************** Creating the DOM Elements ***************/
const totalPrice = document.createElement('h4');
totalPrice.id = 'total-price';
totalPrice.textContent = "The total price of your order is: " + totalSum + "$";
activitiesFieldset.appendChild(totalPrice);



/*************** Removing DOM Elements ***************/
// The job input element is hidden by default
jobRoleInput.style.display          = "none";
// The three payment options are hidden by default
creditCardPayment.style.display     = "none";
paypalPayment.style.display         = "none";
bitcoinPayment.style.display        = "none";



/*************** Creating the functions wished ***************/
// Take the Job Role Value and create a new node if needed
const showOtherJobRole = (jobRoleValue) => {
    if (jobRoleValue.toLowerCase() === "other") {
        jobRoleInput.style.display = "";
    // If the other value has already been selected and the value is not other anymore, remove this input
    } else {
        jobRoleInput.style.display = "none";
    }
};

// Take the T-Shirt Design Value and append the new node is either "js puns" or "heart js"
const showColorContainer = (shirtDesign) => {
    if (shirtDesign.toLowerCase() === "js puns") {
        // Append the colors' container
        shirtFieldset.appendChild(selectColorsContainer);
        // Then loop trough the specific color array
        for (let i = 0; i < userColorValues.length; i++) {
            // The selected color is always shown
            if (userColorValues[i].className == 'base') {
                userColorValues[i].style.display = 'initial';
            }
            // Here the select style t-shirt is puns
            else if (userColorValues[i].className == 'puns') {
                userColorValues[i].style.display = 'initial';
            } else {
            // and the heart js are not shown
                userColorValues[i].style.display = 'none';
            }
        }
        // By default, the first option is always selected
        userColorValues[0].selected = true;
        
    } else if (shirtDesign.toLowerCase() === "heart js") {
        // Append the colors' container
        shirtFieldset.appendChild(selectColorsContainer);
        // Then loop trough the specific color array
        for (let i = 0; i < userColorValues.length; i++) {
            // The selected color is always shown
            if (userColorValues[i].className == 'base') {
                userColorValues[i].style.display = 'initial';
            }
            // Here the select style t-shirt is heart js
            else if (userColorValues[i].className == 'puns') {
                userColorValues[i].style.display = 'none';
            } else {
            // and the puns are not shown
                userColorValues[i].style.display = 'initial';
            }
        }
        // By default, the first option is always selected
        userColorValues[0].selected = true;
    // if the value is "select theme", hide the color container
    } else {
        shirtFieldset.removeChild(selectColorsContainer);
    }
};


// Take the event and able or disable for the activities and display total price
const registeringForactivities = (inputChecked) => {
    // The first couple of checkbox inputs
    let jsFrameworks = document.querySelector('input[name=js-frameworks]');
    let express = document.querySelector('input[name=express]');
    // The second couple of checkbox inputs
    let jsLibs = document.querySelector('input[name=js-libs]');
    let node = document.querySelector('input[name=node]');

    if (inputChecked.checked) {
        // When an input element is checked, take the price of the activity then add it to the total amount
        activityPrice = parseInt(inputChecked.className);
        totalSum = totalSum + activityPrice;
        totalPrice.textContent = "The total price of your order is: " + totalSum + "$";

        // Add other security verications
            // First one
        if (jsFrameworks.checked) {
            express.setAttribute('disabled', true);
        }
        if (express.checked) {
            jsFrameworks.setAttribute('disabled', true);
        }
            // Second one
        if (jsLibs.checked) {
            node.setAttribute('disabled', true);
        }
        if (node.checked) {
            jsLibs.setAttribute('disabled', true);
        }

    } else {
        // When an input element is unchecked, take the price of the activity then remove it to the total amount
        activityPrice = parseInt(inputChecked.className);
        totalSum = totalSum - activityPrice;
        totalPrice.textContent = "The total price of your order is: " + totalSum + "$";

        // Add other security verications
            // First one
        if (!jsFrameworks.checked) {
            express.removeAttribute('disabled');
        }
        if (!express.checked) {
            jsFrameworks.removeAttribute('disabled');
        }
            // Second one
        if (!jsLibs.checked) {
            node.removeAttribute('disabled');
        }
        if (!node.checked) {
            jsLibs.removeAttribute('disabled');
        }
    }
    
};


// Take the payment option and show the child needed
const showPaymentOption = (paymentOptionValue) => {
    if (paymentOptionValue === 'credit card') {
        creditCardPayment.style.display = "block";
        paypalPayment.style.display = "none";
        bitcoinPayment.style.display = "none";
    } else if (paymentOptionValue === 'paypal') {
        creditCardPayment.style.display = "none";
        paypalPayment.style.display = "block";
        bitcoinPayment.style.display = "none";
    } else if (paymentOptionValue === 'bitcoin') {
        creditCardPayment.style.display = "none";
        paypalPayment.style.display = "none";
        bitcoinPayment.style.display = "block";
    } else {
        creditCardPayment.style.display = "none";
        paypalPayment.style.display = "none";
        bitcoinPayment.style.display = "none";
    }
};


/*************** Adding the event handlers ***************/
// When the page loads, 
    // focus the first element (here the input Name)
    // hide the color container
window.onload = () => {
    userNameInput.focus();
    shirtFieldset.removeChild(selectColorsContainer);
};

// When the "Other" Job Role is choosen, show input
userTitleSelect.addEventListener('change', () => {
    let userTitleValue = userTitleSelect.value;
    showOtherJobRole(userTitleValue);
});

// When the design select changes, hide or show the matched elements
userDesignSelect.addEventListener('change', () => {
    let userDesignValue = userDesignSelect.value;
    showColorContainer(userDesignValue);
});

// When the user clicks activities for registration
activitiesFieldset.addEventListener('change', (event) => {
    let target = event.target
    registeringForactivities(target);
});

// When a payment is selected
paymentSelect.addEventListener('change', () => {
    let paymentOption = paymentSelect.value;
    showPaymentOption(paymentOption);
});

// When the form is submited
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // If the user name is not filled in
    if (userNameInput.value.length === 0) {
        console.log('Username: cannot be blanked!');
        userNameInput.style.borderColor = "red";
    } else {
        console.log('Username: correct!');
        userNameInput.style.borderColor = "#c1deeb";
    }


    // Do a regex for the e-mail field
    let emailAddress = document.getElementById('mail');
    let regexEmail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$','i');

    // If the email address input has not been field in
    if (emailAddress.value.length === 0) {
        console.log("Email: cannot be blanked!");
        emailAddress.style.borderColor = "red";
    } else {
        // And do a regex
        let value = regexEmail.test(emailAddress.value);
        if (value) {
            emailAddress.style.borderColor = "#c1deeb";
        } else {
            emailAddress.style.borderColor = "red";
        }
        console.log('Email status: ' + value);
    }

    // If the "other" field inside job role is selected
    if ((userTitleSelect.value === "other") && (jobRoleInput.value.length === 0)) {
        console.log("If the other job role is selected, it has to be filled in!");
        jobRoleInput.style.borderColor = "red";
    } else {
        console.log("Other job role: correct!");
        jobRoleInput.style.borderColor = "#c1deeb";
    }


    // Then inspect the checkbox elements, if there is no checkbox checked, return an error
    function checkboxValidation() {
        let checkboxErrorMessage = "The checkbox validation is: ";
        for (let i = 0; i < activitiesCheckboxes.length; i++) {
            if (activitiesCheckboxes[i].checked) {
                checkboxErrorMessage += true;
                return checkboxErrorMessage;
            } else {
                checkboxErrorMessage += false;
                return checkboxErrorMessage;
            }
        }
    }
    console.log(checkboxValidation());
    


    // If the credit card has been selected
    let paymentOption = paymentSelect.value;
    if (paymentOption === 'credit card') {
        // Target the credit card field
        let cardNumberValue = document.querySelector('#cc-num').value;
        // And Run these validations
        if (isNaN(parseInt(cardNumberValue))) {
            console.log('The credit card should be a number');
            document.querySelector("#cc-num").style.borderColor = "red";
        } else {
            if ((cardNumberValue.length >= 13) && (cardNumberValue.length <= 16)) {
                console.log('Cardnumber: correct!');
                document.querySelector("#cc-num").style.borderColor = "#c1deeb";
            } else {
                console.log('Nope, your card is too short or too long!');
                document.querySelector("#cc-num").style.borderColor = "red";
            }
        }
        // Target the zip code filed
        let zipNumberValue = document.querySelector('#zip').value;
        // And run these validations
        if (isNaN(parseInt(zipNumberValue))) {
            console.log('The zip code should be a number');
            document.querySelector("#zip").style.borderColor = "red";
        } else {
            if (zipNumberValue.length != 5) {
                console.log('Your zipcode should be a 5-digit number');
                document.querySelector("#zip").style.borderColor = "red";
            } else {
                console.log('Zipcode: correct!');
                document.querySelector("#zip").style.borderColor = "#c1deeb";
            }
        }
        // Target the CVV code field
        let cvvNumberValue = document.querySelector("#cvv").value;
        // And run these validations
        if (isNaN(parseInt(cvvNumberValue))) {
            console.log('The CVV code should be a number');
            document.querySelector("#cvv").style.borderColor = "red";
        } else {
            if (cvvNumberValue.length != 3) {
                console.log('Your CVV should be a 3-digit number');
                document.querySelector("#cvv").style.borderColor = "red";
            } else {
                console.log('CVV: correct!');
                document.querySelector("#cvv").style.borderColor = "#c1deeb";
            }
        }
    }
});