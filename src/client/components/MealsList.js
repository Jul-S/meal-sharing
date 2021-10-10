import React, { useEffect, useState } from "react";
import MealListCard from "./MealListCard";

export default function MealList(props) {
    const [availableList, setAvailableList] = useState([]);

    useEffect(() => {
        setAvailableList(props.availableMeals);
    });
    return <main>
        <ul className="card-list">
            {props.isLoading ? <p>Loading meals...</p> :
                props.meals?.map((meal) => { return <MealListCard key={meal.id} meal={meal} available={availableList?.indexOf(meal.id) > -1} /> })}
        </ul>
    </main>
}