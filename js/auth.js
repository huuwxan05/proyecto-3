// User Registration
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('regName').value;
        const phone = document.getElementById('regPhone').value;
        const email = document.getElementById('regEmail').value;
        const pass = document.getElementById('regPass').value;
        const pass2 = document.getElementById('regPass2').value;
        
        if (pass !== pass2) {
            alert('Mật khẩu xác nhận không khớp!');
            return;
        }
        
        if (pass.length < 6) {
            alert('Mật khẩu phải có ít nhất 6 ký tự!');
            return;
        }
        
        // Check if user exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.phone === phone)) {
            alert('Số điện thoại đã được đăng ký!');
            return;
        }
        
        // Add user
        users.push({
            id: Date.now(),
            name,
            phone,
            email,
            password: pass,
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        window.location.href = 'dangnhap.html';
    });
}

// User Login
const loginFormUser = document.getElementById('loginFormUser');
if (loginFormUser) {
    loginFormUser.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const phone = document.getElementById('loginPhone').value;
        const pass = document.getElementById('loginPassUser').value;
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.phone === phone && u.password === pass);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Đăng nhập thành công!');
            window.location.href = 'index.html';
        } else {
            alert('Số điện thoại hoặc mật khẩu không đúng!');
        }
    });
}
