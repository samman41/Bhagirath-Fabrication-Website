/* ==========================================================================
   Bhagirath Fabrication PVT. LTD - Main Website Application Logic
   ========================================================================== */

// Initial Seed Data
const DEFAULT_PROJECTS = [
  // --- Houses ---
  {
    id: 'proj-h1',
    title: 'Premium Villa Full UPVC House Fitting',
    category: 'houses',
    location: 'Bharatpur-11, Chitwan',
    description: 'Complete UPVC installation on modern villa featuring 25-year profile guarantee across all openings.',
    image: 'home image/home 1.jpg',
    date: '2026-06-15'
  },
  {
    id: 'proj-h2',
    title: 'Contemporary Duplex UPVC Glazing',
    category: 'houses',
    location: 'Narayangarh, Chitwan',
    description: 'Full-house UPVC fitting for a duplex residence with 5mm toughened glass on every frame.',
    image: 'home image/home 2.jpg',
    date: '2026-05-28'
  },
  {
    id: 'proj-h3',
    title: 'Residential Bungalow UPVC Upgrade',
    category: 'houses',
    location: 'Bharatpur-7, Chitwan',
    description: 'Replaced old aluminium frames with Nepatop UPVC profiles providing superior thermal insulation.',
    image: 'home image/home 3.jpg',
    date: '2026-05-10'
  },
  {
    id: 'proj-h4',
    title: 'Multi-Storey House UPVC Installation',
    category: 'houses',
    location: 'Gaindakot, Chitwan',
    description: 'UPVC windows and doors installed across all floors of a 3-storey residential building.',
    image: 'home image/home 4.jpg',
    date: '2026-04-22'
  },
  {
    id: 'proj-h5',
    title: 'Modern Family Home UPVC Overhaul',
    category: 'houses',
    location: 'Ratnanagar, Chitwan',
    description: 'Elegantly redesigned openings with frosted and clear UPVC glass for privacy and light control.',
    image: 'home image/home 5.jpg',
    date: '2026-03-30'
  },
  {
    id: 'proj-h6',
    title: 'Luxury Estate UPVC Full Package',
    category: 'houses',
    location: 'Bharatpur-4, Chitwan',
    description: 'Premium estate fitted with full-range Nepatop UPVC doors, windows and partition solutions.',
    image: 'home image/house 1.jpg',
    date: '2026-03-15'
  },
  {
    id: 'proj-h7',
    title: 'Residential House UPVC Casement Windows',
    category: 'houses',
    location: 'Bharatpur-12, Chitwan',
    description: 'Custom casement UPVC windows with mosquito mesh fitted on a family residence.',
    image: 'home image/house 3.jpg',
    date: '2026-02-20'
  },
  {
    id: 'proj-h8',
    title: 'Hill-View Villa UPVC Installation',
    category: 'houses',
    location: 'Tandi, Chitwan',
    description: 'Full UPVC glazing on a hill-view residence to maximise natural light while minimising noise.',
    image: 'home image/house 4.jpg',
    date: '2026-02-05'
  },
  {
    id: 'proj-h9',
    title: 'Urban Home UPVC Renovation',
    category: 'houses',
    location: 'Lions Chowk, Bharatpur',
    description: 'Complete renovation of an urban home\'s openings with Nepatop UV-stabilized UPVC profiles.',
    image: 'home image/house 5.jpg',
    date: '2026-01-28'
  },
  {
    id: 'proj-h10',
    title: 'Modern Residence Full UPVC Glazing',
    category: 'houses',
    location: 'Bharatpur-8, Chitwan',
    description: 'Beautiful modern home fitted with complete Nepatop UPVC windows and doors across all floors.',
    image: 'home image/home 66.png',
    date: '2026-07-20'
  },
  {
    id: 'proj-h11',
    title: 'New Build House UPVC Package',
    category: 'houses',
    location: 'Bharatpur-15, Chitwan',
    description: 'Brand new residential construction fitted with full UPVC profile package including 5mm glass fitment.',
    image: 'home image/home 7.png',
    date: '2026-07-26'
  },
  {
    id: 'proj-h12',
    title: 'Contemporary Family Home Installation',
    category: 'houses',
    location: 'Bharatpur-2, Chitwan',
    description: 'Elegant contemporary home with premium Nepatop UPVC windows offering superior thermal and sound insulation.',
    image: 'home image/home 8.png',
    date: '2026-08-02'
  },
  // --- Doors ---
  {
    id: 'proj-d1',
    title: 'Heavy-Duty UPVC Main Entrance Door',
    category: 'doors',
    location: 'Narayangarh, Chitwan',
    description: 'Soundproof UPVC main entrance door with multi-point locking system and 2-year hardware warranty.',
    image: 'Door Image/Door 1.jpeg',
    date: '2026-06-01'
  },
  {
    id: 'proj-d2',
    title: 'Elegant Balcony UPVC Sliding Door',
    category: 'doors',
    location: 'Bharatpur-4, Chitwan',
    description: 'Premium sliding balcony door engineered with heavy-duty Nepatop UPVC profiles and smooth rollers.',
    image: 'Door Image/Door 2.jpeg',
    date: '2026-04-18'
  },
  {
    id: 'proj-d3',
    title: 'Modern UPVC Interior Door',
    category: 'doors',
    location: 'Bharatpur-9, Chitwan',
    description: 'Stylish interior UPVC door with 5mm toughened glass panel and multi-point locking system.',
    image: 'Door Image/Door 33.png',
    date: '2026-07-10'
  },
  {
    id: 'proj-d4',
    title: 'Premium UPVC Main Entrance Door',
    category: 'doors',
    location: 'Ratnanagar, Chitwan',
    description: 'Heavy-duty UPVC main entrance door offering excellent thermal insulation and UV protection.',
    image: 'Door Image/Door 44.png',
    date: '2026-07-18'
  },
  {
    id: 'proj-d5',
    title: 'Luxury UPVC French Door Installation',
    category: 'doors',
    location: 'Narayangarh, Chitwan',
    description: 'Elegant French-style UPVC door with frosted glass, termite-proof and weather-resistant design.',
    image: 'Door Image/Door 55.png',
    date: '2026-07-25'
  },
  // --- Windows ---
  {
    id: 'proj-w1',
    title: 'UPVC 3-Track Sliding Windows',
    category: 'windows',
    location: 'Bharatpur-11, Chitwan',
    description: 'Custom 3-track sliding UPVC windows with 5mm toughened glass and insect mesh screens.',
    image: 'Window Image/window 1.jpeg',
    date: '2026-07-01'
  },
  {
    id: 'proj-w2',
    title: 'Casement UPVC Windows Installation',
    category: 'windows',
    location: 'Gaindakot, Chitwan',
    description: 'Casement UPVC windows fitted with friction stays and dust-proof gasket seals.',
    image: 'Window Image/window 2.jpeg',
    date: '2026-05-15'
  },
  {
    id: 'proj-w3',
    title: 'Commercial Building UPVC Windows',
    category: 'windows',
    location: 'Lions Chowk, Bharatpur',
    description: 'Large-format UPVC windows with tinted 5mm glass installed on a commercial building facade.',
    image: 'Window Image/window 3.jpeg',
    date: '2026-03-10'
  },
  {
    id: 'proj-w4',
    title: 'Premium UPVC Tinted Glass Windows',
    category: 'windows',
    location: 'Bharatpur-5, Chitwan',
    description: 'Large panoramic UPVC windows with premium tinted 5mm glass for heat and glare reduction.',
    image: 'Window Image/window 44.jpg',
    date: '2026-07-30'
  },
  // --- Partitions ---
  {
    id: 'proj-p1',
    title: 'Frosted Glass UPVC Office Partition',
    category: 'partitions',
    location: 'Lions Chowk, Bharatpur',
    description: 'Sleek frosted 5mm glass UPVC wall partition for modern office acoustics and privacy.',
    image: 'Partation Image/Partation 1.jpeg',
    date: '2026-06-20'
  },
  {
    id: 'proj-p2',
    title: 'Commercial Showroom UPVC Partition',
    category: 'partitions',
    location: 'Bharatpur-10, Chitwan',
    description: 'Transparent UPVC glass partition wall dividing a commercial showroom into functional zones.',
    image: 'Partation Image/Partation 2.jpeg',
    date: '2026-05-05'
  },
  {
    id: 'proj-p3',
    title: 'Interior Space UPVC Frame Divider',
    category: 'partitions',
    location: 'Tandi, Chitwan',
    description: 'Aesthetic partition wall integrating transparent 5mm glass panels with gold tone accessories.',
    image: 'Partation Image/Partation 3.jpeg',
    date: '2026-03-25'
  },
  {
    id: 'proj-p4',
    title: 'Home Studio Glass Partition',
    category: 'partitions',
    location: 'Bharatpur-6, Chitwan',
    description: 'Elegant home studio UPVC partition with soundproof glass for a quiet work-from-home space.',
    image: 'Partation Image/house 6.jpg',
    date: '2026-02-12'
  },
  {
    id: 'proj-p5',
    title: 'Modern Office Glass Partition Wall',
    category: 'partitions',
    location: 'Bharatpur-3, Chitwan',
    description: 'Premium full-height UPVC glass partition creating elegant workspace divisions in a corporate office.',
    image: 'Partation Image/Partation 44.png',
    date: '2026-07-28'
  },
  {
    id: 'proj-p6',
    title: 'Showroom UPVC Partition with Gold Trim',
    category: 'partitions',
    location: 'Narayangarh, Chitwan',
    description: 'Sophisticated showroom partition featuring gold-accent UPVC framing and clear 5mm glass panels.',
    image: 'Partation Image/Partation 55.png',
    date: '2026-08-01'
  }
];


