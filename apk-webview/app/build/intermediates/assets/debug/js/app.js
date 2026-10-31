// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Animated Counter
function animateCounter() {
    const counters = document.querySelectorAll('.hero__stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count') || counter.textContent);
        if (isNaN(target)) return;
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        counter.textContent = '0' + (target === 100 ? '%' : '+');
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (target === 100 ? '%' : '+');
            }
        };
        updateCounter();
    });
}

const heroSection = document.querySelector('.hero');
if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(heroSection);
}

// Particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}
createParticles();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            window.scrollTo({ top: target.offsetTop - headerHeight, behavior: 'smooth' });
        }
    });
});

// Back to top
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) backToTopBtn.classList.add('visible');
    else backToTopBtn.classList.remove('visible');
    const header = document.querySelector('.header');
    if (window.pageYOffset > 50) header.style.boxShadow = '0 4px 20px rgba(0, 102, 204, 0.15)';
    else header.style.boxShadow = '0 2px 8px rgba(0, 102, 204, 0.08)';
});
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value;
        const phone = document.getElementById('contactPhone').value;
        const email = document.getElementById('contactFormEmail').value;
        const service = document.getElementById('contactService').value;
        const message = document.getElementById('contactMessage').value;
        
        const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.unshift({
            id: Date.now(),
            name, phone, email, service, message,
            date: new Date().toLocaleString('vi-VN')
        });
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Đang gửi...</span>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            updateMessagesList();
        }, 1000);
    });
}

// Admin
const adminLoginModal = document.getElementById('adminLoginModal');
const adminLoginClose = document.getElementById('adminLoginClose');
const adminLoginForm = document.getElementById('adminLoginForm');
const adminPanel = document.getElementById('adminPanel');
const adminLogout = document.getElementById('adminLogout');
const adminPreview = document.getElementById('adminPreview');
const adminSaveAll = document.getElementById('adminSaveAll');

const ADMIN_CREDENTIALS = { username: 'admin', password: 'admin123' };

function checkAdminAuth() {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        adminPanel.classList.add('active');
        updateMessagesList();
    }
}

if (adminLoginClose) adminLoginClose.addEventListener('click', () => adminLoginModal.classList.remove('active'));
if (adminLoginModal) {
    adminLoginModal.querySelector('.modal__overlay').addEventListener('click', () => adminLoginModal.classList.remove('active'));
}

if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = document.getElementById('adminUsername').value;
        const p = document.getElementById('adminPassword').value;
        if (u === ADMIN_CREDENTIALS.username && p === ADMIN_CREDENTIALS.password) {
            localStorage.setItem('adminLoggedIn', 'true');
            adminLoginModal.classList.remove('active');
            adminPanel.classList.add('active');
            adminLoginForm.reset();
            updateMessagesList();
            alert('Đăng nhập thành công!');
        } else {
            alert('Tên đăng nhập hoặc mật khẩu không đúng!');
        }
    });
}

if (adminLogout) {
    adminLogout.addEventListener('click', () => {
        if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
            localStorage.removeItem('adminLoggedIn');
            adminPanel.classList.remove('active');
        }
    });
}

