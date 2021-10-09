import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function AddMealForm(props) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        when: new Date(),
        max_reservations: "",
        price: "",
        created_date: new Date()
    });

    function addMeal(event) {
        event.preventDefault();
        //reconstractine meal dta so Datepicker works and data sent in correct format
        const meal = {
            ...formData,
            "when": formData.when.toISOString().slice(0, 10),
            "created_date": formData.created_date.toISOString().slice(0, 10)
        }
        props.onSubmit(meal);
    }

    function handleChange(event) {
        if (event instanceof Date) {
            setFormData({
                ...formData,
                ["when"]: event
            });
        } else if (event.target.name === "price" || event.target.name === "max_reservations") {
            if (isNaN(Number(event.target.value)) || Number(event.target.value) < 0) return;
            setFormData({
                ...formData,
                [event.target.name]: event.target.value
            });
        } else {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value
            });
        }

    }

    return <form id="addMealForm" onSubmit={addMeal}>
        <h3>Share a meal</h3>
        <label htmlFor="title">Title</label>
        <input id="title"
            name="title"
            type="text"
            maxLength="25"
            placeholder="Add title"
            value={formData.title}
            onChange={handleChange} />
        <label htmlFor="description">Details</label>
        <textarea id="description"
            name="description"
            maxLength="250"
            placeholder="Add more detailed description"
            value={formData.description}
            onChange={handleChange} />
        <label htmlFor="location">Where</label>
        <input id="location"
            name="location"
            type="text"
            placeholder="Add location"
            value={formData.location}
            onChange={handleChange} />
        <label htmlFor="when">When</label>
        <DatePicker id="when"
            name="when"
            selected={formData.when}
            dateFormat='yyyy-MM-dd'
            onChange={(date) => handleChange(date)}
            minDate={formData.created_date} />
        <label htmlFor="reservations">Number of Guests</label>
        <input id="reservations"
            name="max_reservations"
            type="text"
            maxLength="5"
            placeholder="Add max number of guests"
            value={formData.max_reservations}
            onChange={handleChange} />
        <label htmlFor="price">Price</label>
        <input id="price"
            name="price"
            type="text"
            maxLength="15"
            placeholder="Add Price"
            value={formData.price}
            onChange={handleChange} />
        <input type="submit" value="Share Meal" disabled={false} />
    </form>
}