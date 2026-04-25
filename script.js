// ==================== APP STATE ====================
const State = {
  currentUser: {
    name: 'Demo User',
    email: 'demo@civicpulse.com',
    phone: '+91 98765 43210',
    city: 'Chennai',
    address: '123 Civic Street, T. Nagar',
    volunteeredIssues: []
  },
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

  // Apply saved theme (Only on dashboard pages, login should always be light)
  const isLoginPage = window.location.pathname.includes('login.html');
  const savedTheme = localStorage.getItem('cp_theme');
  
  if (savedTheme === 'dark' && !isLoginPage) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }

  // Set 2FA switch state
  const twoFactorEnabled = localStorage.getItem('cp_2fa_enabled') === 'true';
  const twoFactorSwitch = document.getElementById('2fa-switch');
  if (twoFactorSwitch) twoFactorSwitch.checked = twoFactorEnabled;

  // Set Notification switches
  const pushEnabled = localStorage.getItem('cp_push_enabled') !== 'false'; // default true
  const emailEnabled = localStorage.getItem('cp_email_enabled') === 'true';
  const pushSwitch = document.getElementById('push-notif-switch');
  const emailSwitch = document.getElementById('email-digest-switch');
  if (pushSwitch) pushSwitch.checked = pushEnabled;
  if (emailSwitch) emailSwitch.checked = emailEnabled;
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
  let name = email.split('@')[0].split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  
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

  showToast(`Credentials verified!`, 'success');

  // Check if 2FA is enabled
  if (localStorage.getItem('cp_2fa_enabled') === 'true') {
    setTimeout(() => {
      showModal({
        title: 'Two-Factor Authentication',
        body: `
          <div style="text-align: center; padding: 10px 0;">
            <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 24px;">
              Enter the 6-digit code from your authenticator app to complete sign-in.
            </p>
            <div style="display: flex; gap: 10px; justify-content: center;" id="otp-container">
              <input type="text" maxlength="1" class="form-input otp-input" style="width: 45px; text-align: center; font-size: 1.25rem; font-weight: 700;">
              <input type="text" maxlength="1" class="form-input otp-input" style="width: 45px; text-align: center; font-size: 1.25rem; font-weight: 700;">
              <input type="text" maxlength="1" class="form-input otp-input" style="width: 45px; text-align: center; font-size: 1.25rem; font-weight: 700;">
              <span style="display: flex; align-items: center;">-</span>
              <input type="text" maxlength="1" class="form-input otp-input" style="width: 45px; text-align: center; font-size: 1.25rem; font-weight: 700;">
              <input type="text" maxlength="1" class="form-input otp-input" style="width: 45px; text-align: center; font-size: 1.25rem; font-weight: 700;">
              <input type="text" maxlength="1" class="form-input otp-input" style="width: 45px; text-align: center; font-size: 1.25rem; font-weight: 700;">
            </div>
          </div>
        `,
        actionText: 'Verify & Sign In',
        onAction: () => {
          const inputs = document.querySelectorAll('.otp-input');
          let code = '';
          inputs.forEach(i => code += i.value);
          if (code.length < 6) {
            showToast('Enter all 6 digits', 'error');
            return false;
          }
          showToast('Verification successful!', 'success');
          setTimeout(() => { window.location.href = 'index.html'; }, 800);
          return true;
        }
      });

      // Auto-tabbing
      const inputs = document.querySelectorAll('.otp-input');
      inputs.forEach((input, index) => {
        input.addEventListener('keyup', (e) => {
          if (e.key >= 0 && e.key <= 9) {
            if (index < inputs.length - 1) inputs[index + 1].focus();
          } else if (e.key === 'Backspace') {
            if (index > 0) inputs[index - 1].focus();
          }
        });
      });
      inputs[0].focus();
    }, 600);
  } else {
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }
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
      phone: '',
      city: 'Chennai',
      address: '',
      volunteeredIssues: []
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
    phone: role === 'citizen' ? '+91 98765 43210' : '',
    city: 'Chennai',
    address: role === 'citizen' ? '123 Civic Street, T. Nagar' : '',
    volunteeredIssues: State.currentUser?.volunteeredIssues || []
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
  updateHeroBanner();
  renderIssueCards();

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
    <a class="nav-item" onclick="showPage('settings')" data-page="settings">
      <span class="material-symbols-outlined">settings</span> Settings
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

    // Populate editable fields
    document.getElementById('edit-profile-name').value = State.currentUser.name;
    document.getElementById('edit-profile-email').value = State.currentUser.email;
    document.getElementById('edit-profile-phone').value = State.currentUser.phone || '';
    document.getElementById('edit-profile-city').value = State.currentUser.city || '';
    document.getElementById('edit-profile-address').value = State.currentUser.address || '';
  }
}

