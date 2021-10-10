const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
    try {
        if (Object.keys(request.query).length !== 0) {
            const suportedQuerry = ["meal_id", "limit"];
            for (const param of Object.keys(request.query)) {
                if (suportedQuerry.indexOf(param) === -1)
                    return response.send(400).json({ error: "This querry param is not supported" });
            }

            if (request.query.meal_id && isNaN(Number(request.query.meal_id))
                || request.query.limit && isNaN(Number(request.query.limit))) {
                return response.send(400).json({ error: "Invalid query param" });
            }

            let reviewsById = request.query.meal_id ? await knex("review").where({ meal_id: Number(request.query.meal_id) }) : undefined;

            let reviewsLimited = request.query.limit ? await knex("review").limit(request.query.limit) : undefined;

            reviewsById ? response.send(reviewsById) : response.send(reviewsLimited);
        } else {
            const reviews = await knex("review");
            response.send(reviews);
        }
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