$(document).ready(function(){
  // Menu toggle functionality
  $('#menu').click(function(){
    $(this).toggleClass('fa-times');
    $('header').toggleClass('toggle');
  });

  // Scroll and load events
  $(window).on('scroll load',function(){
    $('#menu').removeClass('fa-times');
    $('header').removeClass('toggle');
    
    // Show/hide scroll to top button
    if($(window).scrollTop() > 0){
      $('.top').show();
    }else{
      $('.top').hide();
    }

    // Active navigation highlighting
    $('section').each(function(){
      let top = $(window).scrollTop();
      let offset = $(this).offset().top - 200;
      let height = $(this).height();
      let id = $(this).attr('id');

      if(top >= offset && top < offset + height){
        $('.navbar ul li a').removeClass('active');
        $('.navbar').find(`[href="#${id}"]`).addClass('active');
      }
    });
  });

  // Smooth scrolling for anchor links
  $('a[href*="#"]').on('click',function(e){
    e.preventDefault();
    
    $('html, body').animate({
      scrollTop : $($(this).attr('href')).offset().top,
    },
      500, 
      'linear'
    );
  });

  // Typing animation for home section
  const typingText = document.querySelector('.typing-text');
  if(typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    
    function typeWriter() {
      if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    
    setTimeout(typeWriter, 500);
  }

  // Counter animation
  $('.counter .box span').each(function() {
    const $this = $(this);
    const countTo = $this.text();
    
    // Skip if not a number
    if(isNaN(parseInt(countTo))) return;
    
    $({ countNum: 0 }).animate({
      countNum: parseInt(countTo)
    }, {
      duration: 2000,
      easing: 'swing',
      step: function() {
        $this.text(Math.floor(this.countNum) + '+');
      },
      complete: function() {
        $this.text(this.countNum + '+');
      }
    });
  });

  // Scroll reveal animation
  function reveal() {
    const reveals = document.querySelectorAll('.box, .skill-item, .timeline-item');
    
    for(let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 150;
      
      if(elementTop < windowHeight - elementVisible) {
        reveals[i].style.opacity = '1';
        reveals[i].style.transform = 'translateY(0)';
      }
    }
  }

  // Set initial state for animations
  $('.box, .skill-item, .timeline-item').css({
    'opacity': '0',
    'transform': 'translateY(50px)',
    'transition': 'all 0.5s ease'
  });

  window.addEventListener('scroll', reveal);
  reveal(); // Call once on load

  // Form validation
  $('form').submit(function(e) {
    const name = $('input[name="Name"]').val().trim();
    const email = $('input[name="Email"]').val().trim();
    const message = $('textarea[name="Message"]').val().trim();
    
    if(!name || !email || !message) {
      e.preventDefault();
      alert('Please fill in all fields');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
      e.preventDefault();
      alert('Please enter a valid email address');
      return false;
    }
  });

  // Add active class styling
  const style = document.createElement('style');
  style.textContent = `
    .navbar ul li a.active {
      background: var(--yellow) !important;
      color: var(--dark-gray) !important;
    }
  `;
  document.head.appendChild(style);

  // Parallax effect for home section
  $(window).scroll(function() {
    const scrolled = $(this).scrollTop();
    $('.home').css('background-position-y', -(scrolled * 0.3) + 'px');
  });

  // Portfolio image lazy loading
  const images = document.querySelectorAll('.portfolio img');
  const imageOptions = {
    threshold: 0,
    rootMargin: "0px 0px 50px 0px"
  };

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      const img = entry.target;
      img.classList.add('loaded');
      observer.unobserve(img);
    });
  }, imageOptions);

  images.forEach(image => {
    imageObserver.observe(image);
  });
});