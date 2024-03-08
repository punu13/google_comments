"use strict";

require('dotenv').config()
const express = require('express');

const app = express();
app.use(express.json());

const apiKey = process.env.API_KEY;

app.get('/comments/:videoId', async (req, res) => {
	const videoId = req.params.videoId;
  
	const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`;
  
	try {
	  const response = await fetch(url);
	  const data = await response.json();
  
	  // Extract comments (modify to fit your needs)
	  const comments = data.items.map(item => ({
		textDisplay: item.snippet.topLevelComment.snippet.textDisplay,
		// Add other properties like author name, publish time, etc. (optional)
	  }));
  
	  res.json(comments);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Error fetching comments' });
	}
  });



app.all("/", (req, res) => {

	res.status(200).send("I am Live and Ready.");

});

module.exports = app;