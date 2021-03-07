const express = require("express");
const mongoose = require("mongoose");
const Article = require('./models/article')
const methodOverride = require('method-override')
const app = express();
const articleRouter = require("./routes/articles");

mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', {articles: articles})
})

app.listen(8080, '192.168.1.156');

app.use("/articles", articleRouter);