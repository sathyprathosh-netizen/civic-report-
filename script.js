// ==================== APP STATE ====================
const State = {
  currentUser: null,
  currentRole: 'citizen',
  currentPage: 'dashboard',
  currentFilter: 'All',
  searchQuery: '',
  issues: [],
  announcements: [],
  editingImage: null,
};

// ==================== SAMPLE DATA ====================
const SAMPLE_ISSUES = [
  {
    id: 1,
    title: 'Deep Pothole on Anna Salai Near Gemini Flyover',
    desc: 'A large and dangerous pothole has formed near the Gemini Flyover junction. It spans nearly 2 feet and poses serious risk to two-wheelers. Multiple accidents have already been reported.',
    category: 'Road',
    status: 'Open',
    location: 'Anna Salai, Chennai',
    landmark: 'Near Gemini Flyover',
    author: 'Priya Venkat',
    authorId: 'priya',
    date: '2 hours ago',
    icon: 'road',
    comments: [
      { author: 'Ravi M', text: 'I almost fell here yesterday on my bike!', time: '1 hour ago', avatar: '#1E90FF' },
      { author: 'Sunita K', text: 'Raised request with BBMP, awaiting response.', time: '45 min ago', avatar: '#00C896' },
    ],
    contributors: [{ name: 'Ravi M', role: 'Confirmed', color: '#1E90FF' }, { name: 'Sunita K', role: 'Escalated', color: '#00C896' }],
    helpers: 3,
    priority: 'High',
  },
  {
    id: 2,
    title: 'Overflowing Garbage Bin at T. Nagar Bus Stand',
    desc: 'The garbage bin near the main bus stand has not been cleared for over 4 days. Waste is spilling onto the footpath and creating health hazards for commuters.',
    category: 'Garbage',
    status: 'In Progress',
    location: 'T. Nagar, Chennai',
    landmark: 'T. Nagar Bus Stand',
    author: 'Karthik S',
    authorId: 'karthik',
    date: '5 hours ago',
    icon: 'delete_sweep',
    comments: [
      { author: 'Meena L', text: 'Contacted GCC, they said they will send a truck by evening.', time: '2 hours ago', avatar: '#FFB347' },
    ],
    contributors: [{ name: 'Meena L', role: 'Contacted GCC', color: '#FFB347' }],
    helpers: 2,
    priority: 'High',
  },
  {
    id: 3,
    title: 'Water Logging on OMR During Rain',
    desc: 'The stretch near Perungudi junction on OMR gets severely waterlogged during every rain. Drainage has been blocked for months. The water level reaches knee height making it impassable.',
    category: 'Water',
    status: 'Open',
    location: 'OMR, Perungudi',
    landmark: 'Perungudi Junction',
    author: 'Deepa R',
    authorId: 'deepa',
    date: '1 day ago',
    icon: 'water_drop',
    comments: [],
    contributors: [],
    helpers: 7,
    priority: 'High',
  },
  {
    id: 4,
    title: 'Street Light Out for 3 Weeks — Safety Issue',
    desc: 'Three consecutive streetlights on the road from Vadapalani Metro to the colony are not working for 3 weeks now. Women and elderly residents feel unsafe at night.',
    category: 'Streetlight',
    status: 'Resolved',
    location: 'Vadapalani, Chennai',
    landmark: 'Near Vadapalani Metro Exit',
    author: 'Anand B',
    authorId: 'anand',
    date: '3 days ago',
    icon: 'lightbulb',
    comments: [
      { author: 'BESCOM Officer', text: 'Work order issued. Lights repaired and tested.', time: '1 day ago', avatar: '#00C896' },
    ],
    contributors: [{ name: 'BESCOM', role: 'Repaired', color: '#00C896' }, { name: 'Anand B', role: 'Reported', color: '#1E90FF' }],
    helpers: 1,
    priority: 'Medium',
  },
  {
    id: 5,
    title: 'Power Cuts Every Evening in Velachery',
    desc: 'We have been experiencing scheduled and unscheduled power cuts every evening from 6 PM to 9 PM for the past two weeks. No official notification has been given.',
    category: 'Electricity',
    status: 'In Progress',
    location: 'Velachery, Chennai',
    landmark: '100 Feet Road Area',
    author: 'Nithya P',
    authorId: 'nithya',
    date: '4 days ago',
    icon: 'bolt',
    comments: [
      { author: 'TNEB Rep', text: 'Transformer upgrade work ongoing. Should resolve in 5 days.', time: '2 days ago', avatar: '#FFB347' },
    ],
    contributors: [{ name: 'TNEB Rep', role: 'Acknowledged', color: '#FFB347' }],
    helpers: 12,
    priority: 'Medium',
  },
  {
    id: 6,
    title: 'Park Benches Vandalized at Nandanam Gardens',
    desc: 'Multiple benches in the public park have been vandalized and broken. Elderly citizens who come for morning walks have nowhere to rest. Broken pieces are also a hazard.',
    category: 'Park',
    status: 'Open',
    location: 'Nandanam, Chennai',
    landmark: 'Nandanam Gardens',
    author: 'Vijay R',
    authorId: 'vijay',
    date: '6 days ago',
    icon: 'park',
    comments: [],
    contributors: [],
    helpers: 4,
    priority: 'Low',
  }
];