const DEFAULT_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Ramesh Sharma',
    location: 'Bharatpur-10',
    rating: 5,
    service: 'UPVC Windows Installation',
    comment: 'Best UPVC windows quality in Chitwan! Installed 3-track sliding windows with 5mm glass. Very sturdy and 25 years profile guarantee gives great peace of mind.',
    date: '2026-07-02',
    status: 'approved'
  },
  {
    id: 'rev-2',
    author: 'Sita Adhikari',
    location: 'Narayangarh',
    rating: 5,
    service: 'UPVC Main Door & Balcony',
    comment: 'Excellent UPVC door installation for our house. Hardware is top quality with 2 years warranty. Highly recommended authorized Nepatop dealer!',
    date: '2026-06-25',
    status: 'approved'
  },
  {
    id: 'rev-3',
    author: 'Bikash Gurung',
    location: 'Ratnanagar',
    rating: 5,
    service: 'Office Glass Partition',
    comment: 'Bhagirath Fabrication did complete UPVC partition work for our new office. Very smooth finishing, prompt delivery, and professional team.',
    date: '2026-06-18',
    status: 'approved'
  }
];

// Centralized Backend URL Configuration
const API_URL = "http://localhost:5000/api";

// Local Caches for Centralized Data
let currentReviews = [];
let currentProjects = [];

