/*************** Targeting the elements already present inside the page ***************/
const firstFieldset = document.querySelector('fieldset');
const userNameInput = document.querySelector('input');
const userTitleSelect = document.querySelector('#title');



/*************** Creating the DOM Elements ***************/
// The Job Rule Input when the "other" value is selected
const jobRoleInput = document.createElement('input');
jobRoleInput.id = 'other-title';
jobRoleInput.setAttribute('type', 'text');
jobRoleInput.setAttribute('placeholder', 'Your Job Role');



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



/*************** Adding the event handlers ***************/
// When the page loads, focus the first element (here the input Name)
window.onload = () => {
    userNameInput.focus();
};

// When the "Other" Job Role is choosen, show input
userTitleSelect.addEventListener('change', () => {
    let userTitleValue = userTitleSelect.value;
    showOtherJobRole(userTitleValue);
});