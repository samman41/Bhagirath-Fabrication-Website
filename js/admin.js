/* ==========================================================================
   Bhagirath Fabrication PVT. LTD - Admin Portal Engine
   ========================================================================== */

// Auth State
let isAdminAuthenticated = false;

// Passcode (PIN) - Updated to bhagirath2026
const ADMIN_PIN = "bhagirath2026";

document.addEventListener('DOMContentLoaded', () => {
  // Check session storage
  if (sessionStorage.getItem('bhagirath_admin_auth') === 'true') {
    isAdminAuthenticated = true;
    showAdminDashboard();
  } else {
    showLoginForm();
  }

  // Setup Auth Events
  const loginForm = document.getElementById('adminLoginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  const demoLoginBtn = document.getElementById('demoLoginBtn');
  if (demoLoginBtn) {
    demoLoginBtn.addEventListener('click', () => {
      document.getElementById('adminPinInput').value = ADMIN_PIN;
      handleLogin(new Event('submit'));
    });
  }

  const logoutBtn = document.getElementById('adminLogoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  // Setup Navigation Tabs
  const tabBtns = document.querySelectorAll('.admin-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(tabId);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // Setup Add Project Form & File Reader
  const addProjectForm = document.getElementById('addProjectForm');
  if (addProjectForm) {
    addProjectForm.addEventListener('submit', handleAddProject);
  }

  // Review Status Filter Listener
  const reviewStatusFilter = document.getElementById('reviewStatusFilter');
  if (reviewStatusFilter) {
    reviewStatusFilter.addEventListener('change', () => {
      renderAdminReviews();
    });
  }

  // Storage Listener for live sync
  window.addEventListener('storage', () => {
    if (isAdminAuthenticated) {
      refreshAdminData();
    }
  });
});

// Auth Handlers
function handleLogin(e) {
  if (e) e.preventDefault();
  const inputPin = document.getElementById('adminPinInput').value.trim();
  const errEl = document.getElementById('loginErrorMsg');

  if (inputPin === ADMIN_PIN) {
    isAdminAuthenticated = true;
    sessionStorage.setItem('bhagirath_admin_auth', 'true');
    showAdminDashboard();
    showToast('Authenticated successfully. Welcome Admin!', 'success');
  } else {
    if (errEl) errEl.style.display = 'block';
    showToast('Invalid Passcode. Passcode is "bhagirath2026"', 'danger');
  }
}

function handleLogout() {
  isAdminAuthenticated = false;
  sessionStorage.removeItem('bhagirath_admin_auth');
  showLoginForm();
  showToast('Logged out of Admin Portal.', 'warning');
}

function showLoginForm() {
  const loginCard = document.getElementById('adminLoginCard');
  const mainLayout = document.getElementById('adminMainLayout');
  if (loginCard) loginCard.style.display = 'block';
  if (mainLayout) mainLayout.style.display = 'none';
}

function showAdminDashboard() {
  const loginCard = document.getElementById('adminLoginCard');
  const mainLayout = document.getElementById('adminMainLayout');
  if (loginCard) loginCard.style.display = 'none';
  if (mainLayout) mainLayout.style.display = 'block';
  refreshAdminData();
}

// Refresh Data Renderers
function refreshAdminData() {
  renderStats();
  renderAdminReviews();
  renderAdminProjects();
  renderAdminInquiries();
}

// Render Dashboard Stat Cards
function renderStats() {
  const reviews = JSON.parse(localStorage.getItem('bhagirath_reviews') || '[]');
  const projects = JSON.parse(localStorage.getItem('bhagirath_projects') || '[]');
  const inquiries = JSON.parse(localStorage.getItem('bhagirath_inquiries') || '[]');

  const pendingCount = reviews.filter(r => r.status === 'pending').length;
  const approvedCount = reviews.filter(r => r.status === 'approved').length;

  const pCount = document.getElementById('statPendingCount');
  const aCount = document.getElementById('statApprovedCount');
  const prCount = document.getElementById('statProjectCount');
  const inqCount = document.getElementById('statInquiryCount');

  if (pCount) pCount.textContent = pendingCount;
  if (aCount) aCount.textContent = approvedCount;
  if (prCount) prCount.textContent = projects.length;
  if (inqCount) inqCount.textContent = inquiries.length;

  // Nav badges
  const pendingBadge = document.getElementById('pendingNavBadge');
  if (pendingBadge) {
    pendingBadge.textContent = pendingCount;
    pendingBadge.style.display = pendingCount > 0 ? 'inline-block' : 'none';
  }
}

// Render Reviews Moderation Table (ACCEPT / DECLINE Actions)
function renderAdminReviews() {
  const container = document.getElementById('adminReviewsTableBody');
  if (!container) return;

  const reviews = JSON.parse(localStorage.getItem('bhagirath_reviews') || '[]');
  const filterVal = document.getElementById('reviewStatusFilter')?.value || 'all';

  const filtered = filterVal === 'all' 
    ? reviews 
    : reviews.filter(r => r.status === filterVal);

  if (filtered.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; padding:30px; color:var(--color-text-muted);">
          No customer reviews match the selected filter.
        </td>
      </tr>
    `;
    return;
  }

  container.innerHTML = filtered.map(r => `
    <tr>
      <td>
        <div style="font-weight:700;">${escapeHtml(r.author)}</div>
        <div style="font-size:0.8rem; color:var(--color-text-muted);">${escapeHtml(r.location)}</div>
      </td>
      <td>
        <div style="color:var(--color-gold); font-size:0.9rem;">
          ${getStarHTML(r.rating)}
        </div>
        <span style="font-size:0.8rem; font-weight:700;">${r.rating} / 5</span>
      </td>
      <td>
        <div style="max-width:280px; font-size:0.875rem; line-height:1.4;">
          "${escapeHtml(r.comment)}"
        </div>
        <div style="font-size:0.75rem; color:var(--color-primary); font-weight:600; margin-top:4px;">
          <i class="fas fa-tools"></i> ${escapeHtml(r.service || 'UPVC Work')}
        </div>
      </td>
      <td style="font-size:0.85rem; color:var(--color-text-muted);">${r.date || 'N/A'}</td>
      <td>
        <span class="status-badge ${r.status}">
          ${r.status.toUpperCase()}
        </span>
      </td>
      <td>
        <div class="action-btns">
          ${r.status !== 'approved' ? `
            <button class="btn btn-sm btn-primary" onclick="updateReviewStatus('${r.id}', 'approved')" title="Accept & Publish to Website">
              <i class="fas fa-check"></i> Accept
            </button>
          ` : ''}
          
          ${r.status !== 'rejected' ? `
            <button class="btn btn-sm btn-outline" style="color:var(--color-danger); border-color:var(--color-danger);" onclick="updateReviewStatus('${r.id}', 'rejected')" title="Decline Review">
              <i class="fas fa-times"></i> Decline
            </button>
          ` : ''}

          <button class="btn btn-sm btn-outline" onclick="deleteReview('${r.id}')" title="Delete Permanent">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Update Review Status (Accept / Decline Handler)
function updateReviewStatus(reviewId, newStatus) {
  let reviews = JSON.parse(localStorage.getItem('bhagirath_reviews') || '[]');
  const idx = reviews.findIndex(r => r.id === reviewId);
  if (idx !== -1) {
    reviews[idx].status = newStatus;
    localStorage.setItem('bhagirath_reviews', JSON.stringify(reviews));

    // Dispatch event to update main website tab in real time
    window.dispatchEvent(new Event('storage'));

    refreshAdminData();

    if (newStatus === 'approved') {
      showToast('✅ Review ACCEPTED! It is now published live on the main website.', 'success');
    } else {
      showToast('⚠️ Review DECLINED.', 'warning');
    }
  }
}

// Delete Review
function deleteReview(reviewId) {
  let reviews = JSON.parse(localStorage.getItem('bhagirath_reviews') || '[]');
  reviews = reviews.filter(r => r.id !== reviewId);
  localStorage.setItem('bhagirath_reviews', JSON.stringify(reviews));

  window.dispatchEvent(new Event('storage'));
  refreshAdminData();
  showToast('Review deleted permanently.', 'warning');
}

// Render Admin Portfolio / Work Grid
function renderAdminProjects() {
  const container = document.getElementById('adminProjectsGrid');
  if (!container) return;

  const projects = JSON.parse(localStorage.getItem('bhagirath_projects') || '[]');

  if (projects.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--color-text-muted);">
        No projects in gallery. Add a new work item using the form above!
      </div>
    `;
    return;
  }

  container.innerHTML = projects.map(p => `
    <div class="work-card" style="box-shadow: var(--shadow-sm);">
      <div class="work-image-box">
        <img src="${p.image}" alt="${escapeHtml(p.title)}" onerror="this.src='images/house 1.jpg'">
        <span class="work-badge">${escapeHtml(p.category)}</span>
      </div>
      <div class="work-details">
        <h4>${escapeHtml(p.title)}</h4>
        <p>${escapeHtml(p.description)}</p>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px;">
          <span style="font-size:0.8rem; color:var(--color-primary); font-weight:600;">
            <i class="fas fa-map-marker-alt"></i> ${escapeHtml(p.location)}
          </span>
          <button type="button" class="btn btn-sm btn-outline" style="color:var(--color-danger); border-color:var(--color-danger); cursor:pointer;" onclick="deleteProject('${p.id}')">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Add New Project (Supports File Upload via FileReader DataURL or URL string)
function handleAddProject(e) {
  e.preventDefault();
  const title = document.getElementById('projTitle').value.trim();
  const category = document.getElementById('projCategory').value;
  const location = document.getElementById('projLocation').value.trim();
  const description = document.getElementById('projDescription').value.trim();
  const fileInput = document.getElementById('projFile');
  const urlInput = document.getElementById('projUrl').value.trim();

  if (!title || !location || !description) {
    showToast('Please fill out title, location, and description.', 'warning');
    return;
  }

  function saveAndRender(imageDataUrl) {
    const projects = JSON.parse(localStorage.getItem('bhagirath_projects') || '[]');
    const newProj = {
      id: 'proj-' + Date.now(),
      title,
      category,
      location,
      description,
      image: imageDataUrl,
      date: new Date().toISOString().split('T')[0]
    };

    projects.unshift(newProj);
    localStorage.setItem('bhagirath_projects', JSON.stringify(projects));

    // Dispatch event to update main website tab in real time
    window.dispatchEvent(new Event('storage'));

    document.getElementById('addProjectForm').reset();
    closeModal('addProjectModal');
    refreshAdminData();
    showToast('🎨 New project added to Our Work section!', 'success');
  }

  // Handle uploaded file if present
  if (fileInput && fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      saveAndRender(evt.target.result);
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else if (urlInput) {
    saveAndRender(urlInput);
  } else {
    saveAndRender('images/house 1.jpg');
  }
}

// Delete Project Handler (Instant non-blocking delete)
function deleteProject(projId) {
  let projects = JSON.parse(localStorage.getItem('bhagirath_projects') || '[]');
  projects = projects.filter(p => String(p.id) !== String(projId));
  localStorage.setItem('bhagirath_projects', JSON.stringify(projects));

  // Trigger cross-tab update
  window.dispatchEvent(new Event('storage'));

  refreshAdminData();
  showToast('Project removed from portfolio successfully.', 'warning');
}

// Render Inquiries Inbox
function renderAdminInquiries() {
  const container = document.getElementById('adminInquiriesTableBody');
  if (!container) return;

  const inquiries = JSON.parse(localStorage.getItem('bhagirath_inquiries') || '[]');

  if (inquiries.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; padding:30px; color:var(--color-text-muted);">
          No customer inquiries received yet.
        </td>
      </tr>
    `;
    return;
  }

  container.innerHTML = inquiries.map(inq => `
    <tr>
      <td style="font-weight:700; color:var(--color-primary);">${escapeHtml(inq.type || 'Inquiry')}</td>
      <td>
        <div style="font-weight:700;">${escapeHtml(inq.name)}</div>
        <div style="font-size:0.85rem; color:var(--color-text-muted);">
          <i class="fas fa-phone"></i> ${escapeHtml(inq.phone)}
        </div>
      </td>
      <td style="max-width:350px; font-size:0.875rem;">${escapeHtml(inq.details)}</td>
      <td style="font-size:0.85rem; color:var(--color-text-muted);">${inq.date || 'Recent'}</td>
      <td>
        <span class="status-badge ${inq.status || 'pending'}">
          ${(inq.status || 'pending').toUpperCase()}
        </span>
      </td>
      <td>
        <div class="action-btns">
          ${(inq.status || 'pending') !== 'done' ? `
            <button class="btn btn-sm btn-primary" onclick="markInquiryDone('${inq.id}')" title="Mark as Visited/Done">
              <i class="fas fa-check"></i> Done
            </button>
          ` : ''}
          <button class="btn btn-sm btn-outline" style="color:var(--color-danger); border-color:var(--color-danger);" onclick="deleteInquiry('${inq.id}')" title="Delete Permanent">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function markInquiryDone(inqId) {
  let inquiries = JSON.parse(localStorage.getItem('bhagirath_inquiries') || '[]');
  const idx = inquiries.findIndex(i => String(i.id) === String(inqId));
  if (idx !== -1) {
    inquiries[idx].status = 'done';
    localStorage.setItem('bhagirath_inquiries', JSON.stringify(inquiries));
    refreshAdminData();
    showToast('Inquiry marked as completed/done.', 'success');
  }
}

function deleteInquiry(inqId) {
  let inquiries = JSON.parse(localStorage.getItem('bhagirath_inquiries') || '[]');
  inquiries = inquiries.filter(i => String(i.id) !== String(inqId));
  localStorage.setItem('bhagirath_inquiries', JSON.stringify(inquiries));
  refreshAdminData();
  showToast('Inquiry cleared.', 'warning');
}

// Global functions binding
window.updateReviewStatus = updateReviewStatus;
window.deleteReview = deleteReview;
window.deleteProject = deleteProject;
window.deleteInquiry = deleteInquiry;
window.markInquiryDone = markInquiryDone;
window.openModal = openModal;
window.closeModal = closeModal;

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

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas fa-info-circle"></i>
    <div>
      <strong style="display:block; font-size:0.9rem;">Admin Panel</strong>
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