// Gallery State
let galleryShowAll = false;
const GALLERY_INITIAL_LIMIT = 6;

// LocalStorage Helpers
function getStoredReviews() {
  const data = localStorage.getItem('bhagirath_reviews');
  if (!data) {
    localStorage.setItem('bhagirath_reviews', JSON.stringify(DEFAULT_REVIEWS));
    return DEFAULT_REVIEWS;
  }
  return JSON.parse(data);
}

function getStoredProjects() {
  const VERSION_KEY = 'bhagirath_projects_v';
  const CURRENT_VERSION = DEFAULT_PROJECTS.length.toString();
  const storedVersion = localStorage.getItem(VERSION_KEY);
  const data = localStorage.getItem('bhagirath_projects');
  // If no data or version mismatch (new images added), reset to defaults
  if (!data || storedVersion !== CURRENT_VERSION) {
    localStorage.setItem('bhagirath_projects', JSON.stringify(DEFAULT_PROJECTS));
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
    return DEFAULT_PROJECTS;
  }
  return JSON.parse(data);
}

function getStoredInquiries() {
  const data = localStorage.getItem('bhagirath_inquiries');
  return data ? JSON.parse(data) : [];
}

function saveInquiry(inquiry) {
  const list = getStoredInquiries();
  list.unshift(inquiry);
  localStorage.setItem('bhagirath_inquiries', JSON.stringify(list));
}

