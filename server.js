const express = require('express')
const app = express();
const PORT = 8000;
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const db = require('./urls_database.json');
const schema = require('./Queries/UrlQuery');

app.use(cors());

app.use('/graphiql', graphqlHTTP({
    graphiql: true,
    schema
}))

app.use('/:shortUrl', async(req, res) => {
    const full = db.find(url => url.short === req.params.shortUrl)
    res.redirect(full.fullUrl);
})

app.listen(process.env.PORT || PORT, () => {
    console.log("Server's here")
})