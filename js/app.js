/*************** Targeting the elements already present inside the page ***************/
const form = document.querySelector("form");

const firstFieldset = document.querySelector('fieldset');
const userNameInput = document.querySelector('input');
const userTitleSelect = document.querySelector('#title');

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



/*************** Creating the DOM Elements ***************/
// The Job Rule Input when the "other" value is selected
const jobRoleInput = document.createElement('input');
jobRoleInput.id = 'other-title';
jobRoleInput.setAttribute('type', 'text');
jobRoleInput.setAttribute('placeholder', 'Your Job Role');

const totalPrice = document.createElement('h4');
totalPrice.id = 'total-price';
totalPrice.textContent = "The total price of your order is: ";



/*************** Removing DOM Elements ***************/
// The three payment options are hidden by default
creditCardPayment.style.display     = "none";
paypalPayment.style.display         = "none";
bitcoinPayment.style.display        = "none";



/*************** Creating the functions wished ***************/
// Take the Job Role Value and create a new node if needed
const showOtherJobRole = (jobRoleValue) => {
    if (jobRoleValue.toLowerCase() === "other") {
        firstFieldset.appendChild(jobRoleInput);
    // If the other value has already been selected and the value is not other anymore, remove this input
    } else if (firstFieldset.lastChild == jobRoleInput) {
        firstFieldset.removeChild(jobRoleInput);
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
    if (inputChecked.checked) {
        inputChecked.parentNode.style.color = 'blue';
    } else {
        inputChecked.parentNode.style.color = 'black';
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
    } else {
        console.log('Username: correct!');
    }


    // Do a regex for the e-mail field
    let emailAddress = document.getElementById('mail');
    let regexEmail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$','i');

    // If the email address input has not been field in
    if (emailAddress.value.length === 0) {
        console.log("Email: cannot be blanked!");
    } else {
        // And do a regex
        let value = regexEmail.test(emailAddress.value);
        console.log('Email status: ' + value);
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
        } else {
            if ((cardNumberValue.length >= 13) && (cardNumberValue.length <= 16)) {
                console.log('Cardnumber: correct!');
            } else {
                console.log('Nope, your card is too short or too long!');
            }
        }
        // Target the zip code filed
        let zipNumberValue = document.querySelector('#zip').value;
        // And run these validations
        if (isNaN(parseInt(zipNumberValue))) {
            console.log('The zip code should be a number');
        } else {
            if (zipNumberValue.length != 5) {
                console.log('Your zipcode should be a 5-digit number');
            } else {
                console.log('Zipcode: correct!');
            }
        }
        // Target the CVV code field
        let cvvNumberValue = document.getElementById('cvv').value;
        // And run these validations
        if (isNaN(parseInt(cvvNumberValue))) {
            console.log('The CVV code should be a number');
        } else {
            if (cvvNumberValue.length != 3) {
                console.log('Your CVV should be a 3-digit number');
            } else {
                console.log('CVV: correct!')
            }
        }
    }
});