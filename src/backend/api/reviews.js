const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
    try {
        const reviews = await knex("review");
        response.send(reviews);
    } catch (error) {
        throw error;
    }
});

router.get("/:id", async (request, response) => {
    try {
        if (isNaN(parseInt(request.params.id)))
            return response.status(406).json({ error: "Id is not a number" });

        await knex('review').where({ id: Number(request.params.id) }).then(
            review => response.json(review)
        );
    } catch (error) {
        throw error;
    }
});

module.exports = router;