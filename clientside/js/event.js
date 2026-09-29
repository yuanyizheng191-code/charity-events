const API_BASE = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
    // Get URL parameter event id
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('id');

    if (!eventId) {
        showError('No event selected. Please choose an event from the Home or Search page.');
        return;
    }

    loadEventDetail(eventId);
});

function loadEventDetail(id) {
    fetch(`${API_BASE}/events/${id}`)
        .then(res => {
            if (!res.ok) throw new Error('Event not found');
            return res.json();
        })
        .then(event => {
            renderEvent(event);
        })
        .catch(err => {
            console.error(err);
            showError('Event not found or failed to load.');
        });
}

function renderEvent(event) {
    // Hide loading indicator and show event content
    document.getElementById('loading').style.display = 'none';
    document.getElementById('event-content').style.display = 'block';

    // Event Image
    const img = document.getElementById('event-image');
    if (event.image_url) {
        img.src = event.image_url;
        img.alt = event.event_name;
    } else {
        img.style.display = 'none';
    }

    // Event Basic Information
    document.getElementById('event-category').textContent = event.category_name || '';
    document.getElementById('event-name').textContent = event.event_name;
    document.getElementById('event-org').textContent = 'by ' + (event.org_name || 'Unknown organisation');
    document.getElementById('event-full-description').textContent =
        event.full_description || event.description || 'No description available.';
    document.getElementById('event-purpose').textContent =
        event.purpose || 'Not specified.';

    // Event Date and Time
    const eventDate = new Date(event.event_date);
    document.getElementById('event-date').textContent = eventDate.toLocaleString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Event Location
    document.getElementById('event-location').textContent = event.location;

    // Event Ticket Price
    const price = parseFloat(event.ticket_price);
    document.getElementById('ticket-price').textContent =
        price > 0 ? `$${price.toFixed(2)}` : 'FREE';

    // Event Organisation
    document.getElementById('org-name').textContent = event.org_name || 'N/A';
    document.getElementById('org-contact').textContent =
        event.org_email || '';

    // Event Progress Bar
    const goal = parseFloat(event.goal_amount) || 0;
    const current = parseFloat(event.current_amount) || 0;
    const percent = goal > 0 ? Math.min((current / goal) * 100, 100) : 0;

    document.getElementById('progress-bar').style.width = percent + '%';
    document.getElementById('progress-text').textContent =
        `$${current.toLocaleString()} raised of $${goal.toLocaleString()} goal (${percent.toFixed(1)}%)`;

    // Update Page Title
    document.title = event.event_name + ' - Charity Events';
}

function showError(message) {
    document.getElementById('loading').style.display = 'none';
    const errEl = document.getElementById('error-msg');
    errEl.textContent = message;
    errEl.style.display = 'block';
}

// Event Register Button
document.getElementById('register-btn').addEventListener('click', () => {
    alert('This feature is currently under construction.');
});