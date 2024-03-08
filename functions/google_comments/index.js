"use strict";

require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

const apiKey = process.env.GAPI_KEY;

console.log(apiKey);

app.get("/comments/:videoId", async (req, res) => {
  const videoId = req.params.videoId;

  const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Extract comments (modify to fit your needs)
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching comments" });
  }
});

app.all("/", (req, res) => {
  res.status(200).send("I am Live and Ready.");
});

module.exports = app;
