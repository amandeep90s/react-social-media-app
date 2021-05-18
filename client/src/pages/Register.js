import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "../util/hook";
import { AuthContext } from "../context/auth";

const Register = (props) => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { handleChange, handleSubmit, values } = useForm(
        registerUserCallback,
        {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    );

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            context.login(userData);
            props.history.push("/");
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values,
    });

    function registerUserCallback() {
        addUser();
    }

    return (
        <div className="form-container">
            <Form
                onSubmit={handleSubmit}
                noValidate
                className={loading ? "loading" : null}
            >
                <h1>Register</h1>
                <Form.Input
                    type="text"
                    label="Username"
                    placeholder="Username"
                    name="username"
                    error={errors.username ? true : false}
                    value={values.username}
                    onChange={handleChange}
                />

                <Form.Input
                    type="email"
                    label="Email"
                    placeholder="Email"
                    name="email"
                    error={errors.email ? true : false}
                    value={values.email}
                    onChange={handleChange}
                />

                <Form.Input
                    type="password"
                    label="Password"
                    placeholder="Password"
                    name="password"
                    error={errors.password ? true : false}
                    value={values.password}
                    onChange={handleChange}
                />

                <Form.Input
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    error={errors.confirmPassword ? true : false}
                    value={values.confirmPassword}
                    onChange={handleChange}
                />

                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            username
            token
            createdAt
        }
    }
`;

export default Register;
