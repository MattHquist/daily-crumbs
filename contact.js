const form = document.getElementById('contactForm');
const statusMessage = document.getElementById('contactStatus');
const contactType = document.getElementById('contactType');

// If someone arrives from the Participating Locations CTA,
// automatically select "Becoming a Participating Location".
const params = new URLSearchParams(window.location.search);
const requestedType = params.get('type');

if (
  requestedType === 'participant' ||
  requestedType === 'advertising'
) {
  contactType.value = requestedType;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = form.querySelector('button[type="submit"]');

  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';

  statusMessage.textContent = '';

  const lead = {
    leadType: contactType.value,
    businessName: document.getElementById('contactBusiness').value,
    contactName: document.getElementById('contactName').value,
    email: document.getElementById('contactEmail').value,
    phone: document.getElementById('contactPhone').value,
    area: document.getElementById('contactArea').value,
    website: document.getElementById('contactWebsite').value,
    message: document.getElementById('contactMessage').value
  };

  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lead)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Could not submit request');
    }

    statusMessage.textContent =
      'Thank you! Your request has been received. We’ll be in touch soon.';

    form.reset();

    // Preserve the preselected inquiry type after reset.
    if (
      requestedType === 'participant' ||
      requestedType === 'advertising'
    ) {
      contactType.value = requestedType;
    }

  } catch (error) {
    console.error(error);

    statusMessage.textContent =
      'Sorry, we could not send your request. Please try again.';
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Send Request';
  }
});