function showPage(page, filter, preventScroll = false) {
  const sidebar = document.getElementById('sidebar');
  if (sidebar && sidebar.classList.contains('open')) sidebar.classList.remove('open');

  const targetPage = document.getElementById('page-' + page);
  if (!targetPage) return;

  // Always set active class to be safe
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  targetPage.classList.add('active');

  // Nav highlighting
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  let navKey = page;
  if (page === 'dashboard' && filter === 'All') navKey = 'dashboard-all';
  const navItem = document.querySelector(`[data-page="${navKey}"]`);
  if (navItem) navItem.classList.add('active');

  State.currentPage = page;
  
  const titles = { dashboard: 'Dashboard', report: 'Report Issue', profile: 'My Profile', settings: 'Settings', analytics: 'City Analytics' };
  const titleEl = document.getElementById('topbar-title');
  if (titleEl) titleEl.innerText = titles[page] || 'CivicPulse';

  if (page === 'dashboard') {
    // Force a fresh render of everything on the dashboard
    renderDashboard();
    if (filter) {
      // Find the corresponding filter button if it exists to keep UI in sync
      const filterBtn = Array.from(document.querySelectorAll('.filter-chip')).find(b => b.innerText.includes(filter) || (filter === 'All' && b.innerText.includes('All')));
      filterIssues(filter, filterBtn);
    }
  } else if (page === 'profile') {
    renderProfile();
  }

  if (!preventScroll) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ==================== DASHBOARD & ISSUES ====================
function renderDashboard() {
  updateStats();
  updateHeroBanner();
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
            <span class="material-symbols-outlined">check_circle</span> Try to Resolve
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
  const statusSteps = ['Open', 'In Progress', 'Awaiting Approval', 'Resolved'];
  const currentStep = statusSteps.indexOf(issue.status);

  let trackHTML = statusSteps.map((s, i) => {
    const isDone = i < currentStep || (issue.status === 'Resolved' && i === currentStep);
    const isActive = i === currentStep && issue.status !== 'Resolved';
    
    const cls = isDone ? 'done' : isActive ? 'active' : '';
    const icon = isDone ? 'check' : isActive ? 'sync' : 'circle';
    
    // Friendly labels for the tracker
    let displayLabel = s;
    if (s === 'Awaiting Approval') displayLabel = 'Verifying';
    
    return `
      <div class="status-step ${cls}">
        <div class="status-step-dot">
          <span class="material-symbols-outlined" style="font-size: 16px">${icon}</span>
        </div>
        <div class="status-step-label">${displayLabel}</div>
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
          
          ${issue.resolvedImage ? `
            <div class="resolution-proof-container">
              <div style="font-weight: 700; display: flex; align-items: center; gap: 8px;">
                <span class="material-symbols-outlined" style="color: var(--success)">image</span>
                Resolution Proof Submitted
              </div>
              <img src="${issue.resolvedImage}" class="resolution-proof-img">
              ${issue.status === 'Resolved' ? 
                `<p style="margin-top: 12px; color: var(--success); font-weight: 600; display: flex; align-items: center; gap: 4px;">
                  <span class="material-symbols-outlined">verified</span> Verified & Resolved by Author
                </p>` : ''
              }
            </div>
          ` : ''}

          <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 32px; width: 100%;">
            ${issue.status === 'Resolved' ? 
              `<button class="btn btn-outline" style="width: 100%" disabled><span class="material-symbols-outlined" style="color: var(--success); margin-right: 8px;">verified</span> Problem Resolved & Verified</button>` :
              issue.status === 'Awaiting Approval' && issue.author === State.currentUser.name ?
              `<div style="display: flex; gap: 12px; width: 100%;">
                 <button class="btn btn-primary" style="flex: 1" onclick="approveResolution(${issue.id})">
                  <span class="material-symbols-outlined" style="margin-right: 8px;">check_circle</span> Verify & Mark Resolved
                 </button>
                 <button class="btn btn-outline" style="flex: 1; border-color: var(--danger); color: var(--danger);" onclick="rejectResolution(${issue.id})">
                  <span class="material-symbols-outlined" style="margin-right: 8px;">cancel</span> Reject Proof
                 </button>
               </div>` :
              issue.status === 'Awaiting Approval' ?
              `<button class="btn btn-outline" style="width: 100%" disabled><span class="material-symbols-outlined" style="margin-right: 8px;">hourglass_empty</span> Awaiting Author Verification</button>` :
              issue.author === State.currentUser.name ?
              `<div class="section-card" style="margin: 0; background: var(--bg-tertiary); text-align: center; border: 1px dashed var(--border-color);">
                <p style="color: var(--text-muted); font-size: 0.9rem; font-weight: 600;">
                  <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 4px;">info</span>
                  Waiting for community members to resolve this issue.
                </p>
              </div>` :
              `<button class="btn btn-primary" style="width: 100%; height: 54px; font-size: 1.1rem;" onclick="submitResolution(${issue.id})">
                <span class="material-symbols-outlined" style="margin-right: 12px; font-size: 24px;">task_alt</span> Try to Resolve (Attach Proof)
               </button>
               <button class="btn btn-outline" style="width: 100%" onclick="helpIssue(${issue.id})">
                <span class="material-symbols-outlined" style="margin-right: 8px;">volunteer_activism</span> 
                ${(State.currentUser.volunteeredIssues || []).includes(issue.id) ? 'Stop Volunteering' : 'Volunteer to Help'}
               </button>`
            }
          </div>
        </div>
      `;

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

function submitResolution(id) {
  showModal({
    title: 'Resolve this Issue',
    body: `
      <div style="text-align: center; padding: 20px 0;">
        <div class="user-avatar" style="width: 80px; height: 80px; margin: 0 auto 24px; background: var(--success-dim); color: var(--success);">
          <span class="material-symbols-outlined" style="font-size: 40px;">camera_enhance</span>
        </div>
        <h4 style="margin-bottom: 12px; font-size: 1.1rem;">Take a Proof Photo</h4>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 24px; line-height: 1.6;">
          To resolve this issue, you must provide a clear photo as evidence that the problem has been rectified.
        </p>
        
        <div id="proof-dropzone" style="border: 2px dashed var(--border-color); padding: 40px; border-radius: 16px; cursor: pointer; transition: all 0.3s;" onclick="document.getElementById('modal-proof-upload').click()">
          <span class="material-symbols-outlined" style="font-size: 32px; color: var(--text-light);">cloud_upload</span>
          <p style="margin-top: 12px; font-weight: 600; color: var(--text-muted);">Click to attach proof photo</p>
          <input type="file" id="modal-proof-upload" style="display: none;" onchange="handleModalProof(this)">
        </div>
        <div id="modal-proof-preview" style="display: none; margin-top: 20px;">
           <img id="proof-img-tag">
           <button class="btn btn-outline btn-sm" style="margin-top: 12px;" onclick="resetModalProof()">Remove Photo</button>
        </div>
      </div>
    `,
    actionText: 'Submit for Verification',
    onAction: () => {
      const img = document.getElementById('proof-img-tag').src;
      if (!img || img.includes('undefined')) {
        showToast('Please attach a proof photo first', 'error');
        return false;
      }
      
      const issue = State.issues.find(i => i.id === id);
      if (issue) {
        issue.status = 'Awaiting Approval';
        issue.resolvedImage = img;
        issue.resolverName = State.currentUser.name;
        saveData();
        viewIssueDetail(id);
        showToast('Resolution submitted! Awaiting author verification.', 'success');
        return true;
      }
      return false;
    }
  });
}

function handleModalProof(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById('proof-img-tag').src = e.target.result;
      document.getElementById('proof-dropzone').style.display = 'none';
      document.getElementById('modal-proof-preview').style.display = 'block';
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function resetModalProof() {
  document.getElementById('proof-img-tag').src = '';
  document.getElementById('proof-dropzone').style.display = 'block';
  document.getElementById('modal-proof-preview').style.display = 'none';
}

function requestResolution(id) {
  const issue = State.issues.find(i => i.id === id);
  if (issue) {
    issue.status = 'Awaiting Approval';
    saveData();
    viewIssueDetail(id);
    showToast('Resolution requested. Awaiting author approval.', 'success');
  }
}

function approveResolution(id) {
  const issue = State.issues.find(i => i.id === id);
  if (!issue) return;
  
  if (issue.author !== State.currentUser.name) {
    showToast('Only the issue author can mark this as resolved.', 'error');
    return;
  }

  issue.status = 'Resolved';
  saveData();
  viewIssueDetail(id);
  showToast('Issue officially resolved and closed!', 'success');
}

function rejectResolution(id) {
  const issue = State.issues.find(i => i.id === id);
  if (!issue) return;
  
  if (issue.author !== State.currentUser.name) return;

  issue.status = 'In Progress';
  issue.resolvedImage = null; // Clear the rejected proof
  saveData();
  viewIssueDetail(id);
  showToast('Resolution proof rejected. Issue remains In Progress.', 'warning');
}

function updateIssueStatus(id, status) {
  const issue = State.issues.find(i => i.id === id);
  if (!issue) return;

  const isAuthor = issue.author === State.currentUser.name;
  const isAdmin = State.currentRole === 'admin' || State.currentRole === 'super';

  if (!isAuthor && !isAdmin) {
    showToast('You do not have permission to update this issue.', 'error');
    return;
  }

  if (status === 'Resolved' && !isAuthor) {
    showToast('Only the author can mark this as resolved.', 'error');
    return;
  }

  issue.status = status;
  saveData();
  viewIssueDetail(id);
  showToast(`Status updated to ${status}`, 'success');
}

function helpIssue(id) {
  const issue = State.issues.find(i => i.id === id);
  if (!issue) return;

  if (!State.currentUser.volunteeredIssues) State.currentUser.volunteeredIssues = [];
  
  if (State.currentUser.volunteeredIssues.includes(id)) {
    // Toggle off
    issue.helpers = Math.max(0, (issue.helpers || 0) - 1);
    State.currentUser.volunteeredIssues = State.currentUser.volunteeredIssues.filter(i => i !== id);
    showToast('You are no longer volunteering for this.', 'info');
  } else {
    // Toggle on
    issue.helpers = (issue.helpers || 0) + 1;
    State.currentUser.volunteeredIssues.push(id);
    
    // Automatically set status to In Progress
    if (issue.status === 'Open') {
      issue.status = 'In Progress';
    }
    
    showToast('Thank you for volunteering! Issue is now In Progress.', 'success');
  }
  
  saveData();
  updateHeroBanner();
  viewIssueDetail(id);
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
    updateHeroBanner();
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

  list.innerHTML = myIssues.map(issue => {
    const statusClass = issue.status.toLowerCase().replace(' ', '');
    return `
      <div class="issue-card" onclick="viewIssueDetail(${issue.id})" style="cursor: pointer;">
        <div class="issue-card-img" style="height: 120px;">
          <span class="material-symbols-outlined" style="font-size: 40px;">${issue.icon || 'push_pin'}</span>
          <div class="status-label-badge ${statusClass}">${issue.status}</div>
        </div>
        <div class="issue-card-body" style="padding: 16px;">
          <div class="issue-card-title" style="font-size: 1rem;">${issue.title}</div>
          <div class="issue-card-meta">
            <span><span class="material-symbols-outlined">schedule</span> ${issue.date}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function toggleNotifications() {
  const dropdown = document.getElementById('notif-dropdown');
  const isOpening = dropdown.style.display !== 'block';
  
  // Close if open
  if (!isOpening) {
    dropdown.style.display = 'none';
    return;
  }

  // Populate and show
  renderNotifications();
  dropdown.style.display = 'block';
  document.getElementById('notif-dot').style.display = 'none';
  
  // Close when clicking outside
  const closeHandler = (e) => {
    if (!dropdown.contains(e.target) && !e.target.closest('.topbar-btn')) {
      dropdown.style.display = 'none';
      document.removeEventListener('click', closeHandler);
    }
  };
  setTimeout(() => document.addEventListener('click', closeHandler), 10);
}

function renderNotifications() {
  const list = document.getElementById('notif-list');
  const emailEnabled = localStorage.getItem('cp_email_enabled') === 'true';
  
  // Mock notifications based on actual issues
  const notifications = [
    { 
      id: 1, 
      title: 'Resolution Proof Submitted', 
      desc: 'A photo has been uploaded for your Road repair request.', 
      time: 'Just now', 
      icon: 'image', 
      type: 'success' 
    }
  ];

  if (emailEnabled) {
    notifications.push({
      id: 99,
      title: 'Weekly Community Digest',
      desc: '12 issues resolved this week! See the progress in your district.',
      time: 'Today',
      icon: 'summarize',
      type: 'primary'
    });
  }

  notifications.push(
    { 
      id: 2, 
      title: 'New Volunteer', 
      desc: 'Someone joined to help with the Garbage issue.', 
      time: '10 mins ago', 
      icon: 'volunteer_activism', 
      type: 'info' 
    },
    { 
      id: 3, 
      title: 'Global Announcement', 
      desc: 'New executive order issued by City Hall.', 
      time: '1 hour ago', 
      icon: 'campaign', 
      type: 'warning' 
    }
  );

  list.innerHTML = notifications.map(n => `
    <div class="notif-item">
      <div class="notif-icon ${n.type || 'info'}">
        <span class="material-symbols-outlined" style="font-size: 18px;">${n.icon}</span>
      </div>
      <div class="notif-content">
        <div class="notif-title">${n.title}</div>
        <div class="notif-desc">${n.desc}</div>
        <div class="notif-time">${n.time}</div>
      </div>
    </div>
  `).join('');
}

function clearNotifications() {
  document.getElementById('notif-list').innerHTML = '<div style="padding: 40px; text-align: center; color: var(--text-light); font-size: 0.9rem;">No new notifications</div>';
}

function showNotifications() {
  toggleNotifications();
}

function openSettings() {
  showPage('settings');
  updateSettingsUI();
}

function updateSettingsUI() {
  const isDark = document.body.classList.contains('dark-mode');
  const lightBtn = document.getElementById('theme-light-btn');
  const darkBtn = document.getElementById('theme-dark-btn');
  
  if (lightBtn && darkBtn) {
    lightBtn.className = isDark ? 'btn btn-outline btn-sm' : 'btn btn-primary btn-sm';
    darkBtn.className = isDark ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm';
  }
}

function setTheme(mode) {
  if (mode === 'dark') {
    document.body.classList.add('dark-mode');
    localStorage.setItem('cp_theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('cp_theme', 'light');
  }
  updateSettingsUI();
  showToast(`Switched to ${mode} mode`, 'info');
}

function changePassword() {
  showModal({
    title: 'Change Password',
    body: `
      <div class="form-group">
        <label>Current Password</label>
        <input type="password" class="form-input" id="modal-old-pass" placeholder="••••••••">
      </div>
      <div class="form-group">
        <label>New Password</label>
        <input type="password" class="form-input" id="modal-new-pass" placeholder="••••••••">
      </div>
      <div class="form-group">
        <label>Confirm New Password</label>
        <input type="password" class="form-input" id="modal-confirm-pass" placeholder="••••••••">
      </div>
    `,
    actionText: 'Update Password',
    onAction: () => {
      const newP = document.getElementById('modal-new-pass').value;
      const confP = document.getElementById('modal-confirm-pass').value;
      if (!newP || newP !== confP) {
        showToast('Passwords do not match!', 'error');
        return false;
      }
      showToast('Password updated successfully!', 'success');
      return true; // closes modal
    }
  });
}

function deactivateAccount() {
  showModal({
    title: 'Deactivate Account',
    body: `
      <p style="color: var(--text-muted); line-height: 1.6;">
        Are you sure you want to deactivate your account? This will permanently disable your access to CivicPulse.
      </p>
      <div style="margin-top: 20px; padding: 16px; background: var(--danger-dim); border-radius: 12px; color: var(--danger); font-size: 0.85rem; font-weight: 600;">
        Warning: This action cannot be undone.
      </div>
    `,
    actionText: 'Deactivate Permanently',
    actionClass: 'btn-primary',
    onAction: () => {
      showToast('Account deactivated.', 'error');
      setTimeout(() => handleLogout(), 1500);
      return true;
    }
  });
}

function toggle2FA(enabled) {
  const switchEl = document.getElementById('2fa-switch');
  
  if (enabled) {
    showModal({
      title: 'Enable Two-Factor Authentication',
      body: `
        <div style="text-align: center; padding: 10px 0;">
          <div class="user-avatar" style="width: 80px; height: 80px; margin: 0 auto 24px; background: var(--primary-dim); color: var(--primary);">
            <span class="material-symbols-outlined" style="font-size: 40px;">vibration</span>
          </div>
          <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 24px;">
            Enter the 6-digit code from your authenticator app to link your account.
          </p>
          <div style="display: flex; gap: 10px; justify-content: center;" id="otp-container">
            <input type="text" maxlength="1" class="form-input otp-input" style="width: 45px; text-align: center; font-size: 1.25rem; font-weight: 700;">
            <input type="text" maxlength="1" class="form-input otp-input" style="width: 45px; text-align: center; font-size: 1.25rem; font-weight: 700;">
            <input type="text" maxlength="1" class="form-input otp-input" style="width: 45px; text-align: center; font-size: 1.25rem; font-weight: 700;">
            <span style="display: flex; align-items: center;">-</span>
            <input type="text" maxlength="1" class="form-input otp-input" style="width: 45px; text-align: center; font-size: 1.25rem; font-weight: 700;">
            <input type="text" maxlength="1" class="form-input otp-input" style="width: 45px; text-align: center; font-size: 1.25rem; font-weight: 700;">
            <input type="text" maxlength="1" class="form-input otp-input" style="width: 45px; text-align: center; font-size: 1.25rem; font-weight: 700;">
          </div>
        </div>
      `,
      actionText: 'Activate 2FA',
      onAction: () => {
        const inputs = document.querySelectorAll('.otp-input');
        let code = '';
        inputs.forEach(i => code += i.value);
        
        if (code.length < 6) {
          showToast('Please enter all 6 digits', 'error');
          return false;
        }
        
        showToast('Two-Factor Authentication enabled!', 'success');
        localStorage.setItem('cp_2fa_enabled', 'true');
        return true;
      }
    });

    // Auto-tabbing logic
    setTimeout(() => {
      const inputs = document.querySelectorAll('.otp-input');
      inputs.forEach((input, index) => {
        input.addEventListener('keyup', (e) => {
          if (e.key >= 0 && e.key <= 9) {
            if (index < inputs.length - 1) inputs[index + 1].focus();
          } else if (e.key === 'Backspace') {
            if (index > 0) inputs[index - 1].focus();
          }
        });
      });
      inputs[0].focus();
    }, 100);

  } else {
    showToast('2FA disabled.', 'info');
    localStorage.removeItem('cp_2fa_enabled');
  }
}

function closeModal() {
  const modal = document.getElementById('customModal');
  const modalTitle = document.getElementById('modalTitle');
  
  // If we close the 2FA modal without activating, turn off the switch
  if (modalTitle.innerText.includes('Two-Factor Authentication')) {
    const inputs = document.querySelectorAll('.otp-input');
    let code = '';
    inputs.forEach(i => code += i.value);
    
    // Check if it's currently enabled (via the switch) but not verified
    const switchEl = document.getElementById('2fa-switch');
    if (switchEl && code.length < 6) {
      switchEl.checked = false;
    }
  }
  
  modal.style.display = 'none';
}

function updateHeroBanner() {
  const banner = document.getElementById('hero-banner');
  if (!banner) return;

  // Find the issue with the most helpers
  let trendingIssue = [...State.issues].sort((a, b) => (b.helpers || 0) - (a.helpers || 0))[0];

  if (trendingIssue && trendingIssue.status !== 'Resolved') {
    banner.innerHTML = `
      <div class="trending-card">
        <div class="trending-content">
          <span class="trending-badge">TRENDING</span>
          <h3>${trendingIssue.title} — ${trendingIssue.location}</h3>
          <p>Reported by ${trendingIssue.author} • ${trendingIssue.helpers || 0} Citizens Volunteered</p>
          <button class="trending-btn" onclick="viewIssueDetail(${trendingIssue.id})">
            View Details <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
        <div class="trending-icon-wrap">
          <span class="material-symbols-outlined trending-icon">auto_awesome</span>
        </div>
      </div>
    `;
  } else {
    // Default Fallback
    banner.innerHTML = `
      <div class="trending-card">
        <div class="trending-content">
          <span class="trending-badge">URGENT</span>
          <h3>Infrastructure Survey — City Center</h3>
          <p>Community-wide check of civic utility health is ongoing.</p>
          <button class="trending-btn" onclick="showPage('dashboard', 'All')">
            Explore All <span class="material-symbols-outlined">explore</span>
          </button>
        </div>
        <div class="trending-icon-wrap">
          <span class="material-symbols-outlined trending-icon">campaign</span>
        </div>
      </div>
    `;
  }
}

function toggleSetting(key, enabled) {
  localStorage.setItem(`cp_${key}_enabled`, enabled);
  if (enabled) {
    showToast(`${key.charAt(0).toUpperCase() + key.slice(1)} alerts enabled!`, 'success');
  } else {
    showToast(`${key.charAt(0).toUpperCase() + key.slice(1)} alerts disabled.`, 'info');
  }
}

function showModal({ title, body, actionText, onAction, actionClass = 'btn-primary' }) {
  const modal = document.getElementById('customModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const actionBtn = document.getElementById('modalActionBtn');

  modalTitle.innerText = title;
  modalBody.innerHTML = body;
  actionBtn.innerText = actionText;
  actionBtn.className = `btn ${actionClass}`;

  actionBtn.onclick = () => {
    if (onAction()) closeModal();
  };

  modal.style.display = 'flex';
}

function closeModal() {
  document.getElementById('customModal').style.display = 'none';
}

function updateProfile() {
  const name = document.getElementById('edit-profile-name').value.trim();
  const email = document.getElementById('edit-profile-email').value.trim();
  const phone = document.getElementById('edit-profile-phone').value.trim();
  const city = document.getElementById('edit-profile-city').value.trim();
  const address = document.getElementById('edit-profile-address').value.trim();

  if (!name || !email) {
    showToast('Name and Email are required', 'error');
    return;
  }

  State.currentUser.name = name;
  State.currentUser.email = email;
  State.currentUser.phone = phone;
  State.currentUser.city = city;
  State.currentUser.address = address;

  saveData();
  initApp(); // Re-initialize UI with new data
  showToast('Profile updated successfully!', 'success');
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
window.submitResolution = submitResolution;
window.postAnnouncement = postAnnouncement;
window.closeAnnouncements = closeAnnouncements;
window.helpIssue = helpIssue;
window.submitIssue = submitIssue;
window.removeImage = removeImage;
window.handleImageUpload = handleImageUpload;
window.togglePass = togglePass;
window.switchAuth = switchAuthTab;
window.switchAuthTab = switchAuthTab;
window.showNotifications = showNotifications;
window.toggleNotifications = toggleNotifications;
window.clearNotifications = clearNotifications;
window.openSettings = openSettings;
window.updateProfile = updateProfile;
window.setTheme = setTheme;
window.changePassword = changePassword;
window.toggleBiometric = toggleBiometric;
window.deactivateAccount = deactivateAccount;
window.showModal = showModal;
window.closeModal = closeModal;
window.requestResolution = requestResolution;
window.approveResolution = approveResolution;
window.rejectResolution = rejectResolution;