// ==================== STORAGE ====================
function saveData() {
  localStorage.setItem('cp_issues', JSON.stringify(State.issues));
  localStorage.setItem('cp_announcements', JSON.stringify(State.announcements));
  if (State.currentUser) {
    localStorage.setItem('cp_user', JSON.stringify(State.currentUser));
    localStorage.setItem('cp_role', State.currentRole);
  } else {
    localStorage.removeItem('cp_user');
    localStorage.removeItem('cp_role');
  }
}

function loadData() {
  const saved = localStorage.getItem('cp_issues');
  State.issues = saved ? JSON.parse(saved) : [...SAMPLE_ISSUES];
  
  const savedAnn = localStorage.getItem('cp_announcements');
  State.announcements = savedAnn ? JSON.parse(savedAnn) : [];

  const savedUser = localStorage.getItem('cp_user');
  if (savedUser) {
    State.currentUser = JSON.parse(savedUser);
    State.currentRole = localStorage.getItem('cp_role') || 'citizen';
  }
}

// ==================== AUTH ====================
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach((t) => {
    t.classList.toggle('active', (tab === 'login' && t.innerText === 'Sign In') || (tab === 'register' && t.innerText === 'Register'));
  });
  document.getElementById('login-form').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('register-form').style.display = tab === 'register' ? 'block' : 'none';
}

function togglePass(id, btn) {
  const inp = document.getElementById(id);
  const icon = btn.querySelector('.material-symbols-outlined');
  if (inp.type === 'password') {
    inp.type = 'text';
    if (icon) icon.innerText = 'visibility_off';
  } else {
    inp.type = 'password';
    if (icon) icon.innerText = 'visibility';
  }
}

function handleLogin(e) {
  if (e) e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;
  
  if (!email || !pass) return showToast('Please enter credentials', 'error');

  let role = 'citizen';
  let name = 'Demo User';
  
  if (email === 'superadmin@civicpulse.gov' || email.includes('super')) {
    role = 'super';
    name = 'Executive Official (IAS/IPS)';
  } else if (email === 'admin@civicpulse.com' || email.includes('admin')) {
    role = 'admin';
    name = 'City Admin';
  }

  State.currentUser = { email, name };
  State.currentRole = role;
  saveData();
  
  // Apply theme immediately
  document.body.className = 'theme-' + role;
  
  const btn = e ? e.currentTarget : null;
  if (btn) {
    btn.innerHTML = '<span class="material-symbols-outlined" style="animation: spin 1s linear infinite">sync</span> Signing in...';
    btn.disabled = true;
  }

  showToast(`Welcome back, ${name}!`, 'success');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 600);
}

