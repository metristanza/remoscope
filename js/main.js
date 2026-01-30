document.addEventListener('DOMContentLoaded', () => {
  // Mailchimp config
  const MC_URL = 'https://remoscope.us8.list-manage.com/subscribe/post-json';
  const MC_U = '66178cd1892eb3bd7b9c46167';
  const MC_ID = '1bb48854da';

  // Handle all signup forms
  document.querySelectorAll('.signup-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput.value;
      const source = form.dataset.niche || 'general';
      
      // Show survey modal instead of submitting immediately
      showSurveyModal(email, source, form);
    });
  });

  function showSurveyModal(email, source, originalForm) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'survey-modal';
    modal.innerHTML = `
      <div class="survey-content">
        <h3>One quick question! 🎯</h3>
        <p>What interests you most about Remoscope?</p>
        <div class="survey-options">
          <label class="survey-option">
            <input type="radio" name="interest" value="no_travel">
            <span>Seeing locations without traveling</span>
          </label>
          <label class="survey-option">
            <input type="radio" name="interest" value="live_video">
            <span>LIVE video (not just photos)</span>
          </label>
          <label class="survey-option">
            <input type="radio" name="interest" value="direct_agent">
            <span>Directing the agent in real-time</span>
          </label>
          <label class="survey-option">
            <input type="radio" name="interest" value="ask_questions">
            <span>Asking questions on the spot</span>
          </label>
          <label class="survey-option">
            <input type="radio" name="interest" value="faster">
            <span>Faster than my current method</span>
          </label>
        </div>
        <p style="margin-top: 1.5rem;">How do you currently verify remote work?</p>
        <div class="survey-options">
          <label class="survey-option">
            <input type="radio" name="current" value="own_team">
            <span>Send my own team</span>
          </label>
          <label class="survey-option">
            <input type="radio" name="current" value="photo_service">
            <span>Use a photo inspection service</span>
          </label>
          <label class="survey-option">
            <input type="radio" name="current" value="ask_photos">
            <span>Ask for photos from the site</span>
          </label>
          <label class="survey-option">
            <input type="radio" name="current" value="nothing">
            <span>I don't — that's the problem</span>
          </label>
        </div>
        <button class="survey-submit" type="button">Complete Signup →</button>
        <a href="#" class="survey-skip">Skip survey</a>
      </div>
    `;

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
      .survey-modal {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.8); z-index: 9999;
        display: flex; align-items: center; justify-content: center;
        padding: 1rem;
      }
      .survey-content {
        background: #fff; border-radius: 16px; padding: 2rem;
        max-width: 480px; width: 100%; max-height: 90vh; overflow-y: auto;
      }
      .survey-content h3 { margin: 0 0 0.5rem; color: #1e3a5f; }
      .survey-content > p { color: #64748b; margin-bottom: 1rem; }
      .survey-options { display: flex; flex-direction: column; gap: 0.5rem; }
      .survey-option {
        display: flex; align-items: center; gap: 0.75rem;
        padding: 0.75rem 1rem; border: 1px solid #e2e8f0; border-radius: 8px;
        cursor: pointer; transition: all 0.2s;
      }
      .survey-option:hover { border-color: #3b82f6; background: #f8fafc; }
      .survey-option input:checked + span { color: #3b82f6; font-weight: 600; }
      .survey-option input { accent-color: #3b82f6; }
      .survey-submit {
        width: 100%; margin-top: 1.5rem; padding: 1rem;
        background: #3b82f6; color: #fff; border: none; border-radius: 8px;
        font-size: 1rem; font-weight: 600; cursor: pointer;
      }
      .survey-submit:hover { background: #2563eb; }
      .survey-submit:disabled { background: #94a3b8; cursor: not-allowed; }
      .survey-skip {
        display: block; text-align: center; margin-top: 1rem;
        color: #94a3b8; font-size: 0.875rem; text-decoration: none;
      }
      .survey-skip:hover { color: #64748b; }
    `;
    document.head.appendChild(style);
    document.body.appendChild(modal);

    // Handle submit
    modal.querySelector('.survey-submit').addEventListener('click', () => {
      const interest = modal.querySelector('input[name="interest"]:checked');
      const current = modal.querySelector('input[name="current"]:checked');
      
      const interestVal = interest ? interest.value : 'not_answered';
      const currentVal = current ? current.value : 'not_answered';
      
      submitToMailchimp(email, source, interestVal, currentVal, originalForm, modal);
    });

    // Handle skip
    modal.querySelector('.survey-skip').addEventListener('click', (e) => {
      e.preventDefault();
      submitToMailchimp(email, source, 'skipped', 'skipped', originalForm, modal);
    });
  }

  function submitToMailchimp(email, source, interest, current, form, modal) {
    const btn = modal.querySelector('.survey-submit');
    btn.textContent = 'Joining...';
    btn.disabled = true;

    // Build URL with survey data
    const url = `${MC_URL}?u=${MC_U}&id=${MC_ID}&EMAIL=${encodeURIComponent(email)}&SOURCE=${encodeURIComponent(source)}&INTEREST=${encodeURIComponent(interest)}&CURRENT=${encodeURIComponent(current)}`;
    
    const script = document.createElement('script');
    const callbackName = 'mc_callback_' + Date.now();
    
    window[callbackName] = (data) => {
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);

      // Remove modal
      modal.remove();

      if (data.result === 'success') {
        // Track Lead event for Meta Pixel with survey data
        if (typeof fbq === 'function') {
          fbq('track', 'Lead', { 
            content_name: source,
            interest: interest,
            current_method: current
          });
        }
        
        const success = form.nextElementSibling;
        if (success && success.classList.contains('form-success')) {
          form.style.display = 'none';
          success.style.display = 'block';
        }
      } else {
        // Still show success if already subscribed
        if (data.msg && data.msg.includes('already subscribed')) {
          const success = form.nextElementSibling;
          if (success && success.classList.contains('form-success')) {
            form.style.display = 'none';
            success.style.display = 'block';
          }
        } else {
          alert(data.msg || 'Something went wrong. Please try again.');
        }
      }
    };

    script.src = url + '&c=' + callbackName;
    document.body.appendChild(script);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
});
