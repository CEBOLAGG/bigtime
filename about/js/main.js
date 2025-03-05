const initSliders = () => {
  const allSliders = Array.from(document.querySelectorAll(".slider"));
  if (!allSliders.length) return;

  const addLogic = (
    blocks,
    btns,
    arrows,
    isNested = false,
    nMinBlockId,
    nMaxBlockId,
    nPrev,
    nNext
  ) => {
    if (!blocks.length || !btns.length) return [0, 0, () => { }, () => { }];
    let activeBlockId = 0;
    const minBlockId = 0;
    const maxBlockId = blocks.length - 1;

    const setDisabledClasses = (aid) => {
      if (!arrows.length) return;
      if (aid === minBlockId) arrows[0].classList.add("disabled");
      if (aid === maxBlockId) arrows[1].classList.add("disabled");
    };

    const setActiveClasses = (aid) => {
      const btn = btns[aid];
      const block = blocks[aid];

      if (btn) btn.classList.add("active");
      if (block) block.classList.add("active");
    };

    const calcBlocksPosition = (aid) => {
      blocks.forEach((block) => {
        block.style.transform = `translateX(-${aid * 100}%)`;
      });
    };

    const updateActive = (id, triggerEffect = true) => {
      activeBlockId = id;

      clearDisabled();
      clearActive();
      if (triggerEffect) addEffect(btns[id]);
      setActiveClasses(activeBlockId);
      setDisabledClasses(activeBlockId);
      calcBlocksPosition(activeBlockId);

      return activeBlockId;
    };

    const prev = () => {
      const activeBlock = blocks[activeBlockId];

      if (activeBlock.querySelector(".slider")) {
        const nActiveId = nPrev();
        if (nActiveId >= nMinBlockId) return;
      }

      const newId = activeBlockId - 1;
      if (newId < minBlockId) return;
      return updateActive(newId);
    };

    const next = () => {
      const activeBlock = blocks[activeBlockId];
      if (activeBlock.querySelector(".slider")) {
        const nActiveId = nNext();
        if (nActiveId <= nMaxBlockId) return;
      }

      const newId = activeBlockId + 1;
      if (newId > maxBlockId) return;
      return updateActive(newId);
    };

    const clearDisabled = () => {
      arrows.forEach((el) => el.classList.remove("disabled"));
    };

    const clearActive = () => {
      [...btns, ...blocks].forEach((el) => el.classList.remove("active"));
    };

    const addEffect = (el) => {
      const target = el.dataset.target;
      const effect = el.dataset.effect;

      if (target && effect) {
        const targetEl = document.querySelector(target);
        if (targetEl && targetEl.classList.length > 0) {
          const lastClassName = targetEl.classList.item(
            targetEl.classList.length - 1
          );
          targetEl.classList.remove(lastClassName);
          window.requestAnimationFrame(() => targetEl.classList.add(effect));
        }
      }
    };

    btns.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        updateActive(i);
      });
    });

    arrows.forEach((arrow, i) => {
      arrow.addEventListener("click", () => {
        if (i === 0) {
          prev();
          return;
        }
        next();
      });
    });

    const firstActiveId = btns.findIndex(
      (btn) => !btn.classList.contains("disabled")
    );

    updateActive(firstActiveId, !isNested);

    return [minBlockId, maxBlockId, prev, next];
  };

  const filterOutNested = (els, slider) => {
    return Array.from(els).filter(
      (control) => control.closest(".slider") === slider
    );
  };

  const findElements = (slider) => {
    const sliderControls = filterOutNested(
      Array.from(slider.querySelectorAll(".slider-controls button")),
      slider
    );
    const sliderContent = filterOutNested(
      Array.from(slider.querySelectorAll(".slider-content > .slider-block")),
      slider
    );
    const sliderArrows = filterOutNested(
      Array.from(slider.querySelectorAll(".circle-icon-control")),
      slider
    );

    return [sliderContent, sliderControls, sliderArrows];
  };

  allSliders.forEach((slider) => {
    if (slider.classList.contains("init")) return;

    slider.classList.add("init");
    const els = findElements(slider);

    const nested = slider.querySelector(".slider");
    if (nested) {
      nested.classList.add("init");
      const [min, max, prev, next] = addLogic(...findElements(nested), true);
      addLogic(...els, false, min, max, prev, next);
      return;
    }

    addLogic(...els, false);
  });
};

const getClickData = (e) => {
  if (e.touches) {
    return e.touches[0];
  }

  return e;
};

