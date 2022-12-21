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
    .then((res) => {  
      return res.json();
    })


    //Traitement des valeurs récuperer
    .then((products) => {
      products.forEach((product) => {

        //Création des élements HTMl graçe a  l'appel de notre fonction "creatTag" (a,article,img,h3,p)
        const productLink = createTag("a");
        const productArticle = createTag("article");
        const productImg = createTag("img");
        const productName = createTag("h3");
        const productDescription = createTag("p");

        //lien parents-enfants des élements crée chaque balise "a" contient comme élements "img","h3"et "p" 
        //le "a" est lui définie comme enfant de la balise "items"
        productLink.appendChild(productArticle);
        productArticle.append(productImg, productName, productDescription);
        items.appendChild(productLink);
        
        //définies les valeurs pour chaque élements
        productLink.href = `./product.html?id=${product._id}`;
        productImg.src = `${product.imageUrl}`;
        productImg.alt = `${product.altTxt}`;
        productName.classList.add("productName");
        productName.textContent = `${product.name}`;
        productDescription.classList.add("productDescription");
        productDescription.textContent = `${product.description}`;
      });
    })

    // Message d'erreur dans la console si une erreur apparait 
    .catch((error) => {
      console.log("Erreur " + error);
    });
}


createCardsProduct();