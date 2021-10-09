import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return <footer>
        <div><img src="src/client/assets/images/logo.jpg" alt="logo" id="logo" /><Link to="/">MealShare</Link></div>
        <Link to="/meals">Discover meals</Link>
        <Link to="/">Contacts</Link>
    </footer>
}