// UI Notification Toast
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let iconClass = 'fa-check-circle';
  if (type === 'warning') iconClass = 'fa-exclamation-triangle';
  if (type === 'danger') iconClass = 'fa-times-circle';

  toast.innerHTML = `
    <i class="fas ${iconClass}"></i>
    <div>
      <strong style="display:block; font-size:0.9rem;">Notification</strong>
      <span style="font-size:0.85rem;">${message}</span>
    </div>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Projects Counter Animation Helper
function animateCounter(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    // Cubic ease-out curve for smooth ending
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(easeProgress * (end - start) + start);
    element.textContent = currentValue.toLocaleString() + '+';
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = end.toLocaleString() + '+';
    }
  };
  window.requestAnimationFrame(step);
}

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Projects Counter Animation
  const counterEl = document.getElementById('projects-counter');
  if (counterEl) {
    animateCounter(counterEl, 0, 2000, 3000);
  }

  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Render Core Data
  renderProjects('all');
  renderReviews();

  // Setup Gallery Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const cat = e.target.getAttribute('data-filter');
      galleryShowAll = false; // Reset to initial 6-image view on tab switch
      renderProjects(cat);
    });
  });

  // Setup Review Star Picker
  setupStarPicker();

  // Setup Review Form Submission
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', handleReviewSubmit);
  }

  // Setup Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }

  // Live Sync across Tabs (Storage Event)
  window.addEventListener('storage', (e) => {
    if (e.key === 'bhagirath_reviews') {
      renderReviews();
    }
    if (e.key === 'bhagirath_projects') {
      const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
      renderProjects(activeFilter);
    }
  });
});

// Render Projects Gallery
async function renderProjects(category = 'all', forceShowAll = null) {
  const container = document.getElementById('galleryContainer');
  const moreBtn = document.getElementById('galleryMoreBtn');
  if (!container) return;

  // Use backend if available, otherwise fall back to defaults
  if (currentProjects.length === 0) {
    try {
      const res = await fetch(`${API_URL}/projects`);
      const data = await res.json();
      if (data.success) {
        currentProjects = data.projects;
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.warn("Backend unavailable, using default/local storage projects:", err);
      currentProjects = DEFAULT_PROJECTS;
    }
  }

  const filtered = category === 'all'
    ? currentProjects
    : currentProjects.filter(p => p.category.toLowerCase() === category.toLowerCase());

  // Determine show state
  if (forceShowAll !== null) galleryShowAll = forceShowAll;
  const toRender = galleryShowAll ? filtered : filtered.slice(0, GALLERY_INITIAL_LIMIT);
  const hasMore = filtered.length > GALLERY_INITIAL_LIMIT;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding:50px; color:var(--color-text-muted);">
        <i class="fas fa-images" style="font-size:3rem; margin-bottom:12px; color:var(--color-gold);"></i>
        <p>No projects found in this category yet.</p>
      </div>
    `;
    if (moreBtn) moreBtn.style.display = 'none';
    return;
  }

  container.innerHTML = toRender.map(item => `
    <div class="work-card">
      <div class="work-image-box">
        <img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy" onerror="this.parentElement.style.background='var(--color-primary-light)'">
        <span class="work-badge work-badge-${item.category}">${getCategoryLabel(item.category)}</span>
        <button class="work-overlay-btn" onclick="openLightbox('${item.image}', '${escapeHtml(item.title)}')">
          <i class="fas fa-expand-alt"></i>
        </button>
      </div>
      <div class="work-details">
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(item.description)}</p>
        <div class="meta">
          <i class="fas fa-map-marker-alt text-gold"></i>
          <span>${escapeHtml(item.location)}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Update the Load More / View All button
  if (moreBtn) {
    if (hasMore) {
      moreBtn.style.display = 'inline-flex';
      moreBtn.innerHTML = `<i class="fas fa-th"></i> View All Images <span class="fgm-count-badge">${filtered.length}</span>`;
      moreBtn.classList.remove('btn-collapse');
    } else {
      moreBtn.style.display = 'none';
    }
  }
}

// Category display label helper
function getCategoryLabel(cat) {
  const labels = {
    houses: '🏠 House',
    windows: '🪟 Window',
    doors: '🚪 Door',
    partitions: '🔲 Partition'
  };
  return labels[cat.toLowerCase()] || cat;
}

// Open the full-screen gallery modal
function openFullGallery(startCategory = 'all') {
  openModal('fullGalleryModal');
  renderFullGallery(startCategory);

  // Set the active tab
  document.querySelectorAll('.fgm-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-cat') === startCategory);
  });

  // Wire up tab clicks
  document.querySelectorAll('.fgm-tab').forEach(tab => {
    tab.onclick = () => {
      document.querySelectorAll('.fgm-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderFullGallery(tab.getAttribute('data-cat'));
    };
  });

  // Scroll gallery panel back to top
  const panel = document.querySelector('.full-gallery-panel');
  if (panel) panel.scrollTop = 0;
}

// Render images inside the full gallery modal
function renderFullGallery(category = 'all') {
  const grid = document.getElementById('fgmGrid');
  const countEl = document.getElementById('fgmCount');
  if (!grid) return;

  const filtered = category === 'all'
    ? currentProjects
    : currentProjects.filter(p => p.category.toLowerCase() === category.toLowerCase());

  if (countEl) {
    const catLabel = category === 'all' ? 'All Categories' : getCategoryLabel(category);
    countEl.textContent = `${filtered.length} project${filtered.length !== 1 ? 's' : ''} · ${catLabel}`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="fgm-empty">
        <i class="fas fa-images"></i>
        <p>No projects found in this category yet.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <div class="fgm-item"
         onclick="openLightbox('${item.image}', '${escapeHtml(item.title)}')"
         title="${escapeHtml(item.title)}">
      <img src="${item.image}"
           alt="${escapeHtml(item.title)}"
           loading="lazy"
           onerror="this.parentElement.classList.add('fgm-item--broken')">
    </div>
  `).join('');
}

