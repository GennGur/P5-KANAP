// On récupère l'élément qui va contenir tous les produits du panier
const cartItems = document.getElementById("cart__items");

// On crée une fonction qui permet de créer une nouvelle balise HTML
function createTag(newTagName) {
  return document.createElement(newTagName);
}

// On récupère le contenu du panier stocké dans le local storage, ou un tableau vide s'il n'y a rien
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// On récupère les éléments du DOM qui vont nous servir à afficher le total du panier et la quantité totale de produits
const totalQuantityElement = document.getElementById("totalQuantity");
const totalPrices = document.getElementById("totalPrice");

// On déclare les variables qui vont contenir les éléments du panier avec lesquels on va interagir
let removeButton;
let quantityInputField;
let getParentArticle;
let updatedProduct;

// On crée une fonction qui va ajouter un event listener sur les boutons "Supprimer" et les champs "Quantité" de chaque produit
const eventListener = function () {
     // On récupère tous les champs "Quantité"
  quantityInputField = document.querySelectorAll(
    ".cart__item__content__settings__quantity > .itemQuantity"
  );
  // On ajoute un event listener sur chaque champ "Quantité" qui va mettre à jour le panier dans le local storage lorsque la quantité est modifiée
  quantityInputField.forEach((element) => {
    element.setAttribute("value", element.value);
    productQuantity += element.value;
    element.addEventListener("change", pushLocalStorageQuantity);
  });
  // On récupère tous les boutons "Supprimer"
  removeButton = document.querySelectorAll(".deleteItem");
  // On ajoute un event listener sur chaque bouton "Supprimer" qui va supprimer le produit correspondant du panier dans le local storage lorsque le bouton est cliqué
  removeButton.forEach((element) => {
    element.addEventListener("click", removeFromCart);
  });
};

// Cette fonction met à jour la valeur de l'attribut "value" du champ "Quantité"
const updateQuantityInputFieldValue = () => {
  quantityInputField.setAttribute("value", element.value);
};

// Cette fonction calcule et affiche le total du panier (prix total et quantité totale)
const getCartTotal  = () => {
  let cartTotalPrice = new Number();
  let cartTotalQuantity = new Number();
  let i = 0;
  // Parcourez tous les champs "Quantité"
  while (i !== quantityInputField.length) {
    // Ajoutez la quantité du produit au total de la quantité
    cartTotalQuantity += Number(quantityInputField[i].value);
    // Ajoutez le prix du produit au total du prix
    cartTotalPrice += displayPrice[i] * quantityInputField[i].value;
    i++;
  }
  // Mettez à jour les éléments de la page qui affichent le total de la quantité et du prix
  totalQuantityElement.textContent = cartTotalQuantity;
  totalPrices.textContent = cartTotalPrice;
  // Ajoutez les événements sur les champs "Quantité" et les boutons "Supprimer"
  eventListener();
};

// Cette fonction récupère le produit à mettre à jour dans le panier
const getProductToUpdate = () => {
  // Créez un objet avec les données du produit (couleur et identifiant)
  let productData = {
    color: getParentArticle.dataset.color,
    id: getParentArticle.dataset.id,
  };
  // Recherchez le produit correspondant dans le panier
   updatedProduct = cart.find(
    (product) =>
      product.color == productData.color &&
      product.id == productData.id
  );
  // Retournez le produit trouvé
  return updatedProduct;
};

const removeFromCart = function() {
  // Récupérez l'élément parent du produit (un élément "article")
  getParentArticle = this.closest("article");
  // Récupérez le produit à mettre à jour
  getProductToUpdate();
  // Si le produit existe
  if (updatedProduct) {
    // Trouvez l'index du produit dans le panier
    const indexOfRemovedProduct = cart.indexOf(updatedProduct);
    // Supprimez le produit du panier
    const removeProduct = cart.splice(indexOfRemovedProduct, 1);
    // Supprimez l'élément "article" du DOM
    getParentArticle.remove();
    // Mettez à jour le panier dans le local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    // Ajoutez les événements sur les champs "Quantité" et les boutons "Supprimer"
    eventListener();
    // Mettez à jour le total du panier
    getCartTotal();
     // Si le panier est vide, affichez un message "Panier vide"
     if (cart.length === 0) {
      document.getElementById("limitedWidthBlock").innerHTML = "Votre panier est vide";
      console.log("Panier vide");
    }
  }
};

