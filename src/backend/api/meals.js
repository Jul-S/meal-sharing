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

      const maxPrice = request.query.maxPrice;
      const availableReservations = request.query.availableReservations;
      const title = request.query.title;
      const createdAfter = request.query.createdAfter;
      const limit = request.query.limit;

      if (maxPrice && isNaN(parseInt(maxPrice))
        || createdAfter && isNaN(Date.parse(createdAfter))
        || limit && isNaN(parseInt(limit))
      ) {
        return response.send(400).json({ error: "Invalid query param" });
      }
      const meals = availableReservations === 'true' ?
        await getMealsWithAvailableReservations() :
        await knex("meal");

      let filteredMeals = meals.filter(m =>
        (maxPrice ? (m.price < parseInt(maxPrice)) : true) &&
        (title ? (m.title.includes(title)) : true) &&
        (createdAfter ? (new Date(m.createdAt) > Date.parse(createdAfter)) : true)
      );

      filteredMeals = limit ? filteredMeals.slice(0, parseInt(limit)) : filteredMeals;

      return response.send(filteredMeals);
    } else {
      const meals = await knex("meal");
      response.send(meals);
    }
  } catch (error) {
    throw error;
  }
});

async function getMealsWithAvailableReservations() {
  const filteredIds = await knex('meal')
    .select('meal.id', 'meal.max_reservations')
    .sum({ 'total_reservations': 'reservation.number_of_guests' })
    .join('reservation', { 'meal.id': 'reservation.meal_id' })
    .groupBy('meal.id')
    .having(knex.raw('total_reservations < meal.max_reservations'));
  console.log("filtered", filteredIds);
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

router.post("/", async (request, response) => {
  try {
    const meal = request.body;
    await knex("meal").insert(meal).then(
      id => response.json({ message: `Meal was added with id=${id}` })
    );

  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (request, response) => {
  try {
    await knex("meal").where({ id: Number(request.params.id) }).update(
      request.body
    ).then(
      updated => updated ? response.json({ message: 'Meal was updated' }) : response.json({ error: 'Something went wrong' })
    );

  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    await knex("meal").where({ id: Number(request.params.id) }).delete().then(
      deleted => deleted ? response.json({ message: 'Meal was deleted' }) : response.json({ error: 'Something went wrong' })
    );

  } catch (error) {
    throw error;
  }
});

module.exports = router;
