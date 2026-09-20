# Hope restaurant website

A six-page restaurant site in plain HTML, CSS and JavaScript. No build step, no frameworks.

Pages: `index.html` (home), `menu.html`, `about.html`, `gallery.html`, `reservations.html`, `contact.html`.

## Fill these in before you publish

Everything below is sample content. Do not publish until you have replaced it.

1. **Phone, email, address, opening hours, social links**: edit `js/config.js`. Every page reads from it.
2. **Search-engine details**: the `application/ld+json` block near the top of `index.html` repeats the phone, address and hours. Update it to match `js/config.js`.
3. **Booking and contact forms**: paste your Formspree address into `formEndpoint` in `js/config.js` (see "Forms" below).
4. **Photos**: see "Replace the photos" below. Add credits in `photoCredits` in `js/config.js` for any photo you did not take.
5. **About page**: every paragraph, the chef or owner name and the three values are placeholders. Rewrite them so they are true for your restaurant.
6. **Home page intro** (`index.html`, the "Food to gather around" section): rewrite in your own words.
7. **Menu**: replace the sample dishes and prices in `data/menu.json`. Check that every dietary tag (especially Halal and Gluten-free) is true for how your kitchen prepares the dish.
8. **Map**: set `mapUrl` (a Google Maps share link) in `js/config.js`. For an embedded map, also set `mapEmbedUrl`.
9. **Share image**: each page has an `og:image` tag pointing to `https://your-domain.example/images/og-cover.jpg`. Add a 1200 x 630 image and use your real domain.

## Run it on your computer

The menu loads from a JSON file, and browsers block that when you double-click a page. Serve the folder instead:

```
cd hope
python3 -m http.server 8000
```

Then open http://localhost:8000. (Any local server works, including the VS Code "Live Server" extension.)

## Edit the menu

Open `data/menu.json`. Each dish looks like this:

```json
{
  "id": "coconut-grilled-tilapia",
  "name": "Coconut Grilled Tilapia",
  "category": "Mains",
  "price": 18.0,
  "description": "One or two sentences.",
  "image": "images/menu/coconut-grilled-tilapia.jpg",
  "alt": "What the photo shows, for screen readers",
  "tags": ["Gluten-free"],
  "featured": true
}
```

- `category` must be `Starters`, `Mains`, `Desserts` or `Drinks`. A new category name also works and appears after those four. If you add one, also add a filter button for it in `menu.html`.
- `price` is a number in US dollars. The site shows it as `$18.00`.
- `tags` can be any of `Vegetarian`, `Vegan`, `Halal`, `Spicy`, `Gluten-free`. A Vegan dish also appears when someone filters for Vegetarian, so tag vegan dishes with `Vegan` only.
- `featured: true` puts a dish in the four signature dishes on the home page. Leave it out for other dishes. If none are featured, the first four dishes are shown.
- Keep the commas between dishes exactly as in the file. If the menu goes blank, paste the file into https://jsonlint.com to find the mistake.

## Change the colours, fonts and text

- **Colours and fonts**: the first block of `css/styles.css` (`:root`) holds every colour and both fonts. The fonts load from Google Fonts in the `<head>` of each page; if you change them, change that link too.
- **Text**: edit the HTML files directly. The header and footer are repeated on every page, so change them in all six.
- **The sun on the home page**: it is a yellow circle. When you add `images/hero.jpg`, your photo fills the circle.

## Replace the photos

Every photo is optional. While a file is missing, the site shows a tidy placeholder, so nothing breaks. To use a photo, save it with **exactly** the file name below.

Sizes that work well (JPEG or WebP, under about 200 KB each so pages stay fast on mobile data):

- Menu photos: 800 x 1000 pixels (portrait). They are cropped into an arch, so keep the dish in the middle.
- Hero: 1200 x 1200 pixels (square). It fills the sun.
- Gallery: 1200 x 900 pixels.

If you use WebP or PNG, keep the file names in `data/menu.json` and `js/gallery.js` in step with the real file names.

Also update the `alt` text so it describes your real photo.

**Hero and about page**
- `images/hero.jpg`
- `images/about/chef.jpg`

**Gallery** (names, captions and alt text live in `js/gallery.js`)
- `images/gallery/grill.jpg`
- `images/gallery/dining-room.jpg`
- `images/gallery/table-spread.jpg`
- `images/gallery/kitchen.jpg`
- `images/gallery/drinks.jpg`
- `images/gallery/dessert.jpg`
- `images/gallery/entrance.jpg`
- `images/gallery/ingredients.jpg`

