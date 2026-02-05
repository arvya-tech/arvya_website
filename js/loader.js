// Professional Page Loader with Logo Animation
(function() {
  'use strict';

  const loader = {
    minLoadTime: 800,
    startTime: Date.now(),
    loaderElement: null,

    createLoader: function() {
      const loaderHTML = `
        <div class="page-loader" id="pageLoader">
          <div class="loader-content">
            <div class="logo-container">
              <div class="logo">
                <img src="Logos/Arvya_Logo.png" alt="Arvya Tech Logo" class="logo-icon">
              </div>
            </div>
          </div>
        </div>
      `;
      
      document.body.insertAdjacentHTML('afterbegin', loaderHTML);
      this.loaderElement = document.getElementById('pageLoader');
    },

    hideLoader: function() {
      if (!this.loaderElement) return;
      
      const elapsedTime = Date.now() - this.startTime;
      const remainingTime = Math.max(0, this.minLoadTime - elapsedTime);
      
      setTimeout(() => {
        this.loaderElement.classList.add('fade-out');
        
        setTimeout(() => {
          if (this.loaderElement && this.loaderElement.parentNode) {
            this.loaderElement.remove();
          }
          document.documentElement.style.overflow = '';
        }, 600);
      }, remainingTime);
    },

    init: function() {
      this.createLoader();
      
      if (document.readyState === 'complete') {
        this.hideLoader();
      } else {
        window.addEventListener('load', () => this.hideLoader());
      }
    }
  };

  loader.init();
})();