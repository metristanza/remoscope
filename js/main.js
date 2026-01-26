document.addEventListener('DOMContentLoaded', () => {
  // Handle all signup forms
  document.querySelectorAll('.signup-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;
      const niche = form.dataset.niche || 'general';
      const btn = form.querySelector('button');
      const originalText = btn.textContent;

      btn.textContent = 'Joining...';
      btn.disabled = true;

      try {
        // Mailchimp integration via serverless function
        const res = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, niche })
        });

        if (res.ok) {
          const success = form.nextElementSibling;
          if (success && success.classList.contains('form-success')) {
            form.style.display = 'none';
            success.style.display = 'block';
          } else {
            btn.textContent = '✓ You\'re in!';
          }
        } else {
          btn.textContent = 'Try again';
          setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 2000);
        }
      } catch (err) {
        // Fallback: open Mailchimp signup in new tab
        const mailchimpUrl = form.dataset.mailchimp;
        if (mailchimpUrl) {
          window.open(mailchimpUrl, '_blank');
          btn.textContent = '✓ Redirected!';
        } else {
          btn.textContent = 'Try again';
          setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 2000);
        }
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
});
