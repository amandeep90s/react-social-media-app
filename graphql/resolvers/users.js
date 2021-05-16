const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

module.exports = {
    Mutation: {
        async register(
            _,
            { registerInput: { username, email, password, confirmPassword } },
            context,
            info
        ) {
            // TODO validate user data
            // TODO make sure user does not already exist
            // TODO hash password and create an auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString(),
            });

            const result = await newUser.save();

            const token = jwt.sign(
                {
                    id: result.id,
                    email: result.email,
                    username: result.username,
                },
                process.env.SECRET_KEY,
                { expiresIn: "1h" }
            );

            return {
                ...result._doc,
                id: result._id,
                token,
            };
        },
    },
};
