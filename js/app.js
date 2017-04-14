/*************** Targeting the elements already present inside the page ***************/
const form = document.querySelector("form");

const firstFieldset = document.querySelector('fieldset');
const userNameInput = document.querySelector('input');
const emailAddress = document.getElementById('mail');
const regexEmail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$','i');
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

const cardNumber = document.querySelector('#cc-num');
const zipNumber = document.querySelector('#zip');
const cvvNumber = document.querySelector("#cvv");


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
// The security functions
const verifyInput = (targetedInput, text, color, underlining, borderColor) => {
    targetedInput.previousElementSibling.textContent = text;
    targetedInput.previousElementSibling.style.color = color;
    targetedInput.previousElementSibling.style.textDecoration = underlining;
    targetedInput.style.borderColor = borderColor;
} // /f(verifyInput)

checkUsername = (input) => {
    if (input.value.length === 0) {
        verifyInput(input, "Name: (cannot be blanked)", "#3D0B1A", "underline", "red");
        return false;
    } else {
        verifyInput(input, "Name: ", "#000", "none", "#c1deeb");
        return true;
    }
} // /f(checkUsername)

checkEmail = (input) => {
    if (input.value.length === 0) {
        verifyInput(input, "Email: (cannot be blanked)", "#3D0B1A", "underline", "red");
        return false;
    } else {
        // And do a regex
        let boolean = regexEmail.test(input.value);
        if (boolean) {
            verifyInput(input, "Email: ", "#000", "none", "#c1deeb");
            return true;
        } else {
            verifyInput(input, "Email: (please enter a valid email address)", "#3D0B1A", "underline", "red");
            return false;
        }
    } 
} // /f(checkEmail)

const checkOtherJobRole = (parentNode, targetedInput) => {
    if ((parentNode.value === "other") && (targetedInput.value.length === 0)) {
        targetedInput.style.borderColor = "red";
    } else {
        targetedInput.style.borderColor = "#c1deeb";
    }    
} // /f(checkOtherJobRole)

const colorValues = (arrayOfShirt, shirtColor1, shirtColor2) => {
    for (let i = 0; i < array.length; i++) {
        if (arrayOfShirt[i].className == shirtColor1) {
            arrayOfShirt[i].style.display = 'initial';
        } else if (arrayOfShirt[i].className == shirtColor2) {
            arrayOfShirt[i].style.display = 'initial';
        } else {
            arrayOfShirt[i].style.display = 'none';
        }
    }
    // By default, the first option is always selected
    array[0].selected = true;
} // /f(colorValues)

const checkCardNumber = (input) => {
    if (isNaN(parseInt(input.value))) {
        verifyInput(input, "Card Number: (Should be a number)", "#3D0B1A", "underline", "red");
        return false;
    } else {
        if ((input.value.length >= 13) && (input.value.length <= 16)) {
            verifyInput(input, "Card Number: ", "#000", "none", "#c1deeb");
            return true;
        } else {
            verifyInput(input, "Card Number: (not valid number)", "#3D0B1A", "underline", "red");
            return false;
        }
    }
} // /f(checkCardNumber)

const verifyCreditCard = (inputTargerted, requiredLength, inputText) => {
    if (isNaN(parseInt(inputTargerted.value)) || (inputTargerted.value.length != requiredLength)) {
        verifyInput(inputTargerted, inputText + ": (error)", "#3D0B1A", "underline", "red");
        return false;
    } else {
        verifyInput(inputTargerted, "Zip Code: ", "#000", "none", "#c1deeb");
        return true;
    }
} // /f(verifyCreditCard)

// Take the Job Role Value and display the node if needed
const showOtherJobRole = (jobRoleValue) => {
    if (jobRoleValue.toLowerCase() === "other") {
        jobRoleInput.style.display = "";
    // If the other value has already been selected and the value is not other anymore, hide this input
    } else {
        jobRoleInput.style.display = "none";
    }
} // /f(showOtherJobRole)

