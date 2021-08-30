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


router.post("/", async (request, response) => {
    try {
        const review = request.body;
        await knex("review").insert(review).then(
            id => response.json({ message: `Review was added with id=${id}` })
        );

    } catch (error) {
        throw error;
    }
});

router.put("/:id", async (request, response) => {
    try {
        await knex("review").where({ id: Number(request.params.id) }).update(
            request.body
        ).then(
            updated => updated ? response.json({ message: 'Review was updated' }) : response.json({ error: 'Something went wrong' })
        );

    } catch (error) {
        throw error;
    }
});

router.delete("/:id", async (request, response) => {
    try {
        await knex("review").where({ id: Number(request.params.id) }).delete().then(
            deleted => deleted ? response.json({ message: 'Review was deleted' }) : response.json({ error: 'Something went wrong' })
        );

    } catch (error) {
        throw error;
    }
});

module.exports = router;