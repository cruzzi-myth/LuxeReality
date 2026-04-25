
    /* ============================================================
       PROPERTY DATA ARRAY
       Each property: id, title, price, bedrooms, bathrooms, sqft,
       type, location, listingDate, image, emoji, gradient, status, featured
    ============================================================ */
    const properties = [
      {
        id:          1,
        title:       "Modern Hillside Villa",
        price:       2850000,
        bedrooms:    5,
        bathrooms:   4,
        sqft:        4200,
        type:        "Villa",
        location:    "Beverly Hills, CA",
        listingDate: "2024-01-15",
        image:       "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        emoji:       "🏡",
        gradient:    "g1",
        status:      "For Sale",
        featured:    true
      },
      {
        id:          2,
        title:       "Downtown Luxury Penthouse",
        price:       4200000,
        bedrooms:    4,
        bathrooms:   3,
        sqft:        3800,
        type:        "Penthouse",
        location:    "Manhattan, NY",
        listingDate: "2024-02-20",
        image:       "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
        emoji:       "🏙️",
        gradient:    "g2",
        status:      "For Sale",
        featured:    false
      },
      {
        id:          3,
        title:       "Beachfront Estate",
        price:       6500000,
        bedrooms:    6,
        bathrooms:   5,
        sqft:        5600,
        type:        "Estate",
        location:    "Malibu, CA",
        listingDate: "2023-11-05",
        image:       "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
        emoji:       "🌊",
        gradient:    "g3",
        status:      "For Sale",
        featured:    true
      },
      {
        id:          4,
        title:       "Contemporary Townhouse",
        price:       875000,
        bedrooms:    3,
        bathrooms:   2,
        sqft:        2100,
        type:        "Townhouse",
        location:    "Austin, TX",
        listingDate: "2024-03-10",
        image:       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
        emoji:       "🏘️",
        gradient:    "g4",
        status:      "For Sale",
        featured:    false
      },
      {
        id:          5,
        title:       "Mountain View Retreat",
        price:       1200000,
        bedrooms:    4,
        bathrooms:   3,
        sqft:        2800,
        type:        "House",
        location:    "Aspen, CO",
        listingDate: "2023-09-22",
        image:       "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        emoji:       "⛰️",
        gradient:    "g5",
        status:      "For Sale",
        featured:    false
      },
      {
        id:          6,
        title:       "Urban Studio Loft",
        price:       425000,
        bedrooms:    1,
        bathrooms:   1,
        sqft:        950,
        type:        "Loft",
        location:    "Chicago, IL",
        listingDate: "2024-04-01",
        image:       "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        emoji:       "🏢",
        gradient:    "g6",
        status:      "For Sale",
        featured:    false
      },
      {
        id:          7,
        title:       "Suburban Family Home",
        price:       650000,
        bedrooms:    4,
        bathrooms:   3,
        sqft:        2600,
        type:        "House",
        location:    "Nashville, TN",
        listingDate: "2023-12-15",
        image:       "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
        emoji:       "🏠",
        gradient:    "g7",
        status:      "For Sale",
        featured:    false
      },
      {
        id:          8,
        title:       "Waterfront Condo",
        price:       1850000,
        bedrooms:    3,
        bathrooms:   2,
        sqft:        1800,
        type:        "Condo",
        location:    "Miami, FL",
        listingDate: "2024-01-28",
        image:       "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80",
        emoji:       "🌅",
        gradient:    "g8",
        status:      "For Sale",
        featured:    false
      },
      {
        id:          9,
        title:       "Historic Brownstone",
        price:       2100000,
        bedrooms:    4,
        bathrooms:   3,
        sqft:        3200,
        type:        "Townhouse",
        location:    "Boston, MA",
        listingDate: "2023-10-11",
        image:       "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        emoji:       "🏛️",
        gradient:    "g9",
        status:      "For Sale",
        featured:    false
      },
      {
        id:          10,
        title:       "Golf Course Mansion",
        price:       3750000,
        bedrooms:    6,
        bathrooms:   5,
        sqft:        5200,
        type:        "Mansion",
        location:    "Scottsdale, AZ",
        listingDate: "2024-02-05",
        image:       "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&w=800&q=80",
        emoji:       "⛳",
        gradient:    "g10",
        status:      "For Sale",
        featured:    true
      }
    ];

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
              <img
                src="${p.image}"
                alt="${p.title}"
                class="prop-real-img"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
              />
              <div class="prop-img-fallback ${p.gradient}">${p.emoji}</div>
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
    renderListings(properties);

