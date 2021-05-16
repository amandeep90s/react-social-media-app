const { model, Schema } = require("mongoose");

const userSchema = new Schema(
    {
        username: String,
        password: String,
        email: {
            type: String,
            required: true,
            index: true,
        },
        createdAt: String,
    },
    { timestamps: true }
);

module.exports = model("User", userSchema);
