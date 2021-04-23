console.log("Hello Marcus!");

const Base_Url = "http://localhost:3000/quotes/";

fetch(Base_Url)
  .then((resp) => resp.json())
  .then((quotes) => quotes.forEach(renderQuotes));

function renderQuotes(quotes) {
  const button = document.createElement("BUTTON");
  button.innerText = quotes.id;
  button.className = "btn";
  button.id = `button-${quotes.id}`
  document.getElementById("anime-bar").append(button);
  const likesBtn = document.createElement('button')
  likesBtn.id = `likes-${quotes.id}`
  likesBtn.className = 'likesBtn';

  const deleteBtn = document.createElement("BUTTON")
  //deleteBtn.id = `button-${quotes.id}`
  deleteBtn.className = "deleteBtn";
  deleteBtn.innerText = "Delete"


  button.addEventListener("click", () => {
    document.getElementById("name").innerText = quotes.character;
    document.getElementById("quote").innerText = quotes.quote;
    document.getElementById("show").innerText = quotes.anime;
    document.getElementById("image").src = quotes.image;

    

    document.querySelector(".delete").innerHTML = " "
    document.querySelector(".delete").append(deleteBtn)
    document.querySelector(".likes").innerHTML = " "
    document.querySelector(".likes").append(likesBtn)

  });


  deleteBtn.addEventListener("click",() =>{
    const id = quotes.id
    const btnId = document.getElementById(`button-${quotes.id}`)
    
    fetch(Base_Url+id, {method: "DELETE"})
    //.then(()=> console.log(document.querySelector("btnId")))
    .then(()=> {

      document.getElementById("name").innerText = "Name";
      document.getElementById("quote").innerText = "Quote";
      document.getElementById("show").innerText = "Show";
      document.getElementById("image").src = " ";
      document.querySelector(".delete").innerHTML = " ";
      btnId.remove() 
      
      
       
      

    }) 
  })

  //const likesBtn = document.querySelector(".likes");
  likesBtn.innerText = `Likes: ${quotes.likes}`;

  likesBtn.addEventListener("click", (event) => {
    const id = quotes.id;
    quotes.likes += 1;

    const updatedLikes = {
      likes: quotes.likes,
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
        likesBtn.innerText = `Likes: ${updatedLikes.likes}`;
      });
  });
}

const addNew = document.createElement("BUTTON");
addNew.className = "addNew";
addNew.innerText = "Add New Quote";
document.getElementById("anime-bar").appendChild(addNew);
addNew.addEventListener("click", () => {
  addNew.disabled = true;
  const newForm = document.createElement("form");
  newForm.className = "form";
  newForm.setAttribute("method", "post");
  newForm.setAttribute("action", "submit.php");

  const nameInput = document.createElement("input");
  nameInput.setAttribute("required","required")
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("placeholder", "name");
  newForm.appendChild(nameInput);

  const animeInput = document.createElement("input");
  animeInput.setAttribute("required", "required")
  animeInput.setAttribute("type", "text");
  animeInput.setAttribute("placeholder", "anime");
  newForm.appendChild(animeInput);

  const imageInput = document.createElement("input");
  imageInput.setAttribute("required", "required")
  imageInput.setAttribute("type", "url");
  imageInput.setAttribute("placeholder", "ImageURL");
  newForm.appendChild(imageInput);

  const quoteInput = document.createElement("input");
  quoteInput.setAttribute("required", "required")
  quoteInput.setAttribute("type", "text");
  quoteInput.setAttribute("placeholder", "quote");
  newForm.appendChild(quoteInput);

  const submitBtn = document.createElement("input");
  submitBtn.setAttribute("type", "submit");
  submitBtn.setAttribute("value", "submit");
  newForm.appendChild(submitBtn);

  const formTop = document.createElement("h1");
  formTop.className = "form-top";
  const a = document.createElement("a");
  formTop.appendChild(a);

  const formDes = document.createElement("div");
  formDes.className = "form-description";
  const h2 = document.createElement("h2");
  h2.innerText = "Add New Quote";
  formDes.appendChild(h2);

  const div = document.createElement("div");
  div.append(formTop, formDes, newForm);
  //debugger
  const formContainer = document.querySelector(".form-container");
  formContainer.append(div);

  newForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newQuote = {
      anime: e.target[1].value,
      character: e.target[0].value,
      quote: e.target[3],
      image: e.target[2],
      likes: 0,
    };

    const reqObj = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(newQuote),
    };

    fetch(Base_Url, reqObj)
      .then((res) => res.json())
      .then((newQuotes) => renderQuotes(newQuotes));

    e.target.reset();
  });
});
