console.log("Hello Marcus!");

const Base_Url = "http://localhost:3000/quotes/";

fetch(Base_Url)

.then(resp => resp.json())
.then(quotes => quotes.forEach(renderQuotes))

function renderQuotes(quotes){
    const button = document.createElement("BUTTON")
    button.innerText = quotes.id
    button.className = "btn"
    document.getElementById("anime-bar").append(button)

    button.addEventListener("click", () => {
        document.getElementById("name").innerText = quotes.character
        document.getElementById("quote").innerText = quotes.quote
        document.getElementById("show").innerText = quotes.anime
        document.getElementById("image").src = quotes.image
    })
  
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

const addNew = document.createElement("BUTTON")
addNew.innerText = "Add New Quote"
document.getElementById("anime-bar").appendChild(addNew)
addNew.addEventListener("click", () => {
    const newForm = document.querySelector("form")
    newForm.setAttribute("method", "post");
    newForm.setAttribute("action", "submit.php")

    const nameInput = document.createElement("input")
    nameInput.setAttribute("type", "text")
    nameInput.setAttribute("placeholder", "name")
    newForm.appendChild(nameInput)

    const animeInput = document.createElement("input")
    animeInput.setAttribute("type", "text")
    animeInput.setAttribute("placeholder", "anime")
    newForm.appendChild(animeInput)

    const imageInput = document.createElement("input")
    imageInput.setAttribute("type", "text")
    imageInput.setAttribute("placeholder", "ImageURL")
    newForm.appendChild(imageInput)

    const quoteInput = document.createElement("input")
    quoteInput.setAttribute("type", "text")
    quoteInput.setAttribute("placeholder", "quote")
    newForm.appendChild(quoteInput)
    
    const submitBtn = document.createElement("input")
    submitBtn.setAttribute("type", "submit")
    submitBtn.setAttribute("value", "submit")
    newForm.appendChild(submitBtn)

    newForm.addEventListener("submit", (e) => {
        e.preventDefault()
        
        const newQuote = {
            anime: e.target[1].value,
            character: e.target[0].value,
            quote: e.target[3],
            image: e.target[2],
            likes: 0
        }

        const reqObj = {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(newQuote)
        }

        fetch(Base_Url, reqObj)
        .then(res =>res.json())
        .then((newQuotes) => renderQuotes(newQuotes))

        e.target.reset()
    })
})
