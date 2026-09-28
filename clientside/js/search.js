const API_BASE = 'http://localhost:3000/api';

// ============================
// Page Load: Load Categories to Dropdown
// ============================
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
});

function loadCategories() {
    fetch(`${API_BASE}/categories`)
        .then(res => res.json())
        .then(categories => {
            const select = document.getElementById('category');
            categories.forEach(cat => {
                const opt = document.createElement('option');
                opt.value = cat.category_id;
                opt.textContent = cat.category_name;
                select.appendChild(opt);
            });
        })
        .catch(err => {
            console.error('Failed to load categories:', err);
        });
}

// ============================
// Search Form Submission
// ============================
document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const date = document.getElementById('date').value.trim();
    const location = document.getElementById('location').value.trim();
    const category = document.getElementById('category').value;

    // Validate search criteria
    if (!date && !location && !category) {
        showInfo('Please enter at least one search criterion.', 'warning');
        return;
    }

    // Build search parameters
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    if (location) params.append('location', location);
    if (category) params.append('category', category);

    showInfo('Searching...', 'loading');

    fetch(`${API_BASE}/events/search?${params.toString()}`)
        .then(res => {
            if (!res.ok) throw new Error('Search failed');
            return res.json();
        })
        .then(events => {
            displayResults(events);
        })
        .catch(err => {
            console.error(err);
            showInfo('Search failed. Please try again.', 'error');
            document.getElementById('results').innerHTML = '';
        });
});

// ============================
// Display Search Results
// ============================
function displayResults(events) {
    const results = document.getElementById('results');
    const info = document.getElementById('results-info');

    if (events.length === 0) {
        info.textContent = '';
        results.innerHTML = '<p class="empty">No events match your search criteria.</p>';
        return;
    }

    info.textContent = `Found ${events.length} event${events.length > 1 ? 's' : ''}.`;

    results.innerHTML = '';
    events.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';

        const eventDate = new Date(event.event_date);
        const dateStr = eventDate.toLocaleDateString('en-AU', {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
        });

        card.innerHTML = `
            <img src="${event.image_url || 'images/placeholder.jpg'}" 
                 alt="${event.event_name}" 
                 onerror="this.style.display='none'">
            <div class="card-body">
                <span class="category-tag">${event.category_name}</span>
                <h3>${event.event_name}</h3>
                <p class="desc">${event.description || ''}</p>
                <p class="meta">📅 ${dateStr}</p>
                <p class="meta">📍 ${event.location}</p>
                <a href="event.html?id=${event.event_id}" class="btn">View Details →</a>
            </div>
        `;
        results.appendChild(card);
    });
}

// ============================
// Display Status Messages
// ============================
function showInfo(message, type) {
    const info = document.getElementById('results-info');
    info.textContent = message;
    info.className = 'results-info ' + type;
}

// ============================
// Clear Filters Button
// ============================
document.getElementById('clear-btn').addEventListener('click', () => {
    document.getElementById('search-form').reset();
    document.getElementById('results').innerHTML = '';
    document.getElementById('results-info').textContent = '';
    document.getElementById('results-info').className = 'results-info';
});