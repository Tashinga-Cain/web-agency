/* =========================
   TASH DESIGN JAVASCRIPT
========================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       MOBILE NAVIGATION
    ========================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".navigation");

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navigation.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";

        });


        // Close the menu after clicking a navigation link.

        navigation.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navigation.classList.remove("open");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");

                menuToggle.textContent = "☰";

            });

        });


        // Close the menu when clicking outside it.

        document.addEventListener("click", function (event) {

            if (
                navigation.classList.contains("open") &&
                !navigation.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                navigation.classList.remove("open");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");

                menuToggle.textContent = "☰";

            }

        });

    }


    /* =========================
       SCROLL REVEAL ANIMATIONS
    ========================= */

    const revealElements = document.querySelectorAll(".reveal");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    if ("IntersectionObserver" in window && !reducedMotion) {

        const observer = new IntersectionObserver(

            function (entries, observerInstance) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observerInstance.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


        revealElements.forEach(function (element) {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    /* =========================
       PORTFOLIO FILTERING
    ========================= */

    const filterButtons = document.querySelectorAll(".filter-btn");

    const portfolioItems = document.querySelectorAll(".portfolio-item");


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedFilter = button.dataset.filter;


            // Update the active button.

            filterButtons.forEach(function (filterButton) {

                filterButton.classList.remove("active");

            });

            button.classList.add("active");


            // Show only matching portfolio projects.

            portfolioItems.forEach(function (item) {

                const category = item.dataset.category;

                const matches =
                    selectedFilter === "all" ||
                    category === selectedFilter;

                item.hidden = !matches;

            });

        });

    });


    /* =========================
       CONTACT FORM
    ========================= */

    const contactForm = document.querySelector("#contactForm");

    const formMessage = document.querySelector("#formMessage");


    if (contactForm && formMessage) {

        // Preselect a service when the visitor arrives
        // from a service-specific enquiry link.

        const serviceSelect = document.querySelector("#service");

        const params = new URLSearchParams(window.location.search);

        const requestedService = params.get("service");


        if (serviceSelect && requestedService) {

            const matchingOption = Array.from(
                serviceSelect.options
            ).find(function (option) {

                return option.value.toLowerCase() ===
                    requestedService.toLowerCase();

            });


            if (matchingOption) {

                serviceSelect.value = matchingOption.value;

            }

        }


        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();


            // Validate the form before preparing an email.

            if (!contactForm.checkValidity()) {

                contactForm.reportValidity();

                return;

            }


            const name = document.querySelector("#name").value.trim();

            const email = document.querySelector("#email").value.trim();

            const service = document.querySelector("#service").value;

            const budget = document.querySelector("#budget").value;

            const message = document.querySelector("#message").value.trim();


            if (!name || !email || !service || !budget || !message) {

                formMessage.textContent =
                    "Please complete all the required fields.";

                return;

            }


            /*
             * IMPORTANT:
             * Replace this example address with your real
             * Tash Design business email address.
             */

            const businessEmail = "mabhizatashinga@gmail.com";


            const subject = "New Tash Design Project Enquiry";


            const body = [
                "NEW PROJECT ENQUIRY",
                "",
                "Name: " + name,
                "Email: " + email,
                "Service: " + service,
                "Budget: " + budget,
                "",
                "Project Details:",
                message
            ].join("\n");


            const mailtoLink =
                "mailto:" + businessEmail +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(body);


            formMessage.textContent =
                "Opening your email application. Please send the prepared email to submit your enquiry.";


            // Open the visitor's default email application.

            window.location.href = mailtoLink;

        });

    }


    /* =========================
       AUTOMATIC COPYRIGHT YEAR
    ========================= */

    const yearElements = document.querySelectorAll(".current-year");

    const currentYear = new Date().getFullYear();


    yearElements.forEach(function (element) {

        element.textContent = currentYear;

    });


    /* =========================
       CURRENT NAVIGATION LINK
    ========================= */

    const currentPage = window.location.pathname.split("/").pop()
        || "index.html";


    document.querySelectorAll(".navigation a").forEach(function (link) {

        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

        }

    });

});