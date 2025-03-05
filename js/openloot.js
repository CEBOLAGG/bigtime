const openLootItems = [
  {
    "name": "Aqueous Wanderer (Title)",
    "archetypeId": "BT0_Title_AqueousWanderer",
    "rarity": "uncommon",
    "imageUrl": "https://openloot-metadata.bigtime.gg/BT0/Title_AqueousWanderer.png",
    "videoUrl": null,
    "maxIssuance": 6000,
    "minPrice": 1,
    "gameName": "Big Time"
  },
  {
    "name": "Shinobu Acolyte",
    "archetypeId": "BT0_SubZero_Title",
    "rarity": "uncommon",
    "imageUrl": "https://openloot-metadata.bigtime.gg/BT0/SubZero_Title.png",
    "videoUrl": null,
    "maxIssuance": 3500,
    "minPrice": 1,
    "gameName": "Big Time"
  },
  {
    "name": "Great Sword of Sir Hector",
    "archetypeId": "BT0_RedBerry_2H_Sword",
    "rarity": "uncommon",
    "imageUrl": "https://openloot-metadata.bigtime.gg/BT0/RedBerry_2H_sword.png",
    "videoUrl": null,
    "maxIssuance": 3500,
    "minPrice": 1,
    "gameName": "Big Time"
  },
  {
    "name": "Battle Staff of Sir Hector",
    "archetypeId": "BT0_RedBerry_2H_MageStaff",
    "rarity": "uncommon",
    "imageUrl": "https://openloot-metadata.bigtime.gg/BT0/RedBerry_2H_MageStaff.png",
    "videoUrl": null,
    "maxIssuance": 3500,
    "minPrice": 1,
    "gameName": "Big Time"
  },
  {
    "name": "War Hammer of Sir Hector",
    "archetypeId": "BT0_RedBerry_2H_Hammer",
    "rarity": "uncommon",
    "imageUrl": "https://openloot-metadata.bigtime.gg/BT0/RedBerry_2H_Hammer.png",
    "videoUrl": null,
    "maxIssuance": 3500,
    "minPrice": 1,
    "gameName": "Big Time"
  },
  {
    "name": "Battle Axe of Sir Hector",
    "archetypeId": "BT0_RedBerry_2H_Axe",
    "rarity": "uncommon",
    "imageUrl": "https://openloot-metadata.bigtime.gg/BT0/RedBerry_2H_Axe.png",
    "videoUrl": null,
    "maxIssuance": 3500,
    "minPrice": 1,
    "gameName": "Big Time"
  },
  {
    "name": "Dagger of Sir Hector",
    "archetypeId": "BT0_RedBerry_1H_Dagger",
    "rarity": "uncommon",
    "imageUrl": "https://openloot-metadata.bigtime.gg/BT0/RedBerry_1H_Dagger.png",
    "videoUrl": null,
    "maxIssuance": 3500,
    "minPrice": 1,
    "gameName": "Big Time"
  },
  {
    "name": "Battle Blade of Sir Hector",
    "archetypeId": "BT0_RedBerry_1H_Sword",
    "rarity": "uncommon",
    "imageUrl": "https://openloot-metadata.bigtime.gg/BT0/RedBerry_1H_sword.png",
    "videoUrl": null,
    "maxIssuance": 3500,
    "minPrice": 1,
    "gameName": "Big Time"
  },
  {
    "name": "The Galant Knight",
    "archetypeId": "BT0_Poison_Title",
    "rarity": "uncommon",
    "imageUrl": "https://openloot-metadata.bigtime.gg/BT0/Poison_Title.png",
    "videoUrl": null,
    "maxIssuance": 3500,
    "minPrice": 1,
    "gameName": "Big Time"
  },
  {
    "name": "Battle Staff of Sir Galahad",
    "archetypeId": "BT0_Poison_2H_MageStaff",
    "rarity": "uncommon",
    "imageUrl": "https://openloot-metadata.bigtime.gg/BT0/Poison_2H_MageStaff.png",
    "videoUrl": null,
    "maxIssuance": 3500,
    "minPrice": 1,
    "gameName": "Big Time"
  },
  {
    "name": "Battle Axe of Sir Galahad",
    "archetypeId": "BT0_Poison_2H_Axe",
    "rarity": "uncommon",
    "imageUrl": "https://openloot-metadata.bigtime.gg/BT0/Poison_2H_Axe.png",
    "videoUrl": null,
    "maxIssuance": 3500,
    "minPrice": 1,
    "gameName": "Big Time"
  },
  {
    "name": "Battle Blade of Sir Galahad",
    "archetypeId": "BT0_Poison_1H_Sword",
    "rarity": "uncommon",
    "imageUrl": "https://openloot-metadata.bigtime.gg/BT0/Poison_1H_Sword.png",
    "videoUrl": null,
    "maxIssuance": 3500,
    "minPrice": 1,
    "gameName": "Big Time"
  },
  {
    "name": "Dagger of Sir Galahad",
    "archetypeId": "BT0_Poison_1H_Dagger",
    "rarity": "uncommon",
    "imageUrl": "https://openloot-metadata.bigtime.gg/BT0/Poison_1H_Dagger.png",
    "videoUrl": null,
    "maxIssuance": 3500,
    "minPrice": 1,
    "gameName": "Big Time"
  },
  {
    "name": "Battle Staff of Sir Lucan",
    "archetypeId": "BT0_OrangeCool_2H_MageStaff",
    "rarity": "uncommon",
    "imageUrl": "https://openloot-metadata.bigtime.gg/BT0/OrangeCool_2H_MageStaff.png",
    "videoUrl": null,
    "maxIssuance": 3500,
    "minPrice": 1,
    "gameName": "Big Time"
  },
  {
    "name": "War Hammer of Sir Lucan",
    "archetypeId": "BT0_OrangeCool_2H_Hammer",
    "rarity": "uncommon",
    "imageUrl": "https://openloot-metadata.bigtime.gg/BT0/OrangeCool_2H_Hammer.png",
    "videoUrl": null,
    "maxIssuance": 3500,
    "minPrice": 1,
    "gameName": "Big Time"
  }
]

