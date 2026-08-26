const $=id=>document.getElementById(id); let cached=[], currentImage='';
const today=new Date(); const iso=d=>d.toISOString().slice(0,10); $('startDate').value=iso(today); const end=new Date(today);end.setFullYear(end.getFullYear()+1);$('endDate').value=iso(end);
function fileData(file){return new Promise((resolve,reject)=>{if(!file)return resolve('');const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(file)})}
async function load(){const city=$('filterCity').value.trim().toLowerCase();cached=await fetch(`/api/ads?city=${city}`).then(r=>r.json());const maxSpots = await getSelectedEditionMaxSpots();

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
$('form').onsubmit=async e=>{e.preventDefault();const f=$('image').files[0];const image=f?await fileData(f):currentImage;const payload={city:$('city').value.trim().toLowerCase(),business:$('business').value.trim(),headline:$('headline').value.trim(),url:$('url').value.trim(),startDate:$('startDate').value,endDate:$('endDate').value,spots:Number($('spots').value),creativePlan:$('creativePlan').value,active:$('active').checked,image};const maxSpots = await getSelectedEditionMaxSpots();

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
function reset(){$('form').reset();$('creativePlan').value='standard';$('editId').value='';$('city').value = $('filterCity').value || '';$('startDate').value=iso(today);$('endDate').value=iso(end);$('active').checked=true;currentImage=''}
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
      const currentEditionName =
  document.getElementById('editionName')?.value || '';

document.getElementById('locationEdition').value =
  currentEditionName;
      document.getElementById('locationActive').checked = true;
await loadLocationsReport();
    } catch (error) {
      console.error(error);
      alert('The location could not be saved.');
    }
  });
}
});
async function getSelectedEditionMaxSpots() {
  const select = document.getElementById('editionSettingsSelect');
  const slug = select?.value || '';

  try {
    const response = await fetch(`/api/editions/${slug}`);
    const edition = await response.json();

    if (!response.ok) {
      throw new Error(
        edition.error || 'Could not load Edition settings'
      );
    }

    return Number(edition.max_ad_spots || 24);

  } catch (error) {
    console.error('Could not load Edition max spots:', error);
    return 24;
  }
}
async function loadEditionManagers() {
  const tbody =
    document.getElementById('editionManagersTableBody');

  if (!tbody) return;

  try {
    const token =
  window.adminUserContext?.accessToken || '';

const response = await fetch('/api/edition-managers', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
    const managers = await response.json();

    if (!response.ok) {
      throw new Error(
        managers.error || 'Could not load Edition Managers'
      );
    }

    tbody.innerHTML = '';

    if (!managers.length) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5">No Edition Managers yet.</td>
        </tr>
      `;
      return;
    }

    managers.forEach(manager => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${manager.full_name || ''}</td>
        <td>${manager.email || ''}</td>
        <td>${manager.edition_name || ''}</td>
        <td>${manager.active === false ? 'Inactive' : 'Active'}</td>
        <td>
          <button
            type="button"
            class="toggle-manager-btn"
            data-user-id="${manager.id}"
          >
            ${manager.active === false ? 'Reactivate' : 'Deactivate'}
          </button>
        </td>
      `;

      tbody.appendChild(row);
    });

  } catch (error) {
    console.error('Could not load Edition Managers:', error);

    tbody.innerHTML = `
      <tr>
        <td colspan="5">Could not load Edition Managers.</td>
      </tr>
    `;
  }
}
document
  .getElementById('addEditionManagerButton')
  ?.addEventListener('click', async () => {
    const name =
      document.getElementById('managerName')?.value.trim();

    const email =
      document.getElementById('managerEmail')?.value.trim();

    const editionSlug =
      document.getElementById('managerEdition')?.value;

    const active =
      document.getElementById('managerActive')?.checked !== false;

    const status =
      document.getElementById('editionManagerStatus');

    if (!name || !email || !editionSlug) {
      if (status) {
        status.textContent =
          'Name, email, and Edition are required.';
      }
      return;
    }

    const token =
      window.adminUserContext?.accessToken || '';

    try {
      const response = await fetch('/api/edition-managers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          email,
          editionSlug,
          active
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || 'Could not add Edition Manager'
        );
      }

      if (status) {
        status.textContent =
          `${name} was added as an Edition Manager.`;
      }

      document.getElementById('managerName').value = '';
      document.getElementById('managerEmail').value = '';
      document.getElementById('managerEdition').value = '';
      document.getElementById('managerActive').checked = true;

      await loadEditionManagers();

    } catch (error) {
      console.error(error);

      if (status) {
        status.textContent = error.message;
      }
    }
  });
