const { model, Schema } = require("mongoose");
const { ObjectId } = Schema;

const postSchema = new Schema(
    {
        body: String,
        username: String,
        createdAt: String,
        comments: [
            {
                body: String,
                username: String,
                createdAt: String,
            },
        ],
        likes: [
            {
                username: String,
                createdAt: String,
            },
        ],
        user: {
            type: ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

module.exports = model("Post", postSchema);
