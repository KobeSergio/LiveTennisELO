const express = require("express"),
  { SitemapStream, streamToPromise } = require("sitemap"),
  Matches = require("../models/matchModel"),
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
    const match_data = await Matches.find().distinct("tourney_id"),
      matches = match_data.map((tourney_id) => `/tournaments/${tourney_id}`),
      // Base url of our site
      smStream = new SitemapStream({
        hostname: "https://tenelos.com/",
      }),
      pipeline = smStream.pipe(zlib.createGzip());

    matches.forEach((item) =>
      smStream.write({
        url: item,
        lastmod: date,
        changefreq: "daily",
        priority: 0.7,
      })
    );

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
