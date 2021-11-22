import React, { useState } from "react";
import { Rating } from 'react-simple-star-rating';

export default function AddReviewForm(props) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        stars: 0
    });
    const [formError, setFormError] = useState(false);

    function addReview(event) {
        event.preventDefault();
        if (Object.values(formData).some(v => !v)) {
            setFormError(true);
            return;
        }
        setFormError(false);
        props.onSubmit("reviews", formData);
        setFormData({
            title: "",
            description: "",
            stars: 0
        });
    }

    function handleChange(event) {
        if (!isNaN(event)) {
            setFormData({
                ...formData,
                ['stars']: event
            });
        } else {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value
            });
        }
    }

    return <form onSubmit={addReview}>
        <h3>Add Review</h3>
        {formError && <span style={{ color: 'red' }}>Fill in all fields to submit</span>}
        <label htmlFor="title">Title</label>
        <input id="title"
            name="title"
            type="text"
            maxLength="25"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleChange} />
        <label htmlFor="description">Your message</label>
        <textarea id="description"
            name="description"
            type="textarea"
            maxLength="250"
            placeholder="Add more detailed review"
            value={formData.description}
            onChange={handleChange} />
        <label htmlFor="stars">Rating</label>
        <Rating className="grid-2" onClick={handleChange} ratingValue={formData.stars} fillColor="#E9573F" />
        <input type="submit" value="Add Review" disabled={false} />
    </form>
}