const createRandomArray = (items, N) =>
  Array.from(
    { length: N },
    () => items[Math.floor(Math.random() * items.length)]
  );

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

const fetchListings = async () => {
  const url = new URL("https://listing-api.openloot.com/v2/market/listings");
  const params = {
    gameId: "56a149cf-f146-487a-8a1c-58dc9ff3a15c",
    onSale: true,
    page: 1,
    pageSize: 15,
    exclude: [
      "BT0_space_epic_large_0",
      "BT0_space_exalted_medium_0",
      "BT0_space_legendary_large_0",
      "BT0_space_mythic_large_0",
      "BT0_space_epic_medium_0",
      "BT0_space_legendary_small_0",
      "BT0_space_rare_large_0",
      "BT0_space_epic_small_0",
      "BT0_space_rare_small_0",
      "BT0_space_legendary_medium_0",
      "BT0_space_rare_medium_0",
      "BT0_space_mythic_medium_0",
      "BT0_space_mythic_small_0",
      "BT0_space_exalted_small_0",
      "BT0_space_exalted_large_0",
      "BT0_space_exalted_large_0",
      "BT0_Weaver_Title",
      "BT0_RedBerry_Title",
      "BT0_Title_TheSphinxsShadow",
      "BT0_Amethyst_Title",
      "BT0_Frost_Title",
      "BT0_Evermore_Title",
      "BT0_Title_PaceSetter",
      "BT0_FixerSingleEye_Title",
      "BT0_EquinoxEnforcer",
      "BT0_Title_ThePrairiePirate",
      "BT0_Title_TheVernalValkyrie",
      "BT0_Title_TheSylvanSavage",
      "BT0_Title_TheSphinxsShadow",
      "BT0_Title_TheShamrockSentinel",
      "BT0_Title_TheMirageMaker",
      "BT0_Title_TheParadoxTempest",
      "BT0_Title_TheIcyIntruder",
      "BT0_Title_TheAmorousHeartthrob",
      "BT0_Title_ProtectorOfTimesEnd",
      "BT0_Title_HeartsEnvoy",
      "BT0_Title_EquinoxEnforcer",
      "BT0_OrangeCool_Title",
      "BT0_FixerTacticalTrauma_Title",
      "BT0_FateweaversVestmentsOfCosmicDominion_Title_Common",
      "BT0_Emote_Handstand",
      "BT0_Emote_Whetstone",
      "BT0_Emote_WarChant",
      "BT0_Emote_Wave",
      "BT0_Emote_WarmingHands",
      "BT0_Emote_SprintDrill",
      "BT0_Emote_TipToe",
      "BT0_Emote_ThrowConfetti",
      "BT0_Emote_SmackButt",
      "BT0_Emote_PushUps",
      "BT0_Emote_PracticeSword",
      "BT0_Emote_NotDoingIt",
      "BT0_Emote_PackGunpowder",
      "BT0_Emote_LaughingPointing",
      "BT0_Emote_MixingPotions",
      "BT0_Emote_Juggling",
      "BT0_Emote_GiveUp",
      "BT0_Emote_IceCream",
      "BT0_Emote_ICantHearYou",
      "BT0_Emote_Dance",
      "BT0_Emote_Crying",
      "BT0_Emote_Clapping",
      "BT0_Emote_CallToAction",
      "BT0_CrystalBlue_Title",
      "BT0_Emote_Breakdance",
      "BT0_Emote_Celebrate",
      "BT0_Emote_BodyBuilding",
      "BT0_Emote_BandageWounds",
      "BT0_Emote_Backflip",
      "BT0_Title_LipsLikeRubies",
      "BT0_SovereignsMantleOfTheOnyxThrone_Title_Uncommon",
    ].join(","),
  };

  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    return openLootItems;
  }
};

