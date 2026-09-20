/* ==========================================================================
   Hope: restaurant details
   Edit the values below. Everything marked PLACEHOLDER is sample text that
   you must replace before you publish. The site reads this file on every page.
   ========================================================================== */
window.HOPE = {
  name: "Hope",

  /* PLACEHOLDER: replace all contact details with the real ones. */
  phone: "+254 700 000 000",
  email: "hello@example.com",
  whatsapp: "",                 // digits only with country code, e.g. "254700000000". Leave "" to hide.
  address: "[Street address], [City], [Country]",

  /* Map: paste a Google Maps "Share" link into mapUrl (optional).
     For an embedded map, paste the "Embed a map" src URL into mapEmbedUrl. */
  mapUrl: "",
  mapEmbedUrl: "",

  /* PLACEHOLDER: sample opening hours. Also update the schema.org block in index.html. */
  hours: [
    { days: "Monday to Thursday", time: "11:00 to 22:00" },
    { days: "Friday and Saturday", time: "11:00 to 23:30" },
    { days: "Sunday", time: "12:00 to 21:00" }
  ],

  /* Social links. Leave a value as "" to hide that link. */
  social: {
    Instagram: "",
    Facebook: "",
    TikTok: ""
  },

  /* Photo credits, shown in the footer. Add one line per photo you did not take yourself:
     { text: "Photo by Jane Doe on Unsplash", url: "https://unsplash.com/@janedoe" } */
  photoCredits: [],

  /* Booking form options. */
  booking: {
    firstSlot: "11:00",
    lastSlot: "21:30",
    stepMinutes: 30,
    maxGuests: 12,
    daysAhead: 180
  },

  /* Where the forms send messages. Paste your Formspree form URL here,
     for example "https://formspree.io/f/abcdwxyz". See the README for setup.
     While this is empty, the forms open the visitor's email app instead. */
  formEndpoint: ""
};
