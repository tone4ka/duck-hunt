/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
const { Router } = require("express");
const Stat = require("../models/Stat");
const auth = require("../middleware/auth.middleware");
const User = require("../models/User");

const router = Router();

router.post("/save", auth, async (req, res) => {
    const now = new Date();
    try {
        const { time, ducks, hits, kills, score } = req.body;
        const stat = new Stat({
            time,
            ducks,
            hits,
            kills,
            score,
            owner: req.user.userId
        });
        await stat.save();
        res.status(201).json({ stat });

        console.log(`${now} user with id ${req.user.userId} stat save`);
    } catch (e) {
        res.status(500).json({ message: "SomethingWentWrongTryAgain" }); // Что-то пошло не так, попробуйте снова
        console.log(`${now} Error user with id ${req.user.userId} stat save`);
    }
});
router.get("/", auth, async (req, res) => {
    const now = new Date();
    try {
        const stat = await Stat.find({ owner: req.user.userId });
        res.json(stat);

        console.log(`${now} user with id ${req.user.userId} stat get`);
    } catch (e) {
        res.status(500).json({ message: "SomethingWentWrongTryAgain" }); // Что-то пошло не так, попробуйте снова
        console.log(`${now} Error user with id ${req.user.userId} stat get`);
    }
});
router.get("/all", async (req, res) => {
    const now = new Date();
    try {
        const users = await User.find({}, { email: 1 });
        for (let i = 0; i < users.length; i += 1) {
            users[i].stats = await Stat.find({ owner: users[i]._id }, { owner: 0, _id: 0, __v: 0 });
        }

        for (let i = 0; i < users.length; i += 1) {
            users[i]._id = null;
        }
        res.json(users);
        console.log(`${now} all stat get`);
    } catch (e) {
        res.status(500).json({ message: "SomethingWentWrongTryAgain" }); // Что-то пошло не так, попробуйте снова
        console.log(`${now}  Error all stat get`);
    }
});
module.exports = router;
