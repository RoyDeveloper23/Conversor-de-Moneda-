const typed = new Typed(".typed", {
  strings: ["<i class='moneda'> USD / EUR<i>"],
  typeSpeed: 110,
  starDelay: 100,
  backSpeed: 90,
  shuffle: false,
  backDelay: 100,
  showCursor: true,
  cursorChar: "",
  contentType: "html",
  loop: false,
});

const apiUrl = "http://apilayer.net/api/live";

document.addEventListener("DOMContentLoaded", () => {
  const spinnerModal = document.getElementById("spinnerModal");

  const botonConvertir = document.getElementById("buttonConvert");
  const result = document.getElementById("result");
  const selectDivisa = document.getElementById("divisa");
  const amount = document.getElementById("amount");

  let arrDivisas = selectDivisa.value.split("/");

  selectDivisa.addEventListener("change", (change) => {
    result.value = "";
    const divisa = change.target.value;
    arrDivisas = divisa.split("/");
  });

  botonConvertir.addEventListener("click", () => {
    const accessKey = "b780ceb948115f2672b4a6266361b154";

    const url = `http://apilayer.net/live?access_key=${accessKey}&currencies=${arrDivisas[1]}&source=${arrDivisas[0]}&format=1`;

    spinnerModal.style.display = "block";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        calcularCambio(data.quotes);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        spinnerModal.style.display = "none";
      });
  });

  const calcularCambio = (quotes) => {
    const clave = arrDivisas.join("");
    result.value = (quotes[clave] * amount.value).toFixed(2);
  };
});
