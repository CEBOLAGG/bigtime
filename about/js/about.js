const autopauseVimeo = () => {
  const videos = Array.from(
    document.querySelectorAll(".w-embed.w-iframe iframe")
  ).filter((f) => f.src.includes("vimeo.com"));
  if (!videos.length) return;
  const embeds = videos.map((frame) => {
    return {
      player: new Vimeo.Player(frame, { controls: false }),
      element: frame,
    };
  });
  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      const embed = embeds.find((e) => e.element === entry.target);
      if (entry.isIntersecting) {
        embed.player.play();
      } else {
        embed.player.pause();
      }
    });
  };
  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.5, // Adjust this threshold as needed
  });
  embeds.forEach((embed) => {
    observer.observe(embed.element);
  });
};

const preload = () => autopauseVimeo();
