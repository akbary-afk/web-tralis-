document.addEventListener('DOMContentLoaded', () => {
  // 1) Navbar berubah saat scroll (pakai class biar rapi)
  const nav = document.querySelector('nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('nav--scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 2) Smooth scroll untuk navigasi internal (#...)
  document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const sectionId = anchor.getAttribute('href');
      if (!sectionId) return;

      e.preventDefault();

      if (sectionId === '#top' || sectionId === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = document.querySelector(sectionId);
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // 3) Efek muncul saat elemen terlihat
  const animatedEls = document.querySelectorAll('.service-box, .gallery-item, .testi-card');
  if (!('IntersectionObserver' in window)) {
    animatedEls.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        });
      },
      { threshold: 0.1 },
    );

    animatedEls.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.8s ease-out';
      observer.observe(el);
    });
  }

  // 4) Kontrol galeri (geser kiri/kanan)
  const galleryTrack = document.querySelector('[data-gallery]');
  const galleryPrev = document.querySelector('.gallery-nav.prev');
  const galleryNext = document.querySelector('.gallery-nav.next');

  const updateGalleryNav = () => {
    if (!galleryTrack || !galleryPrev || !galleryNext) return;
    const maxScrollLeft = galleryTrack.scrollWidth - galleryTrack.clientWidth - 2;
    galleryPrev.disabled = galleryTrack.scrollLeft <= 2;
    galleryNext.disabled = galleryTrack.scrollLeft >= maxScrollLeft;
  };

  if (galleryTrack && galleryPrev && galleryNext) {
    const scrollByAmount = () => Math.min(galleryTrack.clientWidth * 0.9, 600);

    galleryPrev.addEventListener('click', () => {
      galleryTrack.scrollBy({ left: -scrollByAmount(), behavior: 'smooth' });
    });
    galleryNext.addEventListener('click', () => {
      galleryTrack.scrollBy({ left: scrollByAmount(), behavior: 'smooth' });
    });

    galleryTrack.addEventListener('scroll', updateGalleryNav, { passive: true });
    window.addEventListener('resize', updateGalleryNav);
    updateGalleryNav();
  }
});

