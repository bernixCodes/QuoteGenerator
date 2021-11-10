 
 const quote = document.getElementById('quote');
 const author = document.getElementById('author');
 const newQuote = document.getElementById('newQuoteBut');
 const twitter = document.getElementById('twitter-button');
 const quoteContainer = document.getElementById('container');
 const loader = document.getElementById('loader');

 // show loader
 function ShowLoader(){
     loader.hidden = false;
     quoteContainer.hidden = true
 }

 //hide loader
 function HideLoader(){
     if(!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden = false;
     }
 }

 async function getQuote(){
    const baseUrl = 'https://goquotes-api.herokuapp.com/api/v1/random?count=1';
    try{
        ShowLoader()
        const response = await fetch(baseUrl);
        const data = await response.json();
        if(data.quotes[0].text.length > 120){
                quote.classList.add('long-quote')
        }
        quote.innerText= data.quotes[0].text ;
        author.innerText= data.quotes[0].author ;
        HideLoader()
    } catch(error){
        console.log('Error Message ', error);
    }
}

async function tweetQuote(){
    const quoteTweet = quote.innerText;
    const authorTweet = author.innerText;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteTweet} - ${authorTweet}`;
    window.open(tweetUrl, '_blank')
}

 newQuote.addEventListener('click', getQuote);
 twitter.addEventListener('click', tweetQuote);

 getQuote();