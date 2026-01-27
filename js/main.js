document.addEventListener('DOMContentLoaded', () => {
  // Mailchimp config
  const MC_URL = 'https://remoscope.us8.list-manage.com/subscribe/post-json';
  const MC_U = '66178cd1892eb3bd7b9c46167';
  const MC_ID = '1bb48854da';

  // Handle all signup forms
  document.querySelectorAll('.signup-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;
      const source = form.dataset.niche || 'general';
      const btn = form.querySelector('button');
      const originalText = btn.textContent;

      btn.textContent = 'Joining...';
      btn.disabled = true;

      // JSONP request to Mailchimp
      const url = `${MC_URL}?u=${MC_U}&id=${MC_ID}&EMAIL=${encodeURIComponent(email)}&SOURCE=${encodeURIComponent(source)}`;
      const script = document.createElement('script');
      const callbackName = 'mc_callback_' + Date.now();
      
      window[callbackName] = (data) => {
        delete window[callbackName];
        document.body.removeChild(script);

        if (data.result === 'success') {
          const success = form.nextElementSibling;
          if (success && success.classList.contains('form-success')) {
            form.style.display = 'none';
            success.style.display = 'block';
          } else {
            btn.textContent = '✓ You\'re in!';
          }
        } else {
          alert(data.msg || 'Something went wrong. Please try again.');
          btn.textContent = originalText;
          btn.disabled = false;
        }
      };

      script.src = url + '&c=' + callbackName;
      document.body.appendChild(script);
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
