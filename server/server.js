const express = require('express')
const app = express();
const PORT = 8000;
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const db = require('./urls_database.json');
const schema = require('./Queries/UrlQuery');
const path = require('path');

app.use(cors());


app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.use('/graphiql', graphqlHTTP({
    graphiql: true,
    schema
}))

app.use('/:shortUrl', async(req, res) => {

    const { shortUrl } = req.params;

    if(shortUrl.length != 6 ) {
        return res.status(404).send("Invalid shortened url: Syntax error");
    }

    const full = db.find(url => url.short === shortUrl)
    
    if(!full) {
        return res.status(404).send("Could not find shortened url");
    }

    res.redirect(full.fullUrl);
})

app.listen(process.env.PORT || PORT, () => {
    console.log("Server's here")
})