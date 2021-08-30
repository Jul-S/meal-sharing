const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
    try {
        const reservations = await knex("reservation");
        response.send(reservations);
    } catch (error) {
        throw error;
    }
});

router.get("/:id", async (request, response) => {
    try {
        if (isNaN(parseInt(request.params.id)))
            return response.status(406).json({ error: "Id is not a number" });

        await knex('reservation').where({ id: Number(request.params.id) }).then(
            reservation => response.json(reservation)
        );
    } catch (error) {
        throw error;
    }
});

module.exports = router;