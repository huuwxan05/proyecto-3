// Admin Authentication
const loginScreen = document.getElementById('loginScreen');
const adminDashboard = document.getElementById('adminDashboard');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

function checkAuth() {
    if (localStorage.getItem('adminAuth') === 'true') {
        loginScreen.style.display = 'none';
        adminDashboard.classList.add('active');
        loadAllData();
        updateMessageBadge();
        updateUserBadge();
    }
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('loginUser').value;
        const pass = document.getElementById('loginPass').value;
        
        if (user === ADMIN_USER && pass === ADMIN_PASS) {
            localStorage.setItem('adminAuth', 'true');
            loginScreen.style.display = 'none';
            adminDashboard.classList.add('active');
            loadAllData();
            updateMessageBadge();
        updateUserBadge();
            loginForm.reset();
        } else {
            alert('Tên đăng nhập hoặc mật khẩu không đúng!');
        }
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
            localStorage.removeItem('adminAuth');
            location.reload();
        }
    });
}

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        item.classList.add('active');
        document.getElementById('page-' + item.dataset.page).classList.add('active');
        
        if (item.dataset.page === 'messages') {
            displayMessages();
        }
    });
});

// Load all data
function loadAllData() {
    // Info
    document.getElementById('companyName').value = localStorage.getItem('site_companyName') || 'Điện Lạnh Lâm Nguyên';
    document.getElementById('hotline1').value = localStorage.getItem('site_hotline1') || '0909 123 456';
    document.getElementById('hotline2').value = localStorage.getItem('site_hotline2') || '0987 654 321';
    document.getElementById('email').value = localStorage.getItem('site_email') || 'info@dienlanhlamnguyen.vn';
    document.getElementById('address').value = localStorage.getItem('site_address') || '123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh';
    
    // Home
    document.getElementById('heroTitle').value = localStorage.getItem('site_heroTitle') || 'Dịch vụ Điện Lạnh Lâm Nguyên Toàn diện - Chất lượng';
    document.getElementById('heroDesc').value = localStorage.getItem('site_heroDesc') || 'Chuyên lắp đặt, sửa chữa, bảo trì hệ thống điều hòa, tủ đông, kho lạnh, máy lạnh dân dụng & công nghiệp. Đội ngũ kỹ thuật viên giàu kinh nghiệm, bảo hành dài hạn.';
    document.getElementById('heroHotline').value = localStorage.getItem('site_heroHotline') || 'Hotline: 0909 123 456';
    document.getElementById('stat1').value = localStorage.getItem('site_stat1') || '500';
    document.getElementById('stat2').value = localStorage.getItem('site_stat2') || '10';
    document.getElementById('stat3').value = localStorage.getItem('site_stat3') || '100';
    
    // About
    document.getElementById('aboutContent').value = localStorage.getItem('site_aboutContent') || 'Điện Lạnh Lâm Nguyên với hơn 10 năm kinh nghiệm trong lĩnh vực điện lạnh, tự hào là đơn vị uy tín chuyên cung cấp các dịch vụ lắp đặt, sửa chữa, bảo trì hệ thống điện lạnh cho dân dụng và công nghiệp.';
    
    // Services
    document.getElementById('service1Name').value = localStorage.getItem('site_service1Name') || 'Lắp đặt điều hòa';
    document.getElementById('service1Desc').value = localStorage.getItem('site_service1Desc') || 'Lắp đặt điều hòa dân dụng, thương mại với quy trình chuẩn, đảm bảo hiệu quả và tiết kiệm điện';
    document.getElementById('service2Name').value = localStorage.getItem('site_service2Name') || 'Sửa chữa điện lạnh';
    document.getElementById('service2Desc').value = localStorage.getItem('site_service2Desc') || 'Khắc phục mọi sự cố điều hòa, tủ lạnh, máy giặt với thời gian nhanh chóng và chi phí tối ưu';
    document.getElementById('service3Name').value = localStorage.getItem('site_service3Name') || 'Kho lạnh công nghiệp';
    document.getElementById('service3Desc').value = localStorage.getItem('site_service3Desc') || 'Thiết kế, lắp đặt hệ thống kho lạnh, cold room, phòng bảo quản thực phẩm theo tiêu chuẩn';
    
    // Contact
    document.getElementById('contactHot1').value = localStorage.getItem('site_contactHot1') || '0909 123 456';
    document.getElementById('contactHot2').value = localStorage.getItem('site_contactHot2') || '0987 654 321';
    document.getElementById('contactEmail').value = localStorage.getItem('site_contactEmail') || 'info@dienlanhlamnguyen.vn';
    document.getElementById('contactAddress').value = localStorage.getItem('site_contactAddress') || '123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh';
}