const initScrollCards = () => {
  const scrollWraps = document.querySelectorAll(".scroll-cards-wrap");

  scrollWraps.forEach((scrollWrap) => {
    const btnsEls = scrollWrap.querySelectorAll('.circle-icon-control')

    const btnPrev = btnsEls[0];
    const scrollContainer = scrollWrap.querySelector('.scroll-cards-content')
    const btnNext = btnsEls[1];

    let lastScrollWidth = scrollContainer.scrollWidth; // Track the last known scrollWidth

    const updateButtonStates = () => {
      const currentScrollWidth = scrollContainer.scrollWidth;
      const maxScrollLeft = currentScrollWidth - scrollContainer.clientWidth;

      // Update button states
      btnPrev.classList.toggle("disabled", scrollContainer.scrollLeft <= 0);
      btnNext.classList.toggle(
        "disabled",
        scrollContainer.scrollLeft >= maxScrollLeft
      );

      // If the scrollWidth has changed, update lastScrollWidth
      if (lastScrollWidth !== currentScrollWidth) {
        lastScrollWidth = currentScrollWidth;
      }
    };

    const scrollHandler = () => {
      updateButtonStates();
    };

    const clickPrevHandler = () => {
      const cardWidth = scrollContainer.children[0]?.offsetWidth || 0;
      scrollContainer.scrollBy({ left: -cardWidth, behavior: "smooth" });
    };

    const clickNextHandler = () => {
      const cardWidth = scrollContainer.children[0]?.offsetWidth || 0;
      scrollContainer.scrollBy({ left: cardWidth, behavior: "smooth" });
    };

    const init = () => {
      // Remove existing event listeners
      scrollContainer.removeEventListener("scroll", scrollHandler);
      btnPrev.removeEventListener("click", clickPrevHandler);
      btnNext.removeEventListener("click", clickNextHandler);

      // Re-add event listeners
      scrollContainer.addEventListener("scroll", scrollHandler);
      btnPrev.addEventListener("click", clickPrevHandler);
      btnNext.addEventListener("click", clickNextHandler);

      updateButtonStates();
    };

    const observer = new MutationObserver(() => {
      setTimeout(init, 0);
    });

    const config = { childList: true, subtree: true };
    observer.observe(scrollContainer, config);

    // Initial setup
    init();
  });
};

const setLocales = async (preload) => {
  let preloadRan = false;

  const populateDropdown = () => {
    const langSelectors = Array.from(
      document.querySelectorAll(".locale-selector")
    );
    const allLocales = Array.from(
      document.querySelectorAll("#weglot-listbox .wg-li > a")
    );
    if (!allLocales.length) return;

    const aside = document.querySelector(".weglot-container > aside");
    if (!aside) return;

    let currentLocale = aside
      .getAttribute("aria-label")
      .replace("Language selected: ", "");

    langSelectors.forEach((selector) => {
      const wrap = selector.querySelector(".dropdown-wrap");
      wrap.innerHTML = "";
      if (wrap) {
        allLocales.forEach((locale) => {
          const btn = document.createElement("button");
          btn.setAttribute("class", "dropdown-link w--current");
          btn.innerText = locale.innerText;
          btn.dataset.target = "#" + locale.getAttribute("id");
          wrap.append(btn);
        });
      }

      const newBtns = Array.from(wrap.querySelectorAll(".dropdown-link"));
      const docEl = document.querySelector("html");

      if (newBtns.length && docEl) {
        newBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            const el = document.querySelector(btn.dataset.target);
            if (el) {
              el.click();
              const checkChange = setInterval(() => {
                const currentLang = docEl.getAttribute("lang");
                if (
                  currentLang ===
                  btn.dataset.target.replace("#weglot-language-", "")
                ) {
                  clearInterval(checkChange);
                  setTimeout(() => location.reload(), 1000);
                }
              }, 100);
            }
          });
        });
      }

      const currentLocaleWrap = selector.querySelector(
        ".locale-btn-wrap > .link > div"
      );
      if (currentLocaleWrap) currentLocaleWrap.innerText = currentLocale;
    });
  };

  const runPreload = async () => {
    if (preloadRan) return;
    if (typeof preload !== "undefined") {
      preload();
      preloadRan = true;
    }
  };

  const checkAndObserveWeglot = async () => {
    const weglotContainer = document.querySelector(".weglot-container");
    if (weglotContainer) {
      const observer = new MutationObserver(async () => {
        populateDropdown();
        runPreload();
      });

      observer.observe(weglotContainer, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false,
      });

      populateDropdown();
      runPreload();
    } else {
      setTimeout(checkAndObserveWeglot, 500);
    }
  };

  await checkAndObserveWeglot();
};

const playVideos = () => {
  const videos = document.querySelectorAll("video");

  if (!videos.length) return;

  const handleVideo = (video) => {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          let isPlaying = false;

          if (entry.isIntersecting) {
            if (!video.dataset.init) {
              const src = video.getAttribute("data-src");
              const vids = [
                {
                  src: src.replace("webm", "mp4"),
                  type: "video/mp4",
                },
                {
                  src,
                  type: "video/webm",
                },
              ];

              vids.forEach(({ src, type }) => {
                const srcEl = document.createElement("source");
                srcEl.setAttribute("type", type);
                srcEl.setAttribute("src", src);

                video.append(srcEl);
              });
              video.dataset.init = "true";
            }

            setTimeout(() => {
              const playPromise = video.play();

              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    isPlaying = true;
                  })
                  .catch(() => {
                    isPlaying = false;
                  });
              } else {
                isPlaying = true;
              }
            }, 1000);
          } else {
            if (isPlaying) video.pause();
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    videoObserver.observe(video);
  };

  videos.forEach(handleVideo);

  // const observer = new MutationObserver((mutations) => {
  //   mutations.forEach((mutation) => {
  //     if (mutation.type === 'childList') {
  //       mutation.addedNodes.forEach((node) => {
  //         if (node.tagName === 'VIDEO') {
  //           handleVideo(node);
  //         } else if (node.querySelectorAll) {
  //           node.querySelectorAll('video').forEach(handleVideo);
  //         }
  //       });
  //     }
  //   });
  // });

  // observer.observe(document.body, {
  //   childList: true,
  //   subtree: true
  // });
};

window.addEventListener("load", async () => {
  initSliders();

  if (typeof preload !== "undefined") {
    await setLocales(preload);
  } else {
    await setLocales();
  }

  initScrollCards();
});
