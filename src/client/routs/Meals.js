import React, { useState } from "react";
import MealList from "../components/MealsList";
import useFetchAPI from "../useFetchAPI";
import WelcomeImage from "../components/WelcomeImage";

export default function Meals() {
    const [searchValue, setSearchValue] = useState("");
    let fetchResult = useFetchAPI("/meals");

    function handleChange(event) {
        setSearchValue(event.value);
        fetchResult = useFetchAPI(`/meals?title=${searchValue}`);
    }

    return <main>
        <WelcomeImage title="Find great meals to share with new friends" subtitle="Upcoming meals with available reservations" />
        <input
            type="text"
            placeholder="Search meals"
            value={searchValue}
            onChange={handleChange} />
        <MealList isLoading={fetchResult.isLoading} meals={fetchResult.data} />
    </main>
}