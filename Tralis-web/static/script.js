// 1. Efek Navbar Berubah Warna saat Scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = '#000000'; // Jadi hitam pekat saat scroll
        nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        nav.style.padding = '15px 8%'; // Sedikit lebih ramping
    } else {
        nav.style.background = '#1a1a1a'; // Kembali ke warna awal
        nav.style.boxShadow = 'none';
        nav.style.padding = '20px 8%';
    }
});

// 2. Smooth Scroll untuk Navigasi
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('href');
        if(sectionId !== "#") {
            document.querySelector(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 3. Efek Muncul (Fade In) saat Scroll (Opsional tapi Keren)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Daftarkan elemen yang mau dikasih efek muncul
document.querySelectorAll('.service-box, .gallery-item, .testi-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});

// 4. Kontrol Galeri (Geser Kiri/Kanan)
const galleryTrack = document.querySelector('[data-gallery]');
const galleryPrev = document.querySelector('.gallery-nav.prev');
const galleryNext = document.querySelector('.gallery-nav.next');

function updateGalleryNav() {
    if (!galleryTrack || !galleryPrev || !galleryNext) return;
    const maxScrollLeft = galleryTrack.scrollWidth - galleryTrack.clientWidth - 2;
    galleryPrev.disabled = galleryTrack.scrollLeft <= 2;
    galleryNext.disabled = galleryTrack.scrollLeft >= maxScrollLeft;
}

if (galleryTrack && galleryPrev && galleryNext) {
    const scrollByAmount = () => Math.min(galleryTrack.clientWidth * 0.9, 600);

    galleryPrev.addEventListener('click', () => {
        galleryTrack.scrollBy({ left: -scrollByAmount(), behavior: 'smooth' });
    });
    galleryNext.addEventListener('click', () => {
        galleryTrack.scrollBy({ left: scrollByAmount(), behavior: 'smooth' });
    });

    galleryTrack.addEventListener('scroll', updateGalleryNav);
    window.addEventListener('resize', updateGalleryNav);
    updateGalleryNav();
}
