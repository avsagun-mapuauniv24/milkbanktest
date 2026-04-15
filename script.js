/* ================================================
   MAKATI MILK BANK - COMPLETE APPLICATION LOGIC
   ================================================ */

// Current edit mode for forms
let editingId = null;
let editingType = null;

// Data structure
const db = {
  inventory: [],
  donors: [],
  beneficiaries: [],
  activity: []
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('App initialized');
  
  // Check authentication - redirect to login if not authenticated
  checkAuthStatus();
  
  // Initialize theme
  initializeTheme();
  
  loadDataFromStorage();
  updateDashboard();
  markFirstNavItemActive();
  
  // Setup user menu
  setupUserMenu();
});

/* ================================================
   THEME MANAGEMENT (Light/Dark Mode)
   ================================================ */

function initializeTheme() {
  // Check if user has a saved theme preference
  const savedTheme = localStorage.getItem('milkbank_theme');
  
  // Check system preference if no saved preference
  if (!savedTheme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  } else {
    setTheme(savedTheme);
  }
  
  // Setup toggle button
  setupThemeToggle();
}

function setTheme(theme) {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.querySelector('.theme-icon');
  
  if (theme === 'dark') {
    body.classList.add('dark');
    if (themeIcon) themeIcon.textContent = '🌙';
  } else {
    body.classList.remove('dark');
    if (themeIcon) themeIcon.textContent = '☀️';
  }
  
  localStorage.setItem('milkbank_theme', theme);
}

function setupThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const isDark = document.body.classList.contains('dark');
      const newTheme = isDark ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }
}

/* ================================================
   DATA MANAGEMENT (LocalStorage)
   ================================================ */

function saveDataToStorage() {
  localStorage.setItem('milkbank_inventory', JSON.stringify(db.inventory));
  localStorage.setItem('milkbank_donors', JSON.stringify(db.donors));
  localStorage.setItem('milkbank_beneficiaries', JSON.stringify(db.beneficiaries));
  localStorage.setItem('milkbank_activity', JSON.stringify(db.activity));
}

function loadDataFromStorage() {
  const inventory = localStorage.getItem('milkbank_inventory');
  const donors = localStorage.getItem('milkbank_donors');
  const beneficiaries = localStorage.getItem('milkbank_beneficiaries');
  const activity = localStorage.getItem('milkbank_activity');

  if (inventory) db.inventory = JSON.parse(inventory);
  if (donors) db.donors = JSON.parse(donors);
  if (beneficiaries) db.beneficiaries = JSON.parse(beneficiaries);
  if (activity) db.activity = JSON.parse(activity);

  console.log('Data loaded:', db);
}

/* ================================================
   PAGE NAVIGATION
   ================================================ */

function switchPage(pageName) {
  // Hide all pages
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));

  // Show selected page
  const targetPage = document.getElementById(pageName);
  if (targetPage) {
    targetPage.classList.add('active');
    
    // Load page-specific data
    if (pageName === 'inventory') {
      loadInventoryTable();
    } else if (pageName === 'donors') {
      loadDonorsList();
    } else if (pageName === 'beneficiaries') {
      loadBeneficiariesList();
    } else if (pageName === 'reports') {
      loadReports();
    }
  }

  // Update active nav item
  updateActiveNavItem(pageName);
}

function markFirstNavItemActive() {
  const firstNavItem = document.querySelector('.nav-item');
  if (firstNavItem) {
    firstNavItem.classList.add('active');
  }
}

function updateActiveNavItem(pageName) {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  // Find nav item that corresponds to this page
  navItems.forEach(item => {
    const match = item.textContent.trim().toLowerCase();
    if (match.includes(pageName.toLowerCase())) {
      item.classList.add('active');
    }
  });
}

/* ================================================
   MODAL MANAGEMENT
   ================================================ */

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('show');
    modal.classList.remove('hidden');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('show');
    modal.classList.add('hidden');
  }
}

function showAlert(message) {
  const modal = document.getElementById('alertModal');
  const msgElement = document.getElementById('alertMessage');
  if (msgElement) msgElement.textContent = message;
  openModal('alertModal');
}

/* ================================================
   FORM: INVENTORY
   ================================================ */

function openInventoryForm() {
  editingId = null;
  editingType = null;
  document.getElementById('inventoryForm').reset();
  document.getElementById('inventoryModalTitle').textContent = 'Add Milk Record';
  openModal('inventoryModal');
}

