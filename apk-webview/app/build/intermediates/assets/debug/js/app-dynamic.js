// Apply saved data to website
function applySavedData() {
    // Info
    const companyName = localStorage.getItem('site_companyName') || 'Điện Lạnh Lâm Nguyên';
    const hotline1 = localStorage.getItem('site_hotline1') || '0909 123 456';
    const hotline2 = localStorage.getItem('site_hotline2') || '0987 654 321';
    const email = localStorage.getItem('site_email') || 'info@dienlanhlamnguyen.vn';
    const address = localStorage.getItem('site_address') || '123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh';
    
    // Update nav and footer logos
    const navLogo = document.getElementById('navLogoText');
    const footerLogo = document.getElementById('footerLogoText');
    const footerCompany = document.getElementById('footerCompanyName');
    const aboutCompany = document.getElementById('aboutCompanyName');
    if (navLogo) navLogo.textContent = companyName;
    if (footerLogo) footerLogo.textContent = companyName;
    if (footerCompany) footerCompany.textContent = companyName;
    if (aboutCompany) aboutCompany.textContent = companyName;
    
    // Home
    const heroTitle = localStorage.getItem('site_heroTitle');
    const heroDesc = localStorage.getItem('site_heroDesc');
    const heroHotline = localStorage.getItem('site_heroHotline');
    const stat1 = localStorage.getItem('site_stat1');
    const stat2 = localStorage.getItem('site_stat2');
    const stat3 = localStorage.getItem('site_stat3');
    
    if (heroTitle && document.getElementById('heroTitle')) {
        document.getElementById('heroTitle').innerHTML = heroTitle.replace('Lâm Nguyên', '<span class="hero__title--accent">Lâm Nguyên</span>');
    }
    if (heroDesc && document.getElementById('heroDescription')) {
        document.getElementById('heroDescription').textContent = heroDesc;
    }
    if (heroHotline && document.getElementById('heroHotline')) {
        document.getElementById('heroHotline').textContent = heroHotline;
    }
    if (stat1 && document.getElementById('stat1')) {
        document.getElementById('stat1').setAttribute('data-count', stat1);
    }
    if (stat2 && document.getElementById('stat2')) {
        document.getElementById('stat2').setAttribute('data-count', stat2);
    }
    if (stat3 && document.getElementById('stat3')) {
        document.getElementById('stat3').setAttribute('data-count', stat3);
    }
    
    // About
    const aboutContent = localStorage.getItem('site_aboutContent');
    if (aboutContent && document.getElementById('aboutDesc')) {
        document.getElementById('aboutDesc').textContent = aboutContent;
    }
    
    // Services
    const s1n = localStorage.getItem('site_service1Name');
    const s1d = localStorage.getItem('site_service1Desc');
    const s2n = localStorage.getItem('site_service2Name');
    const s2d = localStorage.getItem('site_service2Desc');
    const s3n = localStorage.getItem('site_service3Name');
    const s3d = localStorage.getItem('site_service3Desc');
    
    if (s1n && document.getElementById('service1Title')) document.getElementById('service1Title').textContent = s1n;
    if (s1d && document.getElementById('service1Desc')) document.getElementById('service1Desc').textContent = s1d;
    if (s2n && document.getElementById('service2Title')) document.getElementById('service2Title').textContent = s2n;
    if (s2d && document.getElementById('service2Desc')) document.getElementById('service2Desc').textContent = s2d;
    if (s3n && document.getElementById('service3Title')) document.getElementById('service3Title').textContent = s3n;
    if (s3d && document.getElementById('service3Desc')) document.getElementById('service3Desc').textContent = s3d;
    
    // Contact
    const cH1 = localStorage.getItem('site_contactHot1');
    const cH2 = localStorage.getItem('site_contactHot2');
    const cE = localStorage.getItem('site_contactEmail');
    const cA = localStorage.getItem('site_contactAddress');
    
    if (cH1 && document.getElementById('contactHotline1')) document.getElementById('contactHotline1').textContent = cH1;
    if (cH2 && document.getElementById('contactHotline2')) document.getElementById('contactHotline2').textContent = cH2;
    if (cE) {
        if (document.getElementById('contactEmail')) document.getElementById('contactEmail').textContent = cE;
    }
    if (cA) {
        if (document.getElementById('contactAddress')) document.getElementById('contactAddress').innerHTML = cA.replace(/, /g, '<br>');
    }
    if (document.getElementById('footerPhone')) document.getElementById('footerPhone').textContent = cH1 || hotline1;
    if (document.getElementById('footerEmail')) document.getElementById('footerEmail').textContent = cE || email;
    if (document.getElementById('footerAddress')) document.getElementById('footerAddress').textContent = cA || address;
}

document.addEventListener('DOMContentLoaded', applySavedData);