function handleRegister(e) {
  if (e) e.preventDefault();
  const fname = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass = document.getElementById('reg-pass').value;

  if (!fname || !email || !pass) { showToast('Please fill required fields', 'error'); return; }

  const btn = e ? e.currentTarget : null;
  if (btn) {
    btn.innerText = 'Creating account...';
    btn.disabled = true;
  }

  setTimeout(() => {
    State.currentUser = {
      name: fname,
      email,
    };
    State.currentRole = 'citizen';
    saveData();
    showToast(`Welcome, ${fname}!`, 'success');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
    if (btn) btn.disabled = false;
  }, 1200);
}

function loginAs(role) {
  const titles = {
    citizen: 'Demo Citizen',
    admin: 'City Administrator',
    super: 'Global Controller'
  };
  const emails = {
    citizen: 'demo@civicpulse.com',
    admin: 'admin@cityhall.gov',
    super: 'chief@civicpulse.gov'
  };

  State.currentUser = {
    name: titles[role],
    email: emails[role],
  };
  State.currentRole = role;
  saveData();
  document.body.className = 'theme-' + role;
  initApp();
  showToast(`Logged in as ${titles[role]}`, 'success');
}

function initApp() {
  const app = document.getElementById('app');
  if (!app) return; // We are on login.html

  if (!State.currentUser) {
    window.location.href = 'login.html';
    return;
  }

  // Apply theme class to body
  document.body.className = 'theme-' + State.currentRole;

  // Populate all content BEFORE revealing to avoid any flash
  document.getElementById('sidebar-name').innerText = State.currentUser.name;
  const roleLabel = document.querySelector('.user-role');
  if (roleLabel) roleLabel.innerText = State.currentRole.charAt(0).toUpperCase() + State.currentRole.slice(1);

  renderSidebar();
  updateUserUI();
  renderAnnouncements();
  renderIssueCards();
  if (State.currentRole === 'admin') renderIssueCards('', 'adminIssuesGrid');
  showPage('dashboard');

  // Show the body and fade in the app
  document.body.style.setProperty('display', 'block', 'important');
  requestAnimationFrame(() => requestAnimationFrame(() => app.classList.add('visible')));
}

function handleLogout() {
  document.body.style.display = 'none';
  State.currentUser = null;
  localStorage.removeItem('cp_user');
  localStorage.removeItem('cp_role');
  window.location.replace('login.html');
}

// ==================== UI UPDATES ====================
function postAnnouncement() {
  const text = document.getElementById('announcement-input').value.trim();
  if (!text) return showToast('Enter announcement text', 'error');
  
  const announcement = {
    id: Date.now(),
    text: text,
    author: State.currentUser.name,
    date: new Date().toLocaleString()
  };
  
  State.announcements.push(announcement);
  saveData();
  renderAnnouncements();
  document.getElementById('announcement-input').value = '';
  showToast('Global announcement broadcasted!', 'success');
}

function renderAnnouncements() {
  const container = document.getElementById('announcement-bar');
  if (!container) return;
  
  if (State.announcements.length === 0) {
    container.style.display = 'none';
    return;
  }
  
  container.style.display = 'block';
  const latest = State.announcements[State.announcements.length - 1];
  container.innerHTML = `
    <div class="announcement-content">
      <span class="material-symbols-outlined">campaign</span>
      <strong>GOVERNMENT NOTICE:</strong> ${latest.text} 
      <span style="opacity: 0.7; font-size: 0.8rem; margin-left: 10px;">— ${latest.author}</span>
      <button class="close-announcement" onclick="closeAnnouncements()" style="margin-left: auto; background: none; border: none; color: white; cursor: pointer;">
        <span class="material-symbols-outlined" style="font-size: 18px;">close</span>
      </button>
    </div>
  `;
}

function closeAnnouncements() {
  document.getElementById('announcement-bar').style.display = 'none';
}

