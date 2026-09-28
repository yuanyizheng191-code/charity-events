const API_BASE = 'http://localhost:3000/api';

// Request activity list immediately after page loading
document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
});

function loadEvents() {
    const container = document.getElementById('events-container');

    fetch(`${API_BASE}/events`)
        .then(res => {
            if (!res.ok) throw new Error('Failed to load events');
            return res.json();
        })
        .then(events => {
            if (events.length === 0) {
                container.innerHTML = '<p class="empty">No upcoming events at the moment.</p>';
                return;
            }

            container.innerHTML = '';
            events.forEach(event => {
                const card = createEventCard(event);
                container.appendChild(card);
            });
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = `<p class="error">Failed to load events: ${err.message}</p>`;
        });
}

function createEventCard(event) {
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
    return card;
}