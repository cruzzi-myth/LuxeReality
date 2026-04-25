/* ============================================================
       RENTCAST API CONFIG
    ============================================================ */
    const RENTCAST_API_KEY  = 'd9083635deae42fb807db3b9cdc35821';
    const RENTCAST_BASE_URL = 'https://api.rentcast.io/v1';

    let properties = [];

    const TYPE_MAP = {
      'Single Family': 'House',
      'Condo':         'Condo',
      'Townhouse':     'Townhouse',
      'Multi Family':  'House',
      'Apartment':     'Condo',
      'Manufactured':  'House',
      'Land':          'House',
      'Commercial':    'House',
    };
    const EMOJIS    = ['🏡','🏙️','🌊','🏘️','⛰️','🏢','🏠','🌅','🏛️','⛳'];
    const GRADIENTS = ['g1','g2','g3','g4','g5','g6','g7','g8','g9','g10'];

    function mapRentcastListing(p, i) {
      const city  = p.city  || '';
      const state = p.state || '';
      return {
        id:          p.id || i,
        title:       p.addressLine1 || p.formattedAddress || 'Property',
        price:       p.price || 0,
        bedrooms:    p.bedrooms    || 0,
        bathrooms:   p.bathrooms   || 0,
        sqft:        p.squareFootage || 0,
        type:        TYPE_MAP[p.propertyType] || p.propertyType || 'House',
        location:    city && state ? `${city}, ${state}` : p.formattedAddress || '',
        listingDate: p.listedDate
                       ? p.listedDate.split('T')[0]
                       : new Date().toISOString().split('T')[0],
        image:       (p.photos && p.photos[0]) || '',
        emoji:       EMOJIS[i % EMOJIS.length],
        gradient:    GRADIENTS[i % GRADIENTS.length],
        status:      'For Sale',
        featured:    i < 3,
      };
    }

    async function fetchListings() {
      const grid = document.getElementById('listingsGrid');
      grid.innerHTML = `
        <div class="no-results" style="grid-column:1/-1">
          <i class="fa-solid fa-spinner fa-spin" style="font-size:2.5rem;color:var(--primary);opacity:.7"></i>
          <h3 style="margin-top:1rem">Loading Listings…</h3>
          <p>Fetching live properties from RentCast</p>
        </div>`;

      try {
        const res = await fetch(
          `${RENTCAST_BASE_URL}/listings/sale?status=Active&limit=12`,
          { headers: { 'X-Api-Key': RENTCAST_API_KEY } }
        );
        if (!res.ok) throw new Error(`RentCast API error ${res.status}`);
        const data = await res.json();
        const listings = Array.isArray(data) ? data : (data.data || []);
        properties = listings.map(mapRentcastListing);
        filterAndRender();
      } catch (err) {
        console.error('RentCast fetch failed:', err);
        grid.innerHTML = `
          <div class="no-results" style="grid-column:1/-1">
            <i class="fa-solid fa-circle-exclamation"></i>
            <h3>Could Not Load Listings</h3>
            <p>${err.message}</p>
          </div>`;
      }
    }

    /* ============================================================
       UTILITY HELPERS
    ============================================================ */
    function formatPrice(price) {
      if (price >= 1000000) {
        return '$' + (price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 2) + 'M';
      }
      return '$' + price.toLocaleString('en-US');
    }

    function formatDate(dateStr) {
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    function daysAgo(dateStr) {
      const diff = Date.now() - new Date(dateStr + 'T00:00:00').getTime();
      const days = Math.floor(diff / 86400000);
      if (days === 0) return 'Today';
      if (days === 1) return 'Yesterday';
      if (days < 30) return days + ' days ago';
      if (days < 365) return Math.floor(days / 30) + ' months ago';
      return Math.floor(days / 365) + ' year(s) ago';
    }

    /* ============================================================
       MAIN FILTER + RENDER FUNCTION
    ============================================================ */
    function filterAndRender() {
      const searchTerm  = document.getElementById('searchInput').value.toLowerCase().trim();
      const sortPrice   = document.getElementById('sortPrice').value;
      const sortDate    = document.getElementById('sortDate').value;
      const filterType  = document.getElementById('filterType').value;
      const filterBeds  = document.getElementById('filterBeds').value;
      const minPrice    = parseInt(document.getElementById('priceMin').value);
      const maxPrice    = parseInt(document.getElementById('priceMax').value);

      let filtered = [...properties];

      /* --- Search filter (title, location, type) --- */
      if (searchTerm) {
        filtered = filtered.filter(p =>
          p.title.toLowerCase().includes(searchTerm)    ||
          p.location.toLowerCase().includes(searchTerm) ||
          p.type.toLowerCase().includes(searchTerm)
        );
      }

      /* --- Price range filter --- */
      filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);

      /* --- Property type filter --- */
      if (filterType) {
        filtered = filtered.filter(p => p.type === filterType);
      }

      /* --- Bedrooms filter --- */
      if (filterBeds) {
        const beds = parseInt(filterBeds);
        filtered = filtered.filter(p =>
          beds >= 5 ? p.bedrooms >= 5 : p.bedrooms === beds
        );
      }

      /* --- Sorting (price takes precedence if both set) --- */
      if (sortPrice === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortPrice === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortDate === 'date-new') {
        filtered.sort((a, b) => new Date(b.listingDate) - new Date(a.listingDate));
      } else if (sortDate === 'date-old') {
        filtered.sort((a, b) => new Date(a.listingDate) - new Date(b.listingDate));
      }

      renderListings(filtered);
    }

    /* ============================================================
       RENDER LISTINGS TO DOM
    ============================================================ */
    function renderListings(data) {
      const grid = document.getElementById('listingsGrid');
      const countEl = document.getElementById('resultsNum');

      countEl.textContent = data.length;

      if (data.length === 0) {
        grid.innerHTML = `
          <div class="no-results">
            <i class="fa-solid fa-house-circle-xmark"></i>
            <h3>No Properties Found</h3>
            <p>Try adjusting your search terms or filters.</p>
          </div>`;
        return;
      }

      grid.innerHTML = data.map((p, i) => {
        const badge = p.featured
          ? `<span class="prop-badge badge-featured">⭐ Featured</span>`
          : i < 2 && !p.featured
            ? `<span class="prop-badge badge-new">New</span>`
            : `<span class="prop-badge badge-sale">For Sale</span>`;

        return `
          <div class="prop-card" style="animation-delay:${i * 0.06}s">
            <div class="prop-card-img">
              ${p.image
                ? `<img src="${p.image}" alt="${p.title}" class="prop-real-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">`
                : ''}
              <div class="prop-img-fallback ${p.gradient}" style="${p.image ? '' : 'display:flex'}">${p.emoji}</div>
              ${badge}
              <button class="prop-fav" onclick="toggleFav(this)" title="Save property">
                <i class="fa-regular fa-heart"></i>
              </button>
            </div>
            <div class="prop-card-body">
              <div class="prop-price">${formatPrice(p.price)}</div>
              <div class="prop-title">${p.title}</div>
              <div class="prop-loc">
                <i class="fa-solid fa-location-dot"></i>
                ${p.location}
              </div>
              <div class="prop-divider"></div>
              <div class="prop-feats">
                <span class="prop-feat">
                  <i class="fa-solid fa-bed"></i>
                  ${p.bedrooms} Bed${p.bedrooms !== 1 ? 's' : ''}
                </span>
                <span class="prop-feat">
                  <i class="fa-solid fa-bath"></i>
                  ${p.bathrooms} Bath${p.bathrooms !== 1 ? 's' : ''}
                </span>
                <span class="prop-feat">
                  <i class="fa-solid fa-ruler-combined"></i>
                  ${p.sqft.toLocaleString()} sqft
                </span>
              </div>
              <div class="prop-date">
                <i class="fa-regular fa-calendar"></i>
                Listed ${daysAgo(p.listingDate)} &nbsp;·&nbsp; ${formatDate(p.listingDate)}
              </div>
            </div>
          </div>`;
      }).join('');
    }

    /* ============================================================
       RESET FILTERS
    ============================================================ */
    function resetFilters() {
      document.getElementById('searchInput').value = '';
      document.getElementById('sortPrice').value   = '';
      document.getElementById('sortDate').value    = '';
      document.getElementById('filterType').value  = '';
      document.getElementById('filterBeds').value  = '';
      document.getElementById('priceMin').value    = 400000;
      document.getElementById('priceMax').value    = 7000000;
      updateSliderUI();
      filterAndRender();
    }

    /* ============================================================
       HERO SEARCH → jump to listings and apply search
    ============================================================ */
    function heroSearchJump() {
      const val = document.getElementById('heroSearch').value.trim();
      if (val) {
        document.getElementById('searchInput').value = val;
        filterAndRender();
      }
      document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
    }

    // Also trigger on Enter in hero search
    document.getElementById('heroSearch').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') heroSearchJump();
    });

    /* ============================================================
       FAVORITE TOGGLE
    ============================================================ */
    function toggleFav(btn) {
      btn.classList.toggle('liked');
      const icon = btn.querySelector('i');
      if (btn.classList.contains('liked')) {
        icon.className = 'fa-solid fa-heart';
        btn.title = 'Remove from saved';
      } else {
        icon.className = 'fa-regular fa-heart';
        btn.title = 'Save property';
      }
    }

    /* ============================================================
       VIEW TOGGLE (Grid / List)
    ============================================================ */
    function setView(mode) {
      const grid    = document.getElementById('listingsGrid');
      const gridBtn = document.getElementById('gridViewBtn');
      const listBtn = document.getElementById('listViewBtn');

      if (mode === 'list') {
        grid.classList.add('list-view');
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
      } else {
        grid.classList.remove('list-view');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
      }
    }

    /* ============================================================
       CONTACT FORM SUBMIT
    ============================================================ */
    function submitContactForm(e) {
      e.preventDefault();
      const wrap    = document.getElementById('contactFormWrap');
      const success = document.getElementById('formSuccess');
      wrap.style.display    = 'none';
      success.style.display = 'block';
    }

    /* ============================================================
       NAVBAR SCROLL EFFECT
    ============================================================ */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
      document.getElementById('scrollTopBtn').classList.toggle('show', window.scrollY > 400);
    }, { passive: true });

    /* ============================================================
       MOBILE MENU
    ============================================================ */
    function openMobileMenu()  { document.getElementById('mobileMenu').classList.add('open'); }
    function closeMobileMenu() { document.getElementById('mobileMenu').classList.remove('open'); }

    /* ============================================================
       SCROLL REVEAL (Intersection Observer)
    ============================================================ */
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ============================================================
       ANIMATED COUNTERS
    ============================================================ */
    function animateCounter(el) {
      const target   = parseInt(el.dataset.count);
      const duration = 2000;
      const step     = 16;
      const increment = target / (duration / step);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString() + (el.dataset.suffix || '+');
      }, step);
    }

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => {
      el.dataset.suffix = '+';
      counterObserver.observe(el);
    });

    /* ============================================================
       PRICE RANGE SLIDER
    ============================================================ */
    const PRICE_MIN_BOUND = 400000;
    const PRICE_MAX_BOUND = 7000000;

    function formatSliderPrice(val) {
      if (val >= 1000000) {
        const m = val / 1000000;
        return '$' + (Number.isInteger(m) ? m : m.toFixed(1)) + 'M';
      }
      return '$' + (val / 1000).toFixed(0) + 'K';
    }

    function updateSliderUI() {
      const minEl  = document.getElementById('priceMin');
      const maxEl  = document.getElementById('priceMax');
      const fill   = document.getElementById('rangeTrackFill');
      const minD   = document.getElementById('priceMinDisplay');
      const maxD   = document.getElementById('priceMaxDisplay');

      let minVal = parseInt(minEl.value);
      let maxVal = parseInt(maxEl.value);

      /* Prevent handles from crossing */
      if (minVal > maxVal - 50000) {
        if (document.activeElement === minEl) {
          minVal = maxVal - 50000;
          minEl.value = minVal;
        } else {
          maxVal = minVal + 50000;
          maxEl.value = maxVal;
        }
      }

      const range  = PRICE_MAX_BOUND - PRICE_MIN_BOUND;
      const leftPct  = ((minVal - PRICE_MIN_BOUND) / range) * 100;
      const rightPct = ((maxVal - PRICE_MIN_BOUND) / range) * 100;

      fill.style.left  = leftPct  + '%';
      fill.style.width = (rightPct - leftPct) + '%';

      minD.textContent = formatSliderPrice(minVal);
      maxD.textContent = formatSliderPrice(maxVal);
    }

    function onPriceSlider() {
      updateSliderUI();
      filterAndRender();
    }

    /* ============================================================
       INIT — render all listings on page load
    ============================================================ */
    updateSliderUI();
    fetchListings();