if (adminPreview) {
    adminPreview.addEventListener('click', () => {
        adminPanel.classList.remove('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Admin tabs
document.querySelectorAll('.admin-nav__item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.admin-nav__item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
        item.classList.add('active');
        document.getElementById('tab-' + item.dataset.tab).classList.add('active');
        if (item.dataset.tab === 'messages') updateMessagesList();
    });
});

// Save all
if (adminSaveAll) {
    adminSaveAll.addEventListener('click', () => {
        // General
        const companyName = document.getElementById('adminCompanyName').value;
        const hotline1 = document.getElementById('adminHotline1').value;
        const hotline2 = document.getElementById('adminHotline2').value;
        const email = document.getElementById('adminEmail').value;
        const address = document.getElementById('adminAddress').value;
        
        localStorage.setItem('companyName', companyName);
        localStorage.setItem('hotline1', hotline1);
        localStorage.setItem('hotline2', hotline2);
        localStorage.setItem('email', email);
        localStorage.setItem('address', address);
        
        document.getElementById('navLogoText').textContent = companyName;
        document.getElementById('footerLogoText').textContent = companyName;
        document.getElementById('footerCompanyName').textContent = companyName;
        document.getElementById('aboutCompanyName').textContent = companyName;
        document.getElementById('contactHotline1').textContent = hotline1;
        document.getElementById('contactHotline2').textContent = hotline2;
        document.getElementById('contactEmail').textContent = email;
        document.getElementById('contactAddress').innerHTML = address.replace(/, /g, '<br>');
        document.getElementById('footerPhone').textContent = hotline1;
        document.getElementById('footerEmail').textContent = email;
        document.getElementById('footerAddress').textContent = address;
        
        // Hero
        const heroTitle = document.getElementById('adminHeroTitle').value;
        const heroDesc = document.getElementById('adminHeroDesc').value;
        const stat1 = document.getElementById('adminStat1').value;
        const stat2 = document.getElementById('adminStat2').value;
        const stat3 = document.getElementById('adminStat3').value;
        const heroHotline = document.getElementById('adminHeroHotline').value;
        
        localStorage.setItem('heroTitle', heroTitle);
        localStorage.setItem('heroDesc', heroDesc);
        localStorage.setItem('stat1', stat1);
        localStorage.setItem('stat2', stat2);
        localStorage.setItem('stat3', stat3);
        localStorage.setItem('heroHotline', heroHotline);
        
        document.getElementById('heroTitle').innerHTML = heroTitle.replace(companyName.split(' ')[2] || 'Lâm Nguyên', `<span class="hero__title--accent">${companyName.split(' ').slice(2).join(' ') || 'Lâm Nguyên'}</span>`);
        document.getElementById('heroDescription').textContent = heroDesc;
        document.getElementById('heroHotline').textContent = heroHotline;
        document.getElementById('stat1').setAttribute('data-count', stat1);
        document.getElementById('stat2').setAttribute('data-count', stat2);
        document.getElementById('stat3').setAttribute('data-count', stat3);
        document.getElementById('stat1').textContent = '0' + (stat1 == 100 ? '%' : '+');
        document.getElementById('stat2').textContent = '0+';
        document.getElementById('stat3').textContent = '0%';
        animateCounter();
        
        // About
        const aboutDesc = document.getElementById('adminAboutDesc').value;
        localStorage.setItem('aboutDesc', aboutDesc);
        document.getElementById('aboutDesc').textContent = aboutDesc;
        
        // Services
        const s1t = document.getElementById('adminService1Title').value;
        const s1d = document.getElementById('adminService1Desc').value;
        const s2t = document.getElementById('adminService2Title').value;
        const s2d = document.getElementById('adminService2Desc').value;
        const s3t = document.getElementById('adminService3Title').value;
        const s3d = document.getElementById('adminService3Desc').value;
        
        localStorage.setItem('s1t', s1t); localStorage.setItem('s1d', s1d);
        localStorage.setItem('s2t', s2t); localStorage.setItem('s2d', s2d);
        localStorage.setItem('s3t', s3t); localStorage.setItem('s3d', s3d);
        
        document.getElementById('service1Title').textContent = s1t;
        document.getElementById('service1Desc').textContent = s1d;
        document.getElementById('service2Title').textContent = s2t;
        document.getElementById('service2Desc').textContent = s2d;
        document.getElementById('service3Title').textContent = s3t;
        document.getElementById('service3Desc').textContent = s3d;
        
        alert('Đã lưu tất cả thay đổi thành công!');
    });
}

// Messages
function updateMessagesList() {
    const list = document.getElementById('messagesList');
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    if (!list) return;
    if (messages.length === 0) {
        list.innerHTML = '<div class="message-empty"><i class="fas fa-inbox"></i><p>Chưa có tin nhắn nào</p></div>';
        return;
    }
    list.innerHTML = messages.map(m => `
        <div class="message-item">
            <div class="message-header">
                <strong>${escapeHtml(m.name)}</strong>
                <span>${m.date}</span>
            </div>
            <div class="message-info">
                <div><i class="fas fa-phone"></i> ${escapeHtml(m.phone)}</div>
                ${m.email ? `<div><i class="fas fa-envelope"></i> ${escapeHtml(m.email)}</div>` : ''}
                <div><i class="fas fa-tools"></i> ${getServiceName(m.service)}</div>
            </div>
            <div class="message-content">
                <strong>Nội dung:</strong><br>
                ${escapeHtml(m.message).replace(/\n/g, '<br>')}
            </div>
            <button class="message-delete" onclick="deleteMessage(${m.id})"><i class="fas fa-trash"></i> Xóa</button>
        </div>
    `).join('');
}

function getServiceName(s) {
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
        updateMessagesList();
    }
};