// Take the T-Shirt Design Value and append the new node is either "js puns" or "heart js"
const showColorContainer = (shirtDesign) => {
    if (shirtDesign.toLowerCase() === "js puns") {
        shirtFieldset.appendChild(selectColorsContainer);
        colorValues(userColorValues, 'base', 'puns');
        
    } else if (shirtDesign.toLowerCase() === "heart js") {
        shirtFieldset.appendChild(selectColorsContainer);
        colorValues(userColorValues, 'base', 'heart');
    
    } else {
        shirtFieldset.removeChild(selectColorsContainer);
    }
} // f(showColorContainer)

function checkedActivity(activity1, activity2) {
    if (activity1.checked) {
        activity2.setAttribute('disabled', true);
    }
} // /f(checkedActivity)

function uncheckedActivity(activity1, activity2) {
    if (!activity1.checked) {
        activity2.removeAttribute('disabled');
    }
} // /f(uncheckedActivity)

// Take the event and able or disable for the activities and display total price
const registeringForActivities = (inputChecked) => {
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
        checkedActivity(jsFrameworks, express);
        checkedActivity(express, jsFrameworks);
        checkedActivity(jsLibs, node);
        checkedActivity(node, jsLibs);
    } else {
        // When an input element is unchecked, take the price of the activity then remove it to the total amount
        activityPrice = parseInt(inputChecked.className);
        totalSum = totalSum - activityPrice;
        totalPrice.textContent = "The total price of your order is: " + totalSum + "$";
        uncheckedActivity(jsFrameworks, express);
        uncheckedActivity(express, jsFrameworks);
        uncheckedActivity(jsLibs, node);
        uncheckedActivity(node, jsLibs);
    }
}; // /f(registeringForactivities)

const showBlock = (paymentOption1, paymentOption2, paymentOption3, isDisplayed) => {
    if (isDisplayed) {
        paymentOption1.style.display = "block";
        paymentOption2.style.display = "none";
        paymentOption3.style.display = "none";
    } else {
        paymentOption1.style.display = "none";
        paymentOption2.style.display = "none";
        paymentOption3.style.display = "none";
    }
}; // /f(showBlock)

// Take the payment option and show the child needed
const showPaymentOption = (paymentOptionValue) => {
    if (paymentOptionValue === 'credit card') {
        showBlock(creditCardPayment, paypalPayment, bitcoinPayment, true);
    } else if (paymentOptionValue === 'paypal') {
        showBlock(paypalPayment, creditCardPayment, bitcoinPayment, true);
    } else if (paymentOptionValue === 'bitcoin') {
        showBlock(bitcoinPayment, paypalPayment, creditCardPayment, true);
    } else {
        showBlock(bitcoinPayment, paypalPayment, creditCardPayment, false);
    }
}; // /f(showPaymentOption)


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
    registeringForActivities(target);
});

// When a payment is selected
paymentSelect.addEventListener('change', () => {
    let paymentOption = paymentSelect.value;
    showPaymentOption(paymentOption);
});

// When the form is submited
form.addEventListener('submit', (event) => {

    event.preventDefault();

    let paymentOption = paymentSelect.value;
    
    checkUsername(userNameInput);
    checkEmail(emailAddress);
        
    checkCardNumber(cardNumber);
    verifyCreditCard(zipNumber, 5, 'Zip Code');
    verifyCreditCard(cvvNumber, 3, 'CVV');
    
    checkOtherJobRole(userTitleSelect, jobRoleInput);

    // 
    //  TODO: change this function, not work as expected
    //
    // Then inspect the checkbox elements, if there is no checkbox checked, return an error
    function checkboxValidation() {
        let status;
        for (let i = 0; i < activitiesCheckboxes.length; i++) {
            if (activitiesCheckboxes[i].checked) {
                status = true;
                return status;
            } else {
                status = false;
                return status;
            }
        }
    }

    checkboxValidation();
    // console.log(checkboxValidation());
});