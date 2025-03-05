let whitelist = [];

function formatNumber(num) {
  if (num >= 1000) {
    return Math.floor(num / 1000) + "k";
  }
  return num.toString();
}
const parseWhitelist = () => {
  const cont = document.querySelector("#whitelist");
  const list = Array.from(cont.querySelectorAll(".r"));
  const getText = (c, n) => c[n].innerText;
  const arr = list.map(({ children: c }) => {
    return {
      douyin: getText(c, 0),
      tiktok: getText(c, 1),
      twitch: getText(c, 2),
      twitter: getText(c, 3),
      weibo: getText(c, 4),
      youtube: getText(c, 5),
    };
  });
  whitelist = arr.reduce((acc, item) => {
    Object.keys(item).forEach((key) => {
      if (item[key]) {
        acc[key] = acc[key] || [];
        acc[key].push(item[key]);
      }
    });
    return acc;
  }, {});
  cont.remove();
};
const getCurrentLang = () => {
  return "en";
  const cont = document.querySelector(".weglot-container");
  if (!cont) return "en";
  const d = cont.querySelector(".wg-li");
  if (d) return d.dataset.l;
  return "en";
};
const populateShorts = async () => {
  const wrapper = document.querySelector("#section-highlights");
  if (!wrapper) return;
  const section = wrapper.querySelector("#stories");
  if (!section) return;
  const cards = Array.from(section.querySelectorAll(".story"));
  const defaultCard = cards[0];
  const onFail = () => wrapper.remove();
  try {
    const lang = getCurrentLang();
    const wl = lang === "zh" ? whitelist.douyin : whitelist.tiktok;
    const path = lang === "zh" ? "douyin" : "shorts";
    const queryParams = new URLSearchParams({
      lang,
      whitelist: wl.join(","),
    });
    const response = await fetch(BACK_URL + `/${path}?${queryParams}`, {
      method: "GET",
    });
    const data = await response.json();
    const shorts = data.data;
    if (!shorts.length) {
      onFail();
      return;
    }
    cards.forEach((c) => c.remove());
    shorts.forEach(({ author, title, cover, link }) => {
      const card = defaultCard.cloneNode(true);
      card.setAttribute("href", link);
      const img = card.querySelector(".item-img");
      img.setAttribute("src", cover);
      const p = card.querySelector("h4");
      p.innerText = title;
      const h = card.querySelector("p");
      h.innerText = author;
      card.classList.remove("card-loading");
      section.append(card);
    });
  } catch (err) {
    onFail();
  }
};
const populatePosts = async () => {
  const parent = document.getElementById("short-form");
  if (!parent) return;
  const section = parent.querySelector("#twitter");
  if (!section) return;
  const weiboCards = Array.from(section.querySelectorAll(".weibo-card"));
  const weiboCardEl = weiboCards[0];
  const lang = getCurrentLang();
  if (lang === "zh") {
    try {
      const queryParams = new URLSearchParams({
        lang,
        whitelist: whitelist.weibo.join(","),
      });
      const response = await fetch(BACK_URL + `/posts?${queryParams}`, {
        method: "GET",
      });
      const data = await response.json();
      const posts = data.data;
      if (!posts.length) {
        parent.remove();
        return;
      }
      weiboCards.forEach((wc) => wc.remove());
      posts.forEach(({ text_raw, user, pic_num, pic_infos }) => {
        const weiboCard = weiboCardEl.cloneNode(!0);
        weiboCard.setAttribute("href", `https://weibo.com/${user.id}`);
        const title = weiboCard.querySelector(".weibo-content-header>h5");
        title.innerText = user.screen_name;
        const pfp = weiboCard.querySelector(
          ".weibo-content-header>.weibo-avatar"
        );
        pfp.setAttribute("src", user.profile_image_url);
        pfp.addEventListener("error", function (event) {
          event.target.src =
            "https://h5.sinaimg.cn/m/weibo-lite/img/pwalogo.417d1674.svg";
          event.onerror = null;
        });
        const paragraph = weiboCard.querySelector(".weibo-content>p");
        paragraph.innerText = text_raw;
        const img = weiboCard.querySelector(".weibo-card-img");
        if (pic_num > 0) {
          const k = Object.values(pic_infos).map((info) => info.bmiddle.url);
          if (k && k.length) {
            img.setAttribute("src", k[0]);
          }
        } else {
          img.remove();
        }
        weiboCard.classList.remove("card-loading");
        section.append(weiboCard);
      });
    } catch (err) {
      parent.remove();
    }
  } else {
    weiboCards.forEach((wc) => wc.remove());
    try {
      const queryParams = new URLSearchParams({
        whitelist: whitelist.twitter,
      });
      const response = await fetch(BACK_URL + `/tweets?${queryParams}`, {
        method: "GET",
      });
      const data = await response.json();
      const posts = data.data;
      if (!posts.length) {
        section.remove();
        return;
      }
      posts.forEach(({ link }) => {
        if (!link) return;
        const anchor = document.createElement("a");
        anchor.classList.add("embed");
        anchor.setAttribute("href", link);
        anchor.setAttribute("target", "_blank");
        anchor.innerHTML = `<blockquote class="twitter-tweet"><a href="${link}?ref_src=twsrc%5Etfw"></a></blockquote>`;
        section.append(anchor);
      });
      twttr.widgets.load();
    } catch (err) {
      parent.remove();
    }
  }
};

