/*************** Targeting the elements already present inside the page ***************/
const firstFieldset = document.querySelector('fieldset');
const userNameInput = document.querySelector('input');
const userTitleSelect = document.querySelector('#title');

const shirtFieldset = document.querySelector('.shirt');
const userDesignSelect = document.querySelector('#design');
const selectColorsContainer = document.querySelector('.select-colors');
const userColorSelect = document.querySelector("#color");
const userColorValues = userColorSelect.querySelectorAll('option');

const activitiesFieldset = document.querySelector('.activities');

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

const totalPrice = document.createElement('p');
totalPrice.id = 'total-price';



/*************** Removing DOM Elements ***************/
// The three payment options are hidden by default
creditCardPayment.style.display = "none";
paypalPayment.style.display = "none";
bitcoinPayment.style.display = "none";



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
        shirtFieldset.appendChild(selectColorsContainer);
        console.log('design 1');
    } else if (shirtDesign.toLowerCase() === "heart js") {
        shirtFieldset.appendChild(selectColorsContainer);
        console.log('design 2');
    } else {
        // if the value is "select theme", hide the color container
        shirtFieldset.removeChild(selectColorsContainer);
        console.log("no design");
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

// When a payment is selected
paymentSelect.addEventListener('change', () => {
    let paymentOption = paymentSelect.value;
    showPaymentOption(paymentOption);
});