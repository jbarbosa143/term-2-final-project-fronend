import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import { Grid, Button, TextField, CircularProgress, Snackbar } from '@material-ui/core';
import  MuiAlert  from '@material-ui/lab/Alert';
import useChangeInputConfig from '../hooks/useInput';
import useFetchAPI from '../hooks/useFetchAPI';
import checkAuthCookie from "../hooks/checkAuthCookie"

const useStyle = makeStyles((theme)=> ({
    root:{
        "& > *":{
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
}));

function Auth(props) {
    const classes = useStyle();
    let isLoginRoute = props.match.path ==="/login"
    let buttonTitle = isLoginRoute ? "Login" : "Sign up";
    let apiURL = isLoginRoute ? "/users/login" : "/users/create-user";

    const { checkIfCookieExists } = checkAuthCookie();
    const[
        {isLoading,response,error,setResponse},
        handleAPICallButtonSubmit,
        messageToggle,
        isMessageOpen,
        handleMessageOpen,
        handleMessageClose,
        successMessageValue,
    ]= useFetchAPI(apiURL);

    const [
        email,
        handleEmailChange,
        isEmailError, 
        emailErrorMessage,
        isEmailDisabled,
        clearEmaiInput
    ] = useChangeInputConfig("email");
    const [
        password,
        handlePasswordChange,
        isPasswordError,
        passwordErrorMessage,
        isPasswordDisabled,
        clearPasswordInput,
    ] = useChangeInputConfig("password");
    const [
        username,
        handleUsernameChange,
        isUsernameError,
        usernameErrorMessage,
        isUsernameDisabled,
        clearUsernameInput,
    ] = useChangeInputConfig("username");

    function handleOnSubmit(e){
        e.preventDefault();
        
        const user = isLoginRoute
        ? {email, password}
        : {email,username,password};

        handleAPICallButtonSubmit({
            method:"post",
            data:{
                ...user,
            },
        });
        console.log(user);
    }

    function Alert(props){
        return<MuiAlert elevation ={6} variant="filled"{...props}/>
    }

    function errorMessage(){
        return (
            <Snackbar
                open={isMessageOpen}
                autoHideDuration={6000}
                onClose={handleMessageClose}
            >
                <Alert severity="error">{error}</Alert>
            </Snackbar>
        );
    }

    function successMessage(){
        return(
            <Snackbar
            open={isMessageOpen}
            autoHideDuration={3000}
            onClose={handleMessageClose}
            >
                <Alert serverity="success">{successMessageValue}</Alert>
            </Snackbar>
        )
    }

    if(isLoading){
        return(
            <div style={{textAlign: "center"}}>
                <CircularProgress/>
            </div>
        );
    }

    if(response === "User Created!!"){
        clearEmaiInput();
        clearPasswordInput();
        clearUsernameInput();
        setResponse(null);
    }

    if (checkIfCookieExists()){
        props.history.push("/recipes-home");
    }
    return (
        
        <Grid container spacing={0} justifyContent="center">
            {successMessageValue && successMessage()}
            {error && errorMessage()}
            <form className={classes.root} onSubmit={handleOnSubmit}>
            <Grid item m={6}>
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    error={isEmailError}
                    helperText={emailErrorMessage}
                />

                {!isLoginRoute && (
                    <TextField
                        fullWidth
                        label="User Name"
                        name="user"
                        value={username}
                        onChange={handleUsernameChange}
                        error={isUsernameError}
                        helperText={usernameErrorMessage}
                    />
                )}
                <TextField
                    fullWidth
                    label="Password"
                    name="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    error={isPasswordError}
                    helperText={passwordErrorMessage}
                />
        </Grid>
        <Grid style={{ textAlign: "center" }}>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: 10, color: "orange" }}
                disabled={
                    isLoginRoute
                    ? isEmailDisabled || isPasswordDisabled
                    : isEmailDisabled ||
                        isPasswordDisabled ||
                        isUsernameDisabled
                }
            >
                {buttonTitle}{" "}
            </Button>
        </Grid>
            </form>
        </Grid>
    );
}

export default Auth;
