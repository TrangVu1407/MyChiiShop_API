const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("<h2>Văn Bình demo 16062000</h2>");
});

const port = process.env.PORT || 1606;

app.listen(port, () => console.log(`listening on port ${port}`));
