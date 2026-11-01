const titleEl = document.getElementById('title');
const inputEl = document.getElementById('name');
const listEl = document.getElementById('list');

// Greet the user and add their name to the list
function addName() {
  const name = inputEl.value.trim();

  if (!name) return; // ignore empty input

  titleEl.textContent = `Hello, ${name}!`;

  const li = document.createElement('li');
  li.textContent = name;
  listEl.appendChild(li);

  inputEl.value = ''; // clear input box
  inputEl.focus();
}

// Say goodbye when a name is clicked
function removeName(e) {
  if (e.target.nodeName === 'LI') {
    const name = e.target.textContent;
    titleEl.textContent = `Goodbye, ${name}!`;
    e.target.remove(); // remove the clicked <li>
  }
}

// Attach event listeners
document.getElementById('greet').addEventListener('click', addName);
listEl.addEventListener('click', removeName);

// Bonus: press Enter to greet
inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addName();
});
