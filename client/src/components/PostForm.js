import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../util/hooks";
import { gql, useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const PostForm = () => {
    const { values, handleChange, handleSubmit } = useForm(createPostCallback, {
        body: "",
    });
    const [error, setError] = useState("");

    const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
            });

            let newData = [...data.getPosts];
            newData = [result.data.createPost, ...newData];
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    ...data,
                    getPosts: {
                        newData,
                    },
                },
            });
            values.body = "";
        },
        onError(err) {
            setError(err.graphQLErrors[0].message);
        },
    });

    function createPostCallback() {
        createPost();
    }

    return (
        <>
            <Form
                onSubmit={handleSubmit}
                noValidate
                className={loading ? "loading" : null}
            >
                <h2>Create a post:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Hi World!"
                        name="body"
                        onChange={handleChange}
                        value={values.body}
                        error={error ? true : false}
                    />
                    <Button type="submit" color="teal">
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            {error && (
                <div className="ui error message" style={{ marginBottom: 20 }}>
                    <ul className="list">
                        <li>{error}</li>
                    </ul>
                </div>
            )}
        </>
    );
};

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id
            body
            createdAt
            username
            likes {
                id
                username
                createdAt
            }
            likeCount
            comments {
                id
                body
                username
                createdAt
            }
            commentCount
        }
    }
`;

export default PostForm;