function renderSidebar() {
  const nav = document.querySelector('.sidebar-nav');
  let html = `
    <div class="nav-section-label">Main Menu</div>
    <a class="nav-item active" onclick="showPage('dashboard')" data-page="dashboard">
      <span class="material-symbols-outlined">dashboard</span> Dashboard
    </a>
  `;

  if (State.currentRole === 'citizen') {
    html += `
      <a class="nav-item" onclick="showPage('report')" data-page="report">
        <span class="material-symbols-outlined">edit_note</span> Report Issue
      </a>
      <div class="nav-section-label">Community</div>
      <a class="nav-item" onclick="showPage('dashboard', 'All')" data-page="dashboard-all">
        <span class="material-symbols-outlined">group</span> All Issues
      </a>
    `;
  } else if (State.currentRole === 'admin') {
    html += `
      <a class="nav-item" onclick="showPage('manage')" data-page="manage">
        <span class="material-symbols-outlined">assignment_turned_in</span> Manage Issues
      </a>
      <a class="nav-item" onclick="showPage('analytics')" data-page="analytics">
        <span class="material-symbols-outlined">monitoring</span> Analytics
      </a>
    `;
  } else if (State.currentRole === 'super') {
    html += `
      <a class="nav-item" onclick="showPage('global')" data-page="global">
        <span class="material-symbols-outlined">public</span> Global Control
      </a>
      <a class="nav-item" onclick="showPage('users')" data-page="users">
        <span class="material-symbols-outlined">manage_accounts</span> User Management
      </a>
      <a class="nav-item" onclick="showPage('system')" data-page="system">
        <span class="material-symbols-outlined">settings_suggest</span> System Health
      </a>
    `;
  }

  html += `
    <div class="nav-section-label">Account</div>
    <a class="nav-item" onclick="showPage('profile')" data-page="profile">
      <span class="material-symbols-outlined">person</span> My Profile
    </a>
    <a class="nav-item" onclick="handleLogout()">
      <span class="material-symbols-outlined">logout</span> Sign Out
    </a>
  `;
  
  nav.innerHTML = html;
}

function updateUserUI() {
  if (!State.currentUser) return;
  const av = State.currentUser.name[0];
  document.getElementById('sidebar-avatar').innerText = av;
  document.getElementById('topbar-avatar').innerText = av;
  
  if (document.getElementById('profile-avatar-large')) {
    document.getElementById('profile-avatar-large').innerText = av;
    document.getElementById('profile-name-display').innerText = State.currentUser.name;
    document.getElementById('profile-email-display').innerText = State.currentUser.email;
  }
}

function showPage(page, filter, preventScroll = false) {
  // Auto-close sidebar on mobile after selection
  const sidebar = document.getElementById('sidebar');
  if (sidebar && sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
  }

  const targetPage = document.getElementById('page-' + page);
  const isAlreadyActive = targetPage && targetPage.classList.contains('active');

  if (!isAlreadyActive) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    if (targetPage) targetPage.classList.add('active');
  }

  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  // Handle various nav highlight keys
  let navKey = page;
  if (page === 'dashboard' && filter === 'All') navKey = 'dashboard-all';
  
  const navItem = document.querySelector(`[data-page="${navKey}"]`);
  if (navItem) navItem.classList.add('active');

  State.currentPage = page;
  
  const titles = { dashboard: 'Dashboard', report: 'Report Issue', profile: 'My Profile', analytics: 'City Analytics' };
  const titleEl = document.getElementById('topbar-title');
  if (titleEl) titleEl.innerText = titles[page] || 'CivicPulse';

  if (page === 'dashboard') {
    renderDashboard();
    if (filter) filterIssues(filter);
  } else if (page === 'profile') {
    renderProfile();
  }

  if (!preventScroll && !isAlreadyActive) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ==================== DASHBOARD & ISSUES ====================
function renderDashboard() {
  updateStats();
  renderIssueCards();
}

function updateStats() {
  const total = State.issues.length;
  const open = State.issues.filter(i => i.status === 'Open').length;
  const progress = State.issues.filter(i => i.status === 'In Progress').length;
  const resolved = State.issues.filter(i => i.status === 'Resolved').length;

  const sTotal = document.getElementById('stat-total');
  const sOpen = document.getElementById('stat-open');
  const sProg = document.getElementById('stat-progress');
  const sRes = document.getElementById('stat-resolved-count');
  const oCount = document.getElementById('open-count');

  if (sTotal) sTotal.innerText = total;
  if (sOpen) sOpen.innerText = open;
  if (sProg) sProg.innerText = progress;
  if (sRes) sRes.innerText = resolved;
  if (oCount) oCount.innerText = open;
}

