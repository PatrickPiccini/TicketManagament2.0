// Aparece a DIV de login inválido
get('.invalido').style.display = "block";

// Declaração de itens da DOM
const remember = document.querySelector("#rmbm");
const nameInput = document.querySelector("#name");

// Captura do localStorage
let localChecked = localStorage.getItem("checked");
let localName = localStorage.getItem("name");

// Quando carregar a página
localChecked === "true"
  ? (remember.checked = true)
  : (remember.checked = false);

if (localName && localName !== "" && localChecked === "true")
  nameInput.value = localName;

// Handlers
function handleValue(e) {
  const element = e.target;

  if (!element.checked) localStorage.removeItem("name");

  localStorage.setItem("checked", element.checked);
}

function handleName(e) {
  const value = e.target.value;
  localStorage.setItem("name", value);
}

// Listeners
remember.addEventListener("click", handleValue);
nameInput.addEventListener("change", handleName);

