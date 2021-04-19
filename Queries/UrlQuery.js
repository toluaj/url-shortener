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
const { response } = require('express');

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
                        
                if(exists == true){
                    const newurl = {
                    id: urls.length + 1,
                    fullUrl: url,
                    short: nanoid(6)
                    }
                urls.push(newurl);
                return newurl;
                }

                else {
                    console.log(info);
                    return info;
                }
                  
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})