const getBlacklist = () => {
  const blid = document.getElementById('blacklist');
  if (!blid) return;
  const list = Array.from(blid.querySelectorAll('p')).map(r => r.innerText);
  blid.remove();
  return list;
}

const populateStreams = async () => {
  const wrapper = document.getElementById("stream");
  const section = document.getElementById("streams");
  if (!section) return;
  const activeStream = document.querySelector("#active-stream");
  const activeStreamFrame = activeStream.querySelector("iframe");
  const dcards = Array.from(section.querySelectorAll(".item-card"));
  const defaultCard = dcards[0];
  try {
    const lang = getCurrentLang();
    const queryParams = new URLSearchParams({
      lang,
      blacklist: getBlacklist().join(","),
    });
    const response = await fetch(BACK_URL + `/streams?${queryParams}`, {
      method: "GET",
    });
    const data = await response.json();
    const streams = data.data;
    if (!streams.length) {
      wrapper.remove();
      return;
    }
    dcards.forEach((c) => c.remove());
    streams.forEach(
      ({
        title,
        user_name,
        user_login,
        type,
        thumbnail_url,
        view_count,
        viewer_count,
        id,
      }) => {
        const card = defaultCard.cloneNode(!0);
        card.dataset.link =
          type === "live"
            ? `https://player.twitch.tv/?channel=${user_login}&parent=${location.hostname}`
            : `https://player.twitch.tv/?video=${id}&parent=${location.hostname}`;
        const contentType = type === "live" ? "live" : "vod";
        card.setAttribute("style", `--item-col: var(--${contentType})`);
        const typeEl = card.querySelector(".item-type");
        typeEl.innerText = contentType;
        const videoEl = card.querySelector(".item-img");
        videoEl.setAttribute(
          "src",
          thumbnail_url
            .replace("{width}x{height}", "440x248")
            .replace("%{width}x%{height}", "320x180")
        );
        const titleEl = card.querySelector(".item-title");
        titleEl.innerText = title;
        const channelEl = card.querySelector(".item-channel");
        channelEl.innerText = user_name;
        let viewers = view_count || viewer_count;
        if (viewers) {
          const viewersNum = Number(viewers);
          viewers = formatNumber(viewersNum);
        }
        const viewersEl = card.querySelector(".item-viewers");
        viewersEl.innerText = viewers;
        card.classList.remove("card-loading");
        section.append(card);
      }
    );
  } catch (err) {
    wrapper.remove();
  }
  const cards = Array.from(section.querySelectorAll(".item-card"));
  const activateStream = (stream) => {
    activeStreamFrame.setAttribute("src", stream.dataset.link);
  };
  activeStream.classList.remove("card-loading");
  activateStream(cards[0]);
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      activateStream(card);
    });
  });
};

