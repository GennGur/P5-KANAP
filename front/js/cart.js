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

// Créez un motif pour la validation des noms
const nameCriterias = /^[a-zçèé]+[a-zçèé ,.'-]+$/i;
// Créez un motif pour la validation des adresses e-mail
const emailCriterias = /^[a-zA-Z0-9.èé!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// Créez un tableau pour stocker l'état de validation de chaque champ du formulaire
let validationStatus = [undefined, undefined, undefined, undefined, undefined];
// Créez une variable pour stocker l'erreur de nom
let errorName;


// La fonction "checkInput" vérifie si les champs du formulaire sont remplis correctement
const checkInput = function (targetElement) {
  // "i" sert à parcourir chaque élément du formulaire
  let i = 0;
  // La boucle "while" parcourt chaque élément du formulaire jusqu'à ce que "i" soit égal à 5
  while (i < 5) {
    // Si l'identifiant de l'élément en cours de traitement correspond à celui d'un des éléments du formulaire
    if (this.id == `${formInputs.item(i).name}`) {
      // Si l'élément en cours de traitement est "firstName", "lastName" ou "city"
      if (
        this.id == "firstName" ||
        this.id == "lastName" ||
        this.id == "city"
      ) {
        // Vérifie si la valeur de l'élément en cours de traitement correspond aux critères de validation du nom (expression régulière "nameCriterias")
        validationStatus[i] = nameCriterias.test(this.value);
      } 
      // Si l'élément en cours de traitement est "email"
      else if (this.id == "email") {
        // Vérifie si la valeur de l'élément en cours de traitement correspond aux critères de validation de l'email (expression régulière "emailCriterias")
        validationStatus[i] = emailCriterias.test(this.value);
      } else if (this.id == "address") {
        // Vérifie si la valeur de l'élément en cours de traitement fait plus de 5 caractères
        if (formInputs[i].value.length > 5) {
          validationStatus[i] = true;
        } else {
          validationStatus[i] = false;
        }
      }
      // Récupère l'élément "p" contenant l'erreur correspondant au champ en cours de traitement
      errorName = document.getElementById(`${formInputsErrors.item(i).id}`);

      // Si la valeur de l'élément en cours de traitement ne correspond pas aux critères de validation
      if (validationStatus[i] == false) {
        // Affiche un message d'erreur dans l'élément "p"
        errorName.textContent = "Vérifiez votre saisie";
      } else {
        // Efface le message d'erreur de l'élément "p"
        errorName.textContent = "";
      }

      break;
    }
    i++;
  }
};

let contact;

const saveInputForm = function () {
  // Crée un objet "contact" avec les valeurs des champs du formulaire
  contact = {
    firstName: `${formInputs[0].value}`, // Valeur du champ "Prénom"
    lastName: `${formInputs[1].value}`, // Valeur du champ "Nom de famille"
    address: `${formInputs[2].value}`, // Valeur du champ "Adresse"
    city: `${formInputs[3].value}`, // Valeur du champ "Ville"
    email: `${formInputs[4].value}`, // Valeur du champ "Email"
  };
};

// Déclare une variable products vide
let products = [];

// Création d'un tableau 'products'avec les informations panier à envoyer au serveur 
const convertCartToArray = function () {
  cart.forEach((product) => {
    cart.find((product) => product.id);
    products.push(product.id);
  });
};

// Déclare une variable orderProducts vide
let orderProducts;

const mergeInputs = function () {
  convertCartToArray(); // Convertit les données du panier en localstorage en un tableau d'ID de produits
  saveInputForm(); // Enregistre les données du formulaire de contact dans l'objet 'contact'
  orderProducts = {
    contact,
    products,
  };
};

function sendCartAndInput(event) {
  // Empêche le comportement par défaut du formulaire (envoi du formulaire)
  event.preventDefault();
  // Si aucune valeur du tableau validationStatus n'est "false" ou "undefined"
  if (!validationStatus.includes(false) && !validationStatus.includes(undefined)) {
    // Exécute la fonction mergeInputs() qui fusionne les valeurs entrées par l'utilisateur
    mergeInputs();
    // URL de l'API
    const url = "http://localhost:3000/api/products/order";
    // Envoi d'une requête POST à l'API avec les données de l'utilisateur et du panier
    fetch(url, {
      method: "POST",
      body: JSON.stringify(orderProducts),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // Transforme la réponse en JSON
        return response.json();
      })
      .then((response) => {
        // Efface le contenu du local storage
        localStorage.clear();
        // Redirection vers la page de confirmation avec l'ID de la commande en paramètre de l'URL
        window.location.href = `confirmation.html?order=${response.orderId}`;
      })
      .catch((error) => {
        // Affiche l'erreur dans la console en cas d'échec de la requête
        console.log(error);
      });
  } else {
    // Affiche un message d'erreur si le formulaire n'a pas pu être validé
    alert("Le formulaire n'a pas pu être validé. Tous les champs sont-ils correctement remplis?");
  };
};

// Vérifie si le panier est vide
if (cart.length === 0) {
  // Affiche un message "Votre panier est vide" dans l'élément HTML avec l'ID "limitedWidthBlock"
  document.getElementById("limitedWidthBlock").innerHTML = "Votre panier est vide";
  console.log("Panier vide");
}

// Trouve l'index du produit avec l'ID spécifié dans le panier
const productIndex = cart.findIndex((product) => product.id === id);

// Si le produit existe dans le panier
if (productIndex !== -1) {
  // Récupère le produit
  const product = cart[productIndex];

  // Si la quantité du produit est égale à 0
  if (product.quantity === 0) {
    // Supprime le produit du panier
    cart.splice(productIndex, 1);
  }

  // Si le panier est vide, affiche un message "Panier vide" dans la console
  if (cart.length === 0) {
    console.log("Panier vide");
  };
};








