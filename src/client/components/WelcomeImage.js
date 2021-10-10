import React from "react";
import welcome_background from '../assets/images/welcome_background.png';

export default function WelcomeImage(props) {
    return <div className="welcome-banner">
        <img src={welcome_background} alt="People sharing meal" />
        <div className="title-content">
            <div className="bgn-yellow">
                <h1>{props.title}</h1>
                <h3>{props.subtitle}</h3>
            </div>
            {props.children}
        </div>
    </div>
}