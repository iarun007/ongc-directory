const list = document.getElementById('contactList');
const search = document.getElementById('searchInput');
const modal = document.getElementById('detailModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close-btn');

// 1. Sort Alphabetically by Name on load
const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));

// 2. Render Short Form List
function render(data) {
    list.innerHTML = data.map((c, index) => `
        <div class="card" onclick="showDetails('${c.cpf}')">
            <img src="images/${c.img}" class="thumb-img" onerror="this.src='https://ui-avatars.com/api/?name=${c.name}&background=800000&color=fff'">
            <div class="card-info">
                <h3>${c.name}</h3>
                <p>${c.desig} | ${c.dept}</p>
            </div>
        </div>
    `).join('');
}

// 3. Show Full Details (using CPF as a unique ID)
window.showDetails = (cpfId) => {
    const p = sortedContacts.find(person => person.cpf === cpfId);
    modalBody.innerHTML = `
        <img src="images/${p.img}" class="full-img" onerror="this.src='https://ui-avatars.com/api/?name=${p.name}&size=120&background=800000&color=fff'">
        <h2 style="margin-bottom:5px;">${p.name}</h2>
        <p style="color:#800000; font-weight:bold; margin-top:0;">${p.desig}</p>
        
        <div class="detail-grid">
            <div class="detail-item"><label>Department</label><span>${p.dept}</span></div>
            <div class="detail-item"><label>CPF No</label><span>${p.cpf}</span></div>
            <div class="detail-item"><label>Ext. No</label><span>${p.ext || 'N/A'}</span></div>
            <div class="detail-item"><label>CRC Level</label><span>${p.crc || 'N/A'}</span></div>
        </div>

        <div class="action-buttons">
            <a href="tel:${p.mobile}" class="btn-call">📞 Call Mobile</a>
            ${p.altMobile ? `<a href="tel:${p.altMobile}" class="btn-alt">📱 Alt Mobile</a>` : ''}
        </div>
    `;
    modal.style.display = "block";
}

// 4. Advanced Search (Search by Name, Dept, or CPF)
search.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = sortedContacts.filter(c => 
        c.name.toLowerCase().includes(term) || 
        c.dept.toLowerCase().includes(term) || 
        c.cpf.includes(term)
    );
    render(filtered);
});

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }

render(sortedContacts);
