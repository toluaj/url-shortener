# url-shortener
We don't always want long urls. They're stressful sometimes. This simple app is built to shorten any valid url of your choice.

This project is hosted on https://bitty-uri.herokuapp.com/graphiql.

A frontend interface is hosted on https://bitty-url.netlify.app

Query example:

{
  shortenUrl(url: "https://www.google.com") {
    id
    fullUrl
    short
    shortenedUrl
  }
}

Stack: GraphQL, Express and Node.js
