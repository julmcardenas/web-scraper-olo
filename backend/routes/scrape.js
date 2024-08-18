const express = require("express");
const axios = require("axios");
const router = express.Router();
const puppeteer = require("puppeteer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { YoutubeTranscript } = require("youtube-transcript");
const { model } = require("mongoose");
require("dotenv").config();

const YOUTUBE_KEY = process.env.YOUTUBE_KEY;
const GEMINI_KEY = process.env.GEMINI_KEY;
const client = new GoogleGenerativeAI(GEMINI_KEY);
async function fetchYouTubeVideos(productName, numResults) {
  const searchQuery = `${productName} review`;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    searchQuery
  )}&type=video&maxResults=${numResults}&key=${YOUTUBE_KEY}`;

  const response = await axios.get(url);
  const videoIds = response.data.items.map(item => item.id.videoId);
  const videoTitles = response.data.items.map(item => item.snippet.title);

  return [videoIds, videoTitles];
}

async function getYoutubeData(videoIds) {
  const youtubeData = [];
  for (const videoId of videoIds) {
    const youtubeLink = `https://www.youtube.com/watch?v=${videoId}`;
    const data = await getVideoData(videoId);
    youtubeData.push({ link: youtubeLink, ...data });
  }
  return youtubeData;
}

async function fetchVideoTranscripts(videoIds) {
  const transcripts = [];

  for (const videoId of videoIds) {
    try {
      let textTranscript = "";
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      for (t of transcript) {
        textTranscript += t.text + " ";
      }
      transcripts.push(textTranscript);
    } catch (error) {
      transcripts.push("");
    }
    
  }

  return transcripts;
}

async function getSummaries(transcripts, product) {
  const summaries = [];
  const model = client.getGenerativeModel({ model: "gemini-pro" });
  const prompt =
    "Based on this transcript of this youtube video, give me a detailed summary of the video, specifically outlining the pros and cons of the product they reviewed: " +
    product;
  for (const transcript of transcripts) {
    const result = await model.generateContent(prompt + transcript);
    const response = await result.response;
    const summary = response.text();
    summaries.push(summary);
  }
  return summaries;
}

async function getFinalReview(summaries, product) {
  summaryString = summaries.join("\n");

  const model = client.getGenerativeModel({ model: "gemini-pro" });
  const prompt =
    `Based on these summaries of multiple youtube videos reviewing ${product}, give a final detailed review of the product that outlines some of the main pros and cons (make it at least one paragraph), and give the product a score between 1 and 100 where 1 is the worst and 100 is the best. Return the data in this JSON format: {review: "review text", pros: ["pro1", "pro2", ...], cons: ["con1", "con2", ...], score: review score (int)}. Limit the review to 330 characters - keep it brief. Limit the pros and cons 5 pros and 5 cons, and each pro and con to 5-8 words. In your response do not include any formatting or new lines, just provide the raw json text and nothing else. Here are the summaries: ` +
    summaryString;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const review = response.text();
  return JSON.parse(review);
}

async function scrape(url) {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const title = await page.title();
  await browser.close()

  return title;
}

async function getVideoData(id) {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${YOUTUBE_KEY}`
    const response = await axios.get(url);
    const video = response.data.items[0]
    const details = {
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.high.url,
    }
    return details
}

async function getElText(page, selector) {
	return await page.evaluate((selector) => {
		return document.querySelector(selector).innerText
	}, selector);
}


async function getYouTubeComments(videoId, maxResults = 10) {
  try {
    const url = `https://www.googleapis.com/youtube/v3/commentThreads`;
    
    const response = await axios.get(url, {
      params: {
        part: 'snippet',
        videoId: videoId,
        key: YOUTUBE_KEY,
        maxResults: maxResults,
      }
    });

    // Extract comments from the response
    const comments = response.data.items.map(item => {
      const comment = item.snippet.topLevelComment.snippet;
      return comment.textOriginal;
    });

    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

async function getTopCommentsFromVideos(videoIds) {
  const topComments = [];

  for (const videoId of videoIds) {
    const comments = await getYouTubeComments(videoId, 1); // Fetch only the top comment
    if (comments.length > 0) {
      topComments.push(comments[0]);
    } else {
      topComments.push(null);
    }
  }
  return topComments;
}



router.post("/name", async (req, res) => {
  const { product } = req.body;
  const [vidIds, vidTitles] = await fetchYouTubeVideos(product, 3);
  const ytdata = await getYoutubeData(vidIds);
  const transcripts = await fetchVideoTranscripts(vidIds);
  const summaries = await getSummaries(transcripts, product);
  const review = await getFinalReview(summaries, product);
  const comments = await getTopCommentsFromVideos(vidIds);
  res.json({
    productName: product,
    review: review["review"],
    pros: review["pros"],
    cons: review["cons"],
    score: review["score"],
    videos: ytdata,
    comments: comments,
  });
});

router.post("/url", async (req, res) => {
  const { url } = req.body;
  try {
    const product = await scrape(url);
    const [vidIds, vidTitles] = await fetchYouTubeVideos(product, 3);
    const ytdata = await getYoutubeData(vidIds);
    const transcripts = await fetchVideoTranscripts(vidIds);
    const summaries = await getSummaries(transcripts, product);
    const review = await getFinalReview(summaries, product);
    const comments = await getTopCommentsFromVideos(vidIds);
    res.json({
      productName: product,
      review: review["review"],
      pros: review["pros"],
      cons: review["cons"],
      score: review["score"],
      videos: ytdata,
      comments: comments,
    });
  } catch (error) {
    return res.status(500).json({ 
      error: "Failed to scrape the product from the provided URL",
      message: error.message 
    });
  }

});

module.exports = router;
