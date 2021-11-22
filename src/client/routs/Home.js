import React, { useState } from "react";
import MealList from "../components/MealsList";
import useFetchAPI from "../useFetchAPI";
import WelcomeImage from "../components/WelcomeImage";
import ReviewsList from "../components/ReviewsList";
import { Link } from "react-router-dom";
import AddMealForm from "../components/AddMealForm";

export default function Home() {
    const [mealAdded, setMealAdded] = useState('');
    const fetchReviews = useFetchAPI(`/reviews?limit=3`);
    const fetchUpcomingMeals = useFetchAPI(`/meals?dateAfter=${new Date().toISOString().slice(0, 10)}&limit=3&availableReservations=true`, mealAdded);

    function handleAddMealFormSubmit(data) {
        async function postRequest() {
            try {
                const req = await fetch("api/meals", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (req.ok) setMealAdded(true);
                const result = await req.json();
                console.log(result);
            } catch (e) {
                throw e;
            }
        }
        postRequest();
    }

    return <main>
        <WelcomeImage title="Welcome to your next great meal experience" subtitle="Find good food and new friends" >
            <a className="btn-link bgn-green" href="#addMealForm">Share Meal</a>
            <Link className="btn-link bgn-green" to="/meals">Discover Meals</Link>
        </WelcomeImage>
        <h2 className="centered-text">Upcoming meals! Booking still available!</h2>
        <MealList isLoading={fetchUpcomingMeals.isLoading} meals={fetchUpcomingMeals.data} availableMeals={fetchUpcomingMeals.data?.map(m => m.id)} />
        <h2>Lates Reviews</h2>
        {fetchReviews.data && <ReviewsList className="centered-text bgn-yellow" fetchResult={fetchReviews} />}
        {mealAdded && <p style={{ color: '#9ACD32' }}>Your meal succesfully added</p>}
        <AddMealForm onSubmit={handleAddMealFormSubmit} />
    </main >
}