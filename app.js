const list = document.getElementById('contactList');
const search = document.getElementById('searchInput');

function render(data) {
    list.innerHTML = data.map(c => `
        <div class="card">
            <img src="images/${c.img}" class="profile-img" onerror="this.src='https://ui-avatars.com/api/?name=${c.name}'">
            <div class="details">
                <h3>${c.name}</h3>
                <p>${c.role}</p>
            </div>
            <a href="tel:${c.phone}" class="call-btn">CALL</a>
        </div>
    `).join('');
}

search.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = contacts.filter(c => 
        c.name.toLowerCase().includes(term) || 
        c.role.toLowerCase().includes(term)
    );
    render(filtered);
});

render(contacts);
