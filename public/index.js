document.addEventListener("submit", (event) => {
  event.preventDefault();
  let form = document.querySelector("#productForm");
  let data = new FormData(form);
  fetch("http://localhost:8080/api/products", {
    method: "POST",
    body: data,
  })
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      console.log(json);
      const alerta = document.createElement("div");
      alerta.textContent = "Felicitaciones, registraste tu producto!";
      alerta.style.color = "lightgreen";
      const imprimir = document.getElementById("div_form");
      imprimir.appendChild(alerta);
    });
});
