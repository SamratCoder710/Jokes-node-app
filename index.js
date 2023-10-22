import express from "express";
import axios from "axios";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.get("/", async (req, res) => {
    const joke = await generateJoke();
    res.render("index.ejs",{
        joke
    });
});

app.listen(port, () => {
  console.log(`Server listening at port : ${port}`);
});

async function generateJoke(){
 try{
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any");
    const data = response.data;
    let joke;
    if (data.type === "single") {
      joke = data.joke;
    } else {
      joke = `${data.setup} 
                    ${data.delivery}`;
    }
    return joke;
 }catch (err) {
    console.log(err);
    return err;
  }
}