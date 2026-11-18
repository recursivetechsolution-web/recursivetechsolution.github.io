// Load medical team data and render cards
async function loadMedicalTeam() {
    try {
        const response = await fetch('/data/medical-team.json');
        const data = await response.json();
        renderTeamCards(data.team);
        setupFilterButtons(data.team);
    } catch (error) {
        console.error('Error loading medical team:', error);
        document.getElementById('team-grid').innerHTML = '<p style="color: var(--text-muted);">Error loading team data. Please try again later.</p>';
    }
}

function renderTeamCards(team) {
    const grid = document.getElementById('team-grid');
    grid.innerHTML = team.map(member => `
        <div class="team-card" data-specialty="${getSpecialty(member.specialty)}">
            <div class="team-card-image">${member.image}</div>
            <h3>${member.name}</h3>
            <p class="title">${member.title}</p>
            <p class="specialty">${member.specialty}</p>
            <p class="credentials">${member.credentials}</p>
            <p class="experience">${member.experience}</p>
            <p class="bio">${member.bio}</p>
            <div class="contact-links">
                <a href="tel:${member.phone}" aria-label="Call ${member.name}">📞</a>
                <a href="mailto:${member.email}" aria-label="Email ${member.name}">✉️</a>
            </div>
        </div>
    `).join('');
}

function getSpecialty(specialtyName) {
    if (specialtyName.includes('Cardiolog')) return 'cardiology';
    if (specialtyName.includes('Psychiatr') || specialtyName.includes('Mental')) return 'psychiatry';
    if (specialtyName.includes('Nursing')) return 'nursing';
    return 'specialists';
}

function setupFilterButtons(team) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter cards
            const filter = this.dataset.filter;
            const cards = document.querySelectorAll('.team-card');
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.specialty === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 0);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 200);
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', loadMedicalTeam);