// Save functions
window.saveInfo = function() {
    localStorage.setItem('site_companyName', document.getElementById('companyName').value);
    localStorage.setItem('site_hotline1', document.getElementById('hotline1').value);
    localStorage.setItem('site_hotline2', document.getElementById('hotline2').value);
    localStorage.setItem('site_email', document.getElementById('email').value);
    localStorage.setItem('site_address', document.getElementById('address').value);
    alert('Đã lưu thông tin chung thành công!');
}

window.saveHome = function() {
    localStorage.setItem('site_heroTitle', document.getElementById('heroTitle').value);
    localStorage.setItem('site_heroDesc', document.getElementById('heroDesc').value);
    localStorage.setItem('site_heroHotline', document.getElementById('heroHotline').value);
    localStorage.setItem('site_stat1', document.getElementById('stat1').value);
    localStorage.setItem('site_stat2', document.getElementById('stat2').value);
    localStorage.setItem('site_stat3', document.getElementById('stat3').value);
    alert('Đã lưu trang chủ thành công!');
}

window.saveAbout = function() {
    localStorage.setItem('site_aboutContent', document.getElementById('aboutContent').value);
    alert('Đã lưu giới thiệu thành công!');
}

window.saveServices = function() {
    localStorage.setItem('site_service1Name', document.getElementById('service1Name').value);
    localStorage.setItem('site_service1Desc', document.getElementById('service1Desc').value);
    localStorage.setItem('site_service2Name', document.getElementById('service2Name').value);
    localStorage.setItem('site_service2Desc', document.getElementById('service2Desc').value);
    localStorage.setItem('site_service3Name', document.getElementById('service3Name').value);
    localStorage.setItem('site_service3Desc', document.getElementById('service3Desc').value);
    alert('Đã lưu dịch vụ thành công!');
}

window.saveContact = function() {
    localStorage.setItem('site_contactHot1', document.getElementById('contactHot1').value);
    localStorage.setItem('site_contactHot2', document.getElementById('contactHot2').value);
    localStorage.setItem('site_contactEmail', document.getElementById('contactEmail').value);
    localStorage.setItem('site_contactAddress', document.getElementById('contactAddress').value);
    alert('Đã lưu liên hệ thành công!');
}

// Messages
function updateMessageBadge() {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const badge = document.getElementById('msgBadge');
    if (badge) {
        badge.textContent = messages.length;
        badge.style.display = messages.length > 0 ? 'block' : 'none';
    }
}

function displayMessages() {
    const container = document.getElementById('messagesContainer');
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    
    if (messages.length === 0) {
        container.innerHTML = '<div class="empty-messages"><i class="fas fa-inbox"></i><p>Chưa có tin nhắn nào</p></div>';
        return;
    }
    
    container.innerHTML = messages.map(msg => `
        <div class="message-card">
            <div class="message-header">
                <div>
                    <div class="message-name">${escapeHtml(msg.name)}</div>
                    <div class="message-date">${msg.date}</div>
                </div>
            </div>
            <div class="message-info">
                <span><i class="fas fa-phone"></i> ${escapeHtml(msg.phone)}</span>
                ${msg.email ? `<span><i class="fas fa-envelope"></i> ${escapeHtml(msg.email)}</span>` : ''}
                <span><i class="fas fa-tools"></i> ${getService(msg.service)}</span>
            </div>
            <div class="message-body">${escapeHtml(msg.message)}</div>
            <button class="delete-msg" onclick="deleteMessage(${msg.id})">
                <i class="fas fa-trash"></i> Xóa tin nhắn
            </button>
        </div>
    `).join('');
}

