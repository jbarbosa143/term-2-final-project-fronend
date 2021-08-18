import React,{ useContext , useEffect} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button} from '@material-ui/core';
import {NavLink, Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import checkAuthCookie from "../hooks/checkAuthCookie";


const useStyle = makeStyles((theme) => ({
    root:{
        flexGrow: 1,
    },
    menuButton:{
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow:1,
    },
}));

function Navbar(props) {
    const classes = useStyle();
    const { logUserIn } = checkAuthCookie();
    const {state: {user}, dispatch} = useContext(AuthContext);
    const isUserLoggedIn = user ? true : false;
    const navLinkTitleOne = isUserLoggedIn ? "/profile" : "/login";
    const navLinkDisplayOne = isUserLoggedIn ? `${user.username}` : "login";
    const navLinkTitleTwo =  isUserLoggedIn ? "/logout" : "/sign-up";
    const navLinkDisplayTwo = isUserLoggedIn ? "Logout" : "Sign-Up";
    const navLinkTitleThree = isUserLoggedIn ? "/recipes-home" : "";
    const navLinkDisplayThree = isUserLoggedIn ? "Search" : "";
    const logoutButton = isUserLoggedIn ? logout: () => {};
// ------------------------------------------------------------------
    async function logout(){
        try{
            await axios.get("http://localhost:3001/api/users/logout");

            dispatch({
                type:"LOG_OUT",
            });
            Cookies.remove('jwt-cookie');
            props.history.push("/login");
            
        }catch (e){
            console.log(e)
        }
    }
// -----------------------------------------------------------------------
    useEffect(() => {
        logUserIn();
    }, []);
// --------------------------------------------------------------------------
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <img src="" alt="kitten"/>
                    <Typography variant="h6" className={classes.title}>
                        <p>Welcome to Free Recipes!</p>
                    </Typography>

                    <NavLink activeStyle={{color: "red"}} exact to={navLinkTitleThree}>
                        <Button color="inherit" style={{color:"orange"}}>{navLinkDisplayThree}</Button>
                    </NavLink>

                    <NavLink activeStyle={{ color: "red" }} exact to={navLinkTitleOne}>
                        <Button color="inherit" style={{ color: "orange" }}>
                        {navLinkDisplayOne}</Button>
                    </NavLink>

                    <NavLink activeStyle={{ color: "red" }} exact to={navLinkTitleTwo} onClick={logoutButton}> 
                        <Button color="inherit" style={{ color: "orange" }}>
                        {navLinkDisplayTwo}</Button>
                    </NavLink>

                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(Navbar);
