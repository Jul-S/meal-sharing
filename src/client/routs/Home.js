import React, { useState } from "react";
import MealList from "../components/MealsList";
import useFetchAPI from "../useFetchAPI";
import WelcomeImage from "../components/WelcomeImage";
import ReviewsList from "../components/ReviewsList";
import { Link } from "react-router-dom";
import AddMealForm from "../components/AddMealForm";

export default function Home() {
    const [formMessage, setMessage] = useState('');

    const fetchResult = useFetchAPI(`/meals?createdAfter=${new Date()}&availableReservations=true`);

    function handleAddMealFormSubmit(data) {
        async function postRequest() {
            try {
                const req = await fetch("api/meals", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                console.log(req);
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
        <MealList isLoading={fetchResult.isLoading} meals={fetchResult.data} />
        <ReviewsList />
        {formMessage && <p>{formMessage}</p>}
        <AddMealForm onSubmit={handleAddMealFormSubmit} />
    </main >
}