function editInventory(id) {
  const item = db.inventory.find(i => i.id === id);
  if (item) {
    editingId = id;
    editingType = 'inventory';
    document.getElementById('inventoryModalTitle').textContent = 'Edit Milk Record';
    document.getElementById('invDonorName').value = item.donorName;
    document.getElementById('invQuantity').value = item.quantity;
    document.getElementById('invStatus').value = item.status;
    openModal('inventoryModal');
  }
}

function saveInventory(event) {
  event.preventDefault();

  const donorName = document.getElementById('invDonorName').value.trim();
  const quantity = parseInt(document.getElementById('invQuantity').value);
  const status = document.getElementById('invStatus').value;

  if (!donorName || !quantity || !status) {
    showAlert('⚠️ Please fill in all fields!');
    return;
  }

  if (editingId) {
    // Update existing
    const item = db.inventory.find(i => i.id === editingId);
    if (item) {
      item.donorName = donorName;
      item.quantity = quantity;
      item.status = status;
      addActivity(`Updated milk record: ${donorName} - ${quantity}ml`);
    }
  } else {
    // Create new
    const newItem = {
      id: 'inv_' + Date.now(),
      donorName,
      quantity,
      status,
      dateAdded: new Date().toLocaleDateString()
    };
    db.inventory.push(newItem);
    addActivity(`Added milk record: ${donorName} - ${quantity}ml from ${status}`);
  }

  saveDataToStorage();
  loadInventoryTable();
  closeModal('inventoryModal');
  updateDashboard();
  showAlert('✓ Milk record saved successfully!');
}

function deleteInventory(id) {
  if (confirm('Are you sure you want to delete this inventory record?')) {
    db.inventory = db.inventory.filter(i => i.id !== id);
    addActivity(`Deleted inventory record`);
    saveDataToStorage();
    loadInventoryTable();
    updateDashboard();
    showAlert('✓ Inventory record deleted!');
  }
}

