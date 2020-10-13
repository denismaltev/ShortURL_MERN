const { Router } = require("express");
const router = Router();
const Link = require("../models/Link");
const auth = require("../middleware/auth.middleware");
const shortid = require("shortid");

router.post("/generate", auth, async (req, res) => {
  try {
    const originalUrl = req.body.originalUrl;
    const owner = req.user.userId;

    // check if current user already has original URL.
    const existing = await Link.find({ owner }).findOne({ originalUrl });
    if (existing) {
      return res
        .status(400)
        .json({ message: "This URL is already in database" });
    }

    // create short URL
    const code = shortid.generate();
    const shortUrl = process.env.BASE_URL + "/t/" + code;
    const link = new Link({
      originalUrl,
      shortUrl,
      code,
      owner,
    });
    await link.save();
    return res.status(201).json(link);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "ERROR: Something went wrong. Try again." });
  }
});

// GET all links of current user
router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    return res.status(200).json(links);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "ERROR: Something went wrong. Try again." });
  }
});

// GET link by id
router.get("/:id", auth, async (req, res) => {
  try {
    const owner = req.user.userId;
    //const link = await Link.findById(req.params.id);

    // find the link by id ONLY for current user
    const link = await Link.find({ _id: req.params.id, owner });
    return res.status(200).json(link);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "ERROR: Something went wrong. Try again." });
  }
});

// DELETE link by id
router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const success = await Link.findByIdAndDelete(id);
    if (success) {
      return res.status(200).json({ status: 204, message: "Deleted" });
    } else {
      return res.status(404).json({ status: 404, message: "Not found" });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "ERROR: Something went wrong. Try again." });
  }
});

module.exports = router;
