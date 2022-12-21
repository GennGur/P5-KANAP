// Affectation avec l'id items présent dans le HTML
const items = document.getElementById("items");

// Fonction "createTag" qui va nous permettre d'utiliser "createElement" quand on appel la fonction 
function createTag(TagName) {
  return document.createElement(TagName);
}


//Fonction principal de l'affichage des produits
function createCardsProduct() {
    
  //Récupèrations des données API via une "Promise" au format JSON et retourne des valeurs JS
  fetch('http://localhost:3000/api/products')
    .then((res, ok) => {
      return res.json();
    })

    .then((products) => {
      products.forEach((product) => {
        const productLink = createTag("a");
        const articleTag = createTag("article");
        const productImage = createTag("img");
        const productName = createTag("h3");
        const productDescription = createTag("p");
        productLink.appendChild(articleTag);
        articleTag.append(productImage, productName, productDescription);
        items.appendChild(productLink);
        
        productLink.href = `./product.html?id=${product._id}`;
        
        productImage.src = `${product.imageUrl}`;
        productImage.alt = `${product.altTxt}`;

        productName.classList.add("productName");
        productName.textContent = `${product.name}`;

        productDescription.classList.add("productDescription");
        productDescription.textContent = `${product.description}`;
      });
    })

    .catch((err) => {
      console.log(`error: ${err}`);
    });
}


createCardsProduct();