const populateArticles = async () => {
  const currentPath = window.location.pathname;
  if (currentPath === "/home-x-articles") return;

  const sections = {
    news: {
      el: document.querySelector("#news"),
      foundCard: false,
    },
    update: {
      el: document.querySelector("#updates"),
      foundCard: false,
    },
    recap: {
      el: document.querySelector("#recaps"),
      foundCard: false,
    },
  };

  const sectionEls = {
    news: Array.from(sections.news.el.querySelectorAll(".item-card")),
    update: Array.from(sections.update.el.querySelectorAll(".item-card")),
    recap: Array.from(sections.recap.el.querySelectorAll(".item-card")),
  };

  const sectionAllEls = [
    ...sectionEls.news,
    ...sectionEls.update,
    ...sectionEls.recap,
  ];
  const defaultCard = sectionAllEls[0].cloneNode(true);

  const onAll = () => {
    const allEls = Array.from(
      document.querySelectorAll("#section-news .item-card")
    );
    allEls.forEach((art) => art.classList.remove("card-loading"));
  };

  try {
    const response = await fetch(BACK_URL + `/articles`, { method: "GET" });
    const data = await response.json();
    const articles = data.data;
    if (!articles.length) {
      onAll();
      return;
    }

    articles.forEach((art) => {
      const { type, link, imgURL, title, published } = art;
      const typeSection = sections[type];
      if (!typeSection) return;

      if (!typeSection.foundCard) {
        typeSection.foundCard = true;
        sectionEls[type].forEach((art) => art.remove());
      }

      const card = defaultCard.cloneNode(true);

      card.setAttribute("href", link);
      const img = card.querySelector("img");
      img.setAttribute("src", imgURL);
      img.setAttribute("srcset", "");
      const heading = card.querySelector("h4");
      heading.innerText = title;
      const date = card.querySelector("p");
      const tsf = new Date(published);
      const options = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = tsf.toLocaleDateString("en-US", options);
      date.innerText = formattedDate;
      typeSection.el.append(card);
    });
  } catch (err) {
  } finally {
    onAll();
  }
};

const populate = (card, anchors, art) => {
  const { type, preview, title, cover, link, date } = art;

  const imgs = Array.from(card.querySelectorAll("img:not(.article-card-author-image):not(.main-article-logo)"));
  imgs.forEach((img) => {
    img.setAttribute("src", cover);
    img.setAttribute("srcset", "");
  })

  const titleEl = card.querySelector(".article-card-heading");
  titleEl.innerText = title;

  const extractEl = card.querySelector(".article-card-extract");
  extractEl.innerText = preview;

  const typeEl = card.querySelector(".article-card-type");
  typeEl.innerText = type;

  const dateEl = card.querySelector(".article-card-date");
  dateEl.innerText = date;

  anchors.forEach((a) => a.setAttribute("href", link))
}

const removeLoaders = (parent, selector) => Array.from(parent.querySelectorAll(selector)).forEach((c) => c.classList.remove("card-loading"));

const populateXArticles = async () => {
  const news = document.querySelector('#section-news');
  const parent = news.querySelector('.scroll-cards-content');
  const cards = Array.from(news.querySelectorAll('.article-card'));
  const defaultCard = cards[0].cloneNode(true);

  const xLogic = async () => {
    const response = await fetch(BACK_URL + `/x-articles?posts=1765884209527394325,1855026854681624761`, { method: "GET" });
    const data = await response.json();
    const articles = data.data;

    if (!articles.length) {
      throw "Empty articles"
    }

    parent.innerHTML = '';

    articles.forEach((art) => {
      const card = defaultCard.cloneNode(true);
      populate(card, [card], art);
      parent.append(card);
    });

    const main = news.querySelector('.main-article');
    populate(main, Array.from(main.querySelectorAll('a')), { ...articles[0], preview: articles[0].preview + '...' });
  }

  const mediumLogic = async () => {
    const response = await fetch(BACK_URL + `/medium-articles`, { method: "GET" });
    const data = await response.json();
    const articles = data.data;

    if (!articles.length) {
      throw "Empty articles"
    }

    const vArticles = document.querySelectorAll('.v-articles-container .v-article-card')

    vArticles.forEach((el, i) => populate(el, [el], articles[i]));
  }

  try {
    await xLogic()
    await mediumLogic()
  } catch (err) {
    news.remove();
  } finally {
    removeLoaders(parent, '.article-card')
    removeLoaders(news, '.main-article')
    removeLoaders(news, '.v-article-card')
  }


};

const preload = async () => {
  parseWhitelist();
  await populatePosts();
  await populateStreams();
  //await populateShorts();
  await populateArticles();
  await populateXArticles();
};
