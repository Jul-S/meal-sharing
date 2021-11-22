import React from "react";

export default function MealInfo(props) {
    return <div>
        <h3><b>{props.meal.title}</b></h3>
        <div>
            <p>{props.meal.description}</p>
            <div className="flex">
                <p><strong>Where:</strong> {props.meal.location}</p>
                <p><strong>When:</strong> {props.meal.when.slice(0, 10)}</p>
            </div>
            <p><strong>Guests:</strong> {props.availableReservation} available /{props.meal.max_reservations} total</p>
            <p><strong>Price:</strong> {Number(props.meal.price).toFixed(0)} DKK</p>
        </div>
    </div>
}