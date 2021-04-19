const graphql = require('graphql');
const 
{
    GraphQLString, 
    GraphQLObjectType,
    GraphQLSchema
} = graphql;
const shortUrl = require('../TypeDefs/Url');
const urls = require('../urls_database.json');
const {nanoid} = require('nanoid');
const urlExists = require('url-exists-nodejs');
const { request } = require('express');
var os = require('os');

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    description: "",
    fields: { 
        shortenUrl: {
            type: shortUrl,
            args: {
                url: {type: GraphQLString} 
            },
            resolve: async (parent, { url }, context, info) => {
                let exists = await urlExists(url); //checks if this url is valid
                let short = nanoid(6);
                if(exists == true){
                    const newurl = {
                    id: urls.length + 1,
                    fullUrl: url,
                    short,
                    shortenedUrl: `localhost:8000/${short}`
                    }
                urls.push(newurl);
                console.log(os)
                // return process.env.PORT/newurl.short;
                return newurl
                }

                else {
                    return info;
                }
                  
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})