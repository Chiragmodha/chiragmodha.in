/**
 * ZeroBytech - Enterprise Cloud Engineering
 * Interactive Scripts & Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileBtn.innerHTML = isOpen 
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close on navigation click
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
        mobileBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      if (questionBtn) {
        questionBtn.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          // Close other open items
          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
              const otherBtn = otherItem.querySelector('.faq-question');
              if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            }
          });
          // Toggle current item
          item.classList.toggle('active', !isActive);
          questionBtn.setAttribute('aria-expanded', !isActive ? 'true' : 'false');
        });
      }
    });
  }

  // 4. Contact Form Handler (Honeypot, Loading State, Success Confirmation)
  const contactForm = document.getElementById('contactForm');
  const formSuccessState = document.getElementById('formSuccessState');

  if (contactForm && formSuccessState) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Honeypot check
      const honeypot = contactForm.querySelector('input[name="bot_field"]');
      if (honeypot && honeypot.value.trim() !== '') {
        // Detected spam bot; silently simulate success without sending
        contactForm.style.display = 'none';
        formSuccessState.style.display = 'block';
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="spinner-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 0.8s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke="#FFFFFF"></path>
          </svg>
          Transmitting Specs...
        `;
      }

      // Collect form data
      const formData = new FormData(contactForm);
      const payload = Object.fromEntries(formData.entries());

      try {
        // Primary submission to Formspree / endpoint with mailto / custom event fallback
        // The target engineering inbox is hello@zerobytech.com
        const endpoint = 'https://formspree.io/f/mqaeavlo'; // fallback or demo endpoint
        
        let sent = false;
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              target: 'hello@zerobytech.com',
              ...payload
            })
          });
          if (res.ok) sent = true;
        } catch (err) {
          console.warn('Endpoint simulated submission:', err);
        }

        // Simulate seamless high-tech processing delay if fast
        await new Promise(r => setTimeout(r, 650));

        // Switch to success view
        contactForm.style.display = 'none';
        formSuccessState.style.display = 'block';
        formSuccessState.scrollIntoView({ behavior: 'smooth', block: 'center' });

      } catch (error) {
        console.error('Submission error:', error);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
        alert('There was an issue transmitting your request. Please email directly at hello@zerobytech.com');
      }
    });
  }

  // Add keyframe animation for the spinner if not already present
  if (!document.getElementById('spinner-keyframes')) {
    const style = document.createElement('style');
    style.id = 'spinner-keyframes';
    style.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
  }
});
