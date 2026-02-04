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
    // Find the person using the CPF No as a unique ID
    const p = sortedContacts.find(x => x['CPF No'] === cpf);
    if (!p) return;

    modalBody.innerHTML = `
        <div class="modal-header">
            <img src="images/${p.Images || ''}" class="enlarged-img" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(p.Name)}&size=150&background=800000&color=fff'">
            <h2>${p.Name}</h2>
            <p class="main-desig">${p.Designation}</p>
        </div>

        <div class="info-grid">
            <div class="info-item"><label>Department</label><span>${p.Department || 'N/A'}</span></div>
            <div class="info-item"><label>Section</label><span>${p.Section || 'N/A'}</span></div>
            <div class="info-item"><label>CPF No</label><span>${p['CPF No']}</span></div>
            <div class="info-item"><label>Ext No</label><span>${p['Ext No'] || 'N/A'}</span></div>
            <div class="info-item"><label>CRC Level</label><span>${p['CRC Level'] || 'N/A'}</span></div>
        </div>

        <div class="contact-actions">
            <a href="tel:${p.Mobile}" class="action-btn call-primary">
                <strong>📞 Call Mobile</strong><br>${p.Mobile}
            </a>
            ${p['Alt Mobile'] ? `
            <a href="tel:${p['Alt Mobile']}" class="action-btn call-alt">
                <strong>📱 Alt Mobile</strong><br>${p['Alt Mobile']}
            </a>` : ''}
        </div>
    `;
    modal.style.display = "block";
};

render(sortedContacts);
