import * as http from "http";
import * as fs from "fs";

const errorPage = fs.readFileSync("./404.html", "utf-8", (err, data) => {
  if (err) throw err;
  return data;
});

http
  .createServer(function (req, res) {
    const pages = {
      "/": "./index.html",
      "/about": "./about.html",
      "/contact-me": "./contact-me.html",
    };
    const path = req.url;

    let page = pages[path];
    if (!page) page = "";

    fs.readFile(page, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(errorPage);
        return res.end;
      } else {
        res.writeHead(202, { "Content-Type": "text/html" });
        res.write(data);
        return res.end;
      }
    });
  })
  .listen(8080);