async function loadLocationsReport() {
  const tbody = document.getElementById('locationsTableBody');
  if (!tbody) return;

  try {
    const response = await fetch('/api/locations');
    const locations = await response.json();
const normalizeEdition = value =>
  (value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

const selectedEditionSlug =
  document.getElementById('editionSettingsSelect')?.value || '';

const filteredLocations = selectedEditionSlug
  ? locations.filter(
      location =>
        normalizeEdition(location.edition) ===
        normalizeEdition(selectedEditionSlug)
    )
  : locations;


    tbody.innerHTML = '';

    if (!filteredLocations.length) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7">No participating locations yet.</td>
        </tr>
      `;
      return;
    }

    filteredLocations.forEach(location => {
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
async function loadEditionSettings() {
  const select = document.getElementById('editionSettingsSelect');
  if (!select) return;

  const slug = select.value;
creatingNewEdition = false;
  try {
    const response = await fetch(`/api/editions/${slug}`);
    const edition = await response.json();

    if (!response.ok) {
      throw new Error(
        edition.error || 'Could not load Edition settings'
      );
    }

    document.getElementById('editionTerritory').value =
      edition.territory || '';

    document.getElementById('editionMaxSpots').value =
      edition.max_ad_spots ?? 24;

    document.getElementById('editionSuggestedRate').value =
      edition.suggested_annual_ad_rate ?? 600;

    document.getElementById('editionAnnualFee').value =
      edition.annual_edition_fee ?? '';

    document.getElementById('editionRenewalDate').value =
      edition.renewal_date || '';

    document.getElementById('editionActive').checked =
      edition.active !== false;
document.getElementById('editionActive').checked =
  edition.active !== false;

document.getElementById('editionName').value =
  edition.name || '';

document.getElementById('editionSlug').value =
  edition.slug || '';

const saveButton =
  document.getElementById('saveEditionSettings');

if (saveButton) {
  saveButton.textContent = 'Save Edition Settings';
}

updateEditionCalculations();
    updateEditionCalculations();

  } catch (error) {
    console.error(error);

    const status = document.getElementById('editionSettingsStatus');

    if (status) {
      status.textContent = 'Could not load Edition settings.';
    }
  }
}

document
  .getElementById('saveEditionSettings')
  ?.addEventListener('click', async () => {
    const name =
      document.getElementById('editionName').value.trim();

    const slug =
      document.getElementById('editionSlug').value
        .trim()
        .toLowerCase();

    if (creatingNewEdition && (!name || !slug)) {
      alert('Edition name and slug are required.');
      return;
    }

    const payload = {
      name,
      slug,
      territory:
        document.getElementById('editionTerritory').value.trim(),

      maxAdSpots:
        Number(document.getElementById('editionMaxSpots').value || 24),

      suggestedAnnualAdRate:
        Number(document.getElementById('editionSuggestedRate').value || 0),

      annualEditionFee:
        Number(document.getElementById('editionAnnualFee').value || 0),

      renewalDate:
        document.getElementById('editionRenewalDate').value || null,

      active:
        document.getElementById('editionActive').checked
    };

    try {
      if (creatingNewEdition) {
        const response = await fetch('/api/editions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.error || 'Could not create Edition'
          );
        }

        creatingNewEdition = false;

        const newEdition = result.edition;

        const select =
          document.getElementById('editionSettingsSelect');

        const option = document.createElement('option');

        option.value = newEdition.slug;
        option.textContent = newEdition.name;

        select.appendChild(option);
        select.value = newEdition.slug;

        document.getElementById(
          'saveEditionSettings'
        ).textContent = 'Save Edition Settings';

        document.getElementById(
          'editionSettingsStatus'
        ).textContent = `${newEdition.name} was created.`;

        await loadEditionSettings();

} else {
  const currentSlug =
    document.getElementById('editionSettingsSelect').value;

  const response = await fetch(
    `/api/editions/${currentSlug}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.error || 'Could not update Edition'
    );
  }

  document.getElementById(
    'editionSettingsStatus'
  ).textContent = `${result.edition.name} was updated.`;

  await loadEditionSettings();
}

    } catch (error) {
      console.error(error);

      alert(
        creatingNewEdition
          ? 'Could not create Edition.'
          : 'Could not save Edition settings.'
      );
    }
  });
  function applyAdminRoleUI() {
  const context = window.adminUserContext || {};
  const isOwner = context.isOwner === true;
  const editionManagersSection =
  document.getElementById('editionManagersSection');

if (editionManagersSection) {
  editionManagersSection.style.display = isOwner ? '' : 'none';
}
const saveEditionButton =
  document.getElementById('saveEditionSettings');

if (saveEditionButton) {
  saveEditionButton.style.display = isOwner ? '' : 'none';
}
  const newEditionButton =
    document.getElementById('newEditionButton');

  if (newEditionButton) {
    newEditionButton.style.display = isOwner ? '' : 'none';
  }

  const editionName =
    document.getElementById('editionName');

  const editionSlug =
    document.getElementById('editionSlug');

  const editionTerritory =
    document.getElementById('editionTerritory');

  const editionMaxSpots =
    document.getElementById('editionMaxSpots');

  const editionSuggestedRate =
    document.getElementById('editionSuggestedRate');

  const editionAnnualFee =
    document.getElementById('editionAnnualFee');

  const editionRenewalDate =
    document.getElementById('editionRenewalDate');

  const editionActive =
    document.getElementById('editionActive');

  if (!isOwner) {
    if (editionName) editionName.readOnly = true;
    if (editionSlug) editionSlug.readOnly = true;
    if (editionTerritory) editionTerritory.readOnly = true;
    if (editionMaxSpots) editionMaxSpots.readOnly = true;
    if (editionSuggestedRate) editionSuggestedRate.readOnly = true;
    if (editionAnnualFee) editionAnnualFee.readOnly = true;
    if (editionRenewalDate) editionRenewalDate.disabled = true;
    if (editionActive) editionActive.disabled = true;
    const ownerOnlyFields = [
  editionName,
  editionSlug,
  editionTerritory,
  editionMaxSpots,
  editionSuggestedRate,
  editionAnnualFee,
  editionRenewalDate,
  editionActive
];

ownerOnlyFields.forEach(field => {
  const wrapper = field?.closest('label');
  if (wrapper) wrapper.style.display = 'none';
});
const editionSettingsGrid =
  document.querySelector('.edition-settings-grid');

if (editionSettingsGrid) {
  Array.from(editionSettingsGrid.children).forEach(child => {
    const containsEditionSelect =
      child.querySelector?.('#editionSettingsSelect');

    if (!containsEditionSelect) {
      child.style.display = 'none';
    }
  });
}
  }
  
}
function updateEditionCalculations() {
  const maxSpots =
    Number(document.getElementById('editionMaxSpots')?.value || 0);

  const suggestedRate =
    Number(document.getElementById('editionSuggestedRate')?.value || 0);

  const benchmark = maxSpots * suggestedRate;
  const guideline = benchmark * 0.10;

  const benchmarkEl =
    document.getElementById('editionRevenueBenchmark');

  const guidelineEl =
    document.getElementById('editionFeeGuideline');

  if (benchmarkEl) {
    benchmarkEl.textContent =
      benchmark.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      });
  }

  if (guidelineEl) {
    guidelineEl.textContent =
      guideline.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      });
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  document
  .getElementById('editionSettingsSelect')
  ?.addEventListener('change', async () => {
    const slug =
      document.getElementById('editionSettingsSelect').value;

    await loadEditionSettings();

    const filterCity = document.getElementById('filterCity');
    if (filterCity) {
      filterCity.value = slug;
    }

    const cityField = document.getElementById('city');
    if (cityField) {
      cityField.value = slug;
    }
const locationEdition =
  document.getElementById('locationEdition');

if (locationEdition) {
  locationEdition.value = slug;
}

await load();
await loadLocationsReport();
  });

  document
    .getElementById('editionMaxSpots')
    ?.addEventListener('input', updateEditionCalculations);

  document
    .getElementById('editionSuggestedRate')
    ?.addEventListener('input', updateEditionCalculations);

});
let creatingNewEdition = false;

