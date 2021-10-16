
// pre loader page
const prLoaderPage = () => {
  const preLoader = document.querySelector(".preloader");
  window.addEventListener("load", () => {
    preLoader.style.display = "none";
  });
};
prLoaderPage();

// typed js 
let typed = new Typed('.typer', {
  strings: ['Front End Developer.' , 'Freelancer.'],
  typeSpeed:50,
  backSpeed:40,
  loop:true
});

// show list icon  sidebar in mobile
const showListSide = () => {
  const lineOne = document.querySelector(".line-one"),
    lineTwo = document.querySelector(".line-two"),
    lineThree = document.querySelector(".line-three"),
    bulletsContainer = document.querySelector(".bullets-container"),
    header = document.querySelector("header");

  bulletsContainer.addEventListener("click", () => {
    if (lineTwo.classList.contains("visible")) {
      header.style.left = "0px";
      lineTwo.classList.remove("visible");
      lineTwo.classList.add("hidden");
      lineOne.classList.add("rotate-plus");
      lineThree.classList.add("rotate-minus");
    } else {
      header.style.left = "-300px";
      lineTwo.classList.remove("hidden");
      lineTwo.classList.add("visible");
      lineOne.classList.remove("rotate-plus");
      lineThree.classList.remove("rotate-minus");
    }
  });
};
showListSide();

// handle scrolling  and add active in the li section
const handleSecionScrolling = () => {
  const sections = document.querySelectorAll(".section");

  window.addEventListener("scroll", () => {
    const scrollPostion = document.documentElement.scrollTop;
    sections.forEach((section) => {
      // check scroll postion and section postion
      if (
        scrollPostion >= section.offsetTop - 50 &&
        scrollPostion < section.offsetTop + section.offsetHeight
      ) {
        let cureentId = section.getAttribute("id");
        removeAllClassActive();
        addClassActive(cureentId);
      }
    });
  });

  // remove all clase active
  const removeAllClassActive = function () {
    let li = document.querySelectorAll(".ul-nav li");
    li.forEach((li) => {
      li.classList.remove("active");
      li.parentElement.firstElementChild.firstElementChild.firstElementChild.classList.remove(
        "active-svg"
      );
    });
  };
  // add  active class in this ele
  const addClassActive = function (id) {
    let li = document.querySelectorAll(".ul-nav li");
    li.forEach((li) => {
      if (li.getAttribute("data-offset") === id) {
        li.classList.add("active");
        li.parentElement.firstElementChild.firstElementChild.firstElementChild.classList.add(
          "active-svg"
        );
      }
    });
  };
};
handleSecionScrolling();

//animate scroll from link on click
const animateScroolLink = () => {
  const links = document.querySelectorAll(".ul-nav li");
  links.forEach((item) => {
    item.addEventListener("click", () => {
      let ele = document.getElementById(item.getAttribute("data-offset"));
      ele.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
};
animateScroolLink();

// animate progress bar
const animationProgressBar = () => {
  const sectionSkills = document.getElementById("skills"),
    progressBar = document.querySelectorAll(".progress span");

  const runProgress = () => {
    progressBar.forEach((ele) => {
      const value = ele.dataset.progress;
      ele.style.opacity = 1;
      ele.style.width = `${value}`;
    });
  };

  const stopProgress = () => {
    progressBar.forEach((ele) => {
      ele.style.opacity = 0;
      ele.style.width = "0px";
    });
  };

  window.addEventListener("scroll", () => {
    const scrollPostion = document.documentElement.scrollTop;
    const secrionSkillsPostion = document.getElementById("skills");

    if (
      scrollPostion >= secrionSkillsPostion.offsetTop - 500 &&
      scrollPostion <
        secrionSkillsPostion.offsetTop + secrionSkillsPostion.offsetHeight
    ) {
      runProgress();
    } else {
      stopProgress();
    }
  });
};
animationProgressBar();

// change  theme mode and save in local storge
const changeTheme = () => {
  let theme = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "light";
  const body = document.querySelector("body"),
    containerToggle = document.querySelector(".toggle"),
    toggle = document.querySelector(".toggle span");

  containerToggle.addEventListener("click", () => {
    if (body.classList.contains("light")) {
      body.classList.remove("light");
      body.classList.add("dark");
      toggle.style.left = "20px";
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark");
      body.classList.add("light");
      toggle.style.left = "0px";
      localStorage.setItem("theme", "light");
    }
  });

  if (theme === "light") {
    body.classList.remove("dark");
    body.classList.add(theme);
    toggle.style.left = "0px";
  } else {
    body.classList.remove("light");
    body.classList.add(theme);
    toggle.style.left = "20px";
  }
};
changeTheme();

// btn Scrolling to top
const handleClickScrooling = () => {
  const btnScroll = document.querySelector(".btn-top");
  window.onscroll = () => {
    this.scrollY >= 1300
      ? btnScroll.classList.add("show")
      : btnScroll.classList.remove("show");
  };
  btnScroll.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};
handleClickScrooling();

// handle submit data
const handleFormSubmit = () => {
  const form = document.getElementById("my-form");
  async function handleSubmit(event) {
    event.preventDefault();
    var statusError = document.getElementById("error-message");
    var statusResponse = document.getElementById("response-message");
    let data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        showResponseMessage(statusResponse, statusError);
        form.reset();
      })
      .catch((error) => {
        showErrorMessage(statusError, statusResponse);
      });
  }
  form.addEventListener("submit", handleSubmit);

  function showErrorMessage(statusError, statusResponse) {
    statusError.style.display = "block";
    statusResponse.style.display = "none";
  }
  function showResponseMessage(statusResponse, statusError) {
    statusError.style.display = "none";
    statusResponse.style.display = "block";
  }
};
handleFormSubmit();
