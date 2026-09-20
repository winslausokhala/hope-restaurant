/* ==========================================================================
   Hope: gallery
   Edit the PHOTOS list below to change what appears. Put the image files in
   images/gallery/. Every photo needs alt text that describes what is in it.
   ========================================================================== */
(function () {
  "use strict";

  var grid = document.getElementById("gallery-grid");
  var box = document.getElementById("lightbox");
  if (!grid || !box) return;

  /* PLACEHOLDER: replace the file names, captions and alt text with your own photos. */
  var PHOTOS = [
    { src: "images/gallery/grill.jpg", caption: "Off the grill", alt: "Meat sizzling over charcoal on an open grill" },
    { src: "images/gallery/dining-room.jpg", caption: "The dining room", alt: "The restaurant dining room with wooden tables and warm lighting" },
    { src: "images/gallery/table-spread.jpg", caption: "A table to share", alt: "A table covered with shared dishes and drinks" },
    { src: "images/gallery/kitchen.jpg", caption: "In the kitchen", alt: "Cooks plating dishes at the pass in the kitchen" },
    { src: "images/gallery/drinks.jpg", caption: "Fresh drinks", alt: "Glasses of fresh juice and iced tea on the bar" },
    { src: "images/gallery/dessert.jpg", caption: "Something sweet", alt: "A slice of passion fruit cheesecake on a small plate" },
    { src: "images/gallery/entrance.jpg", caption: "Come in", alt: "The restaurant entrance in the evening" },
    { src: "images/gallery/ingredients.jpg", caption: "Fresh ingredients", alt: "Tomatoes, herbs and lemons on a wooden board" }
  ];

  var media = document.getElementById("lightbox-media");
  var caption = document.getElementById("lightbox-caption");
  var current = 0;
  var opener = null;

  function make(tag, className) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  }

  function picture(photo, size) {
    var img = new Image();
    img.src = photo.src;
    img.alt = photo.alt;
    img.width = size === "large" ? 1200 : 600;
    img.height = size === "large" ? 900 : 450;
    if (size !== "large") {
      img.loading = "lazy";
      img.decoding = "async";
    }
    img.dataset.phLabel = photo.caption;
    return img;
  }

  /* ----- Grid ----- */
  PHOTOS.forEach(function (photo, index) {
    var li = make("li");
    var tile = make("button", "tile");
    tile.type = "button";
    tile.setAttribute("aria-label", "Enlarge photo: " + photo.caption);
    tile.appendChild(picture(photo, "small"));
    tile.addEventListener("click", function () {
      opener = tile;
      show(index);
      if (typeof box.showModal === "function") box.showModal();
      else box.setAttribute("open", "");
    });
    li.appendChild(tile);
    grid.appendChild(li);
  });
  if (window.HopeImages) window.HopeImages.check(grid);

  /* ----- Lightbox ----- */
  function show(index) {
    current = (index + PHOTOS.length) % PHOTOS.length;
    var photo = PHOTOS[current];
    media.replaceChildren(picture(photo, "large"));
    caption.textContent = photo.caption + " (" + (current + 1) + " of " + PHOTOS.length + ")";
    if (window.HopeImages) window.HopeImages.check(media);
  }

  function close() {
    if (typeof box.close === "function") box.close();
    else box.removeAttribute("open");
    if (opener) opener.focus();
  }

  box.addEventListener("click", function (event) {
    var action = event.target.closest("[data-lb]");
    if (action) {
      var name = action.dataset.lb;
      if (name === "prev") show(current - 1);
      if (name === "next") show(current + 1);
      if (name === "close") close();
      return;
    }
    /* Click on the dark backdrop closes the viewer. */
    if (event.target === box) close();
  });

  box.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
  });
})();
