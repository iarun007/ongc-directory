const list = document.getElementById('contactList');
const search = document.getElementById('searchInput');

// Sorting
const sortedContacts = contacts.sort((a, b) => a.Name.localeCompare(b.Name));

function render(data) {
    if (!list) return;
    list.innerHTML = data.map((c) => `
        <div class="card" onclick="showDetails('${c['CPF No']}')">
            <img src="images/${c.Images || ''}" class="thumb-img" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(c.Name)}&background=800000&color=fff'">
            <div class="card-info">
                <h3>${c.Name}</h3>
                <p>${c.Designation}</p>
            </div>
        </div>
    `).join('');
}

// Full view function
window.showDetails = (cpf) => {
    const p = sortedContacts.find(x => x['CPF No'] === cpf);
    if (!p) return;
    alert(`Name: ${p.Name}\nDept: ${p.Department}\nMobile: ${p.Mobile}`);
};

render(sortedContacts);
