const express = require("express");
const app = express();
const { connectMongoDb } = require("./connection");
const userRouter = require("./routes/url");
const URL = require("./models/url");

const PORT = 8001;

// Connect to MongoDB
connectMongoDb("mongodb://127.0.0.1:27017/shorturl").then(() =>
    console.log("MongoDB connected")
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/url", userRouter);

// Route for redirecting short URL to the original URL
app.get("/:shortID", async (req, res) => {
    const shortID = req.params.shortID;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortUrl: shortID }, // Make sure this matches your schema field
            {
                $push: {
                    visitHistory: { timeStamp: Date.now() },
                },
            },
            { new: true } // Return the updated document
        );

        if (!entry) {
            return res.status(404).json({ msg: "URL not found" });
        }

        res.redirect(entry.redirectedUrl);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
