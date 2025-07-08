class Event {
  constructor(id, title, location) {
    this.id = id;
    this.title = title;
    this.location = location;
    this.organizers = [];
  }

  addOrganizer(name) {
    if (!this.organizers.includes(name)) this.organizers.push(name);
  }

  removeOrganizer(name) {
    this.organizers = this.organizers.filter(o => o !== name);
  }

  get organizerCount() {
    return this.organizers.length;
  }
}

let events = loadEvents();
let nextId = calcNextId();

function saveEvents() {
  localStorage.setItem('events', JSON.stringify(events));
}

function loadEvents() {
  const raw = localStorage.getItem('events');
  return raw
    ? JSON.parse(raw).map(e => Object.assign(new Event(), e))
    : [];
}

function calcNextId() {
  return events.length ? Math.max(...events.map(e => e.id)) + 1 : 1;
}

function groupByLocation(list) {
  return list.reduce((acc, ev) => {
    (acc[ev.location] ??= []).push(ev);
    return acc;
  }, {});
}

function getUniqueOrganizers(list) {
  return [...new Set(list.flatMap(ev => ev.organizers))];
}

function getEventsByOrganizer(list, organizer) {
  return list.filter(ev => ev.organizers.includes(organizer));
}

function groupByOrganizerCount(list) {
  return list.reduce((acc, ev) => {
    (acc[ev.organizerCount] ??= []).push(ev);
    return acc;
  }, {});
}

function getEventsByCity(list, city) {
  return list.filter(ev => ev.location === city);
}

window.eventUtils = {
  groupByLocation,
  getUniqueOrganizers,
  getEventsByOrganizer,
  groupByOrganizerCount,
  getEventsByCity,
};

const listDiv = document.getElementById('event-list');
const output = document.getElementById('analytics-output');

function renderEvents() {
  listDiv.innerHTML = '';
  events.forEach(ev => {
    const card = document.createElement('div');
    card.innerHTML = `
      <h3>${ev.title}</h3>
      <p><strong>Место:</strong> ${ev.location}</p>
      <p><strong>Организаторы:</strong> ${ev.organizers.join(', ') || '—'}</p>
      <button onclick="deleteEvent(${ev.id})">Удалить событие</button>
      <button onclick="promptAddOrg(${ev.id})">Добавить организатора</button>
      <button onclick="promptRemoveOrg(${ev.id})">Удалить организатора</button>
    `;
    listDiv.appendChild(card);
  });
}

function addEventAsync(title, location) {
  return new Promise(res =>
    setTimeout(() => {
      events.push(new Event(nextId++, title, location));
      saveEvents(); renderEvents(); res();
    }, 400)
  );
}

function deleteEvent(id) {
  events = events.filter(e => e.id !== id);
  saveEvents(); renderEvents();
}

function promptAddOrg(id) {
  const name = prompt('Имя организатора:');
  if (!name) return;
  const ev = events.find(e => e.id === id);
  if (!ev) return;
  new Promise(r => setTimeout(r, 400)).then(() => {
    ev.addOrganizer(name); saveEvents(); renderEvents();
  });
}

function promptRemoveOrg(id) {
  const name = prompt('Кого удалить?');
  if (!name) return;
  const ev = events.find(e => e.id === id);
  if (!ev) return;
  new Promise(r => setTimeout(r, 400)).then(() => {
    ev.removeOrganizer(name); saveEvents(); renderEvents();
  });
}

document.getElementById('create-event-form').addEventListener('submit', async e => {
  e.preventDefault();
  const title = document.getElementById('event-title').value.trim();
  const location = document.getElementById('event-location').value.trim();
  if (!title || !location) return;
  await addEventAsync(title, location);
  e.target.reset();
});

document.getElementById('btn-group-location').onclick = () =>
  showResult(groupByLocation(events));

document.getElementById('btn-all-organizers').onclick = () =>
  showResult(getUniqueOrganizers(events));

document.getElementById('btn-filter-organizer').onclick = () => {
  const name = document.getElementById('filter-organizer').value.trim();
  showResult(getEventsByOrganizer(events, name));
};

document.getElementById('btn-group-orgcount').onclick = () =>
  showResult(groupByOrganizerCount(events));

document.getElementById('btn-filter-city').onclick = () => {
  const city = document.getElementById('filter-city').value.trim();
  showResult(getEventsByCity(events, city));
};

function showResult(res) {
  output.textContent = JSON.stringify(res, null, 2) || '—';
}

renderEvents();
