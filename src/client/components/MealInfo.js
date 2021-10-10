import React from "react";
import meal_default from '../assets/images/meal_default.png';

export default function MealInfo(props) {
    return <div>
        <img src={meal_default} alt="Meal image" style={{ width: "100%" }} />
        <h3><b>{props.meal.title}</b></h3>
        <div>
            <p>{props.meal.description}</p>
            <p>Where: {props.meal.location}</p>
            <p>When: {props.meal.when.slice(0, 10)}</p>
            <p>Price: {Number(props.meal.price).toFixed(0)} DKK</p>
        </div>
    </div>
}