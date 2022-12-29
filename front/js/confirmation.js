const displayOrderConfirmation = () => {
    // Récupère l'URL de la page courante et la stocke dans une variable
    const currentPageUrl = document.location.href;
  
    // Crée une nouvelle instance de l'objet URL à partir de l'URL de la page courante
    const url = new URL(currentPageUrl);
  
    // Récupère la valeur du paramètre "order" dans l'URL
    const orderId = url.searchParams.get("order");
  
    // Récupère l'élément span avec l'ID "orderId"
    const orderIdSpan = document.getElementById("orderId");
  
    // Crée une nouvelle instance de l'objet URL avec l'URL de l'API
    const apiUrl = new URL("http://localhost:3000");
  
    // Affiche l'URL de l'API dans la console
    console.log(apiUrl);
  
    // Affiche l'ID de commande dans l'élément span
    orderIdSpan.textContent = `${orderId}`;
  }
  
  displayOrderConfirmation();