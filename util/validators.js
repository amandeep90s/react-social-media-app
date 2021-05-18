// Register Form Validation
module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};

    if (username.trim() === "") {
        errors.username = "Username must not be empty";
    }
    if (email.trim() === "") {
        errors.email = "Email must not be empty";
    } else {
        const regEx =
            /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = "Email must be a valid email address";
        }
    }
    if (password === "") {
        errors.password = "Password must not be empty";
    } else if (password.length < 8) {
        errors.confirmPassword = "Passwords must be at least 8 characters";
    } else if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords must match";
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};

// Login Form Validation
module.exports.validateLoginInput = (username, password) => {
    const errors = {};

    if (username.trim() === "") {
        errors.username = "Username must not be empty";
    }

    if (password.trim() === "") {
        errors.password = "Password must not be empty";
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};
