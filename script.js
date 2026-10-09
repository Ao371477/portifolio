const tema = document.getElementById("tema");
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
const progress = document.getElementById("progress");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
const reveals = document.querySelectorAll(".reveal");
const skills = document.querySelectorAll(".skill");
const topo = document.getElementById("topo");
const typing = document.getElementById("typing");


tema.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        tema.textContent = "☀";

        localStorage.setItem("tema", "dark");

    } else {

        tema.textContent = "☾";

        localStorage.setItem("tema", "light");

    }

});


if (localStorage.getItem("tema") === "dark") {

    document.body.classList.add("dark");

    tema.textContent = "☀";

}


menuBtn.addEventListener("click", () => {

    menu.classList.toggle("open");

});


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("open");

    });

});


window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        (scrollTop / pageHeight) * 100;

    progress.style.height = percentage + "%";


    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 250;

        if (scrollTop >= sectionTop) {

            currentSection = section.id;

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });


    if (scrollTop > 500) {

        topo.classList.add("show");

    } else {

        topo.classList.remove("show");

    }

});


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },

        {
            threshold: .15
        }

    );


reveals.forEach(element => {

    revealObserver.observe(element);

});


const skillObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const bars =
                        entry.target.querySelectorAll(
                            ".skill-bar i"
                        );

                    bars.forEach(bar => {

                        bar.style.width =
                            bar.dataset.width + "%";

                    });

                    skillObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: .3
        }

    );


skills.forEach(skill => {

    skillObserver.observe(skill);

});


const text =
    "Estudante de tecnologia e criador de projetos.";

let index = 0;


function typeText() {

    if (index < text.length) {

        typing.textContent +=
            text.charAt(index);

        index++;

        setTimeout(typeText, 45);

    }

}


typeText();


topo.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});