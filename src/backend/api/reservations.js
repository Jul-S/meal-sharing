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

router.post("/", async (request, response) => {
    try {
        const reservation = request.body;
        await knex("reservation").insert(reservation).then(
            id => response.json({ message: `Reservation was added with id=${id}` })
        );

    } catch (error) {
        throw error;
    }
});

router.put("/:id", async (request, response) => {
    try {
        await knex("reservation").where({ id: Number(request.params.id) }).update(
            request.body
        ).then(
            updated => updated ? response.json({ message: 'Reservation was updated' }) : response.json({ error: 'Something went wrong' })
        );

    } catch (error) {
        throw error;
    }
});

router.delete("/:id", async (request, response) => {
    try {
        await knex("reservation").where({ id: Number(request.params.id) }).delete().then(
            deleted => deleted ? response.json({ message: 'Reservation was deleted' }) : response.json({ error: 'Something went wrong' })
        );

    } catch (error) {
        throw error;
    }
});

module.exports = router;