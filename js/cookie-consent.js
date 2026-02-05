// Cookie Consent Popup
(function() {
  'use strict';

  const cookieConsent = {
    cookieName: 'arvya_cookie_consent',
    
    createPopup: function() {
      if (this.hasConsent()) return;
      
      const popup = document.createElement('div');
      popup.id = 'cookie-consent';
      popup.innerHTML = `
        <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #ffffff; color: #1f2937; padding: 20px; z-index: 100000; box-shadow: 0 -4px 20px rgba(0,0,0,0.2); border-top: 3px solid #2563eb;">
          <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px;">
            <div style="flex: 1; min-width: 300px;">
              <p style="margin: 0; font-size: 15px; line-height: 1.5; color: #374151; font-weight: 500;">
                We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies. 
                <a href="privacy-policy.html" style="color: #2563eb; text-decoration: underline; font-weight: 600;">Learn more</a>
              </p>
            </div>
            <div style="display: flex; gap: 12px; flex-shrink: 0;">
              <button id="cookie-accept" style="background: #2563eb; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; box-shadow: 0 2px 8px rgba(37,99,235,0.3);">
                Accept All
              </button>
              <button id="cookie-decline" style="background: #f3f4f6; color: #374151; border: 2px solid #d1d5db; padding: 10px 22px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500;">
                Decline
              </button>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(popup);
      this.attachEvents();
    },

    attachEvents: function() {
      document.getElementById('cookie-accept').addEventListener('click', () => {
        this.setConsent(true);
        this.hidePopup();
      });
      
      document.getElementById('cookie-decline').addEventListener('click', () => {
        this.setConsent(false);
        this.hidePopup();
      });
    },

    hasConsent: function() {
      return localStorage.getItem(this.cookieName) !== null;
    },

    setConsent: function(accepted) {
      localStorage.setItem(this.cookieName, accepted ? 'accepted' : 'declined');
    },

    hidePopup: function() {
      const popup = document.getElementById('cookie-consent');
      if (popup) {
        popup.style.transform = 'translateY(100%)';
        popup.style.transition = 'transform 0.3s ease';
        setTimeout(() => popup.remove(), 300);
      }
    },

    init: function() {
      // Show popup after page loads
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          setTimeout(() => this.createPopup(), 1000);
        });
      } else {
        setTimeout(() => this.createPopup(), 1000);
      }
    }
  };

  cookieConsent.init();
})();