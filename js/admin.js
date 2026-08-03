/* ==========================================================================
   Bhagirath Fabrication PVT. LTD - Admin Portal Engine
   ========================================================================== */

// Auth State
let isAdminAuthenticated = false;

// Passcode (PIN) - Updated to bhagirath2026
const ADMIN_PIN = "bhagirath2026";

// Centralized Backend URL Configuration
const API_URL = "http://localhost:5000/api";

// Fetch options builder including admin headers
function getAdminHeaders() {
  const pin = sessionStorage.getItem('bhagirath_admin_pin') || ADMIN_PIN;
  return {
    'Content-Type': 'application/json',
    'x-admin-pin': pin
  };
}

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
async function handleLogin(e) {
  if (e) e.preventDefault();
  const inputPin = document.getElementById('adminPinInput').value.trim();
  const errEl = document.getElementById('loginErrorMsg');

  try {
    const res = await fetch(`${API_URL}/admin/verify-pin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin: inputPin })
    });
    const data = await res.json();
    if (data.success) {
      isAdminAuthenticated = true;
      sessionStorage.setItem('bhagirath_admin_auth', 'true');
      sessionStorage.setItem('bhagirath_admin_pin', inputPin);
      showAdminDashboard();
      showToast('Authenticated successfully. Welcome Admin!', 'success');
    } else {
      throw new Error(data.error);
    }
  } catch (err) {
    console.warn("Backend pin verification failed, using local authentication:", err);
    if (inputPin === ADMIN_PIN) {
      isAdminAuthenticated = true;
      sessionStorage.setItem('bhagirath_admin_auth', 'true');
      sessionStorage.setItem('bhagirath_admin_pin', inputPin);
      showAdminDashboard();
      showToast('Authenticated locally. Welcome Admin!', 'success');
    } else {
      if (errEl) errEl.style.display = 'block';
      showToast('Invalid Passcode. Passcode is "bhagirath2026"', 'danger');
    }
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
async function refreshAdminData() {
  await renderStats();
  await renderAdminReviews();
  await renderAdminProjects();
  await renderAdminInquiries();
}

// Render Dashboard Stat Cards
async function renderStats() {
  let stats = {
    pendingReviews: 0,
    approvedReviews: 0,
    projects: 0,
    inquiries: 0
  };

  try {
    const res = await fetch(`${API_URL}/admin/stats`, {
      headers: getAdminHeaders()
    });
    const data = await res.json();
    if (data.success) {
      stats = data.stats;
    } else {
      throw new Error(data.error);
    }
  } catch (err) {
    console.warn("Could not fetch server stats, calculating from local storage:", err);
    const reviews = JSON.parse(localStorage.getItem('bhagirath_reviews') || '[]');
    const projects = JSON.parse(localStorage.getItem('bhagirath_projects') || '[]');
    const inquiries = JSON.parse(localStorage.getItem('bhagirath_inquiries') || '[]');
    stats = {
      pendingReviews: reviews.filter(r => r.status === 'pending').length,
      approvedReviews: reviews.filter(r => r.status === 'approved').length,
      projects: projects.length,
      inquiries: inquiries.length
    };
  }

  const pCount = document.getElementById('statPendingCount');
  const aCount = document.getElementById('statApprovedCount');
  const prCount = document.getElementById('statProjectCount');
  const inqCount = document.getElementById('statInquiryCount');

  if (pCount) pCount.textContent = stats.pendingReviews;
  if (aCount) aCount.textContent = stats.approvedReviews;
  if (prCount) prCount.textContent = stats.projects;
  if (inqCount) inqCount.textContent = stats.inquiries;

  // Nav badges
  const pendingBadge = document.getElementById('pendingNavBadge');
  if (pendingBadge) {
    pendingBadge.textContent = stats.pendingReviews;
    pendingBadge.style.display = stats.pendingReviews > 0 ? 'inline-block' : 'none';
  }
}

// Render Reviews Moderation Table (ACCEPT / DECLINE Actions)
async function renderAdminReviews() {
  const container = document.getElementById('adminReviewsTableBody');
  if (!container) return;

  const filterVal = document.getElementById('reviewStatusFilter')?.value || 'all';
  let reviews = [];

  try {
    const res = await fetch(`${API_URL}/admin/reviews?status=${filterVal}`, {
      headers: getAdminHeaders()
    });
    const data = await res.json();
    if (data.success) {
      reviews = data.reviews;
    } else {
      throw new Error(data.error);
    }
  } catch (err) {
    console.warn("Failed to fetch admin reviews, using local storage:", err);
    const localReviews = JSON.parse(localStorage.getItem('bhagirath_reviews') || '[]');
    reviews = filterVal === 'all' 
      ? localReviews 
      : localReviews.filter(r => r.status === filterVal);
  }

  if (reviews.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; padding:30px; color:var(--color-text-muted);">
          No customer reviews match the selected filter.
        </td>
      </tr>
    `;
    return;
  }

  container.innerHTML = reviews.map(r => `
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
async function updateReviewStatus(reviewId, newStatus) {
  try {
    const res = await fetch(`${API_URL}/admin/reviews/${reviewId}/status`, {
      method: 'PUT',
      headers: getAdminHeaders(),
      body: JSON.stringify({ status: newStatus })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error);

    if (newStatus === 'approved') {
      showToast('✅ Review ACCEPTED! It is now published live on the main website.', 'success');
    } else {
      showToast('⚠️ Review DECLINED.', 'warning');
    }
  } catch (err) {
    console.warn("Failed to update status on server, falling back to local storage:", err);
    let reviews = JSON.parse(localStorage.getItem('bhagirath_reviews') || '[]');
    const idx = reviews.findIndex(r => String(r.id) === String(reviewId));
    if (idx !== -1) {
      reviews[idx].status = newStatus;
      localStorage.setItem('bhagirath_reviews', JSON.stringify(reviews));
      if (newStatus === 'approved') {
        showToast('✅ Review ACCEPTED locally. (Server offline)', 'success');
      } else {
        showToast('⚠️ Review DECLINED locally. (Server offline)', 'warning');
      }
    }
  }

  // Dispatch event to update main website tab in real time
  window.dispatchEvent(new Event('storage'));
  await refreshAdminData();
}

// Delete Review
async function deleteReview(reviewId) {
  try {
    const res = await fetch(`${API_URL}/admin/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: getAdminHeaders()
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    showToast('Review deleted permanently.', 'warning');
  } catch (err) {
    console.warn("Failed to delete review on server, falling back to local storage:", err);
    let reviews = JSON.parse(localStorage.getItem('bhagirath_reviews') || '[]');
    reviews = reviews.filter(r => String(r.id) !== String(reviewId));
    localStorage.setItem('bhagirath_reviews', JSON.stringify(reviews));
    showToast('Review deleted permanently from local storage.', 'warning');
  }

  window.dispatchEvent(new Event('storage'));
  await refreshAdminData();
}

// Render Admin Portfolio / Work Grid
async function renderAdminProjects() {
  const container = document.getElementById('adminProjectsGrid');
  if (!container) return;

  let projects = [];
  try {
    const res = await fetch(`${API_URL}/projects`);
    const data = await res.json();
    if (data.success) {
      projects = data.projects;
    } else {
      throw new Error(data.error);
    }
  } catch (err) {
    console.warn("Failed to fetch admin projects, using local storage:", err);
    projects = JSON.parse(localStorage.getItem('bhagirath_projects') || '[]');
  }

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

  async function saveAndRender(imageDataUrl) {
    const projectData = {
      title,
      category,
      location,
      description,
      image: imageDataUrl,
      date: new Date().toISOString().split('T')[0]
    };

    try {
      const res = await fetch(`${API_URL}/admin/projects`, {
        method: 'POST',
        headers: getAdminHeaders(),
        body: JSON.stringify(projectData)
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      showToast('🎨 New project added to Our Work section!', 'success');
    } catch (err) {
      console.warn("Failed to upload project to server, falling back to local storage:", err);
      const projects = JSON.parse(localStorage.getItem('bhagirath_projects') || '[]');
      const newProj = {
        id: 'proj-' + Date.now(),
        ...projectData
      };
      projects.unshift(newProj);
      localStorage.setItem('bhagirath_projects', JSON.stringify(projects));
      showToast('🎨 Project saved locally. (Server offline)', 'success');
    }

    // Dispatch event to update main website tab in real time
    window.dispatchEvent(new Event('storage'));

    document.getElementById('addProjectForm').reset();
    closeModal('addProjectModal');
    await refreshAdminData();
  }

  // Handle uploaded file if present
  if (fileInput && fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = async function(evt) {
      await saveAndRender(evt.target.result);
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else if (urlInput) {
    saveAndRender(urlInput);
  } else {
    saveAndRender('images/house 1.jpg');
  }
}

// Delete Project Handler (Instant non-blocking delete)
async function deleteProject(projId) {
  try {
    const res = await fetch(`${API_URL}/admin/projects/${projId}`, {
      method: 'DELETE',
      headers: getAdminHeaders()
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    showToast('Project removed from portfolio successfully.', 'warning');
  } catch (err) {
    console.warn("Failed to delete project on server, falling back to local storage:", err);
    let projects = JSON.parse(localStorage.getItem('bhagirath_projects') || '[]');
    projects = projects.filter(p => String(p.id) !== String(projId));
    localStorage.setItem('bhagirath_projects', JSON.stringify(projects));
    showToast('Project removed locally. (Server offline)', 'warning');
  }

  // Trigger cross-tab update
  window.dispatchEvent(new Event('storage'));

  await refreshAdminData();
}

// Render Inquiries Inbox
async function renderAdminInquiries() {
  const container = document.getElementById('adminInquiriesTableBody');
  if (!container) return;

  let inquiries = [];
  try {
    const res = await fetch(`${API_URL}/admin/inquiries`, {
      headers: getAdminHeaders()
    });
    const data = await res.json();
    if (data.success) {
      inquiries = data.inquiries;
    } else {
      throw new Error(data.error);
    }
  } catch (err) {
    console.warn("Failed to fetch inquiries from server, using local storage:", err);
    inquiries = JSON.parse(localStorage.getItem('bhagirath_inquiries') || '[]');
  }

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

async function markInquiryDone(inqId) {
  try {
    const res = await fetch(`${API_URL}/admin/inquiries/${inqId}/done`, {
      method: 'PUT',
      headers: getAdminHeaders()
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    showToast('Inquiry marked as completed/done.', 'success');
  } catch (err) {
    console.warn("Failed to mark inquiry done on server, falling back to local storage:", err);
    let inquiries = JSON.parse(localStorage.getItem('bhagirath_inquiries') || '[]');
    const idx = inquiries.findIndex(i => String(i.id) === String(inqId));
    if (idx !== -1) {
      inquiries[idx].status = 'done';
      localStorage.setItem('bhagirath_inquiries', JSON.stringify(inquiries));
      showToast('Inquiry marked done locally. (Server offline)', 'success');
    }
  }
  await refreshAdminData();
}

async function deleteInquiry(inqId) {
  try {
    const res = await fetch(`${API_URL}/admin/inquiries/${inqId}`, {
      method: 'DELETE',
      headers: getAdminHeaders()
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    showToast('Inquiry cleared.', 'warning');
  } catch (err) {
    console.warn("Failed to delete inquiry on server, falling back to local storage:", err);
    let inquiries = JSON.parse(localStorage.getItem('bhagirath_inquiries') || '[]');
    inquiries = inquiries.filter(i => String(i.id) !== String(inqId));
    localStorage.setItem('bhagirath_inquiries', JSON.stringify(inquiries));
    showToast('Inquiry cleared locally. (Server offline)', 'warning');
  }
  await refreshAdminData();
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
