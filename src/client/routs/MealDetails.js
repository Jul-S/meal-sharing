import React from "react";
import useFetchAPI from "../useFetchAPI";
import MealInfo from "../components/MealInfo";
import { useParams } from "react-router-dom";
import AddReservationForm from "../components/AddReservationForm";
import AddReviewForm from "../components/AddReviewForm";

export default function MealDetails(props) {
    const params = useParams();
    const fetchResult = useFetchAPI(`/meals/${Number(params.mealId)}`);

    return <main>
        {fetchResult.isLoading ? <p>Please wait...</p> : <>
            <MealInfo meal={fetchResult.data[0]} />
            <AddReservationForm meal={fetchResult.data[0]} />
            <AddReviewForm meal={fetchResult.data[0]} />
        </>}
    </main>
}