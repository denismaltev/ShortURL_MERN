const { Router } = require("express");
const router = Router();
const Link = require("../models/Link");

// GET by id
router.get("/:code", async (req, res) => {
  try {
    // get original url from DB by the code of url from parameters
    const link = await Link.findOne({ code: req.params.code });

    // check if exist and return redirect
    if (link) {
      // add one click to counter and return redirect
      link.clicks++;
      await link.save();
      return res.redirect(link.originalUrl);
    }

    return res.status(404).json({ message: "URL not found" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "ERROR: Something went wrong. Try again." });
  }
});

module.exports = router;
