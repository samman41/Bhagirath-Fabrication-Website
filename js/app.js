/* ==========================================================================
   Bhagirath Fabrication PVT. LTD - Main Website Application Logic
   ========================================================================== */

// Initial Seed Data
const DEFAULT_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Modern Villa UPVC Casement Windows',
    category: 'windows',
    location: 'Bharatpur-11, Chitwan',
    description: 'Custom manufactured Nepatop 3-track sliding & casement UPVC windows with 5mm toughened glass.',
    image: 'images/house 1.jpg',
    date: '2026-06-15'
  },
  {
    id: 'proj-2',
    title: 'Luxury Residence UPVC Main Entrance & Doors',
    category: 'doors',
    location: 'Narayangarh, Chitwan',
    description: 'Heavy duty soundproof UPVC main door with multi-point locking system and 2-year warranty hardware.',
    image: 'images/house 2.jpg',
    date: '2026-05-20'
  },
  {
    id: 'proj-3',
    title: 'Commercial Office Soundproof UPVC Partition',
    category: 'partitions',
    location: 'Lions Chowk, Bharatpur',
    description: 'Sleek frosted 5mm glass UPVC wall partition designed for modern office acoustics.',
    image: 'images/house 3.jpg',
    date: '2026-04-10'
  },
  {
    id: 'proj-4',
    title: 'Contemporary Duplex Soundproof UPVC Glazing',
    category: 'windows',
    location: 'Gaindakot, Chitwan',
    description: 'Full house UPVC profile fitting featuring 25-year profile guarantee against UV and weathering.',
    image: 'images/house 4.jpg',
    date: '2026-03-28'
  },
  {
    id: 'proj-5',
    title: 'Royal Villa Double Glazed UPVC Balcony Doors',
    category: 'doors',
    location: 'Bharatpur-4, Chitwan',
    description: 'Premium sliding balcony doors engineered with Nepatop high-grade UPVC profiles.',
    image: 'images/house 5.jpg',
    date: '2026-02-14'
  },
  {
    id: 'proj-6',
    title: 'Interior Living Space UPVC Frame Divider',
    category: 'partitions',
    location: 'Tandi, Chitwan',
    description: 'Aesthetic partition wall integrating transparent 5mm glass panels with gold tone accessories.',
    image: 'images/house 6.jpg',
    date: '2026-01-30'
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
  const data = localStorage.getItem('bhagirath_projects');
  if (!data) {
    localStorage.setItem('bhagirath_projects', JSON.stringify(DEFAULT_PROJECTS));
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
function renderProjects(category = 'all') {
  const container = document.getElementById('galleryContainer');
  if (!container) return;

  const projects = getStoredProjects();
  const filtered = category === 'all' 
    ? projects 
    : projects.filter(p => p.category.toLowerCase() === category.toLowerCase());

  const limit = container.getAttribute('data-limit') ? parseInt(container.getAttribute('data-limit'), 10) : null;
  const toRender = limit ? filtered.slice(0, limit) : filtered;

  if (toRender.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding:50px; color:var(--color-text-muted);">
        <i class="fas fa-images" style="font-size:3rem; margin-bottom:12px; color:var(--color-gold);"></i>
        <p>No projects found in this category yet.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = toRender.map(item => `
    <div class="work-card">
      <div class="work-image-box">
        <img src="${item.image}" alt="${escapeHtml(item.title)}" onerror="this.src='images/house 1.jpg'">
        <span class="work-badge">${escapeHtml(item.category)}</span>
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
}

// Render Customer Reviews & Rating Summary
function renderReviews() {
  const container = document.getElementById('reviewsGrid');
  if (!container) return;

  const allReviews = getStoredReviews();
  const approved = allReviews.filter(r => r.status === 'approved');

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
function handleReviewSubmit(e) {
  e.preventDefault();
  const author = document.getElementById('reviewAuthor').value.trim();
  const location = document.getElementById('reviewLocation').value.trim();
  const service = document.getElementById('reviewService').value.trim();
  const comment = document.getElementById('reviewComment').value.trim();

  if (!author || !comment) {
    showToast('Please fill out your name and review message.', 'warning');
    return;
  }

  const newReview = {
    id: 'rev-' + Date.now(),
    author,
    location: location || 'Bharatpur, Chitwan',
    rating: selectedRating,
    service: service || 'UPVC Windows & Doors',
    comment,
    date: new Date().toISOString().split('T')[0],
    status: 'pending' // Admin must accept
  };

  const reviews = getStoredReviews();
  reviews.unshift(newReview);
  localStorage.setItem('bhagirath_reviews', JSON.stringify(reviews));

  // Trigger cross-tab sync event
  window.dispatchEvent(new Event('storage'));

  closeModal('reviewModal');
  document.getElementById('reviewForm').reset();
  updateStarPickerUI(5);
  selectedRating = 5;

  showToast('✨ Thank you! Your review was submitted and is pending Admin approval.', 'success');
}

// Contact Form Handler
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  const phone = document.getElementById('contactPhone').value.trim();
  const service = document.getElementById('contactService')?.value || 'General Inquiry';
  const message = document.getElementById('contactMessage').value.trim();

  if (!name || !phone || !message) {
    showToast('Please complete all required contact fields.', 'warning');
    return;
  }

  saveInquiry({
    id: 'inq-' + Date.now(),
    type: service,
    name,
    phone,
    details: message,
    date: new Date().toISOString().split('T')[0],
    status: 'pending'
  });

  // Dispatch storage event to sync with open admin portal tabs instantly
  window.dispatchEvent(new Event('storage'));

  // Show inline success banner & toast
  const banner = document.getElementById('contactSuccessBanner');
  if (banner) {
    banner.style.display = 'block';
    setTimeout(() => { banner.style.display = 'none'; }, 8000);
  }

  showToast('✅ Message received! Thank you for reaching out to Bhagirath Fabrication.', 'success');
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
  return str.replace(/[&<>"']/g, function(m) {
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
  const allReviews = getStoredReviews();
  const r = allReviews.find(rev => String(rev.id) === String(reviewId));
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
