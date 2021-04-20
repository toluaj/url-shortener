import React, {useState, useEffect} from 'react';
import './index.css';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache, gql, useLazyQuery } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const client = new ApolloClient({
  uri: 'https://bitty-uri.herokuapp.com/graphiql',
  cache: new InMemoryCache()
})

const GET_SHORTENED_URL = gql`
  query Shorten($url: String!) {
    shortenUrl(url: $url) {
      short
      shortenedUrl
      fullUrl
    }
  }
`;
toast.configure();
function GetUrl() {

  const [url, setUrl] = useState("");
  

 const [ getData, {data, loading, error} ] = useLazyQuery(GET_SHORTENED_URL, {
   variables: { url },
   fetchPolicy: 'network-only'
 })
 
 function goBack() {
   window.location.reload();
 }
 console.log(data);
 if (loading) return <img src="https://res.cloudinary.com/dthdj5bkt/image/upload/v1618933618/Infinity-1.4s-191px.svg" />
 if(error) { 
  
  toast.error("Invalid Url")
  // goBack();
  }
  return (

    <div id="container">
    <h1 className="head">URL SHRINKER</h1>
    <div className="demo-flex-spacer"></div>
      { data ? <div >
          <h1>Full Url: <a href = {data.shortenUrl.fullUrl}> {data.shortenUrl.fullUrl} </a> </h1>
          <hr></hr>
          <h1>Shortened Url: <a href =  {data.shortenUrl.shortenedUrl}> {data.shortenUrl.shortenedUrl}</a></h1>
          <br></br>
          <button id="back" onClick={() => goBack()}><i class="fa fa-angle-right" aria-hidden="true"></i></button>
      </div> : 
              

      <div className="webflow-style-input">
      <input 
      type="text"
      placeholder="URL"
      onChange={(e) => {
          setUrl(e.target.value);
      }}
      />
      <button onClick={() => getData()}><i className="fa fa-angle-right" aria-hidden="true"></i>Shrink</button>
    </div>
      
      }

    </div>
    
  )
    }

render(
  <ApolloProvider client={client}>
    <GetUrl />
  </ApolloProvider>,
  document.getElementById('root')
  
);


// client.query({
//   query: gql`
//     query {
//        shortenUrl(url: "https://www.facebook.com") {
//         short
//         shortenedUrl
//         fullUrl
//       }
//     }
//   `
// })
// .then(result => console.log(result))