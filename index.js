console.log("Hello Marcus!");

const Base_Url = "http://localhost:3000/quotes/";

fetch(Base_Url)
  .then((resp) => resp.json())
  .then((quotes) => quotes.forEach(renderQuotes));

function renderQuotes(quotes) {
  const button = document.createElement("BUTTON");
  button.innerText = quotes.id;
  document.getElementById("anime-bar").append(button);

  button.addEventListener("click", () => {
    document.getElementById("name").innerText = quotes.character;
    document.getElementById("quote").innerText = quotes.quote;
    document.getElementById("show").innerText = quotes.anime;
    document.getElementById("image").src = quotes.image;
    const likes = document.querySelector(".likes");
    likes.innerText = `Likes: ${quotes.likes}`;
    likes.addEventListener("click", (event) => {
      const id = quotes.id;
      quotes.likes += 1;

      const updatedLikes = {
        likes: quotes.likes + 1,
      };

      console.log(event);

      const reqObj = {
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
        body: JSON.stringify(updatedLikes),
      };
      fetch(Base_Url + id, reqObj)
        .then((response) => response.json())
        .then((updatedLikes) => {
          likes.innerText = `Likes: ${updatedLikes.likes}`;
        });
    });
  });
}