**Menu** (22 photos)
- `images/menu/smoked-beef-samosas.jpg` (Smoked Beef Samosas)
- `images/menu/sukuma-coconut-fritters.jpg` (Sukuma and Coconut Fritters)
- `images/menu/mukimo-croquettes.jpg` (Mukimo Croquettes)
- `images/menu/peri-peri-calamari.jpg` (Peri-Peri Calamari)
- `images/menu/butternut-ginger-soup.jpg` (Butternut and Ginger Soup)
- `images/menu/coconut-grilled-tilapia.jpg` (Coconut Grilled Tilapia)
- `images/menu/nyama-choma-platter.jpg` (Nyama Choma Platter)
- `images/menu/chicken-tikka-pilau.jpg` (Chicken Tikka Pilau)
- `images/menu/coastal-prawn-curry.jpg` (Coastal Prawn Curry)
- `images/menu/ndengu-chapati-bowl.jpg` (Ndengu and Chapati Bowl)
- `images/menu/cauliflower-steak.jpg` (Cauliflower Steak with Dhania Chimichurri)
- `images/menu/short-rib-ugali-fries.jpg` (Beef Short Rib with Ugali Fries)
- `images/menu/mandazi-chocolate.jpg` (Mandazi with Chocolate Dip)
- `images/menu/passion-fruit-cheesecake.jpg` (Passion Fruit Cheesecake)
- `images/menu/coconut-rice-pudding.jpg` (Coconut Rice Pudding)
- `images/menu/roasted-pineapple.jpg` (Roasted Pineapple with Vanilla Ice Cream)
- `images/menu/dawa-no-alcohol.jpg` (Dawa, No Alcohol)
- `images/menu/masala-chai.jpg` (Masala Chai)
- `images/menu/passion-mint-cooler.jpg` (Passion Fruit and Mint Cooler)
- `images/menu/pour-over-coffee.jpg` (Kenyan Pour-Over Coffee)
- `images/menu/tamarind-iced-tea.jpg` (Tamarind Iced Tea)
- `images/menu/fresh-sugarcane-juice.jpg` (Fresh Sugarcane Juice)

### Where to find photos you may use

Use your own photos where you can. Otherwise use royalty-free sources such as Unsplash or Pexels, and credit the photographer in `photoCredits` in `js/config.js`. Never copy photos from other restaurants or from brand websites.

## Forms (bookings and messages)

The site has no server, so forms need an email service. The simplest is Formspree:

1. Create a free account at https://formspree.io and make a new form. Use the email address where you want bookings to arrive.
2. Copy the form address (it looks like `https://formspree.io/f/abcdwxyz`).
3. Paste it into `formEndpoint` in `js/config.js`.
4. Submit a test booking and confirm the email arrives. Check your spam folder the first time.

Until `formEndpoint` is set, the forms open the visitor's email app with the message filled in. That works, but it is a poorer experience, so set up Formspree before you launch.

The forms include a hidden spam trap field and browser-side validation. Formspree adds its own spam filtering.

If you prefer EmailJS, replace the `fetch` call inside the `send` function in `js/forms.js` with EmailJS's `emailjs.send(...)` call, following their browser quick-start.

## Deploy

**Netlify (easiest):** sign in at https://app.netlify.com, choose "Add new site", then "Deploy manually", and drag the whole `hope` folder onto the page. You get a working address in under a minute. You can attach your own domain in the site settings.

**GitHub Pages:** create a repository, upload the contents of this folder to it, then go to Settings, Pages, and publish from the `main` branch. The site is served at `https://<your-username>.github.io/<repository-name>/`.

After deploying, update `og:image` in each page (see the checklist above), and test the booking form once on the live site.

## Accessibility and performance notes

- Semantic HTML, a skip link, visible focus outlines, labelled form fields with error messages, and alt text on images.
- The menu filters, mobile menu, photo viewer and forms work with a keyboard. The photo viewer closes with Escape and moves between photos with the arrow keys.
- Motion is limited to the sun rising on the home page and a small zoom on gallery photos. Both switch off for visitors who ask their device to reduce motion.
- Photos load lazily. Only two web fonts are used.
- Run Lighthouse in Chrome (DevTools, Lighthouse tab) after you add real photos. Large uncompressed photos are the most common cause of a low performance score.
