const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

// get all taskers

router.get('/', async (req, res, next) => {
    try {
        const allTaskers = await prisma.tasker.findMany();
    res.send(allTaskers)
    } catch (error) {
        next (error);
    }
})

// get tasker by id

router.get('/:id', async (req, res, next) => {
    try {
        const taskerId = await prisma.tasker.findUnique({
            where:{
                id: Number(req.params.id)
            },
        })
    res.send(taskerId)
    } catch (error) {
        next (error);
    }
})

// get tasker by skill

router.get('/reviews/:id', async (req, res, next) => {
    try {
        const singleTaskerReviews = await prisma.tasker.findUnique({
            where:{
                id: Number(req.params.id)
            },
            include: {
                TaskerReview: true
            }
        })
        res.send(singleTaskerReviews)
    } catch (error) {
        next (error);
    }
})

module.exports = router;