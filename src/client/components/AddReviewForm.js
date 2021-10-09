import React from "react";
export default function AddReviewForm(props) {

    function addReview() {

    }

    return <form onSubmit={addReview}>
        <h3>Add Review</h3>
        <label htmlFor="title">Title</label>
        <input id="title"
            type="text"
            placeholder="Enter title"
            value={props.inputValue}
            onChange={props.onChange} />
        <label htmlFor="description"></label>
        <input id="description"
            type="textarea"
            placeholder="Add more detailed review"
            value={props.inputValue}
            onChange={props.onChange} />
        <input type="submit" value="Add Review" disabled={false} />
    </form>
}