function loadInventoryTable() {
  const tbody = document.getElementById('inventoryBody');
  tbody.innerHTML = '';

  if (db.inventory.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No inventory records. Add one to get started!</td></tr>';
    return;
  }

  db.inventory.forEach(item => {
    const row = document.createElement('tr');
    const statusColor = item.status === 'Fresh' ? 'badge-donated' : 
                        item.status === 'Pasteurized' ? 'badge-pasteurized' : 'badge-dispensed';
    
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.donorName}</td>
      <td>${item.quantity} ml</td>
      <td><span class="badge ${statusColor}">${item.status}</span></td>
      <td>${item.dateAdded}</td>
      <td>
        <button class="btn-small" onclick="editInventory('${item.id}')">Edit</button>
        <button class="btn-small" onclick="deleteInventory('${item.id}')" style="background: #ef4444; margin-left: 0.5rem;">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

/* ================================================
   FORM: DONOR
   ================================================ */

function openDonorForm() {
  editingId = null;
  editingType = null;
  document.getElementById('donorForm').reset();
  document.getElementById('donorModalTitle').textContent = 'Register Donor';
  openModal('donorModal');
}

function editDonor(id) {
  const donor = db.donors.find(d => d.id === id);
  if (donor) {
    editingId = id;
    editingType = 'donor';
    document.getElementById('donorModalTitle').textContent = 'Edit Donor';
    document.getElementById('donorName').value = donor.name;
    document.getElementById('donorPhone').value = donor.phone;
    document.getElementById('donorBloodType').value = donor.bloodType || '';
    document.getElementById('donorEmail').value = donor.email || '';
    openModal('donorModal');
  }
}

function saveDonor(event) {
  event.preventDefault();

  const name = document.getElementById('donorName').value.trim();
  const phone = document.getElementById('donorPhone').value.trim();
  const bloodType = document.getElementById('donorBloodType').value;
  const email = document.getElementById('donorEmail').value.trim();

  if (!name || !phone) {
    showAlert('⚠️ Please fill in required fields!');
    return;
  }

  if (editingId) {
    // Update existing
    const donor = db.donors.find(d => d.id === editingId);
    if (donor) {
      donor.name = name;
      donor.phone = phone;
      donor.bloodType = bloodType;
      donor.email = email;
      addActivity(`Updated donor: ${name}`);
    }
  } else {
    // Create new
    const newDonor = {
      id: 'donor_' + Date.now(),
      name,
      phone,
      bloodType,
      email,
      donations: 0,
      lastDonation: new Date().toLocaleDateString(),
      registered: new Date().toLocaleDateString()
    };
    db.donors.push(newDonor);
    addActivity(`Registered new donor: ${name}`);
  }

  saveDataToStorage();
  loadDonorsList();
  closeModal('donorModal');
  updateDashboard();
  showAlert('✓ Donor registered successfully!');
}

function deleteDonor(id) {
  if (confirm('Are you sure you want to delete this donor?')) {
    db.donors = db.donors.filter(d => d.id !== id);
    addActivity(`Deleted donor`);
    saveDataToStorage();
    loadDonorsList();
    updateDashboard();
    showAlert('✓ Donor deleted!');
  }
}

function loadDonorsList() {
  const container = document.getElementById('donorsList');
  container.innerHTML = '';

  if (db.donors.length === 0) {
    container.innerHTML = '<p class="empty-state" style="grid-column: 1/-1;">No donors registered yet. Add one to get started!</p>';
    return;
  }

  db.donors.forEach(donor => {
    const card = document.createElement('div');
    card.className = 'donor-card';
    card.innerHTML = `
      <h4>${donor.name}</h4>
      <p><strong>Phone:</strong> ${donor.phone}</p>
      <p><strong>Blood Type:</strong> ${donor.bloodType || 'N/A'}</p>
      <p><strong>Email:</strong> ${donor.email || 'N/A'}</p>
      <p><strong>Donations:</strong> ${donor.donations}</p>
      <p class="last-donation">Last: ${donor.lastDonation}</p>
      <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
        <button class="btn-small" onclick="editDonor('${donor.id}')">Edit</button>
        <button class="btn-small" onclick="deleteDonor('${donor.id}')" style="background: #ef4444;">Delete</button>
      </div>
    `;
    container.appendChild(card);
  });
}

/* ================================================
   FORM: BENEFICIARY
   ================================================ */

function openBeneficiaryForm() {
  editingId = null;
  editingType = null;
  document.getElementById('beneficiaryForm').reset();
  document.getElementById('beneficiaryModalTitle').textContent = 'Register Beneficiary';
  openModal('beneficiaryModal');
}

function editBeneficiary(id) {
  const beneficiary = db.beneficiaries.find(b => b.id === id);
  if (beneficiary) {
    editingId = id;
    editingType = 'beneficiary';
    document.getElementById('beneficiaryModalTitle').textContent = 'Edit Beneficiary';
    document.getElementById('childName').value = beneficiary.childName;
    document.getElementById('motherName').value = beneficiary.motherName;
    document.getElementById('contactPhone').value = beneficiary.contactPhone;
    document.getElementById('childAge').value = beneficiary.childAge;
    document.getElementById('medicalNotes').value = beneficiary.medicalNotes || '';
    openModal('beneficiaryModal');
  }
}

function saveBeneficiary(event) {
  event.preventDefault();

  const childName = document.getElementById('childName').value.trim();
  const motherName = document.getElementById('motherName').value.trim();
  const contactPhone = document.getElementById('contactPhone').value.trim();
  const childAge = parseInt(document.getElementById('childAge').value);
  const medicalNotes = document.getElementById('medicalNotes').value.trim();

  if (!childName || !motherName || !contactPhone || !childAge) {
    showAlert('⚠️ Please fill in all required fields!');
    return;
  }

  if (editingId) {
    // Update existing
    const beneficiary = db.beneficiaries.find(b => b.id === editingId);
    if (beneficiary) {
      beneficiary.childName = childName;
      beneficiary.motherName = motherName;
      beneficiary.contactPhone = contactPhone;
      beneficiary.childAge = childAge;
      beneficiary.medicalNotes = medicalNotes;
      addActivity(`Updated beneficiary: ${childName}`);
    }
  } else {
    // Create new
    const newBeneficiary = {
      id: 'benef_' + Date.now(),
      childName,
      motherName,
      contactPhone,
      childAge,
      medicalNotes,
      totalReceived: 0,
      registered: new Date().toLocaleDateString()
    };
    db.beneficiaries.push(newBeneficiary);
    addActivity(`Registered beneficiary: ${childName} (Mother: ${motherName})`);
  }

  saveDataToStorage();
  loadBeneficiariesList();
  closeModal('beneficiaryModal');
  updateDashboard();
  showAlert('✓ Beneficiary registered successfully!');
}

function deleteBeneficiary(id) {
  if (confirm('Are you sure you want to delete this beneficiary?')) {
    db.beneficiaries = db.beneficiaries.filter(b => b.id !== id);
    addActivity(`Deleted beneficiary`);
    saveDataToStorage();
    loadBeneficiariesList();
    updateDashboard();
    showAlert('✓ Beneficiary deleted!');
  }
}

function loadBeneficiariesList() {
  const container = document.getElementById('beneficiariesList');
  container.innerHTML = '';

  if (db.beneficiaries.length === 0) {
    container.innerHTML = '<p class="empty-state" style="grid-column: 1/-1;">No beneficiaries registered yet. Add one to get started!</p>';
    return;
  }

  db.beneficiaries.forEach(beneficiary => {
    const card = document.createElement('div');
    card.className = 'beneficiary-card';
    card.innerHTML = `
      <div class="card-header">
        <h4>${beneficiary.childName}</h4>
        <span class="status-badge">Active</span>
      </div>
      <p><strong>Mother:</strong> ${beneficiary.motherName}</p>
      <p><strong>Phone:</strong> ${beneficiary.contactPhone}</p>
      <p><strong>Age:</strong> ${beneficiary.childAge} months</p>
      <p><strong>Total Received:</strong> ${beneficiary.totalReceived} ml</p>
      ${beneficiary.medicalNotes ? `<p><strong>Notes:</strong> ${beneficiary.medicalNotes}</p>` : ''}
      <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
        <button class="btn-small" onclick="editBeneficiary('${beneficiary.id}')">Edit</button>
        <button class="btn-small" onclick="deleteBeneficiary('${beneficiary.id}')" style="background: #ef4444;">Delete</button>
      </div>
    `;
    container.appendChild(card);
  });
}

/* ================================================
   DASHBOARD UPDATES
   ================================================ */

function updateDashboard() {
  // Calculate totals
  const totalMilk = db.inventory.reduce((sum, item) => sum + item.quantity, 0);
  const totalDonors = db.donors.length;
  const totalBeneficiaries = db.beneficiaries.length;
  const totalDistributed = db.inventory
    .filter(item => item.status === 'Dispensed')
    .reduce((sum, item) => sum + item.quantity, 0);

  // Update KPI cards
  document.getElementById('totalMilk').textContent = totalMilk;
  document.getElementById('totalDonors').textContent = totalDonors;
  document.getElementById('totalBeneficiaries').textContent = totalBeneficiaries;
  document.getElementById('totalDistributed').textContent = totalDistributed;

  // Update status bars
  const freshMilk = db.inventory
    .filter(item => item.status === 'Fresh')
    .reduce((sum, item) => sum + item.quantity, 0);
  const pasteurizedMilk = db.inventory
    .filter(item => item.status === 'Pasteurized')
    .reduce((sum, item) => sum + item.quantity, 0);
  const dispensedMilk = db.inventory
    .filter(item => item.status === 'Dispensed')
    .reduce((sum, item) => sum + item.quantity, 0);

  document.getElementById('statusFresh').textContent = freshMilk + ' ml';
  document.getElementById('statusPasteurized').textContent = pasteurizedMilk + ' ml';
  document.getElementById('statusDispensed').textContent = dispensedMilk + ' ml';

  // Update progress bars
  const maxMilk = Math.max(freshMilk, pasteurizedMilk, dispensedMilk) || 100;
  document.getElementById('barFresh').style.width = ((freshMilk / maxMilk) * 100) + '%';
  document.getElementById('barPasteurized').style.width = ((pasteurizedMilk / maxMilk) * 100) + '%';
  document.getElementById('barDispensed').style.width = ((dispensedMilk / maxMilk) * 100) + '%';

  // Update recent activity
  updateRecentActivity();
}

function updateRecentActivity() {
  const container = document.getElementById('recentActivity');
  container.innerHTML = '';

  if (db.activity.length === 0) {
    container.innerHTML = '<p class="empty-state">No activity yet</p>';
    return;
  }

  const recentActivities = db.activity.slice(-8).reverse();
  recentActivities.forEach(activity => {
    const item = document.createElement('div');
    item.className = 'activity-item';
    const iconMap = {
      'Added': '➕',
      'Updated': '✏️',
      'Deleted': '🗑️',
      'Registered': '📝',
      'Distributed': '📦'
    };
    const icon = Object.keys(iconMap).find(key => activity.message.includes(key)) 
                 ? iconMap[Object.keys(iconMap).find(key => activity.message.includes(key))] 
                 : '📌';
    
    item.innerHTML = `
      <div class="activity-icon">${icon}</div>
      <div class="activity-details">
        <p class="activity-title">${activity.message}</p>
        <p class="activity-meta">${activity.timestamp}</p>
      </div>
    `;
    container.appendChild(item);
  });
}

function addActivity(message) {
  const now = new Date();
  const timestamp = now.toLocaleString();
  db.activity.push({
    message,
    timestamp
  });
  saveDataToStorage();
}

/* ================================================
   REPORTS
   ================================================ */

function loadReports() {
  const totalDonated = db.inventory.reduce((sum, item) => sum + item.quantity, 0);
  const totalDistributed = db.inventory
    .filter(item => item.status === 'Dispensed')
    .reduce((sum, item) => sum + item.quantity, 0);
  const currentStock = totalDonated - totalDistributed;
  const activeDonors = db.donors.length;

  document.getElementById('reportDonated').textContent = totalDonated + ' ml';
  document.getElementById('reportDistributed').textContent = totalDistributed + ' ml';
  document.getElementById('reportStock').textContent = currentStock + ' ml';
  document.getElementById('reportActiveDonors').textContent = activeDonors;
}

function generateReport(type) {
  const totalDonated = db.inventory.reduce((sum, item) => sum + item.quantity, 0);
  const freshMilk = db.inventory
    .filter(item => item.status === 'Fresh')
    .reduce((sum, item) => sum + item.quantity, 0);
  const totalBeneficiaries = db.beneficiaries.length;

  let message = `${type.charAt(0).toUpperCase() + type.slice(1)} Report Generated!\n\n`;
  message += `Total Donations: ${totalDonated} ml\n`;
  message += `Fresh Milk: ${freshMilk} ml\n`;
  message += `Active Beneficiaries: ${totalBeneficiaries}\n`;
  message += `Active Donors: ${db.donors.length}\n`;

  showAlert(message);
}

/* ================================================
   ACCESSIBILITY & GLOBAL FUNCTIONS
   ================================================ */

// Make functions globally accessible

/* ================================================
   AUTHENTICATION & SESSION MANAGEMENT
   ================================================ */

function checkAuthStatus() {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  
  if (!isLoggedIn) {
    // Redirect to login page if not authenticated
    window.location.href = 'signin.html';
  }
}

function handleLogout() {
  // Confirm logout with user
  if (confirm('Are you sure you want to logout?')) {
    // Clear authentication session
    localStorage.removeItem('isLoggedIn');
    
    // Log the logout action
    console.log('User logged out at', new Date().toLocaleTimeString());
    
    // Redirect to login page
    window.location.href = 'signin.html';
  }
}

function setupUserMenu() {
  const userMenuTrigger = document.getElementById('userMenuTrigger');
  const userMenuDropdown = document.getElementById('userMenuDropdown');
  
  if (userMenuTrigger && userMenuDropdown) {
    // Toggle dropdown on click
    userMenuTrigger.addEventListener('click', function(e) {
      e.stopPropagation();
      userMenuDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!userMenuTrigger.contains(e.target) && !userMenuDropdown.contains(e.target)) {
        userMenuDropdown.classList.remove('show');
      }
    });
    
    // Close dropdown when menu item is clicked (will happen via handleLogout)
    const menuItems = userMenuDropdown.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      item.addEventListener('click', function() {
        setTimeout(() => {
          userMenuDropdown.classList.remove('show');
        }, 100);
      });
    });
  }
}

// Make functions globally accessible
window.switchPage = switchPage;
window.openModal = openModal;
window.closeModal = closeModal;
window.showAlert = showAlert;
window.openInventoryForm = openInventoryForm;
window.editInventory = editInventory;
window.deleteInventory = deleteInventory;
window.openDonorForm = openDonorForm;
window.editDonor = editDonor;
window.deleteDonor = deleteDonor;
window.openBeneficiaryForm = openBeneficiaryForm;
window.editBeneficiary = editBeneficiary;
window.deleteBeneficiary = deleteBeneficiary;
window.loadReports = loadReports;
window.generateReport = generateReport;
window.saveInventory = saveInventory;
window.saveDonor = saveDonor;
window.saveBeneficiary = saveBeneficiary;
window.handleLogout = handleLogout;
window.checkAuthStatus = checkAuthStatus;
window.setupUserMenu = setupUserMenu;

console.log('✓ Makati Milk Bank System Ready');
