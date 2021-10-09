import React, { useState } from "react";
import MealList from "../components/MealsList";
import useFetchAPI from "../useFetchAPI";
import WelcomeImage from "../components/WelcomeImage";

export default function Meals() {
    const [searchValue, setSearchValue] = useState("");
    let fetchAllMeals = useFetchAPI(`/meals?title=${searchValue}`, searchValue);
    let fetchAvailableMeals = useFetchAPI(`/meals?availableReservations=true`, searchValue);

    function handleChange(event) {
        setSearchValue(event.target.value);
    }

    return <main>
        <WelcomeImage title="Find great meals to share with new friends" subtitle="Search all meals" />
        <div style={{ textAlign: 'center' }}>
            <input id="search"
                type="text"
                placeholder="Search meals"
                value={searchValue}
                onChange={handleChange} />
        </div>
        <MealList
            isLoading={fetchAllMeals.isLoading}
            meals={fetchAllMeals.data?.sort((a, b) => { return new Date(b.when) - new Date(a.when) })}
            availableMeals={fetchAvailableMeals.data?.map(m => m.id)} />
    </main>
}