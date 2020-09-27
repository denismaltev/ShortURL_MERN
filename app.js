const express = require("express");
const app = express();
const config = require("config");
const PORT = config.get("port") || 5000;

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});
