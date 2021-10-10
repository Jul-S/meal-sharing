import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/hyf.png'

export default function Header() {
    return <header>
        <nav>
            <div>
                <img src={logo} alt="logo" id="logo" />
                <Link to="/">MealShare</Link>
            </div>
            <Link to="/meals">Discover meals</Link>
            <a href="#addMealForm">Share Meal</a>
        </nav>
    </header>
}