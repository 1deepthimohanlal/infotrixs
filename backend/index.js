import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import quotes from "./quotes.js";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());



app.get('/api/quote', (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  res.json(randomQuote);
});

app.get('/api/quotesByAuthor', (req, res) => {
  const authorName = req.query.author;
  const quotesByAuthor = quotes.filter(quote => quote.author.toLowerCase().includes(authorName.toLowerCase()));
  res.json(quotesByAuthor);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
