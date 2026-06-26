// Password Visibility

function togglePassword(inputId){

    const input =
    document.getElementById(inputId);

    if(input.type === "password"){

        input.type = "text";

    }else{

        input.type = "password";

    }

}

// Password Strength

function checkPasswordStrength(password){

    let strength = 0;

    if(password.length >= 8) strength++;
    if(/[A-Z]/.test(password)) strength++;
    if(/[0-9]/.test(password)) strength++;
    if(/[!@#$%^&*]/.test(password)) strength++;

    return strength;

}

// Update Strength Bar

function updateStrengthBar(inputId, barId){

    const password =
    document.getElementById(inputId).value;

    const bar =
    document.getElementById(barId);

    const strength =
    checkPasswordStrength(password);

    const widths = [
        "20%",
        "40%",
        "60%",
        "80%",
        "100%"
    ];

    bar.style.width =
    widths[strength];

}

// Remember Me

function rememberUser(){

    const remember =
    document.getElementById("rememberMe");

    if(remember && remember.checked){

        localStorage.setItem(
            "rememberUser",
            "true"
        );
    }

}

// Role Selection

function selectRole(role){

    localStorage.setItem(
        "selectedRole",
        role
    );

}