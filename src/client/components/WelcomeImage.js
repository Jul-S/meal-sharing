import React from "react";
import welcome from '../assets/images/welcome.png';

export default function WelcomeImage(props) {
    return <div className="welcome-banner">
        <img src={welcome} alt="People sharing meal" />
        <div className="title-content">
            <div className="bgn-yellow">
                <h1>{props.title}</h1>
                <h3>{props.subtitle}</h3>
            </div>
            {props.children}
        </div>
    </div>
}