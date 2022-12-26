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
