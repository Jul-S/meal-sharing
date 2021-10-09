import React from "react";
import DatePicker from 'react-datepicker';
export default function AddReservationForm(props) {

    function addReservation() {

    }

    return <form onSubmit={addReservation}>
        {/* <div>
            <label htmlFor="date">Deadline</label>
            <DatePicker id="date"
                selected={props.date}
                dateFormat='yyyy-MM-dd'
                onChange={(date) => props.onChange(date)}
                minDate={props.date} />
        </div> */}
        <h3>Book this meal now</h3>
        <label htmlFor="name">Name</label>
        <input id="name"
            type="text"
            placeholder="Enter your full name"
            value={props.inputValue}
            onChange={props.onChange} />
        <label htmlFor="phonenumber">Phonenumber</label>
        <input id="phonenumber"
            type="text"
            placeholder="Enter your phone number"
            value={props.inputValue}
            onChange={props.onChange} />
        <label htmlFor="email">Email</label>
        <input id="email"
            type="text"
            placeholder="Enter your email"
            value={props.inputValue}
            onChange={props.onChange} />
        <input type="submit" value="Book Meal" disabled={false} />
    </form>
}