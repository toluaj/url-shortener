const graphql = require('graphql');
const {
       GraphQLInt, 
       GraphQLString,  
       GraphQLNonNull, 
       GraphQLObjectType, 
       } = graphql;

const shortUrl = new GraphQLObjectType({
    name: "Url",
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLInt)
        },
        fullUrl: {
            type: GraphQLNonNull(GraphQLString)
        },
        short: {
            type: GraphQLNonNull(GraphQLString)
        },
        shortenedUrl: {
            type: GraphQLNonNull(GraphQLString)
        }
    })
})

module.exports = shortUrl;