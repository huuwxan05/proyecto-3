// Products data
let products = JSON.parse(localStorage.getItem('products') || '[]');

if (products.length === 0) {
    products = [
        { id: 1, name: 'Điều hòa Inverter 1HP', category: 'dieuhhoa', price: '8.500.000đ', desc: 'Tiết kiệm điện, vận hành êm ái' },
        { id: 2, name: 'Điều hòa Inverter 1.5HP', category: 'dieuhhoa', price: '10.500.000đ', desc: 'Công suất mạnh mẽ' },
        { id: 3, name: 'Tủ lạnh Side By Side', category: 'tulanh', price: '15.000.000đ', desc: 'Dung tích lớn, hiện đại' },
        { id: 4, name: 'Máy lạnh công nghiệp', category: 'maylanh', price: 'Liên hệ', desc: 'Giải pháp cho kho lạnh' },
        { id: 5, name: 'Gas điều hòa R32', category: 'phukien', price: '450.000đ', desc: 'Gas chính hãng' },
    ];
    localStorage.setItem('products', JSON.stringify(products));
}

function renderProducts(filter = 'all') {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    let filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    if (filtered.length === 0) {
        grid.innerHTML = '<p style="text-align:center; grid-column:1/-1; color:var(--text-secondary);">Chưa có sản phẩm</p>';
        return;
    }
    
    grid.innerHTML = filtered.map(p => `
        <div class="product-card">
            <div class="product-img">
                <i class="fas fa-snowflake"></i>
            </div>
            <div class="product-info">
                <div class="product-name">${escapeHtml(p.name)}</div>
                <div class="product-price">${escapeHtml(p.price)}</div>
                <div class="product-desc">${escapeHtml(p.desc)}</div>
                <button class="product-btn" onclick="contactProduct('${escapeHtml(p.name)}')">
                    <i class="fas fa-phone"></i> Liên hệ mua
                </button>
            </div>
        </div>
    `).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

window.contactProduct = function(name) {
    alert('Vui lòng liên hệ hotline 0909 123 456 để đặt mua: ' + name);
    window.location.href = 'index.html#contact';
}

// Category tabs
document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderProducts(tab.dataset.cat);
    });
});

document.addEventListener('DOMContentLoaded', () => renderProducts());
