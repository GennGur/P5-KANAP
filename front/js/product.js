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

const cartButton = document.getElementById('addToCart');
const selectedColor = document.getElementById('colors');
const selectedQuantity = document.getElementById('quantity');
const cart = JSON.parse(localStorage.getItem('cart')) || [];
let productCart;

const addToCart = () => {
  
  //Vérifier si une couleur et une quantité ont été sélectionnées 
  if (selectedColor.value == "" || selectedQuantity.value == 0) {  // Point de blocage avec "===" a la place de "=="
    alert("Veuillez choisir la couleur ainsi que la quantitée");
    return;
  };

  //Création d'un objet du produit
  const newProductInCart = {
    color: selectedColor.value,
    id: productId,
    quantity: new Number(selectedQuantity.value),
  };

  //Vérifiaction si le produit existe déja dans le panier
  let productInCart = cart.find((product) => product.id === productId);
  const productIndex = cart.indexOf(productInCart);
  
  if (productInCart) {
    //Vérification de la couleur du produit si  il existe déja dans le panier
    productInCart = cart.find((product) => product.color === selectedColor.value && product.id === productId);
   
    if (productInCart) {
      //Mise à jour de la quandtité si produit déja présent 
      productInCart.quantity = parseInt(productInCart.quantity) + parseInt(selectedQuantity.value);
      localStorage.setItem('cart', JSON.stringify(cart));
      return;
    };

    //Ajout du produit au panier
    cart.splice(productIndex, 0, newProductInCart);
  } else {
    
    //Ajout du produit au panier si non présent
    cart.push(newProductInCart);
    };

  //Enregistrement du panier dans le local Storage 
  localStorage.setItem("cart", JSON.stringify(cart));
};

//Ecoute de l'événement "click" sur le bouton "Ajouter au panier"
cartButton.addEventListener("click",addToCart);