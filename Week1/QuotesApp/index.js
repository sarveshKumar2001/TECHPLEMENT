import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {

    try {
      const response = await axios.get("https://api.quotable.io/random");
      const result = response.data;
      console.log(result);

      res.render("index.ejs", { 
        result: result.content,
        author: result.author
     });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
    }
  });

  app.post("/results",async (req, res) => {
    const author = req.body["id"];
    console.log(req.body)
    try {
        const response = await axios.get("https://api.quotable.io/random?author="+author);
        const result = response.data;
        console.log(result);
  
        res.render("index.ejs", { 
          result: result.content,
          author: result.author
       });
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: error.message,
        });
      }

  })
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});