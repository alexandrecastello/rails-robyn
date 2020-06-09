const initUpdateNavbarOnScroll = () => {
  const navbar = document.querySelector('.navbar-lewagon');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= window.innerHeight - 500) {
        navbar.classList.add('navbar-color-white');
      } else {
        navbar.classList.remove('navbar-color-white');
      }
    });
  }
}

export { initUpdateNavbarOnScroll };