function getService(s) {
    const map = {'lap-dat': 'Lắp đặt điều hòa', 'sua-chua': 'Sửa chữa điện lạnh', 'kho-lanh': 'Kho lạnh công nghiệp', 'bao-tri': 'Bảo trì định kỳ', 'khac': 'Khác'};
    return map[s] || s;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

window.deleteMessage = function(id) {
    if (confirm('Xóa tin nhắn này?')) {
        let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages = messages.filter(m => m.id !== id);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        displayMessages();
        updateMessageBadge();
        updateUserBadge();
    }
}

window.clearAllMessages = function() {
    if (confirm('Xóa tất cả tin nhắn?')) {
        localStorage.removeItem('contactMessages');
        displayMessages();
        updateMessageBadge();
        updateUserBadge();
    }
}

document.addEventListener('DOMContentLoaded', checkAuth);

// Users management
window.displayUsers = function() {
    const container = document.getElementById('usersContainer');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.length === 0) {
        container.innerHTML = '<div class="empty-messages"><i class="fas fa-users"></i><p>Chưa có khách hàng đăng ký</p></div>';
        return;
    }
    
    container.innerHTML = users.map(user => `
        <div class="message-card">
            <div class="message-header">
                <div>
                    <div class="message-name">${escapeHtml(user.name)}</div>
                    <div class="message-date">Đăng ký: ${new Date(user.createdAt).toLocaleString('vi-VN')}</div>
                </div>
            </div>
            <div class="message-info">
                <span><i class="fas fa-phone"></i> ${escapeHtml(user.phone)}</span>
                ${user.email ? `<span><i class="fas fa-envelope"></i> ${escapeHtml(user.email)}</span>` : ''}
            </div>
            <button class="delete-msg" onclick="deleteUser(${user.id})">
                <i class="fas fa-trash"></i> Xóa tài khoản
            </button>
        </div>
    `).join('');
}

window.deleteUser = function(id) {
    if (confirm('Xóa tài khoản khách hàng này?')) {
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        users = users.filter(u => u.id !== id);
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers();
    }
}

window.clearAllUsers = function() {
    if (confirm('Xóa tất cả tài khoản khách hàng?')) {
        localStorage.removeItem('users');
        displayUsers();
    }
}

// Update nav click for users
document.querySelectorAll('.nav-item').forEach(item => {
    const originalClick = item.onclick;
    item.addEventListener('click', () => {
        if (item.dataset.page === 'users') {
            setTimeout(displayUsers, 100);
        }
    });
});

function updateUserBadge() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const badge = document.getElementById('userBadge');
    if (badge) {
        badge.textContent = users.length;
        badge.style.display = users.length > 0 ? 'inline-flex' : 'none';
    }
}

// Update badges on load
const origCheckAuth = checkAuth;
checkAuth = function() {
    origCheckAuth.call(this);
    if (localStorage.getItem('adminAuth') === 'true') {
        updateUserBadge();
    }
};

// Pricing
window.savePricing = function() {
    localStorage.setItem('price1hp', document.getElementById('price1hp').value);
    localStorage.setItem('price15hp', document.getElementById('price15hp').value);
    localStorage.setItem('price2hp', document.getElementById('price2hp').value);
    localStorage.setItem('price25hp', document.getElementById('price25hp').value);
    localStorage.setItem('priceGas', document.getElementById('priceGas').value);
    localStorage.setItem('priceBoard', document.getElementById('priceBoard').value);
    localStorage.setItem('priceClean', document.getElementById('priceClean').value);
    localStorage.setItem('pricePart', document.getElementById('pricePart').value);
    localStorage.setItem('priceCold', document.getElementById('priceCold').value);
    localStorage.setItem('priceMaintenance', document.getElementById('priceMaintenance').value);
    alert('Đã lưu bảng giá thành công!');
}

function loadPricing() {
    document.getElementById('price1hp').value = localStorage.getItem('price1hp') || '1.500.000đ';
    document.getElementById('price15hp').value = localStorage.getItem('price15hp') || '1.800.000đ';
    document.getElementById('price2hp').value = localStorage.getItem('price2hp') || '2.200.000đ';
    document.getElementById('price25hp').value = localStorage.getItem('price25hp') || '2.800.000đ';
    document.getElementById('priceGas').value = localStorage.getItem('priceGas') || '350.000đ';
    document.getElementById('priceBoard').value = localStorage.getItem('priceBoard') || '500.000đ';
    document.getElementById('priceClean').value = localStorage.getItem('priceClean') || '250.000đ';
    document.getElementById('pricePart').value = localStorage.getItem('pricePart') || 'Liên hệ';
    document.getElementById('priceCold').value = localStorage.getItem('priceCold') || '2.000.000đ/m²';
    document.getElementById('priceMaintenance').value = localStorage.getItem('priceMaintenance') || '1.000.000đ/năm';
}