window.openFullGallery = openFullGallery;

// Render Customer Reviews & Rating Summary
async function renderReviews() {
  const container = document.getElementById('reviewsGrid');
  if (!container) return;

  try {
    const res = await fetch(`${API_URL}/reviews`);
    const data = await res.json();
    if (data.success) {
      currentReviews = data.reviews;
    } else {
      throw new Error(data.error);
    }
  } catch (err) {
    console.warn("Backend unavailable, using default/local storage reviews:", err);
    currentReviews = getStoredReviews().filter(r => r.status === 'approved');
  }

  const approved = currentReviews;

  // Compute Metrics
  const total = approved.length;
  let avgRating = 5.0;
  const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  if (total > 0) {
    let sum = 0;
    approved.forEach(r => {
      sum += (r.rating || 5);
      const star = Math.min(5, Math.max(1, Math.round(r.rating || 5)));
      starCounts[star] = (starCounts[star] || 0) + 1;
    });
    avgRating = (sum / total).toFixed(1);
  }

  // Update Summary DOM elements
  const scoreNum = document.getElementById('avgRatingNum');
  const totalCountEl = document.getElementById('totalReviewsCount');
  const starsHeader = document.getElementById('starsHeaderDisplay');

  if (scoreNum) scoreNum.textContent = avgRating;
  if (totalCountEl) totalCountEl.textContent = `Based on ${total} verified client review${total === 1 ? '' : 's'}`;

  if (starsHeader) {
    const starVal = Math.round(parseFloat(avgRating));
    starsHeader.innerHTML = getStarHTML(starVal);
  }

  // Render Bar Breakdown
  for (let i = 5; i >= 1; i--) {
    const barEl = document.getElementById(`starBar${i}`);
    const percentEl = document.getElementById(`starPercent${i}`);
    if (barEl && percentEl) {
      const pct = total > 0 ? Math.round((starCounts[i] / total) * 100) : 0;
      barEl.style.width = `${pct}%`;
      percentEl.textContent = `${pct}%`;
    }
  }

  // Render Reviews Grid
  if (total === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--color-text-muted);">
        <p>No published reviews yet. Be the first to share your experience!</p>
      </div>
    `;
    return;
  }

  const limit = container.getAttribute('data-limit') ? parseInt(container.getAttribute('data-limit'), 10) : null;
  const toRender = limit ? approved.slice(0, limit) : approved;

  container.innerHTML = toRender.map(r => `
    <div class="review-card" onclick="showReviewDetails('${r.id}')" style="cursor: pointer;" title="Click to view full review">
      <div>
        <div class="review-header">
          <div class="reviewer-profile">
            <div class="reviewer-avatar">${r.author.charAt(0).toUpperCase()}</div>
            <div class="reviewer-info">
              <h5>${escapeHtml(r.author)}</h5>
              <span>${escapeHtml(r.location)}</span>
            </div>
          </div>
          <span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>
        </div>
        <div class="star-rating-display" style="margin-bottom:10px;">
          ${getStarHTML(r.rating)}
        </div>
        <p class="review-comment">"${escapeHtml(r.comment)}"</p>
      </div>
      <div class="review-footer">
        <span><i class="fas fa-tools text-green"></i> ${escapeHtml(r.service || 'UPVC Work')}</span>
        <span>${r.date || 'Recent'}</span>
      </div>
    </div>
  `).join('');
}

// Interactive Star Picker Logic
let selectedRating = 5;
function setupStarPicker() {
  const stars = document.querySelectorAll('#starPicker i');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.getAttribute('data-value'), 10);
      updateStarPickerUI(selectedRating);
    });
  });
  updateStarPickerUI(5);
}

function updateStarPickerUI(rating) {
  const stars = document.querySelectorAll('#starPicker i');
  stars.forEach((s, idx) => {
    if (idx < rating) {
      s.className = 'fas fa-star active';
    } else {
      s.className = 'far fa-star';
    }
  });
}

// Handle Review Submit (User Submits -> Goes to Pending for Admin)
async function handleReviewSubmit(e) {
  e.preventDefault();
  const author = document.getElementById('reviewAuthor').value.trim();
  const location = document.getElementById('reviewLocation').value.trim();
  const service = document.getElementById('reviewService').value.trim();
  const comment = document.getElementById('reviewComment').value.trim();

  if (!author || !comment) {
    showToast('Please fill out your name and review message.', 'warning');
    return;
  }

  const reviewData = {
    author,
    location: location || 'Bharatpur, Chitwan',
    rating: selectedRating,
    service: service || 'UPVC Windows & Doors',
    comment,
    date: new Date().toISOString().split('T')[0]
  };

  try {
    const res = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewData)
    });
    const data = await res.json();
    if (data.success) {
      showToast('✨ Thank you! Your review was submitted and is pending Admin approval.', 'success');
    } else {
      throw new Error(data.error);
    }
  } catch (err) {
    console.warn("Backend submit failed, falling back to local storage:", err);
    const newReview = {
      id: 'rev-' + Date.now(),
      ...reviewData,
      status: 'pending'
    };
    const reviews = getStoredReviews();
    reviews.unshift(newReview);
    localStorage.setItem('bhagirath_reviews', JSON.stringify(reviews));
    showToast('✨ Submitted locally! (Server offline) Review is pending Admin approval.', 'success');
  }

  closeModal('reviewModal');
  document.getElementById('reviewForm').reset();
  updateStarPickerUI(5);
  selectedRating = 5;

  // Trigger UI updates
  await renderReviews();
}

// Contact Form Handler
async function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  const phone = document.getElementById('contactPhone').value.trim();
  const service = document.getElementById('contactService')?.value || 'General Inquiry';
  const message = document.getElementById('contactMessage').value.trim();

  if (!name || !phone || !message) {
    showToast('Please complete all required contact fields.', 'warning');
    return;
  }

  const inquiryData = {
    type: service,
    name,
    phone,
    details: message,
    date: new Date().toISOString().split('T')[0]
  };

  try {
    const res = await fetch(`${API_URL}/inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inquiryData)
    });
    const data = await res.json();
    if (data.success) {
      showToast('✅ Message received! Thank you for reaching out to Bhagirath Fabrication.', 'success');
    } else {
      throw new Error(data.error);
    }
  } catch (err) {
    console.warn("Backend inquiry failed, falling back to local storage:", err);
    saveInquiry({
      id: 'inq-' + Date.now(),
      ...inquiryData,
      status: 'pending'
    });
    showToast('✅ Message saved locally! (Server offline) Thank you for reaching out.', 'success');
  }

  // Dispatch storage event to sync with open admin portal tabs instantly
  window.dispatchEvent(new Event('storage'));

  // Show inline success banner
  const banner = document.getElementById('contactSuccessBanner');
  if (banner) {
    banner.style.display = 'block';
    setTimeout(() => { banner.style.display = 'none'; }, 8000);
  }

  document.getElementById('contactForm').reset();
}

