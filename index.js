//=== Constants ===//

const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2506-DevinS";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

//=== State ===//
let parties = [];
let selectedParty;

//* Updates the state with an array of parties (events) from the API
async function getParties() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    parties = result.data;
    console.log(result);
    render();
  } catch (e) {
    console.error(e);
  }
}

//* Updates state with a single party from the API
async function getParty(name) {
  try {
    const response = await fetch(API + "/" + name);
    const result = await response.json();
    selectedParty = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

//==== Components ====//

//* Party name that shows more details of party when clicked
function partyListItem(party) {
  const $li = document.createElement("li");
  $li.innerHTML = `
    <a href="#selected">${party.name}</a>
    `;

  $li.addEventListener("click", () => getParty(party.id));
  return $li;
}

//* List of all party names
function partyList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("list");

  const $parties = parties.map(partyListItem);
  $ul.replaceChildren(...$parties);

  return $ul;
}

//* Detailed information about a single party
function partyDetails() {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to find more details";
    return $p;
  }

  const $party = document.createElement("section");
  $party.classList.add("party");
  $party.innerHTML = `
  <h3>#${selectedParty.id} ${selectedParty.name} </h3><br>
  <h4>${selectedParty.date}</h4>
  <p>${selectedParty.location}</p><br>
  <p>${selectedParty.description}</p>
  `;

  return $party;
}

//=== Render ===//
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
  <h1>Party Planner</h1>
<main>
    <section>
        <h2>Upcoming Parties</h2>
        <parties></parties>
    </section>
    <section id="selected">
        <h2>Party Details</h2>
        <partyDetails></partyDetails>
    </section>
</main>
  `;
  $app.querySelector("parties").replaceWith(partyList());
  $app.querySelector("partyDetails").replaceWith(partyDetails());
}

async function init() {
  await getParties();
  render();
}

init();