// Update loadAllData or call separately
const origLoadAll = loadAllData;
loadAllData = function() {
    origLoadAll.call(this);
    loadPricing();
};

// Products management
window.addProduct = function() {
    const name = prompt('Tên sản phẩm:');
    if (!name) return;
    const price = prompt('Giá:') || 'Liên hệ';
    const desc = prompt('Mô tả:') || '';
    const cat = prompt('Danh mục (dieuhhoa/tulanh/maylanh/phukien):') || 'dieuhhoa';
    
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    products.push({ id: Date.now(), name, price, desc, category: cat });
    localStorage.setItem('products', JSON.stringify(products));
    displayAdminProducts();
    alert('Đã thêm sản phẩm!');
}

window.displayAdminProducts = function() {
    const list = document.getElementById('adminProductsList');
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    
    if (!list) return;
    if (products.length === 0) {
        list.innerHTML = '<p style="color:var(--text-light);">Chưa có sản phẩm</p>';
        return;
    }
    
    list.innerHTML = products.map(p => `
        <div style="padding:12px; border:1px solid var(--border); border-radius:8px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
            <div>
                <strong>${escapeHtml(p.name)}</strong> - ${escapeHtml(p.price)}<br>
                <small style="color:var(--text-light);">${escapeHtml(p.category)} | ${escapeHtml(p.desc)}</small>
            </div>
            <button onclick="deleteProduct(${p.id})" style="background:var(--danger); color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer;">Xóa</button>
        </div>
    `).join('');
}

window.deleteProduct = function(id) {
    if (confirm('Xóa sản phẩm này?')) {
        let products = JSON.parse(localStorage.getItem('products') || '[]');
        products = products.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(products));
        displayAdminProducts();
    }
}

// Hook into nav
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        if (item.dataset.page === 'products') {
            setTimeout(displayAdminProducts, 100);
        }
    });
});

window.editProduct = function(id) {
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    const p = products.find(x => x.id == id);
    if (!p) return;
    
    const name = prompt('Tên sản phẩm:', p.name);
    if (name === null) return;
    const price = prompt('Giá:', p.price);
    if (price === null) return;
    const desc = prompt('Mô tả:', p.desc);
    if (desc === null) return;
    const cat = prompt('Danh mục (dieuhhoa/tulanh/maylanh/phukien):', p.category);
    if (cat === null) return;
    
    p.name = name;
    p.price = price || 'Liên hệ';
    p.desc = desc || '';
    p.category = cat;
    
    localStorage.setItem('products', JSON.stringify(products));
    displayAdminProducts();
    alert('Đã cập nhật sản phẩm!');
}

window.displayAdminProducts = function() {
    const list = document.getElementById('adminProductsList');
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    
    if (!list) return;
    if (products.length === 0) {
        list.innerHTML = '<p style="color:var(--text-light);">Chưa có sản phẩm</p>';
        return;
    }
    
    list.innerHTML = products.map(p => `
        <div style="padding:12px; border:1px solid var(--border); border-radius:8px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;">
            <div style="flex:1;">
                <strong>${escapeHtml(p.name)}</strong> - <span style="color:var(--primary); font-weight:600;">${escapeHtml(p.price)}</span><br>
                <small style="color:var(--text-light);">[${escapeHtml(p.category)}] ${escapeHtml(p.desc)}</small>
            </div>
            <div style="display:flex; gap:8px;">
                <button onclick="editProduct(${p.id})" style="background:var(--primary); color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer;"><i class="fas fa-edit"></i> Sửa</button>
                <button onclick="deleteProduct(${p.id})" style="background:var(--danger); color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer;"><i class="fas fa-trash"></i> Xóa</button>
            </div>
        </div>
    `).join('');
}