// Load saved data
function loadSavedData() {
    const companyName = localStorage.getItem('companyName') || 'Điện Lạnh Lâm Nguyên';
    const hotline1 = localStorage.getItem('hotline1') || '0909 123 456';
    const hotline2 = localStorage.getItem('hotline2') || '0987 654 321';
    const email = localStorage.getItem('email') || 'info@dienlanhlamnguyen.vn';
    const address = localStorage.getItem('address') || '123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh';
    
    document.getElementById('navLogoText').textContent = companyName;
    document.getElementById('footerLogoText').textContent = companyName;
    document.getElementById('footerCompanyName').textContent = companyName;
    document.getElementById('aboutCompanyName').textContent = companyName;
    document.getElementById('contactHotline1').textContent = hotline1;
    document.getElementById('contactHotline2').textContent = hotline2;
    document.getElementById('contactEmail').textContent = email;
    document.getElementById('contactAddress').innerHTML = address.replace(/, /g, '<br>');
    document.getElementById('footerPhone').textContent = hotline1;
    document.getElementById('footerEmail').textContent = email;
    document.getElementById('footerAddress').textContent = address;
    
    document.getElementById('adminCompanyName').value = companyName;
    document.getElementById('adminHotline1').value = hotline1;
    document.getElementById('adminHotline2').value = hotline2;
    document.getElementById('adminEmail').value = email;
    document.getElementById('adminAddress').value = address;
    
    const heroTitle = localStorage.getItem('heroTitle') || `Dịch vụ ${companyName} Toàn diện - Chất lượng`;
    const heroDesc = localStorage.getItem('heroDesc') || 'Chuyên lắp đặt, sửa chữa, bảo trì hệ thống điều hòa, tủ đông, kho lạnh, máy lạnh dân dụng & công nghiệp. Đội ngũ kỹ thuật viên giàu kinh nghiệm, bảo hành dài hạn.';
    const stat1 = localStorage.getItem('stat1') || '500';
    const stat2 = localStorage.getItem('stat2') || '10';
    const stat3 = localStorage.getItem('stat3') || '100';
    const heroHotline = localStorage.getItem('heroHotline') || `Hotline: ${hotline1}`;
    
    document.getElementById('heroTitle').innerHTML = heroTitle.replace(/Lâm Nguyên/g, '<span class="hero__title--accent">Lâm Nguyên</span>');
    document.getElementById('heroDescription').textContent = heroDesc;
    document.getElementById('heroHotline').textContent = heroHotline;
    document.getElementById('stat1').setAttribute('data-count', stat1);
    document.getElementById('stat2').setAttribute('data-count', stat2);
    document.getElementById('stat3').setAttribute('data-count', stat3);
    
    document.getElementById('adminHeroTitle').value = heroTitle;
    document.getElementById('adminHeroDesc').value = heroDesc;
    document.getElementById('adminStat1').value = stat1;
    document.getElementById('adminStat2').value = stat2;
    document.getElementById('adminStat3').value = stat3;
    document.getElementById('adminHeroHotline').value = heroHotline;
    
    const aboutDesc = localStorage.getItem('aboutDesc') || `${companyName} với hơn 10 năm kinh nghiệm trong lĩnh vực điện lạnh, tự hào là đơn vị uy tín chuyên cung cấp các dịch vụ lắp đặt, sửa chữa, bảo trì hệ thống điện lạnh cho dân dụng và công nghiệp.`;
    document.getElementById('aboutDesc').textContent = aboutDesc;
    document.getElementById('adminAboutDesc').value = aboutDesc;
    
    const s1t = localStorage.getItem('s1t') || 'Lắp đặt điều hòa';
    const s1d = localStorage.getItem('s1d') || 'Lắp đặt điều hòa dân dụng, thương mại với quy trình chuẩn, đảm bảo hiệu quả và tiết kiệm điện';
    const s2t = localStorage.getItem('s2t') || 'Sửa chữa điện lạnh';
    const s2d = localStorage.getItem('s2d') || 'Khắc phục mọi sự cố điều hòa, tủ lạnh, máy giặt với thời gian nhanh chóng và chi phí tối ưu';
    const s3t = localStorage.getItem('s3t') || 'Kho lạnh công nghiệp';
    const s3d = localStorage.getItem('s3d') || 'Thiết kế, lắp đặt hệ thống kho lạnh, cold room, phòng bảo quản thực phẩm theo tiêu chuẩn';
    
    document.getElementById('service1Title').textContent = s1t;
    document.getElementById('service1Desc').textContent = s1d;
    document.getElementById('service2Title').textContent = s2t;
    document.getElementById('service2Desc').textContent = s2d;
    document.getElementById('service3Title').textContent = s3t;
    document.getElementById('service3Desc').textContent = s3d;
    
    document.getElementById('adminService1Title').value = s1t;
    document.getElementById('adminService1Desc').value = s1d;
    document.getElementById('adminService2Title').value = s2t;
    document.getElementById('adminService2Desc').value = s2d;
    document.getElementById('adminService3Title').value = s3t;
    document.getElementById('adminService3Desc').value = s3d;
}

