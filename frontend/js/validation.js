// Email Validation

function validateEmail(email){

    const pattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}

// Phone Validation

function validatePhone(phone){

    const pattern =
    /^[0-9]{10}$/;

    return pattern.test(phone);

}

// Password Validation

function validatePassword(password){

    const pattern =
    /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    return pattern.test(password);

}

// Required Field Validation

function validateRequired(value){

    return value.trim() !== "";

}

// Form Validation Example

function validateForm(formId){

    const form =
    document.getElementById(formId);

    const inputs =
    form.querySelectorAll("input[required]");

    let valid = true;

    inputs.forEach(input => {

        if(!validateRequired(input.value)){

            input.style.border =
            "1px solid red";

            valid = false;

        }else{

            input.style.border =
            "1px solid #dbeafe";

        }

    });

    return valid;

}