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

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    description: "",
    fields: { 
        shortenUrl: {
            type: shortUrl,
            args: {
                url: {type: GraphQLString} 
            },
            resolve: async (parent, args) => {
                let exists = await urlExists(args.url);
                    if(exists == true){
                        const newurl = {
                        id: urls.length + 1,
                        fullUrl: args.url,
                        short: nanoid(6)
                    }
                    return newurl;
                    }

                    else {
                        throw new Error(`This url is invalid`)
                    }
                  
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})