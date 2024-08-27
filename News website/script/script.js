const API_KEY = "8fd3add716d54ca2b960ac5fbba9a02f";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}

function reload() {
  window.location.reload();
}
// this helps to make the card int html file when ever the request generates in the webpage with the help of templete in html  (in short we make clone of the templete and psuh into the card)
function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardsTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = ""; //its make the container empty when the next request is push

  articles.forEach((articles) => {
    if (!articles.urlToImage) return;

    const cardClone = newsCardsTemplate.content.cloneNode(true); //this is used to clone the whole property in the card container in the html file
    filledDataInCard(cardClone, articles);
    cardsContainer.appendChild(cardClone);
  });
}

function filledDataInCard(cardClone, articles) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = articles.urlToImage;
  newsTitle.innerHTML = articles.title;
  newsDesc.innerHTML = articles.description;

  const date = new Date(articles.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${articles.source.name} . ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(articles.url, "_blank");
  });
}

let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;

  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