document.addEventListener('DOMContentLoaded', () => {
    checkAdminAuth();
    loadSavedData();
    setTimeout(animateCounter, 500);
});

// Live Chat Widget
const chatToggle = document.getElementById('chatToggle');
const chatBox = document.getElementById('chatBox');
const chatClose = document.getElementById('chatClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');
const chatBadge = document.getElementById('chatBadge');
const quickReplies = document.querySelectorAll('.quick-reply');

let chatOpen = false;

if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        chatOpen = !chatOpen;
        if (chatOpen) {
            chatBox.classList.add('active');
            chatBadge.style.display = 'none';
            setTimeout(() => chatInput.focus(), 300);
        } else {
            chatBox.classList.remove('active');
        }
    });
}

if (chatClose) {
    chatClose.addEventListener('click', () => {
        chatOpen = false;
        chatBox.classList.remove('active');
    });
}

function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message chat-message-user';
    messageDiv.innerHTML = `
        <div class="chat-message-avatar">
            <i class="fas fa-user"></i>
        </div>
        <div class="chat-message-content">
            <div class="chat-message-bubble">${escapeHtml(text)}</div>
            <div class="chat-message-time">Vừa xong</div>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addBotMessage(text) {
    setTimeout(() => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message chat-message-bot';
        messageDiv.innerHTML = `
            <div class="chat-message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="chat-message-content">
                <div class="chat-message-bubble">${text}</div>
                <div class="chat-message-time">Vừa xong</div>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 800);
}

function getBotResponse(userText) {
    const text = userText.toLowerCase();
    
    if (text.includes('báo giá') || text.includes('gia')) {
        return 'Vui lòng để lại thông tin liên hệ hoặc gọi ngay hotline <strong>0909 123 456</strong> để được báo giá nhanh chóng và chính xác nhất!';
    } else if (text.includes('lắp đặt')) {
        return 'Chúng tôi chuyên lắp đặt điều hòa dân dụng và thương mại. Vui lòng cung cấp diện tích, loại điều hòa cần lắp đặt để được tư vấn cụ thể!';
    } else if (text.includes('sửa chữa') || text.includes('khẩn cấp')) {
        return 'Chúng tôi có dịch vụ sửa chữa khẩn cấp 24/7. Gọi ngay <strong>0909 123 456</strong> hoặc <strong>0987 654 321</strong> để được hỗ trợ ngay!';
    } else if (text.includes('liên hệ') || text.includes('gọi')) {
        return 'Hotline: <strong>0909 123 456</strong> - <strong>0987 654 321</strong><br>Email: info@dienlanhlamnguyen.vn<br>Địa chỉ: 123 Đường Nguyễn Văn Linh, Quận 7, TP.HCM';
    } else if (text.includes('xin chào') || text.includes('hello')) {
        return 'Xin chào! Tôi có thể giúp bạn tư vấn về dịch vụ điện lạnh, báo giá, hoặc giải đáp thắc mắc. Bạn cần hỗ trợ gì ạ?';
    } else {
        return 'Cảm ơn bạn đã liên hệ! Để được tư vấn chi tiết và nhanh chóng nhất, vui lòng gọi hotline <strong>0909 123 456</strong> hoặc để lại thông tin trong form liên hệ. Chúng tôi sẽ phản hồi ngay ạ!';
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function sendMessage() {
    const text = chatInput.value.trim();
    if (text === '') return;
    
    addUserMessage(text);
    chatInput.value = '';
    
    // Remove quick replies after first message
    const quickRepliesDiv = document.querySelector('.chat-quick-replies');
    if (quickRepliesDiv) {
        quickRepliesDiv.style.display = 'none';
    }
    
    // Bot response
    const response = getBotResponse(text);
    addBotMessage(response);
}

if (chatSend) {
    chatSend.addEventListener('click', sendMessage);
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

quickReplies.forEach(btn => {
    btn.addEventListener('click', () => {
        const reply = btn.getAttribute('data-reply');
        addUserMessage(reply);
        const quickRepliesDiv = document.querySelector('.chat-quick-replies');
        if (quickRepliesDiv) {
            quickRepliesDiv.style.display = 'none';
        }
        const response = getBotResponse(reply);
        addBotMessage(response);
    });
});