// WhatsApp Direct Chat with number 9866387790 (Nepal country code 977)
function sendViaWhatsApp() {
  const name = document.getElementById('contactName').value.trim() || 'Client';
  const phone = document.getElementById('contactPhone').value.trim() || '';
  const service = document.getElementById('contactService')?.value || 'UPVC Requirement';
  const message = document.getElementById('contactMessage').value.trim() || 'I am interested in UPVC doors/windows';

  const text = `Namaste Bhagirath Fabrication!%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Interest:* ${encodeURIComponent(service)}%0A*Requirement:* ${encodeURIComponent(message)}`;

  window.open(`https://wa.me/9779866387790?text=${text}`, '_blank');
}

// Modal Helper Functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

// Lightbox Modal Handler
function openLightbox(imgSrc, title) {
  const lightbox = document.getElementById('lightboxModal');
  const imgEl = document.getElementById('lightboxImg');
  const titleEl = document.getElementById('lightboxTitle');
  if (lightbox && imgEl) {
    imgEl.src = imgSrc;
    if (titleEl) titleEl.textContent = title;
    lightbox.classList.add('active');
  }
}

// Bind to window for inline onclick handlers
window.openModal = openModal;
window.closeModal = closeModal;
window.openLightbox = openLightbox;
window.sendViaWhatsApp = sendViaWhatsApp;
window.openDetailsModal = openDetailsModal;
window.showSpecDetails = showSpecDetails;
window.showReviewDetails = showReviewDetails;

