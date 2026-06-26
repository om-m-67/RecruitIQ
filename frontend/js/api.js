/*
=================================
RecruitIQ API Configuration
Frontend Only Placeholder
=================================
*/

const API = {

    BASE_URL : "",

    AUTH : {

        LOGIN :
        "/auth/login",

        REGISTER :
        "/auth/register",

        FORGOT_PASSWORD :
        "/auth/forgot-password",

        RESET_PASSWORD :
        "/auth/reset-password"

    },

    JOBS : {

        GET_ALL :
        "/jobs",

        CREATE :
        "/jobs/create",

        UPDATE :
        "/jobs/update",

        DELETE :
        "/jobs/delete"

    },

    APPLICATIONS : {

        GET_ALL :
        "/applications",

        APPLY :
        "/applications/apply"

    },

    USERS : {

        GET_ALL :
        "/users",

        PROFILE :
        "/users/profile"

    },

    NOTIFICATIONS : {

        GET :
        "/notifications"

    }

};

/*
=================================
Mock API Functions
Frontend Only
=================================
*/

function fetchJobs(){

    console.log(
        "Fetching Jobs..."
    );

}

function fetchUsers(){

    console.log(
        "Fetching Users..."
    );

}

function fetchApplications(){

    console.log(
        "Fetching Applications..."
    );

}

function loginUser(){

    console.log(
        "Login Request"
    );

}

function registerUser(){

    console.log(
        "Register Request"
    );

}