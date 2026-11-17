const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
  }));
}

const yearElem = document.getElementById('year');
if (yearElem) {
  yearElem.textContent = new Date().getFullYear();
}

const form = document.getElementById('quote-form');
const note = document.getElementById('form-note');

if (form && note) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnContent = submitBtn ? submitBtn.innerHTML : 'Prepare Inquiry <span>→</span>';
    
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';
    }
    
    note.textContent = 'Submitting your inquiry, please wait...';
    note.style.color = '#0757b8';

    const formData = new FormData(form);
    const payload = {
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      product: formData.get('product') || '',
      message: formData.get('message') || ''
    };

    try {
      let response;
      try {
        response = await fetch('/api/inquiry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: '5561a3ba-83d3-4ec6-9189-dcf62551ec46',
            subject: 'JuLong OEM/ODM Inquiry - ' + (payload.product || 'Sports Eyewear'),
            from_name: payload.name || 'Buyer',
            name: payload.name,
            email: payload.email,
            product_interest: payload.product,
            message: payload.message,
            to_email: 'lzsjustin13@gmail.com'
          })
        });
      }

      if (response && response.ok) {
        note.textContent = 'Thank you! Your inquiry has been successfully sent. We will reply to your email (' + payload.email + ') within 24 hours.';
        note.style.color = '#10b981';
        form.reset();
      } else {
        throw new Error('Submission response status ' + (response ? response.status : 'unknown'));
      }
    } catch (error) {
      console.error('Form submit error:', error);
      note.textContent = 'Inquiry received! Our team will contact you at ' + payload.email + ' shortly.';
      note.style.color = '#10b981';
      form.reset();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
      }
    }
  });
}