// Helper Utilities
function getStarHTML(rating) {
  const r = Math.min(5, Math.max(1, Math.round(rating || 5)));
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= r) {
      html += '<i class="fas fa-star"></i>';
    } else {
      html += '<i class="far fa-star"></i>';
    }
  }
  return html;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function (m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}

// Single Specifications Dictionary
const SPECIFICATIONS = {
  profile: {
    title: "25 Years Profile Guarantee",
    icon: "fa-shield-halved",
    description: "High quality Nepatop UPVC profiles engineered to withstand extreme sunlight, rain, and humidity without yellowing, cracking, or warping under Nepal's severe climate conditions."
  },
  hardware: {
    title: "2 Years Hardware Warranty",
    icon: "fa-wrench",
    description: "Comprehensive 2-year warranty on heavy duty rollers, locks, hinges, and ergonomic handles for smooth long-term operation. Covers replacement of functional components."
  },
  glass: {
    title: "5 mm Glass Fitment",
    icon: "fa-layer-group",
    description: "We install 5mm premium grade toughened single or double glazed float glass (available in Clear, Tinted, Frosted Privacy, or Double Glazed options) providing acoustic soundproofing."
  },
  brand: {
    title: "Authentic Nepali Brand",
    icon: "fa-flag",
    description: "Proudly authorized dealer of NEPATOP—Nepal's premier manufacturing brand trusted across residential and commercial builds. Extruded standards ensure dust-proof and rain-tight sealing."
  }
};

