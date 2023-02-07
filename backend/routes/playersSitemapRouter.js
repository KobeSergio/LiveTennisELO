const express = require("express"),
  { SitemapStream, streamToPromise } = require("sitemap"),
  Matches = require("../models/matchModel"),
  Players = require("../models/playerModel"),
  date = new Date().toISOString(),
  zlib = require("zlib"),
  router = express.Router();

let sitemap;

router.get("/", async function (req, res) {
  res.header("Content-Type", "application/xml");
  res.header("Content-Encoding", "gzip");

  // If we have a cached entry send it
  if (sitemap) return res.send(sitemap);

  try {
    // Fetching todo records and mapping
    // it the desired URL pattern
    const player_data = await Players.find().distinct("player_id"),
      players = player_data.map((player_id) => `/players/${player_id}`),
      // Base url of our site
      smStream = new SitemapStream({
        hostname: "https://tenelos.com/",
      }),
      pipeline = smStream.pipe(zlib.createGzip()); 

    // Write todo URL to the stream
    players.forEach((item) =>
      smStream.write({
        url: item,
        lastmod: date,
        changefreq: "daily",
        priority: 0.7,
      })
    );

    const match_data = await Matches.find().distinct("tourney_id"),
      matches = match_data.map((tourney_id) => `/tournaments/${tourney_id}`);
    // Write todo URL to the stream
    matches.forEach((item) =>
      smStream.write({
        url: item,
        lastmod: date,
        changefreq: "daily",
        priority: 0.7,
      })
    );

    // Manually add all the other important URLs
    smStream.write({
      url: "/about",
      lastmod: date,
      changefreq: "monthly",
      priority: 0.9,
    });

    // Manually add all the other important URLs
    smStream.write({
      url: "/tournaments",
      lastmod: date,
      changefreq: "monthly",
      priority: 0.9,
    });
    // Manually add all the other important URLs
    smStream.write({
      url: "/players",
      lastmod: date,
      changefreq: "monthly",
      priority: 0.9,
    });
    // Manually add all the other important URLs
    smStream.write({
      url: "/charts",
      lastmod: date,
      changefreq: "monthly",
      priority: 0.9,
    });

    // Cache the response
    streamToPromise(pipeline).then((sm) => (sitemap = sm));
    smStream.end();

    // Stream write the response
    pipeline.pipe(res).on("error", (e) => {
      throw e;
    });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

module.exports = router;
