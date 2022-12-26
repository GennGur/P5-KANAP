// Récuparation de l'élement qui va contenir le panier 
const carItems = document.getElementById('cart__items');

// Fonction "createTag" qui va nous permettre d'utiliser "createElement" quand on appel la fonction 
function createTag(TagName) {
    return document.createElement(TagName);
}

// Récuperation dans le local Storage du contenu ajouté au "panier"
const cart = JSON.parse(localStorage.getItem('cart')) || [];