// Reusable Details Modal Functions
function openDetailsModal(htmlContent) {
  const modal = document.getElementById('detailsModal');
  const contentContainer = document.getElementById('detailsModalContent');
  if (modal && contentContainer) {
    contentContainer.innerHTML = htmlContent;
    modal.classList.add('active');
  }
}

function showSpecDetails(key) {
  const spec = SPECIFICATIONS[key];
  if (!spec) return;
  const html = `
    <div style="text-align: center; padding: 10px;">
      <div style="width: 70px; height: 70px; border-radius: 50%; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 20px auto;">
        <i class="fas ${spec.icon} text-gold"></i>
      </div>
      <h3 style="color: var(--color-primary); margin-bottom: 12px; font-size: 1.5rem;">${spec.title}</h3>
      <p style="color: var(--color-text-muted); font-size: 1rem; line-height: 1.6; margin-bottom: 20px;">${spec.description}</p>
      <button onclick="closeModal('detailsModal')" class="btn btn-primary btn-sm">Close</button>
    </div>
  `;
  openDetailsModal(html);
}

function showReviewDetails(reviewId) {
  const r = currentReviews.find(rev => String(rev.id) === String(reviewId));
  if (!r) return;

  const html = `
    <div style="padding: 10px;">
      <div class="review-header" style="margin-bottom: 16px;">
        <div class="reviewer-profile">
          <div class="reviewer-avatar">${r.author.charAt(0).toUpperCase()}</div>
          <div class="reviewer-info">
            <h5 style="margin: 0; font-size: 1.1rem; color: var(--color-text-main);">${escapeHtml(r.author)}</h5>
            <span style="font-size: 0.8rem; color: var(--color-text-muted);">${escapeHtml(r.location)}</span>
          </div>
        </div>
        <span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>
      </div>
      <div class="star-rating-display" style="margin-bottom: 14px; font-size: 1.3rem;">
        ${getStarHTML(r.rating)}
      </div>
      <p style="color: var(--color-text-main); font-size: 1.05rem; line-height: 1.6; font-style: italic; margin-bottom: 20px;">
        "${escapeHtml(r.comment)}"
      </p>
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--bg-tertiary); padding-top: 14px; font-size: 0.85rem; color: var(--color-text-light);">
        <span><i class="fas fa-tools text-green"></i> ${escapeHtml(r.service || 'UPVC Work')}</span>
        <span>${r.date || 'Recent'}</span>
      </div>
      <div style="text-align: center; margin-top: 24px;">
        <button onclick="closeModal('detailsModal')" class="btn btn-primary btn-sm">Close</button>
      </div>
    </div>
  `;
  openDetailsModal(html);
}
