console.log("Hello Marcus!");

const Base_Url = "http://localhost:3000/quotes" 

fetch(Base_Url)
.then(resp => resp.json())
.then(quotes => quotes.forEach(renderQuotes))

function renderQuotes(quotes){
    const button = document.createElement("BUTTON")
    button.innerText = quotes.id
    document.getElementById("anime-bar").append(button)

    button.addEventListener("click", () => {
        document.getElementById("name").innerText = quotes.character
        document.getElementById("quote").innerText = quotes.quote
        document.getElementById("show").innerText = quotes.anime
        document.getElementById("image").src = quotes.image
    })
}