document
  .getElementById('newEditionButton')
  ?.addEventListener('click', () => {
    creatingNewEdition = true;

    document.getElementById('editionName').value = '';
    document.getElementById('editionSlug').value = '';
    document.getElementById('editionTerritory').value = '';
    document.getElementById('editionMaxSpots').value = 24;
    document.getElementById('editionSuggestedRate').value = 600;
    document.getElementById('editionAnnualFee').value = 1440;
    document.getElementById('editionRenewalDate').value = '';
    document.getElementById('editionActive').checked = true;

    updateEditionCalculations();

    const saveButton =
      document.getElementById('saveEditionSettings');

    if (saveButton) {
      saveButton.textContent = 'Create Edition';
    }

    const status =
      document.getElementById('editionSettingsStatus');

    if (status) {
      status.textContent = 'Creating a new Edition';
    }
  });
  document
  .getElementById('editionName')
  ?.addEventListener('input', () => {
    if (!creatingNewEdition) return;

    const name =
      document.getElementById('editionName').value;

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    document.getElementById('editionSlug').value = slug;
  });
  async function loadEditionOptions() {
  const select = document.getElementById('editionSettingsSelect');
  if (!select) return;

  try {
    const response = await fetch('/api/editions');
const allEditions = await response.json();

if (!response.ok) {
  throw new Error(
    allEditions.error || 'Could not load Editions'
  );
}

const context = window.adminUserContext || {};
let editions = allEditions;

if (!context.isOwner) {
  const allowedIds = new Set(
    (context.editions || [])
      .map(item => item.edition_id)
  );

  editions = allEditions.filter(
    edition => allowedIds.has(edition.id)
  );
}

    if (!response.ok) {
      throw new Error(
        editions.error || 'Could not load Editions'
      );
    }

    const currentValue = select.value;

    select.innerHTML = '';

    editions.forEach(edition => {
      const option = document.createElement('option');

      option.value = edition.slug;
      option.textContent =
        edition.active === false
          ? `${edition.name} (Inactive)`
          : edition.name;

      select.appendChild(option);
    });

    if (
      currentValue &&
      editions.some(edition => edition.slug === currentValue)
    ) {
      select.value = currentValue;
    } else if (editions.length) {
      select.value = editions[0].slug;
    }

  } catch (error) {
    console.error('Could not load Edition list:', error);
  }
}
document.addEventListener('adminContextReady', async () => {
  applyAdminRoleUI();

  await loadEditionOptions();
  await loadEditionSettings();
  const managerEditionSelect =
  document.getElementById('managerEdition');

const editionSettingsSelect =
  document.getElementById('editionSettingsSelect');

if (managerEditionSelect && editionSettingsSelect) {
  managerEditionSelect.innerHTML =
    '<option value="">Select an edition</option>';

  Array.from(editionSettingsSelect.options).forEach(option => {
    const clone = option.cloneNode(true);
    managerEditionSelect.appendChild(clone);
  });

  managerEditionSelect.value = '';
}

  const select =
    document.getElementById('editionSettingsSelect');

  const slug = select?.value || '';

  if (slug) {
    const filterCity =
      document.getElementById('filterCity');

    if (filterCity) {
      filterCity.value = slug;
    }

    const cityField =
      document.getElementById('city');

    if (cityField) {
      cityField.value = slug;
    }

    const locationEdition =
      document.getElementById('locationEdition');

    if (locationEdition) {
      const editionName =
        document.getElementById('editionName')?.value || '';

      locationEdition.value = editionName;
    }

    await load();
    await loadLocationsReport();
  }
  if (window.adminUserContext?.isOwner) {
  await loadEditionManagers();
}
});