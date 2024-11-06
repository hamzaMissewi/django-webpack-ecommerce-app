import React from 'react';
import './notFound.css';


function NotFound() {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-message">Oops! Page not found.</p>
            <p className="not-found-suggestion">The page you are looking for might have been removed, had its name
                changed, or is temporarily unavailable.</p>
            <a href="/" className="not-found-home-link">Go to Home</a>
        </div>
    );
}

export default NotFound;