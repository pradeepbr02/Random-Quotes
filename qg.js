const quoteContainer = document.getElementById("qg");
const Quotes = document.getElementById("qt");
const author = document.getElementById("auth");
const tweetbtn = document.getElementById("tweet");
const newqbtn = document.getElementById("nq");
const loader = document.getElementById("loader");




let apiQuotes = [];

function showLoader(){
    quoteContainer.hidden = true;
    loader.hidden = false;
}
function downLoader(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function showContent(){
    showLoader();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!quote.author){
        quote.author = "Unknown";
        author.textContent = quote.author;
    }
    else{
        author.textContent = quote.author;
    }

    if(quote.text.length > 120){
        Quotes.classList.add("long-quote");
        Quotes.textContent = quote.text;
    }
    else{
        Quotes.classList.remove("long-text");
        Quotes.textContent = quote.text;
    }
    downLoader();
}
async function getQuotes(){
    showLoader();
    let url ="https://type.fit/api/quotes";
    try{
        const response = await fetch(url);
        apiQuotes = await response.json();
        showContent(); 

    }
    catch(error){
        console.log(error);
    }
   
}
function tweetIt(){
    const tweetUrl = `https://twitter.com/intent/tweet?text=${Quotes.textContent} - ${author.textContent} `;
    window.open(tweetUrl , "_blank")


}
newqbtn.addEventListener("click",showContent);
tweetbtn.addEventListener("click",tweetIt);
getQuotes();

