import React, { useEffect, useState } from "react";
import useFetchAPI from "../useFetchAPI";
import MealInfo from "../components/MealInfo";
import { useParams } from "react-router-dom";
import AddReservationForm from "../components/AddReservationForm";
import AddReviewForm from "../components/AddReviewForm";
import ReviewsList from "../components/ReviewsList";

export default function MealDetails(props) {
    const params = useParams();
    const [availableReservation, setAvailableReservations] = useState();
    const [formSubmited, setFormSubmited] = useState(false);
    const fetchMeal = useFetchAPI(`/meals/${Number(params.mealId)}`);
    const fetchReservations = useFetchAPI(`/reservations?meal_id=${Number(params.mealId)}`, formSubmited);
    const fetchReviews = useFetchAPI(`/reviews?meal_id=${Number(params.mealId)}`, formSubmited);

    function getAvailableReservations() {
        if (!fetchReservations.data || !fetchMeal.data) return;
        const reserved = fetchReservations.data.length === 0 ? 0 :
            fetchReservations.data?.map(res => res.number_of_guests).reduce((sum, num) => sum + num);
        return fetchMeal.data[0].max_reservations - reserved;
    }

    useEffect(() => { setAvailableReservations(getAvailableReservations()) }, [fetchMeal, fetchReservations])

    function handleSubmit(url, data) {
        async function postRequest() {
            const body = {
                ...data,
                meal_id: params.mealId,
                created_date: new Date().toISOString().slice(0, 10)
            }
            try {
                const req = await fetch("api/" + url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
                if (req.ok) { setFormSubmited(true); }
                else { setFormSubmited(false); }
                const result = await req.json();
                alert(result);
            } catch (e) {
                setFormSubmited(false);
                throw e;
            }
        }
        postRequest();
    }


    return <main >
        {props.location.state.mealAvailable ?
            <h3>This meal still has available reservations</h3> :
            <h3>This meal already passed. But you can leave review</h3>}
        {fetchMeal.isLoading ?
            <p>Please wait...</p> :
            <div className="flex">
                <div className="flex-60">
                    <MealInfo meal={fetchMeal.data[0]} />
                    <h3>Reviews</h3>
                    <ReviewsList fetchResult={fetchReviews} />
                </div>
                <div className="flex-40">
                    {props.location.state.mealAvailable ?
                        <>
                            {formSubmited && <p style={{ color: '#9ACD32' }}>Your reservation succesfully added</p>}
                            <AddReservationForm availableReservation={availableReservation} onSubmit={handleSubmit} /> </> :
                        <>
                            {formSubmited && <p style={{ color: '#9ACD32' }}>Your review succesfully added</p>}
                            <AddReviewForm onSubmit={handleSubmit} /></>}
                </div>
            </div>
        }
    </main >
}