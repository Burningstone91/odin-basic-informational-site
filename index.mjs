import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 8080;

const __dirname = import.meta.dirname;

function createPath(filename) {
  return path.join(__dirname, filename);
}

app.get("/", (req, res) => {
  res.sendFile(createPath("index.html"));
});

app.get("*", (req, res) => {
  res.status(200).sendFile(createPath(req.path + ".html"), (err) => {
    if (err) {
      res.status(404).sendFile(createPath("404.html"), (err) => {
        if (err) {
          res.status(500).send("Server Error:" + err);
        }
      });
    }
  });
});

app.listen(PORT);
