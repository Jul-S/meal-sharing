import React, { useState } from "react";

export default function AddReservationForm(props) {
    const [formData, setFormData] = useState({
        number_of_guests: 0,
        contact_phonenumber: "",
        contact_name: "",
        contact_email: ""
    });
    const [formError, setFormError] = useState(false);

    function addReservation(event) {
        event.preventDefault();
        if (Object.values(formData).some(v => !v)) {
            setFormError(true);
            return;
        }
        setFormError(false);
        props.onSubmit("reservations", formData);
        setFormData({
            number_of_guests: 0,
            contact_phonenumber: "",
            contact_name: "",
            contact_email: ""
        });
    }

    function handleChange(event) {
        if (event.target.name === "contact_phonenumber"
            && isNaN(Number(event.target.value))
            || Number(event.target.value) < 0) return;
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    console.log(props);

    return <form onSubmit={addReservation} >
        <h3>Book this meal now</h3>
        {formError && <span style={{ color: 'red' }}>Fill in all fields to submit</span>}
        <label htmlFor="name">Name</label>
        <input id="name"
            name="contact_name"
            type="text"
            maxLength="25"
            placeholder="Enter your full name"
            value={formData.contact_name}
            onChange={handleChange} />
        <label htmlFor="phonenumber">Phonenumber</label>
        <input id="phonenumber"
            type="tel"
            name="contact_phonenumber"
            maxLength="25"
            placeholder="Enter your phone number"
            value={formData.contact_phonenumber}
            onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <input id="email"
            type="email"
            name="contact_email"
            maxLength="25"
            placeholder="Enter your email"
            value={formData.contact_email}
            onChange={handleChange} />
        <label htmlFor="number_of_guests">Number of Guests</label>
        <select id="number_of_guests"
            name="number_of_guests"
            placeholder="1"
            value={formData.number_of_guests}
            onChange={handleChange}>
            {new Array(props.availableReservation).fill().map((i, index) => {
                return <option key={index} value={index + 1}>{index + 1}</option>
            })}
        </select>
        <input type="submit" value="Book Meal" disabled={false} />
    </form>
}