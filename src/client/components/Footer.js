import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo.png'

export default function Footer() {
    return <footer>
        <nav>
            <div><img src={logo} alt="logo" id="logo" /><Link to="/">MealShare</Link></div>
            <div className="flex-column">
                <Link to="/meals">Discover meals</Link>
                <Link to="/about">About </Link>
            </div>
        </nav>
        <h4>Created by Julia Samorodova</h4>
    </footer>
}