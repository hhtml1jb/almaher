// Common scripts for Al-Maher Auto Parts website

// Mobile navigation toggle
function initMobileNav() {
  const navToggle = document.querySelector(".mobile-nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      document.querySelector(".nav-links").classList.toggle("active");
      this.querySelector("i").classList.toggle("fa-bars");
      this.querySelector("i").classList.toggle("fa-times");
    });
  }
}

// Add animation to elements when scrolled into view
function initScrollAnimation() {
  const animatedElements = document.querySelectorAll(".animated");

  function checkInView() {
    animatedElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Set initial styles for animated elements
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
  });

  // Check on load and scroll
  window.addEventListener("load", checkInView);
  window.addEventListener("scroll", checkInView);
}

// Initialize product filter functionality if on products page
function initProductFilter() {
  const filterButtons = document.querySelectorAll(".filter-button");

  if (filterButtons.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => {
          btn.classList.remove("active");
        });

        // Add active class to clicked button
        this.classList.add("active");

        // Get filter value
        const filter = this.getAttribute("data-filter");

        // Filter logic would go here in a real implementation
        console.log(`Filtering products for: ${filter}`);
      });
    });
  }
}

// Team members array and functions for the About page
const teamMembers = [
  {
    name: "أحمد محمد",
    role: "المدير التنفيذي",
    icon: "fas fa-user-tie",
  },
  {
    name: "خالد عبدالله",
    role: "مدير العمليات",
    icon: "fas fa-user-cog",
  },
  {
    name: "سارة علي",
    role: "مديرة المبيعات",
    icon: "fas fa-user",
  },
  {
    name: "فهد سعد",
    role: "مدير المشتريات",
    icon: "fas fa-user-shield",
  },
  {
    name: "نورة محمد",
    role: "مديرة خدمة العملاء",
    icon: "fas fa-user",
  },
  {
    name: "عبدالرحمن يوسف",
    role: "مدير التسويق",
    icon: "fas fa-user-edit",
  },
];

// Function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to display team members in random order
function displayTeamMembers() {
  const teamList = document.getElementById("team-list");
  if (teamList) {
    const shuffledMembers = shuffleArray([...teamMembers]);

    teamList.innerHTML = "";

    shuffledMembers.forEach((member) => {
      const memberElement = document.createElement("div");
      memberElement.className = "team-member animated";

      memberElement.innerHTML = `
                <div class="team-photo">
                    <i class="${member.icon}"></i>
                </div>
                <h3 class="team-name">${member.name}</h3>
                <p class="team-role">${member.role}</p>
            `;

      teamList.appendChild(memberElement);
    });
  }
}

// Contact form validation
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Reset error messages
      document.querySelectorAll(".error-message").forEach((el) => {
        el.textContent = "";
      });

      let isValid = true;

      // Validate name
      const nameInput = document.getElementById("name");
      if (!nameInput.value.trim()) {
        document.getElementById("name-error").textContent =
          "الرجاء إدخال الاسم الكامل";
        isValid = false;
      }

      // Validate email
      const emailInput = document.getElementById("email");
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailInput.value.trim()) {
        document.getElementById("email-error").textContent =
          "الرجاء إدخال البريد الإلكتروني";
        isValid = false;
      } else if (!emailPattern.test(emailInput.value)) {
        document.getElementById("email-error").textContent =
          "الرجاء إدخال بريد إلكتروني صالح";
        isValid = false;
      }

      // Validate phone (optional)
      const phoneInput = document.getElementById("phone");
      const phonePattern = /^(05)[0-9]{8}$/;
      if (phoneInput.value.trim() && !phonePattern.test(phoneInput.value)) {
        document.getElementById("phone-error").textContent =
          "الرجاء إدخال رقم جوال صالح (05xxxxxxxx)";
        isValid = false;
      }

      // Validate subject
      const subjectInput = document.getElementById("subject");
      if (!subjectInput.value) {
        document.getElementById("subject-error").textContent =
          "الرجاء اختيار الموضوع";
        isValid = false;
      }

      // Validate message
      const messageInput = document.getElementById("message");
      if (!messageInput.value.trim()) {
        document.getElementById("message-error").textContent =
          "الرجاء إدخال الرسالة";
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        document.getElementById("message-error").textContent =
          "الرجاء إدخال رسالة لا تقل عن 10 أحرف";
        isValid = false;
      }

      // Validate terms
      const termsInput = document.getElementById("terms");
      if (!termsInput.checked) {
        document.getElementById("terms-error").textContent =
          "الرجاء الموافقة على الشروط والأحكام";
        isValid = false;
      }

      // If form is valid, submit
      if (isValid) {
        // Normally would submit to server here
        alert("تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.");
        contactForm.reset();
      }
    });
  }
}

// Location map functionality
function initLocationMap() {
  const locationItems = document.querySelectorAll(".location-item");
  const locationMap = document.getElementById("locationMap");

  if (locationItems.length && locationMap) {
    locationItems.forEach((item) => {
      item.addEventListener("click", function () {
        // Remove active class from all items
        locationItems.forEach((el) => {
          el.classList.remove("active");
        });

        // Add active class to clicked item
        this.classList.add("active");

        // Get location data attribute
        const location = this.getAttribute("data-location");

        // Update map (in a real implementation, you would update the iframe src with a real map)
        locationMap.innerHTML = `<iframe src="/api/placeholder/800/450" title="خريطة ${location}"></iframe>`;
      });
    });
  }
}

// Highlight today in the working hours table
function highlightToday() {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const today = new Date().getDay();
  const todayId = days[today];
  const todayElement = document.getElementById(todayId);

  if (todayElement) {
    todayElement.classList.add("today");
  }
}

// Countdown timer for offers page
function initCountdown() {
  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  if (daysElement && hoursElement && minutesElement && secondsElement) {
    function updateCountdown() {
      // Set the countdown to 3 days from now
      const now = new Date();
      const endDate = new Date(now);
      endDate.setDate(endDate.getDate() + 3);
      endDate.setHours(23, 59, 59, 0);

      const diff = endDate - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      daysElement.textContent = days.toString().padStart(2, "0");
      hoursElement.textContent = hours.toString().padStart(2, "0");
      minutesElement.textContent = minutes.toString().padStart(2, "0");
      secondsElement.textContent = seconds.toString().padStart(2, "0");
    }

    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown();
  }
}

// Function to copy coupon code to clipboard
function initCouponCopy() {
  const couponBtn = document.getElementById("couponBtn");

  if (couponBtn) {
    couponBtn.addEventListener("click", function () {
      const couponCode = document.querySelector(".coupon-code").textContent;
      navigator.clipboard.writeText(couponCode).then(function () {
        couponBtn.textContent = "تم النسخ!";
        setTimeout(function () {
          couponBtn.textContent = "نسخ الكود";
        }, 2000);
      });
    });
  }
}

// Initialize everything on DOM content loaded
document.addEventListener("DOMContentLoaded", function () {
  initMobileNav();
  initScrollAnimation();
  initProductFilter();
  displayTeamMembers();
  initContactForm();
  initLocationMap();
  highlightToday();
  initCountdown();
  initCouponCopy();
});
