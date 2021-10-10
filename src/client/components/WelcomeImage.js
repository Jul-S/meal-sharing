import React from "react";

export default function WelcomeImage(props) {
    return <div className="welcome-banner">
        <img src="welcome_background.png" alt="People sharing meal" />
        <div className="title-content">
            <div className="bgn-yellow">
                <h1>{props.title}</h1>
                <h3>{props.subtitle}</h3>
            </div>
            {props.children}
        </div>
    </div>
}