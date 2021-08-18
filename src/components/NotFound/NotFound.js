import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div>
            404 - ERROR - Sorry The Page you are looking for does not EXIST... Please Return back to {''} !!
            <Link to='/'>Home Page</Link>
        </div>
    )
}

export default NotFound