function filterIssues(filter, btn) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  State.currentFilter = filter;
  renderIssueCards();
}

function handleGlobalSearch(q) {
  const query = q.toLowerCase().trim();
  State.searchQuery = query;
  
  const defHeader = document.getElementById('dashboard-default-header');
  const statsG = document.getElementById('stats-grid');
  const searchH = document.getElementById('search-results-header');

  if (query.length > 0) {
    if (defHeader) defHeader.style.display = 'none';
    if (statsG) statsG.style.display = 'none';
    if (searchH) searchH.style.display = 'block';
  } else {
    if (defHeader) defHeader.style.display = 'block';
    if (statsG) statsG.style.display = 'grid';
    if (searchH) searchH.style.display = 'none';
  }
  
  renderIssueCards(query);
}

function renderIssueCards(searchQ = '', containerId = 'issuesGrid') {
  const grid = document.getElementById(containerId);
  if (!grid) return; // Exit if container doesn't exist on this page
  
  const countEl = document.getElementById('search-count');
  grid.innerHTML = '';

  let filtered = State.issues.filter(issue => {
    const matchFilter = State.currentFilter === 'All' || issue.category === State.currentFilter || issue.status === State.currentFilter;
    const matchSearch = !searchQ || 
                        issue.title.toLowerCase().includes(searchQ) || 
                        issue.location.toLowerCase().includes(searchQ) ||
                        issue.category.toLowerCase().includes(searchQ);
    return matchFilter && matchSearch;
  });

  if (grid.id === 'issuesGrid' && countEl) {
    countEl.innerText = filtered.length;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column: 1/-1">
      <span class="material-symbols-outlined" style="font-size: 64px; color: var(--text-muted)">search_off</span>
      <h3>No issues matches your search</h3>
    </div>`;
    return;
  }

  filtered.forEach(issue => {
    const card = document.createElement('div');
    card.className = 'issue-card';
    const statusClass = issue.status.toLowerCase().replace(' ', '');
    
    card.innerHTML = `
      <div class="issue-card-img">
        <span class="material-symbols-outlined">${issue.icon || 'push_pin'}</span>
        <div class="cat-badge ${issue.category.toLowerCase()}">${issue.category}</div>
        <div class="status-label-badge ${statusClass}">${issue.status}</div>
      </div>
      <div class="issue-card-body">
        <div class="issue-card-header">
          <div class="issue-card-title">${issue.title}</div>
        </div>
        <div class="issue-card-desc">${issue.desc}</div>
        <div class="issue-card-meta">
          <span><span class="material-symbols-outlined">location_on</span> ${issue.location}</span>
          <span><span class="material-symbols-outlined">schedule</span> ${issue.date}</span>
        </div>
        <div class="issue-card-footer">
          <button class="btn btn-outline btn-sm" onclick="viewIssueDetail(${issue.id})">
            <span class="material-symbols-outlined">visibility</span> Details
          </button>
          <button class="btn btn-primary btn-sm" onclick="viewIssueDetail(${issue.id})">
            <span class="material-symbols-outlined">handshake</span> Help Resolve
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ==================== DETAIL VIEW ====================
function viewIssueDetail(id) {
  const issue = State.issues.find(i => i.id === id);
  if (!issue) return;

  const content = document.getElementById('detail-content');
  const statusSteps = ['Open', 'In Progress', 'Resolved'];
  const currentStep = statusSteps.indexOf(issue.status);

  let trackHTML = statusSteps.map((s, i) => {
    const cls = i < currentStep ? 'done' : i === currentStep ? 'active' : '';
    const icon = i < currentStep ? 'check' : i === currentStep ? 'build' : 'pending';
    return `
      <div class="status-step ${cls}">
        <div class="status-step-dot">
          <span class="material-symbols-outlined" style="font-size: 16px">${icon}</span>
        </div>
        <div class="status-step-label">${s}</div>
      </div>
    `;
  }).join('');

  let html = `
    <button class="btn btn-outline back-btn" onclick="showPage('dashboard')">
      <span class="material-symbols-outlined">arrow_back</span> Back to Dashboard
    </button>
    
    <div class="detail-grid">
      <div class="detail-main">
        <div class="section-card">
          <div class="section-title"><span class="material-symbols-outlined">description</span> Description</div>
          <p style="color: var(--text-muted); line-height: 1.8;">${issue.desc}</p>
        </div>
        
        <div class="section-card">
          <div class="section-title"><span class="material-symbols-outlined">analytics</span> Resolution Status</div>
          <div class="status-track">${trackHTML}</div>
          <div style="display: flex; gap: 16px; margin-top: 40px">
            <button class="btn btn-outline" style="flex: 1" onclick="updateIssueStatus(${issue.id}, 'In Progress')">Mark In Progress</button>
            <button class="btn btn-primary" style="flex: 1" onclick="updateIssueStatus(${issue.id}, 'Resolved')">Resolve Issue</button>
          </div>
        </div>
      `;

  // Admin-Specific Actions
  if (State.currentRole === 'admin' || State.currentRole === 'super') {
    if (issue.status !== 'Resolved') {
      html += `
        <div class="detail-actions" style="margin-top: 32px; padding-top: 32px; border-top: 1px dashed var(--border-color);">
          <h4 style="margin-bottom: 16px;">Administrative Control</h4>
          <div style="display: flex; gap: 12px;">
            <button class="btn btn-primary" onclick="adminResolveIssue(${issue.id})" style="background: var(--success); border: none;">
              <span class="material-symbols-outlined">check_circle</span> Resolve & Upload Proof
            </button>
            <button class="btn btn-secondary" onclick="updateIssueStatus(${issue.id}, 'In Progress')">
              <span class="material-symbols-outlined">pending</span> Mark In Progress
            </button>
          </div>
        </div>
      `;
    } else if (issue.resolvedImage) {
      html += `
        <div class="detail-section" style="margin-top: 32px;">
          <h4><span class="material-symbols-outlined">verified</span> Resolution Proof</h4>
          <img src="${issue.resolvedImage}" style="width: 100%; border-radius: 16px; margin-top: 12px; border: 2px solid var(--success);">
          <p style="margin-top: 8px; font-weight: 600; color: var(--success);">Verified by Admin</p>
        </div>
      `;
    }
  }

  html += `
      </div>
      
      <div class="detail-side">
        <div class="section-card">
          <div class="section-title"><span class="material-symbols-outlined">info</span> Information</div>
          <div style="display: grid; gap: 20px">
            <div class="info-item">
              <div class="info-label">Location</div>
              <div class="info-value">${issue.location}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Reported By</div>
              <div class="info-value">${issue.author}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Date</div>
              <div class="info-value">${issue.date}</div>
            </div>
          </div>
        </div>
        
        <div class="section-card">
          <div class="section-title"><span class="material-symbols-outlined">group</span> Helpers (${issue.helpers || 0})</div>
          <button class="btn btn-primary w-full" onclick="helpIssue(${issue.id})">Volunteer to Help</button>
        </div>
      </div>
    </div>
  `;
  
  // Smooth content update — fade out, swap, fade in
  content.style.transition = 'opacity 0.15s ease';
  content.style.opacity = '0';
  setTimeout(() => {
    content.innerHTML = html;
    content.style.opacity = '1';
  }, 150);

  if (State.currentPage !== 'detail') {
    showPage('detail', null, true);
  }
}

function adminResolveIssue(id) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (re) => {
      const issue = State.issues.find(i => i.id === id);
      if (issue) {
        issue.status = 'Resolved';
        issue.resolvedImage = re.target.result;
        saveData();
        viewIssueDetail(id);
        showToast('Issue resolved with proof correctly!', 'success');
      }
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

function updateIssueStatus(id, status) {
  const issue = State.issues.find(i => i.id === id);
  if (issue) {
    issue.status = status;
    saveData();
    viewIssueDetail(id);
    showToast(`Status updated to ${status}`, 'success');
  }
}

function helpIssue(id) {
  const issue = State.issues.find(i => i.id === id);
  if (issue) {
    issue.helpers = (issue.helpers || 0) + 1;
    saveData();
    showToast('Thank you for volunteering!', 'success');
    viewIssueDetail(id);
  }
}

// ==================== REPORT ISSUE ====================
function handleImageUpload(input) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      State.editingImage = e.target.result;
      document.getElementById('previewImg').src = e.target.result;
      document.getElementById('imagePreview').style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
}

function removeImage() {
  State.editingImage = null;
  document.getElementById('imagePreview').style.display = 'none';
  document.getElementById('imageInput').value = '';
}

function submitIssue() {
  const title = document.getElementById('issue-title').value;
  const category = document.getElementById('issue-category').value;
  const desc = document.getElementById('issue-desc').value;

  if (!title || !category || !desc) {
    showToast('Please fill all required fields', 'error');
    return;
  }

  const btn = document.getElementById('submitBtn');
  btn.innerText = 'Submitting...';

  setTimeout(() => {
    const newIssue = {
      id: Date.now(),
      title,
      category,
      desc,
      status: 'Open',
      location: document.getElementById('issue-street').value || 'Chennai',
      author: State.currentUser.name,
      date: 'Just now',
      icon: getCategoryIcon(category),
      helpers: 0
    };
    
    State.issues.unshift(newIssue);
    saveData();
    showToast('Issue reported successfully!', 'success');
    showPage('dashboard');
    btn.innerText = 'Submit Report';
  }, 1000);
}

function getCategoryIcon(cat) {
  const icons = { Road: 'road', Water: 'water_drop', Garbage: 'delete_sweep', Electricity: 'bolt', Streetlight: 'lightbulb', Park: 'park' };
  return icons[cat] || 'push_pin';
}

// ==================== PROFILE ====================
function renderProfile() {
  const myIssues = State.issues.filter(i => i.author === State.currentUser.name);
  const list = document.getElementById('my-issues-list');
  
  if (myIssues.length === 0) {
    list.innerHTML = '<p class="text-center" style="color: var(--text-muted); padding: 40px">You haven\'t reported any issues yet.</p>';
    return;
  }

  list.innerHTML = myIssues.map(issue => `
    <div class="sidebar-user" style="background: rgba(255,255,255,0.02); margin-bottom: 12px; cursor: default">
      <div class="user-avatar" style="background: var(--navy-lighter)">
        <span class="material-symbols-outlined">${issue.icon || 'push_pin'}</span>
      </div>
      <div class="user-info">
        <div class="user-name">${issue.title}</div>
        <div class="user-role">${issue.status} • ${issue.date}</div>
      </div>
    </div>
  `).join('');
}

// ==================== TOAST ====================
function showToast(msg, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icon = type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info';
  toast.innerHTML = `<span class="material-symbols-outlined">${icon}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ==================== INIT ====================
loadData();
initApp();

// Attach event listeners to window for global access (from HTML onclick)
window.showPage = showPage;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.loginAs = loginAs;
window.handleLogout = handleLogout;
window.toggleSidebar = toggleSidebar;
window.filterIssues = filterIssues;
window.handleGlobalSearch = handleGlobalSearch;
window.viewIssueDetail = viewIssueDetail;
window.updateIssueStatus = updateIssueStatus;
window.adminResolveIssue = adminResolveIssue;
window.postAnnouncement = postAnnouncement;
window.closeAnnouncements = closeAnnouncements;
window.helpIssue = helpIssue;
window.submitIssue = submitIssue;
window.removeImage = removeImage;
window.handleImageUpload = handleImageUpload;
window.togglePass = togglePass;
window.switchAuth = switchAuthTab;
window.switchAuthTab = switchAuthTab;
