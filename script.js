// Preloader
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader")
    preloader.style.opacity = "0"
    setTimeout(() => {
      preloader.style.display = "none"
  
      // Animate elements when page loads
      animateOnScroll()
  
      // Initialize skill bars
      initSkillBars()
    }, 500)
  })
  
  // Theme toggle
  document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle")
    const body = document.body
  
    // Check saved theme
    const savedTheme = localStorage.getItem("theme") || "light"
    if (savedTheme === "dark") {
      body.classList.add("dark-mode")
      themeToggle.querySelector("i").className = "fas fa-sun"
    }
  
    // Theme toggle click event
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode")
  
      const isDarkMode = body.classList.contains("dark-mode")
      themeToggle.querySelector("i").className = isDarkMode ? "fas fa-sun" : "fas fa-moon"
  
      // Save theme preference
      localStorage.setItem("theme", isDarkMode ? "dark" : "light")
  
      // Add animation class
      themeToggle.classList.add("animate__animated", "animate__rubberBand")
      setTimeout(() => {
        themeToggle.classList.remove("animate__animated", "animate__rubberBand")
      }, 1000)
    })
  })
  
  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar")
    const body = document.body
  
    if (window.scrollY > 50) {
      navbar.style.padding = "0.5rem 0"
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
    } else {
      navbar.style.padding = "1rem 0"
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)"
    }
  
    // Call animate on scroll
    animateOnScroll()
  })
  
  // Improved smooth scrolling for navigation links
  document.addEventListener("DOMContentLoaded", () => {
    // Fix for all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]')
  
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (!targetElement) return
  
        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
          // Use Bootstrap's collapse if available
          if (typeof bootstrap !== "undefined" && bootstrap.Collapse) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse)
            bsCollapse.hide()
          } else {
            // Fallback for when Bootstrap is not fully loaded
            navbarCollapse.classList.remove("show")
          }
        }
  
        // Calculate scroll position with proper offset
        const navbarHeight = document.getElementById("navbar").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY
        const offsetPosition = targetPosition - navbarHeight - 20
  
        // Smooth scroll
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
  
        // Update URL without scrolling
        setTimeout(() => {
          history.pushState(null, null, targetId)
        }, 1000)
      })
    })
  })
  
  // Active navigation link based on scroll position
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-link")
    const navbarHeight = document.getElementById("navbar").offsetHeight
  
    let currentSection = ""
  
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const scrollPosition = window.scrollY
  
      if (
        scrollPosition >= sectionTop - navbarHeight - 100 &&
        scrollPosition < sectionTop + sectionHeight - navbarHeight
      ) {
        currentSection = section.getAttribute("id")
      }
    })
  
    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active")
      }
    })
  })
  
  // Back to top button
  window.addEventListener("scroll", () => {
    const backToTop = document.getElementById("back-to-top")
    if (window.pageYOffset > 300) {
      backToTop.classList.add("active")
    } else {
      backToTop.classList.remove("active")
    }
  })
  
  document.getElementById("back-to-top").addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
  
  // Typed.js initialization
  document.addEventListener("DOMContentLoaded", () => {
    const typedOutput = document.getElementById("typed-output")
  
    if (typedOutput) {
      // Make sure Typed is properly initialized from the global scope
      if (typeof window.Typed !== "undefined") {
        new window.Typed("#typed-output", {
          strings: ["Student", "Progammer"],
          typeSpeed: 80,
          backSpeed: 50,
          backDelay: 2000,
          loop: true,
          cursorChar: "|",
          showCursor: true,
        })
      } else {
        // Fallback if Typed.js is not loaded yet
        setTimeout(() => {
          if (typeof window.Typed !== "undefined") {
            new window.Typed("#typed-output", {
              strings: ["Student", "Progammer"],
              typeSpeed: 80,
              backSpeed: 50,
              backDelay: 2000,
              loop: true,
              cursorChar: "|",
              showCursor: true,
            })
          } else {
            // If Typed.js still isn't available, just show the text
            typedOutput.textContent = "Student", "Progammer"
          }
        }, 1000)
      }
    }
  })
  
  // Animate elements on scroll
  function animateOnScroll() {
    const animatedElements = document.querySelectorAll(".animate__animated:not(.animate__animated--triggered)")
  
    animatedElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight
  
      if (elementPosition < windowHeight - 50) {
        // Get animation type from data attribute or default to fadeInUp
        const animationType = element.dataset.animation || "fadeInUp"
        element.classList.add(`animate__${animationType}`, "animate__animated--triggered")
      }
    })
  }
  
  // Initialize skill bars
  function initSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress")
    const professionalSkillBars = document.querySelectorAll(".professional-skill-progress")
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const percentage = entry.target.getAttribute("data-percentage")
            if (percentage) {
              entry.target.style.width = `${percentage}%`
            }
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )
  
    skillBars.forEach((bar) => observer.observe(bar))
    professionalSkillBars.forEach((bar) => observer.observe(bar))
  }
  
  // Apply translations
  function applyTranslations(lang) {
    const translations = {
      en: {
        // Navigation
        nav_home: "Home",
        nav_about: "About",
        nav_experience: "Experience",
        nav_skills: "Skills",
        nav_contact: "Contact",
  
        // Home section
        home_hello: "Hello, I'm",
        home_profession: "I'm a",
        home_contact: "Contact Me",
  
        // About section
        about_title: "About Me",
        about_subtitle: "Get to know more about me, my background, and what I do",
        about_profession: "Programmer & Developer",
        about_p1:
          "I am a 4th-semester student in Informatics Engineering at Universitas Pamulang with an interest in software development and programming.",
        about_p2:
          "Driven by a passion for innovation, I strive to improve my abilities and tackle challenges in the IT industry. Always eager to learn, I am committed to making meaningful contributions in the tech world.",
        about_p3:
          "My journey in software development started with learning the fundamentals of programming languages such as Java, C, and Python. I've since expanded my knowledge to include web development technologies and frameworks, allowing me to create responsive and dynamic web applications.",
        about_education: "Education:",
        about_field: "Field:",
        about_location: "Location:",
        about_languages: "Languages:",
  
        // Experience section
        experience_title: "My Experience",
        experience_subtitle: "Journey through my professional experience and achievements",
        experience_position: "STORE CREW",
        experience_company: "ALFAMART",
        experience_location: "Karawang, Indonesia",
        experience_description:
          "Worked as a store crew at Alfamart, handling customer service, stock management, store upkeep, and ensuring smooth operations.",
  
        // Skills section
        skills_title: "My Skills",
        skills_subtitle: "A comprehensive overview of my technical and professional abilities",
        skills_technical: "Technical Skills",
        skills_professional: "Professional Skills",
        skills_teamwork: "Team Work",
        skills_communication: "Communication",
        skills_creativity: "Creativity",
        skills_problem: "Problem Solving",
  
        // Contact section
        contact_title: "Contact Me",
        contact_subtitle: "Get in touch with me for collaborations or opportunities",
        contact_heading: "Let's get in touch",
        contact_p:
          "Feel free to reach out to me for any questions or opportunities. I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.",
        contact_location: "Location",
        contact_email: "Email",
        contact_phone: "Phone",
        contact_name: "Full Name",
        contact_subject: "Subject",
        contact_message: "Message",
        contact_send: "Send Message",
  
        // Footer
        footer_copyright: "Copyright© 2025 ASEP AWALUDIN. All rights reserved.",
      },
      id: {
        // Navigation
        nav_home: "Beranda",
        nav_about: "Tentang",
        nav_experience: "Pengalaman",
        nav_skills: "Keahlian",
        nav_contact: "Kontak",
  
        // Home section
        home_hello: "Halo, Saya",
        home_profession: "Saya seorang",
        home_contact: "Hubungi Saya",
  
        // About section
        about_title: "Tentang Saya",
        about_subtitle: "Kenali lebih banyak tentang saya, latar belakang, dan apa yang saya lakukan",
        about_profession: "Programmer & Developer",
        about_p1:
          "Saya adalah mahasiswa semester 4 Teknik Informatika di Universitas Pamulang dengan minat di bidang pengembangan perangkat lunak dan pemrograman.",
        about_p2:
          "Didorong oleh hasrat untuk berinovasi, saya berusaha meningkatkan kemampuan dan mengatasi tantangan di industri IT. Selalu ingin belajar, saya berkomitmen untuk memberikan kontribusi yang berarti di dunia teknologi.",
        about_p3:
          "Perjalanan saya dalam pengembangan perangkat lunak dimulai dengan mempelajari dasar-dasar bahasa pemrograman seperti Java, C, dan Python. Saya telah memperluas pengetahuan saya untuk mencakup teknologi dan framework pengembangan web, memungkinkan saya membuat aplikasi web yang responsif dan dinamis.",
        about_education: "Pendidikan:",
        about_field: "Bidang:",
        about_location: "Lokasi:",
        about_languages: "Bahasa:",
  
        // Experience section
        experience_title: "Pengalaman Saya",
        experience_subtitle: "Perjalanan melalui pengalaman dan pencapaian profesional saya",
        experience_position: "KARYAWAN TOKO",
        experience_company: "ALFAMART",
        experience_location: "Karawang, Indonesia",
        experience_description:
          "Bekerja sebagai karyawan toko di Alfamart, menangani layanan pelanggan, manajemen stok, pemeliharaan toko, dan memastikan operasi berjalan lancar.",
  
        // Skills section
        skills_title: "Keahlian Saya",
        skills_subtitle: "Gambaran komprehensif tentang kemampuan teknis dan profesional saya",
        skills_technical: "Keahlian Teknis",
        skills_professional: "Keahlian Profesional",
        skills_teamwork: "Kerja Tim",
        skills_communication: "Komunikasi",
        skills_creativity: "Kreativitas",
        skills_problem: "Pemecahan Masalah",
  
        // Contact section
        contact_title: "Hubungi Saya",
        contact_subtitle: "Hubungi saya untuk kolaborasi atau peluang",
        contact_heading: "Mari terhubung",
        contact_p:
          "Jangan ragu untuk menghubungi saya untuk pertanyaan atau peluang apa pun. Saya selalu terbuka untuk mendiskusikan proyek baru, ide kreatif, atau peluang untuk menjadi bagian dari visi Anda.",
        contact_location: "Lokasi",
        contact_email: "Email",
        contact_phone: "Telepon",
        contact_name: "Nama Lengkap",
        contact_subject: "Subjek",
        contact_message: "Pesan",
        contact_send: "Kirim Pesan",
  
        // Footer
        footer_copyright: "Hak Cipta© 2025 ASEP AWALUDIN. Semua hak dilindungi.",
      },
    }
  
    // Update all elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n")
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key]
      }
    })
  
    // Update placeholder attributes
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.getAttribute("data-i18n-placeholder")
      if (translations[lang] && translations[lang][key]) {
        element.placeholder = translations[lang][key]
      }
    })
  }
  
  // Language switcher
  document.addEventListener("DOMContentLoaded", () => {
    const languageSwitcher = document.querySelector(".language-switcher")
  
    if (languageSwitcher) {
      const currentLanguage = document.querySelector(".current-language")
      const dropdownItems = document.querySelectorAll(".language-switcher .dropdown-item")
  
      // Get saved language or default to English
      const savedLanguage = localStorage.getItem("language") || "en"
      currentLanguage.textContent = savedLanguage.toUpperCase()
  
      // Apply translations
      applyTranslations(savedLanguage)
  
      // Language change event
      dropdownItems.forEach((item) => {
        item.addEventListener("click", function (e) {
          e.preventDefault()
  
          const lang = this.getAttribute("data-lang")
          currentLanguage.textContent = lang.toUpperCase()
          localStorage.setItem("language", lang)
  
          // Apply translations with animation
          document.body.style.opacity = "0.8"
          setTimeout(() => {
            applyTranslations(lang)
            document.body.style.opacity = "1"
          }, 200)
        })
      })
    }
  })
  

  
  // Initialize Bootstrap's collapse object
  let bootstrap
  
