import React from "react";
import useFetchAPI from "../useFetchAPI";

export default function ReviewsList() {
    const fetchResult = useFetchAPI(`/reviews`);

    return <div className="centered-text bgn-yellow">
        <h2>Lates Reviews</h2>
        <ul>
            {fetchResult.isLoading ? <p>Loading meals...</p> :
                fetchResult.data?.slice(0, 3).map((review) => {
                    return <li key={review.id}>
                        <h3>{review.title}</h3>
                        <p><em>{review.description}</em></p>
                        <p>Rating: {review.stars}/5</p>
                    </li>
                })}
        </ul>
    </div>
}