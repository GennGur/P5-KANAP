//Récupération de l'url de la page 
const currentPage = window.location.href;
//Création d'un objet URL pour ajouté l'id du produit
const url = new URL(currentPage);
const productId = url.searchParams.get("id");

// Fonction "createTag" qui va nous permettre d'utiliser "createElement" quand on appel la fonction 
function createTag(TagName) {
    return document.createElement(TagName);
};

const fillProductPages = () => {
    const apiUrl ="http://localhost:3000/api/products";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((productList) => {
        
        // Trouver le produit actuel dans la liste de produits
        const currentProduct = productList.find((product) => product._id === productId);
       
        //Remplir la page avec les informations du produits
        const productImg = createTag('img');
        document.getElementsByClassName('item__img')[0].appendChild(productImg);
        document.getElementById('title').textContent = currentProduct.name;
        document.getElementById('price').textContent = currentProduct.price;
        document.getElementById('description').textContent = currentProduct.description;
        productImg.src = currentProduct.imageUrl;
        productImg.alt = currentProduct.altTxt;

        //Options de couleur en liste déroulante
        currentProduct.colors.forEach((colorOption) => {
            const productColor = createTag('option');
            document.getElementById('colors').appendChild(productColor);
            productColor.value = colorOption;
            productColor.textContent = colorOption;
        });
      })

      // Si erreur message dans la console
      .catch((err) => {
        console.log(err);
      });
};

fillProductPages();