// Contact form handling with improved validation and feedback
document.addEventListener("DOMContentLoaded", () => {
  // Initialize EmailJS as early as possible
  try {
    emailjs.init("_0fdPDlmnWCxRuv5r");
    console.log("EmailJS initialized successfully");
  } catch (error) {
    console.error("Failed to initialize EmailJS:", error);
  }

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    // Get feedback element
    const feedbackElement = document.querySelector(".form-submit-feedback");

    // Declare Swal if it's not already declared
    const Swal = window.Swal;

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("email");
      const subject = formData.get("subject");
      const message = formData.get("message");

      // Validate form
      let isValid = true;
      let errorMessage = "";

      if (!name || name.trim() === "") {
        errorMessage = "Please enter your name";
        isValid = false;
      } else if (!email || email.trim() === "") {
        errorMessage = "Please enter your email";
        isValid = false;
      } else if (!isValidEmail(email)) {
        errorMessage = "Please enter a valid email address";
        isValid = false;
      } else if (!subject || subject.trim() === "") {
        errorMessage = "Please enter a subject";
        isValid = false;
      } else if (!message || message.trim() === "") {
        errorMessage = "Please enter your message";
        isValid = false;
      }

      if (!isValid) {
        // Show error message with SweetAlert
        if (typeof Swal !== "undefined") {
          Swal.fire({
            title: "Error!",
            text: errorMessage,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#6366f1",
          });
        } else {
          alert(errorMessage); // Fallback if Swal is not loaded
        }
        return;
      }

      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.classList.add("btn-loading");
      submitBtn.disabled = true;

      // Check if emailjs is available
      if (typeof emailjs === 'undefined') {
        console.error("EmailJS is not loaded");
        // Show error message
        if (typeof Swal !== "undefined") {
          Swal.fire({
            title: "Error!",
            text: "Email service is not available. Please try again later.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#6366f1",
          });
        } else {
          alert("Email service is not available. Please try again later.");
        }
        
        // Reset button
        submitBtn.classList.remove("btn-loading");
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        return;
      }
      
      // Create template parameters - make sure these match your EmailJS template variables exactly
      const templateParams = {
        to_name: "Asep Awaludin",
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
      };

      console.log("Sending email with parameters:", templateParams);

      // Send email using EmailJS
      emailjs.send("service_1ur8r94", "template_f98sxpw", templateParams)
        .then(function(response) {
          console.log("SUCCESS!", response.status, response.text);
          
          // Show success message
          if (typeof Swal !== "undefined") {
            Swal.fire({
              title: "Success!",
              text: "Your message has been sent successfully! We will get back to you soon.",
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "#6366f1",
            });
          } else {
            alert("Your message has been sent successfully! We will get back to you soon.");
          }

          // Reset form
          contactForm.reset();
        })
        .catch(function(error) {
          console.error("EmailJS error:", error);
          
          // Show detailed error message
          const errorMsg = error.text || "There was a problem sending your message. Please try again later.";
          
          if (typeof Swal !== "undefined") {
            Swal.fire({
              title: "Error!",
              text: errorMsg,
              icon: "error",
              confirmButtonText: "OK",
              confirmButtonColor: "#6366f1",
            });
          } else {
            alert(errorMsg);
          }
        })
        .finally(function() {
          // Reset button state regardless of success or failure
          submitBtn.classList.remove("btn-loading");
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        });
    });
  }
});

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
  
  
  // Initialize on document ready
  document.addEventListener("DOMContentLoaded", () => {
    // Add animation classes to elements
    document.querySelectorAll(".skill-card").forEach((card, index) => {
      card.classList.add("animate__animated")
      card.dataset.animation = "fadeInUp"
      card.style.animationDelay = `${index * 0.1}s`
    })
  
    document.querySelectorAll(".professional-skill").forEach((skill, index) => {
      skill.classList.add("animate__animated")
      skill.dataset.animation = "fadeInUp"
      skill.style.animationDelay = `${index * 0.1}s`
    })
  
    document.querySelectorAll(".contact-item").forEach((item, index) => {
      item.classList.add("animate__animated")
      item.dataset.animation = "fadeInLeft"
      item.style.animationDelay = `${index * 0.1}s`
    })
  
    // Call animate on scroll initially
    setTimeout(animateOnScroll, 100)
  })
  
  