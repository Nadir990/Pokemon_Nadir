var arr = [];
var pokemon = [];
count = 0;
var btn = document.getElementById("btn");
btn.addEventListener("click", Search);
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var divSearch = document.getElementById('result');
span.addEventListener('click',close);
bar = document.getElementById('search-bar')




/* SWIPER FOR LAYOUT */
var mySwiper = new Swiper(".swiper-container", {
  slidesPerView: "auto",
  slidesPerGroup: 3,
  normalizeSlideIndex: "true",
  grabCursor: true,
  loop: false,
  loopFillGroupWithBlank: false,
  slidesPerView: 3,
  slidesPerColumnFill: "row",
  slidesPerColumn: 2,
  spaceBetween: 20,
  freeMode: true,

  //Pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,

    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

lightbox.option({
  resizeDuration: 1000,
  wrapAround: false,
  openOnLoad: true,
});

/* LOAD DATA FROM JSON & CREATE AN OBJ POKEMON */
for (let i = 1; i <= 150; i++) {
  var myRequest = new XMLHttpRequest();
  /* AJAX CALL FUNCTION */
  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var pkm = JSON.parse(this.responseText);
       arr.push(pkm);
        pokemon = arr
        .map((item) => ({
          ...item, //spread operator to catch ALL proprietà JSON(weight,height ecc...);
          name: item.name,
          type: item.types.map((type) => type.type.name).join(", "),
          image: item.sprites["front_default"],
          id: item.id,
        }))
        .sort((a, b) => (a.id > b.id ? 1 : -1));
      count++;
      if (count % 150 === 0) {
        displayPokemon(pokemon);
      }
    }
  };
  myRequest.open("GET", `https://pokeapi.co/api/v2/pokemon/${i}`);
  myRequest.send();
}

/* DISPLAY POKEMONS */
function displayPokemon(pokemon) {
  for (let i = 0; i < pokemon.length; i++) {
    /* TAG 'a' because lightbox he need it */
    let aPokemons = document.createElement("a");
    aPokemons.classList.add("card");

    var href = document.createAttribute("href");
    href.value = pokemon[i].image;
    aPokemons.setAttributeNode(href);

    let img = document.createElement("img");
    img.src = pokemon[i].image;
    img.classList.add("card-image");
    /* LIGHTBOX ATTRIbute CREATE SET TO APokemons */
    let lightbox = document.createAttribute("data-lightbox");
    lightbox.value = "pokemons";
    aPokemons.setAttributeNode(lightbox);
    /* Caption */
    let caption = document.createAttribute("data-title");
    let htmlString = `<div class = "popup">
        <h2 class = "card-title2">${pokemon[i].id}. 
        ${pokemon[i].name}</h2>
        <p class = 'card'>Height: ${pokemon[i].height / 10} m</p>
        <p class = 'card'>Weight: ${pokemon[i].weight / 10} kg</p>
        <p class = 'card'>Type: ${pokemon[i].type}</p>
        </div>
        `;
        
    caption.value = htmlString;
    aPokemons.setAttributeNode(caption);
    /* Description Standart-Card */
    let h2 = document.createElement("h2");
    h2.classList.add("card-title");
    h2.innerText = `${pokemon[i].id}. ${pokemon[i].name}`;

    let h1 = document.createElement("h3");
    h1.innerText = "Click me😄";    
    /* append all elements in a div  */
    aPokemons.appendChild(img);
    aPokemons.appendChild(h2);
    aPokemons.appendChild(h1);
    /* slide with div + pokemon */
    var divFinal = document.createElement("div");
    divFinal.classList.add("swiper-slide");
    divFinal.appendChild(aPokemons);

    mySwiper.appendSlide(divFinal);
    mySwiper.update();
  }
}
/* SEARCH AND DISPLAY POKEMON WITH HIS INFO... */
function Search() {
  var searchText = document.getElementById("text").value.toLowerCase();
  for(var i=0; i < pokemon.length; i++) {
    if(pokemon[i].name === searchText || pokemon[i].id == searchText) {
      let aPokemons = document.createElement("div");
      aPokemons.classList.add("card2");
      /* IMAGE OF POKEMONS SEARCHED */
      let img = document.createElement("img");
      img.src = pokemon[i].image;
      img.classList.add("card-image");
      /* DESCRIPTION OF POKEMON SEARCHED */
      let h2 = document.createElement("h3");
      h2.classList.add("card-title");
      h2.innerText = `ID : ${pokemon[i].id} 
       Name: ${pokemon[i].name}
       Weight: ${pokemon[i].weight / 10} kg
       Height: ${pokemon[i].height / 10} m
       Type: ${pokemon[i].type}`;
      /* append all elements in a div  */
      aPokemons.appendChild(img);
      aPokemons.appendChild(h2);
      /* append in MODAL WINDOW */
      divSearch.appendChild(aPokemons);      
      modal.style.display = "block";      
    } 
  }
}

/* CLOSE BUTTON EVENT AND CLEAR MODAL-CONTENT */
function close(){  
  modal.style.display = "none";
  divSearch.innerHTML = ""
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}