//Récupération de l'url de la page 
const currentPage = window.location.href;
//Création d'un objet URL pour ajouté l'id du produit
const url = new URL(currentPage);
const productId = url.searchParams.get("id");

// Fonction "createTag" qui va nous permettre d'utiliser "createElement" quand on appel la fonction 
function createTag(TagName) {
    return document.createElement(TagName);
};
