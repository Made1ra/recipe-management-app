import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, signIn, authError } from '../store';
import styled from 'styled-components';

const AuthenticationContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Lato';
    font-weight: 500;
`;

const AuthenticationHeading = styled.h2`
    font-size: 24px;
    margin-bottom: 16px;
`;

const TextInput = styled.input`
    font-size: 1.5em;
    padding: 0.5em 1em;
    border-radius: 0.5em;
    border: 0.1em solid grey;
    background-color: #eee;
    margin: 1em;
`;

const ActionButton = styled.button`
    padding: 2em 4em;
    margin: 0.5em 1em;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5%;

    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`;

const ErrorMessage = styled.div`
    color: red;
    margin-top: 8px;
`;

function Authentication() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const errorMessage = useSelector((state: { auth: { error: string } }) => state.auth.error);
    const dispatch = useDispatch();

    function handleSignUp(event: React.FormEvent) {
        event.preventDefault();

        if (username && password) {
            dispatch(signUp(username));
        } else if (username) {
            dispatch(authError('Please provide a password'));
        } else if (password) {
            dispatch(authError('Please provide a username'));
        } else {
            dispatch(authError('Please provide a username and password'));
        }
    }

    function handleSignIn(event: React.FormEvent) {
        event.preventDefault();

        if (username && password) {
            dispatch(signIn(username));
        } else if (username) {
            dispatch(authError('Please provide a password'));
        } else if (password) {
            dispatch(authError('Please provide a username'));
        } else {
            dispatch(authError('Please provide a username and password'));
        }
    }

    return (
        <AuthenticationContainer onSubmit={handleSignUp}>
            <AuthenticationHeading>Sign Up / Sign In</AuthenticationHeading>
            <TextInput
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            <TextInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <ActionButton type="submit">Sign Up</ActionButton>
            <ActionButton onClick={handleSignIn}>Sign In</ActionButton>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </AuthenticationContainer>
    );
}

export default Authentication;
