const list = document.getElementById('contactList');
const search = document.getElementById('searchInput');
const modal = document.getElementById('detailModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close-btn');

// Sort Alphabetically by Name
const sortedContacts = contacts.sort((a, b) => a.Name.localeCompare(b.Name));

function render(data) {
    list.innerHTML = data.map((c) => `
        <div class="card" onclick="showDetails('${c['CPF No']}')">
            <img src="images/${c.Images || 'default.jpg'}" class="thumb-img" onerror="this.src='https://ui-avatars.com/api/?name=${c.Name}&background=800000&color=fff'">
            <div class="card-info">
                <h3>${c.Name}</h3>
                <p>${c.Designation} | ${c.Department}</p>
            </div>
        </div>
    `).join('');
}

window.showDetails = (cpfId) => {
    const p = sortedContacts.find(person => person['CPF No'] === cpfId);
    if(!p) return;
    
    modalBody.innerHTML = `
        <img src="images/${p.Images || 'default.jpg'}" class="full-img" onerror="this.src='https://ui-avatars.com/api/?name=${p.Name}&size=120&background=800000&color=fff'">
        <h2 style="margin:0">${p.Name}</h2>
        <p style="color:#800000; font-weight:bold; margin:5px 0;">${p.Designation}</p>
        
        <div class="detail-grid">
            <div class="detail-item"><label>Department</label><span>${p.Department}</span></div>
            <div class="detail-item"><label>Section</label><span>${p.Section}</span></div>
            <div class="detail-item"><label>CPF No</label><span>${p['CPF No']}</span></div>
            <div class="detail-item"><label>Ext. No</label><span>${p['Ext No'] || 'N/A'}</span></div>
            <div class="detail-item"><label>CRC Level</label><span>${p['CRC Level'] || 'N/A'}</span></div>
        </div>

        <div class="action-buttons">
            <a href="tel:${p.Mobile}" class="btn-call">📞 Call: ${p.Mobile}</a>
            ${p['Alt Mobile'] ? `<a href="tel:${p['Alt Mobile']}" class="btn-alt">📱 Alt: ${p['Alt Mobile']}</a>` : ''}
        </div>
    `;
    modal.style.display = "block";
}

search.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = sortedContacts.filter(c => 
        c.Name.toLowerCase().includes(term) || 
        c.Department.toLowerCase().includes(term) || 
        c['CPF No'].includes(term)
    );
    render(filtered);
});

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }

render(sortedContacts);