const populateOLItems = async () => {
  const section = document.getElementById("openloot-items");
  if (!section) return;
  const cards = Array.from(section.querySelectorAll("a"));
  const defaultCard = cards[0];

  cards.forEach((c) => c.remove());
  const items = await fetchListings();

  items.forEach(({ minPrice, name, rarity, maxIssuance, imageUrl, archetypeId }) => {
    const optionName = archetypeId.replace('BT0_', '')
    const card = defaultCard.cloneNode(true);
    card.classList.remove("card-loading");

    const link = `https://openloot.com/items/BT0/${optionName}`;
    card.setAttribute("href", link);
    card.setAttribute("style", `--item-col: var(--${rarity})`);

    const video = `https://openloot-metadata.bigtime.gg/BT0/${optionName}.webm`;
    const videoEl = card.querySelector('[data-populate="video"');
    videoEl.setAttribute("data-src", video);
    videoEl.setAttribute("poster", imageUrl);
    const typeEl = card.querySelector('[data-populate="type"');
    typeEl.innerText = rarity;
    const titleEl = card.querySelector('[data-populate="title"');
    titleEl.innerText = name;
    const floorEl = card.querySelector('[data-populate="floor"');
    floorEl.innerText = formatter.format(minPrice);
    const supplyEl = card.querySelector('[data-populate="supply"');
    supplyEl.innerText = maxIssuance;
    section.innerHTML += card.outerHTML;
  });
};

const initAutoscroll = () => {
  if (window.innerWidth < 768) return;

  const container = document.querySelector(".autoscroll");
  if (!container) return;

  let offset = 0;
  let scrolling = false;

  const scrollStep = () => {
    if (!scrolling) return;
    requestAnimationFrame(scrollStep);

    const elements = Array.from(container.children);

    if (offset > 112.5) {
      const firstElement = elements[0];
      const clonedElement = firstElement.cloneNode(true);
      container.appendChild(clonedElement);
      firstElement.remove();
      offset = 0;
    }

    container.style.setProperty("--x-offset", `-${offset}%`);

    offset += 0.15;
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      scrolling = entry.isIntersecting;
      if (scrolling) {
        requestAnimationFrame(scrollStep);
      }
    });
  });

  observer.observe(container);
};

document.addEventListener(
  "DOMContentLoaded",
  async () => {
    await populateOLItems();
    initAutoscroll();
    playVideos();
  },
  true
);
