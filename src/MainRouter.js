import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
// ==----------------------------------------------------------------------------------

const Home = React.lazy(() => import('./components/Home/Home'));
const Auth = React.lazy(() => import("./components/Auth/Auth"));
const NotFound = React.lazy(() => import("./components/NotFound/NotFound"));
const RecipesHome = React.lazy(()=> import("./components/Protected/RecipesHome"));
const Profile = React.lazy(()=> import("./components/Profile/Profile"));

// ----------------------------------------------------------------------------------------------------
function MainRouter() {
    return (
        <div>
            <Navbar />
            <Switch>
                    <Route exact path="/sign-up" component={Auth} />
                    <Route exact path="/login" component={Auth} />
                    <Route exact path="/logout" render={() => <Redirect to="/login" />} />
                    <Route exact path ="/" component={Home}/>

                    <PrivateRoute exact path="/recipes-home" component={RecipesHome}/>
                    <PrivateRoute exact path = "/profile" component={Profile}/> 
                    <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default MainRouter
