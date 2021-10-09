import React from "react";
import MealListCard from "./MealListCard";

export default function MealList(props) {
    return <main>
        <ul className="card-list">
            {props.isLoading ? <p>Loading meals...</p> :
                props.meals?.map((meal) => { return <MealListCard key={meal.id} meal={meal} /> })}
        </ul>
    </main>
}