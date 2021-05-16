const { model, Schema } = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            index: true,
        },
        password: String,
        email: String,
        createdAt: String,
    },
    { timestamps: true }
);

module.exports = model("User", userSchema);
