const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {

    if (Object.keys(request.query).length !== 0) {
      const suportedQuerry = ["maxPrice", "title", "availableReservations", "createdAfter", "limit"];

      for (const param of Object.keys(request.query)) {
        if (suportedQuerry.indexOf(param) === -1)
          return response.send(400).json({ error: "This querry param is not supported" });
      }

      const meals = request.query.availableReservations === 'true' ?
        await getMealsWithAvailableReservations() :
        await knex("meal");

      const maxPrice = request.query.maxPrice;
      const title = request.query.title;
      const createdAfter = request.query.createdAfter;
      const limit = request.query.limit;

      if (maxPrice && isNaN(parseInt(maxPrice))
        || createdAfter && isNaN(Date.parse(createdAfter))
        || limit && isNaN(parseInt(limit))
      )
        return response.send(400).json({ error: "Invalid querry param" });

      let filteredMeals = meals.filter(m =>
        (maxPrice ? (m.price < parseInt(maxPrice)) : true) &&
        (title ? (m.title.includes(title)) : true) &&
        (createdAfter ? (new Date(m.createdAt) > Date.parse(createdAfter)) : true)
      );

      filteredMeals = limit ? filteredMeals.slice(0, parseInt(limit)) : filteredMeals;

      return response.send(filteredMeals);
    }

    const meals = await knex("meal");
    response.send(meals);

  } catch (error) {
    throw error;
  }
});

async function getMealsWithAvailableReservations() {
  const filteredIds = await knex("meal")
    .select('meal.id')
    .from('meal')
    .sum({ total_reservations: 'reservation.number_of_guests' })
    .join('reservation', { 'meal.id': 'reservation.meal_id' })
    .groupBy('meal.id')
    .having('total_reservations', '<', 'meal.max_reservations');
  const meals = await knex("meal");
  return meals.filter(m1 => filteredIds.some(m2 => m2.id === m1.id));
}

router.get("/:id", async (request, response) => {
  try {
    if (isNaN(parseInt(request.params.id)))
      return response.status(400).json({ error: "Id is not a number" });

    await knex('meal').where({ id: Number(request.params.id) }).then(
      meal => response.json(meal)
    );
  } catch (error) {
    throw error
  }
});

module.exports = router;
