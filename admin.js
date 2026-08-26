const $=id=>document.getElementById(id); let cached=[], currentImage='';
const today=new Date(); const iso=d=>d.toISOString().slice(0,10); $('startDate').value=iso(today); const end=new Date(today);end.setFullYear(end.getFullYear()+1);$('endDate').value=iso(end);
function fileData(file){return new Promise((resolve,reject)=>{if(!file)return resolve('');const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(file)})}
async function load(){const city=$('filterCity').value.trim().toLowerCase();cached=await fetch(`/api/ads?city=${city}`).then(r=>r.json());const maxSpots = 24;

const soldSpots = cached
  .filter(ad => ad.active !== false)
  .reduce((total, ad) => total + Number(ad.spots || 0), 0);

const capacity = document.getElementById('adCapacity');

if (capacity) {
  capacity.textContent = `${soldSpots} of ${maxSpots} spots sold`;
}$('ads').innerHTML=cached.length?cached.map(a=>`<div class="adrow"><div>${a.image?`<img class="thumb" src="${a.image}">`:`<div class="thumb"></div>`}</div><div class="meta"><strong>${a.business}</strong><small>${a.startDate||'No start'} → ${a.endDate||'No end'} • ${a.spots} spot weight • ${a.active?'Active':'Paused'}${a.url?' • Clickable':''}</small><div>${a.headline||''}</div></div><div class="rowactions"><button onclick="editAd('${a.id}')">Edit</button><button
  class="danger"
  onclick="toggleAd('${a.id}', ${a.active})"
>
  ${a.active ? 'Deactivate' : 'Reactivate'}
</button></div></div>`).join(''):'<p>No advertisers found for this city.</p>'}
window.editAd=id=>{const a=cached.find(x=>x.id===id);if(!a)return;$('editId').value=a.id;$('city').value=a.city;$('business').value=a.business;$('headline').value=a.headline||'';$('url').value=a.url||'';$('startDate').value=a.startDate;$('endDate').value=a.endDate;$('spots').value=a.spots;$('creativePlan').value=a.creativePlan||'standard';$('active').checked=a.active!==false;currentImage=a.image||'';scrollTo({top:0,behavior:'smooth'})}
window.toggleAd = async (id, isActive) => {
  const ad = cached.find(x => x.id === id);
  if (!ad) return;

  const nextActive = !isActive;
  const action = nextActive ? 'reactivate' : 'deactivate';

  if (!confirm(`Are you sure you want to ${action} ${ad.business}?`)) {
    return;
  }

  const response = await fetch(`/api/ads/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...ad,
      active: nextActive
    })
  });

  if (!response.ok) {
    alert(`Could not ${action} advertiser.`);
    return;
  }

  load();
};
window.removeAd=async id=>{if(!confirm('Delete this advertiser?'))return;await fetch(`/api/ads/${id}`,{method:'DELETE'});load()}
$('form').onsubmit=async e=>{e.preventDefault();const f=$('image').files[0];const image=f?await fileData(f):currentImage;const payload={city:$('city').value.trim().toLowerCase(),business:$('business').value.trim(),headline:$('headline').value.trim(),url:$('url').value.trim(),startDate:$('startDate').value,endDate:$('endDate').value,spots:Number($('spots').value),creativePlan:$('creativePlan').value,active:$('active').checked,image};const maxSpots = 24;

const otherActiveSpots = cached
  .filter(ad => ad.active !== false && ad.id !== $('editId').value)
  .reduce((total, ad) => total + Number(ad.spots || 0), 0);

const requestedSpots = Number($('spots').value || 0);

if (
  $('active').checked &&
  otherActiveSpots + requestedSpots > maxSpots
) {
  alert(
    `This would exceed the ${maxSpots}-spot limit. ` +
    `There are only ${Math.max(0, maxSpots - otherActiveSpots)} spots available.`
  );
  return;
}const id=$('editId').value;await fetch(id?`/api/ads/${id}`:'/api/ads',{method:id?'PUT':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});reset();$('filterCity').value=payload.city;load()}
function reset(){$('form').reset();$('creativePlan').value='standard';$('editId').value='';$('city').value=$('filterCity').value||'fergusfalls';$('startDate').value=iso(today);$('endDate').value=iso(end);$('active').checked=true;currentImage=''}
$('cancelEdit').onclick=reset;$('refresh').onclick=load;load();
let editingLocationId = null;
document.addEventListener('DOMContentLoaded', () => {
const locationForm = document.getElementById('locationForm');

if (locationForm) {
  locationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const logoFile = document.getElementById('locationLogo').files[0];

    let logo = '';

    if (logoFile) {
      logo = await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(logoFile);
      });
    }

    const location = {
      name: document.getElementById('locationName').value.trim(),
      edition: document.getElementById('locationEdition').value.trim(),
      address: document.getElementById('locationAddress').value.trim(),
      url: document.getElementById('locationUrl').value.trim(),
      contact: document.getElementById('locationContact').value.trim(),
      contactInfo: document.getElementById('locationContactInfo').value.trim(),
      qrPlacement: document.getElementById('locationQrPlacement').value.trim(),
      logo,
      notes: document.getElementById('locationNotes').value.trim(),
      active: document.getElementById('locationActive').checked
    };

    try {
      const url = editingLocationId
  ? `/api/locations/${editingLocationId}`
  : '/api/locations';

const method = editingLocationId ? 'PUT' : 'POST';

const response = await fetch(url, {
  method,
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(location)
});

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Could not save location');
      }

      alert(
  editingLocationId
    ? `${location.name} was updated.`
    : `${location.name} was added as a participating location.`
);
editingLocationId = null;

const submitButton = document.querySelector(
  '#locationForm button[type="submit"]'
);

if (submitButton) {
  submitButton.textContent = 'Add Participating Location';
}
      locationForm.reset();
      document.getElementById('locationEdition').value = 'Fergus Falls';
      document.getElementById('locationActive').checked = true;
await loadLocationsReport();
    } catch (error) {
      console.error(error);
      alert('The location could not be saved.');
    }
  });
}
});
async function loadLocationsReport() {
  const tbody = document.getElementById('locationsTableBody');
  if (!tbody) return;

  try {
    const response = await fetch('/api/locations');
    const locations = await response.json();

    tbody.innerHTML = '';

    if (!locations.length) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7">No participating locations yet.</td>
        </tr>
      `;
      return;
    }

    locations.forEach(location => {
  const row = document.createElement('tr');

  row.innerHTML = `
    <td><strong>${location.name || ''}</strong></td>
    <td>${location.edition || ''}</td>
    <td>${location.qrPlacement || ''}</td>
    <td>${location.dateJoined || ''}</td>
    <td>${location.lastChecked || 'Not yet'}</td>
    <td>${location.active ? 'Active' : 'Inactive'}</td>
    <td>
      <button
        type="button"
        class="edit-location-btn"
        data-id="${location.id}"
      >
        Edit
      </button>

      <button
        type="button"
        class="toggle-location-btn"
        data-id="${location.id}"
      >
        ${location.active ? 'Deactivate' : 'Reactivate'}
      </button>

      <button
        type="button"
        class="check-location-btn"
        data-id="${location.id}"
      >
        Checked Today
      </button>
    </td>
  `;

  tbody.appendChild(row);

  // EDIT
  row
    .querySelector('.edit-location-btn')
    ?.addEventListener('click', () => {
      editingLocationId = location.id;

      document.getElementById('locationName').value =
        location.name || '';

      document.getElementById('locationEdition').value =
        location.edition || 'Fergus Falls';

      document.getElementById('locationAddress').value =
        location.address || '';

      document.getElementById('locationUrl').value =
        location.url || '';

      document.getElementById('locationContact').value =
        location.contact || '';

      document.getElementById('locationContactInfo').value =
        location.contactInfo || '';

      document.getElementById('locationQrPlacement').value =
        location.qrPlacement || '';

      document.getElementById('locationNotes').value =
        location.notes || '';

      document.getElementById('locationActive').checked =
        location.active !== false;

      const submitButton = document.querySelector(
        '#locationForm button[type="submit"]'
      );

      if (submitButton) {
        submitButton.textContent = 'Save Changes';
      }

      document
        .getElementById('locationForm')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
    });

  // DEACTIVATE / REACTIVATE
  row
    .querySelector('.toggle-location-btn')
    ?.addEventListener('click', async () => {
      const nextActive = !location.active;
      const action = nextActive ? 'reactivate' : 'deactivate';

      if (!confirm(
  `Are you sure you want to ${action} ${location.name}?`
)) {
  return;
}

      try {
        const response = await fetch(
          `/api/locations/${location.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: location.name,
              address: location.address || '',
              url: location.url || '',
              contact: location.contact || '',
              contactInfo: location.contactInfo || '',
              qrPlacement: location.qrPlacement || '',
              notes: location.notes || '',
              active: nextActive
            })
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.error || `Could not ${action} location`
          );
        }

        await loadLocationsReport();

      } catch (error) {
        console.error(error);
        alert(`Could not ${action} ${location.name}.`);
      }
    });

  // CHECKED TODAY
  row
    .querySelector('.check-location-btn')
    ?.addEventListener('click', async () => {
      try {
        const response = await fetch(
          `/api/locations/${location.id}/checked`,
          { method: 'POST' }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.error || 'Could not update location'
          );
        }

        await loadLocationsReport();

      } catch (error) {
        console.error(error);
        alert('Could not update the check date.');
      }
    });
});
} catch (error) {
  console.error('Could not load participating locations:', error);
}
}

document.addEventListener('DOMContentLoaded', () => {
  loadLocationsReport();
});
// Participating Locations report filters
function filterLocationsReport() {
  const search = document
    .getElementById('locationSearch')
    ?.value.toLowerCase().trim() || '';

  const status = document
    .getElementById('locationStatusFilter')
    ?.value || 'all';

  const checked = document
    .getElementById('locationCheckedFilter')
    ?.value || 'all';

  const rows = document.querySelectorAll('#locationsTableBody tr');

  rows.forEach(row => {
    const cells = row.querySelectorAll('td');

    if (!cells.length) return;

    const rowText = row.textContent.toLowerCase();

    // Based on current table:
    // 0 Business
    // 1 Edition
    // 2 QR Placement
    // 3 Date Joined
    // 4 Last Checked
    // 5 Status
    // 6 Actions

    const lastChecked = cells[4]?.textContent.trim().toLowerCase() || '';
    const rowStatus = cells[5]?.textContent.trim().toLowerCase() || '';

    const matchesSearch =
      !search || rowText.includes(search);

    const matchesStatus =
      status === 'all' ||
      rowStatus === status;

    const isChecked =
      lastChecked !== '' &&
      lastChecked !== 'not yet';

    const matchesChecked =
      checked === 'all' ||
      (checked === 'checked' && isChecked) ||
      (checked === 'notchecked' && !isChecked);

    row.style.display =
      matchesSearch && matchesStatus && matchesChecked
        ? ''
        : 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('locationSearch')
    ?.addEventListener('input', filterLocationsReport);

  document
    .getElementById('locationStatusFilter')
    ?.addEventListener('change', filterLocationsReport);

  document
    .getElementById('locationCheckedFilter')
    ?.addEventListener('change', filterLocationsReport);
});
let locationSortColumn = -1;
let locationSortAscending = true;

function sortLocationsTable(columnIndex) {
  const tbody = document.getElementById('locationsTableBody');
  if (!tbody) return;

  const rows = Array.from(tbody.querySelectorAll('tr'));

  if (locationSortColumn === columnIndex) {
    locationSortAscending = !locationSortAscending;
  } else {
    locationSortColumn = columnIndex;
    locationSortAscending = true;
  }

  rows.sort((a, b) => {
    const aValue = a.children[columnIndex]?.textContent.trim() || '';
    const bValue = b.children[columnIndex]?.textContent.trim() || '';

    return locationSortAscending
      ? aValue.localeCompare(bValue, undefined, { numeric: true })
      : bValue.localeCompare(aValue, undefined, { numeric: true });
  });

  rows.forEach(row => tbody.appendChild(row));
}

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('#locationsTable th[data-sort]')
    .forEach(th => {
      th.style.cursor = 'pointer';

      th.addEventListener('click', () => {
        sortLocationsTable(Number(th.dataset.sort));
      });
    });
});
async function downloadLocationsCsv() {
  const response = await fetch('/api/locations');
  const locations = await response.json();

  const visibleRows = Array.from(
    document.querySelectorAll('#locationsTableBody tr')
  ).filter(row => row.style.display !== 'none');

  const visibleIds = new Set(
    visibleRows
      .map(row => row.querySelector('.check-location-btn')?.dataset.id)
      .filter(Boolean)
  );

  const filteredLocations = locations.filter(location =>
    visibleIds.has(location.id)
  );

  const headers = [
    'Business',
    'Edition',
    'Address',
    'Website/Facebook',
    'Contact Name',
    'Phone/Email',
    'QR Placement',
    'Date Joined',
    'Last Checked',
    'Status',
    'Notes'
  ];

  const csvRows = [headers];

  filteredLocations.forEach(location => {
    csvRows.push([
      location.name || '',
      location.edition || '',
      location.address || '',
      location.url || '',
      location.contact || '',
      location.contactInfo || '',
      location.qrPlacement || '',
      location.dateJoined || '',
      location.lastChecked || 'Not yet',
      location.active ? 'Active' : 'Inactive',
      location.notes || ''
    ]);
  });

  const escapeCsv = value => {
    const text = String(value ?? '');

    if (
      text.includes(',') ||
      text.includes('"') ||
      text.includes('\n')
    ) {
      return `"${text.replace(/"/g, '""')}"`;
    }

    return text;
  };

  const csv = csvRows
    .map(row => row.map(escapeCsv).join(','))
    .join('\r\n');

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;'
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  const today = new Date().toISOString().slice(0, 10);

  link.href = url;
  link.download = `daily-crumbs-locations-${today}.csv`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('exportLocations')
    ?.addEventListener('click', downloadLocationsCsv);
});
let allLeads = [];

async function loadLeads() {
  const tbody = document.getElementById('leadsTableBody');
  if (!tbody) return;

  try {
    const response = await fetch('/api/leads');
    const leads = await response.json();

    allLeads = Array.isArray(leads) ? leads : [];

    renderLeads();
  } catch (error) {
    console.error('Could not load leads:', error);
    tbody.innerHTML = `
      <tr>
        <td colspan="7">Could not load leads.</td>
      </tr>
    `;
  }
}

function formatLeadDateTime(value) {
  if (!value) return '';

  const date = new Date(value);

  return date.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

function renderLeads() {
  const tbody = document.getElementById('leadsTableBody');
  if (!tbody) return;

  const search =
    document.getElementById('leadSearch')?.value.toLowerCase().trim() || '';

  const typeFilter =
    document.getElementById('leadTypeFilter')?.value || 'all';

  const statusFilter =
    document.getElementById('leadStatusFilter')?.value || 'all';

  const filtered = allLeads.filter(lead => {
    const searchText = [
      lead.business_name,
      lead.contact_name,
      lead.email,
      lead.phone,
      lead.area,
      lead.message
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const matchesSearch =
      !search || searchText.includes(search);

    const matchesType =
      typeFilter === 'all' ||
      lead.lead_type === typeFilter;

    const matchesStatus =
      statusFilter === 'all' ||
      lead.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  if (!filtered.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7">No leads found.</td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(lead => `
    <tr>
      <td>${formatLeadDateTime(lead.created_at)}</td>
      <td>
        ${lead.lead_type === 'participant'
          ? 'Participating Location'
          : 'Advertising'}
      </td>
      <td>${lead.business_name || ''}</td>
      <td>${lead.contact_name || ''}</td>
      <td>${lead.area || ''}</td>
      <td>${lead.status || ''}</td>
      <td>
        <button
          type="button"
          class="view-lead-btn"
          data-id="${lead.id}"
        >
          View
        </button>
      </td>
    </tr>
  `).join('');
}
function toggleLeadDetails(id) {
  const lead = allLeads.find(item => String(item.id) === String(id));
  if (!lead) return;

  const existing = document.getElementById(`lead-details-${id}`);

  if (existing) {
    existing.remove();
    return;
  }

  const button = document.querySelector(
    `.view-lead-btn[data-id="${id}"]`
  );

  if (!button) return;

  const row = button.closest('tr');
  if (!row) return;

  const detailsRow = document.createElement('tr');
  detailsRow.id = `lead-details-${id}`;
  detailsRow.className = 'lead-details-row';

  detailsRow.innerHTML = `
  <td colspan="7">
    <div class="lead-details">
      <p><strong>Email:</strong> ${lead.email || '—'}</p>
      <p><strong>Phone:</strong> ${lead.phone || '—'}</p>
      <p><strong>Website / Facebook:</strong> ${lead.website_url || '—'}</p>
      <p><strong>Message:</strong> ${lead.message || '—'}</p>

      <div class="lead-actions">

  ${lead.status === 'new' ? `
    <button
      type="button"
      class="lead-status-btn"
      data-id="${lead.id}"
      data-status="contacted"
    >
      Mark Contacted
    </button>
  ` : ''}

  ${lead.status !== 'new' ? `
    <button
      type="button"
      class="lead-status-btn"
      data-id="${lead.id}"
      data-status="new"
    >
      Reopen Lead
    </button>
  ` : ''}

  ${lead.status !== 'closed' ? `
    <button
      type="button"
      class="lead-status-btn"
      data-id="${lead.id}"
      data-status="closed"
    >
      Close Lead
    </button>
  ` : ''}

</div>
    </div>
  </td>
`;

  row.after(detailsRow);
}

document.addEventListener('click', event => {
  const button = event.target.closest('.view-lead-btn');

  if (!button) return;

  toggleLeadDetails(button.dataset.id);
});
document.addEventListener('click', async event => {
  const button = event.target.closest('.lead-status-btn');

  if (!button) return;

  const id = button.dataset.id;
  const status = button.dataset.status;

  button.disabled = true;

  try {
    const response = await fetch(`/api/leads/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Could not update lead');
    }

    const lead = allLeads.find(
      item => String(item.id) === String(id)
    );

    if (lead) {
      lead.status = status;
    }

    renderLeads();

  } catch (error) {
    console.error(error);
    alert('The lead status could not be updated.');
  } finally {
    button.disabled = false;
  }
});
document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('leadSearch')
    ?.addEventListener('input', renderLeads);

  document
    .getElementById('leadTypeFilter')
    ?.addEventListener('change', renderLeads);

  document
    .getElementById('leadStatusFilter')
    ?.addEventListener('change', renderLeads);

  loadLeads();
});