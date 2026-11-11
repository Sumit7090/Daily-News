
const API_KEY = "9ae6d3b9460d68ae2be1231bc45fe4f1";

let newsContainer = document.getElementById("newsContainer");

let message = document.getElementById("message");


async function getNews(category = "general") {

    newsContainer.innerHTML = "";

    message.textContent = "Loading news...";

    try {

        let url = `https://gnews.io/api/v4/top-headlines?country=in&lang=en&category=${category}&apikey=${API_KEY}`;

        let response = await fetch(url);

        let data = await response.json();

        console.log(data);

        if (!response.ok) {

            throw new Error(data.errors
                ? data.errors.join(", ")
                : "Unable to fetch news");

        }

        if (data.articles && data.articles.length > 0) {

            message.textContent = "Latest News";

            displayNews(data.articles);

        } else {

            message.textContent = "No news found!";

        }

    } catch (error) {

        message.textContent = "Error: " + error.message;

        console.log(error);

    }

}


async function searchNews() {

    let keyword = document.getElementById("searchInput").value.trim();

    if (keyword === "") {

        message.textContent = "Please enter a news topic!";

        return;

    }

    newsContainer.innerHTML = "";

    message.textContent = "Searching news...";

    try {

        let url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(keyword)}&lang=en&country=in&apikey=${API_KEY}`;

        let response = await fetch(url);

        let data = await response.json();

        console.log(data);

        if (!response.ok) {

            throw new Error(data.errors
                ? data.errors.join(", ")
                : "Unable to search news");

        }

        if (data.articles && data.articles.length > 0) {

            message.textContent = "Search Results";

            displayNews(data.articles);

        } else {

            message.textContent = "No news found!";

        }

    } catch (error) {

        message.textContent = "Error: " + error.message;

        console.log(error);

    }

}


function displayNews(articles) {

    newsContainer.innerHTML = "";

    articles.forEach(function(article) {

        let card = document.createElement("div");

        card.className = "news-card";

        let image = document.createElement("img");

        image.src = article.image ||
            "https://placehold.co/400x250?text=No+Image";

        image.alt = article.title;

        let title = document.createElement("h3");

        title.textContent = article.title;

        let description = document.createElement("p");

        description.textContent =
            article.description || "No description available.";

        let link = document.createElement("a");

        link.href = article.url;

        link.target = "_blank";

        link.rel = "noopener noreferrer";

        link.textContent = "Read More";

        card.appendChild(image);

        card.appendChild(title);

        card.appendChild(description);

        card.appendChild(link);

        newsContainer.appendChild(card);

    });

}


document.getElementById("searchInput").addEventListener("keydown",
    function(event) {

        if (event.key === "Enter") {

            searchNews();

        }

    }
);


getNews();