// Cette fonction met à jour la quantité d'un produit dans le panier et le local storage
const pushLocalStorageQuantity = function () {
  // Récupérez l'élément parent du produit (un élément "article")
  getParentArticle = this.closest("article");
  // Récupérez le produit à mettre à jour
  getProductToUpdate();
  // Si le produit existe
  if (updatedProduct) {
    // Trouvez l'index du produit dans le panier
    const indexOfUpdatedProduct = cart.indexOf(updatedProduct);
    // Mettez à jour la quantité du produit dans le panier
    updatedProduct.quantity = parseInt(quantityInputField[indexOfUpdatedProduct].value);
    // Mettez à jour le panier dans le local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    // Ajoutez les événements sur les champs "Quantité" et les boutons "Supprimer"
    eventListener();
    // Mettez à jour le total
    getCartTotal();
    // Convertissez le panier en tableau
    convertCartToArray();
  }
};

// Cette fonction crée le contenu HTML pour chaque produit dans le panier
const createInnerContent = function () {
  // Créez une chaîne de caractères HTML pour chaque produit
  cartContent += `<article class="cart__item" data-id="${cart[i].id}" data-color="${productColor}">
  <div class="cart__item__img"><img src="${cartItemImage}" alt="${cartItemImageAlt}"></div>
  <div class="cart__item__content">
  <div class="cart__item__content__description">
  <h2>${productName}</h2>
  <p>${productColor}</p>
  <p>${productPrice} €</p>
  </div>
  <div class="cart__item__content__settings">
  <div class="cart__item__content__settings__quantity">
  <p>Qté : </p>
  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantity}">
  </div>
  <div class="cart__item__content__settings__delete">
  <p class="deleteItem">Supprimer</p>
  </div>
  </div>
  </div>
  </article>`;
};

// Déclarez les variables nécessaires
let cartItemImage; // L'URL de l'image du produit dans le panier
let cartItemImageAlt; // Le texte alternatif de l'image du produit dans le panier
let productName; // Le nom du produit dans le panier
let productColor; // La couleur du produit dans le panier
let productPrice; // Le prix du produit dans le panier
let productQuantity = []; // Le tableau des quantités de chaque produit dans le panier
let displayPrice = []; // Le tableau des prix de chaque produit dans le panier
let cartContent = ""; // La chaîne de caractères HTML qui contient le contenu du panier
let i = 0; // Un compteur utilisé dans la boucle


// Cette fonction affiche le panier sur la page
function displayCart() {
  // L'URL de l'API qui récupère la liste des produits
  const url = "http://localhost:3000/api/products";
  // Récupérez la liste des produits de l'API
  fetch(url)
    .then((response) => {
      // Transformez la réponse en objet JSON
      return response.json();
    })
    .then((APIProductList) => {
      // Pour chaque produit dans le panier...
      while (i !== cart.length) {
        // Récupérez le produit correspondant dans la liste des produits de l'API
        const matchingProduct = APIProductList.find(
          (product) => product._id === cart[i].id
        );
        // Pour chaque produit dans la liste de l'API...
        APIProductList.forEach((productInList) => {
          // Si le produit correspondant est trouvé...
          if (matchingProduct) {
            // Récupérez les informations du produit
            cartItemImage = `${matchingProduct.imageUrl}`;
            cartItemImageAlt = `${matchingProduct.altTxt}`;
            productName = `${matchingProduct.name}`;
            productColor = `${cart[i].color}`;
            productPrice = `${matchingProduct.price}`;
          }
        });
        // Créez le contenu HTML du produit
        createInnerContent();
        // Ajoutez le prix du produit au tableau de prix
        displayPrice.push(productPrice);
        // Incrémentez le compteur
        i++;
      }
      // Ajoutez le contenu HTML du panier à la page
      cartItems.innerHTML += cartContent;
      // Ajoutez les event listeners aux éléments du panier
      eventListener();
      // Affichez le total du panier
      getCartTotal();
      // Activez la validation du formulaire de commande
      formInputValidation();
    });
}

// Appelez la fonction pour afficher le panier
displayCart();

// Récupérez tous les champs du formulaire
const formInputs = document.querySelectorAll(".cart__order__form__question > input");
// Récupérez tous les éléments de message d'erreur du formulaire
const formInputsErrors = document.querySelectorAll(".cart__order__form__question > p");
// Récupérez le bouton "Commander"
const orderButton = document.getElementById("order");

// Ajoutez un event listener à chaque champs du formulaire pour vérifier si le champ est rempli correctement
const formInputValidation = function () {
  formInputs.forEach((inputField) => {
    inputField.addEventListener("change", checkInput);
  });
  // Ajoutez un event listener au bouton "Commander" pour envoyer le panier et les données du formulaire
  orderButton.addEventListener("click", sendCartAndInput);
};
