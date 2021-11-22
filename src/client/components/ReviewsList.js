import React from "react";
import { RatingView } from 'react-simple-star-rating';

export default function ReviewsList(props) {
    const fetchResult = props.fetchResult;
    console.log(fetchResult);
    return <div className={props.className}>
        <ul>
            {fetchResult.isLoading ? <p>Loading reviews...</p> :
                fetchResult.data.length > 0 ?
                    fetchResult.data?.map((review) => {
                        return <li key={review.id}>
                            <h3>{review.title}</h3>
                            <p><em>{review.description}</em></p>
                            <p>Rating</p>
                            <RatingView ratingValue={review.stars} fillColor="#E9573F" />
                            <p>_____</p>
                        </li>
                    }) :
                    <p>This meal has no reviews yet</p>}
        </ul>
    </div>
}