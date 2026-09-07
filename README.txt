AI ToolKit Hub — Setup Guide (Updated)
=========================================

GOOD NEWS: Your real images and video clips are already wired into
the site. Nothing to rename or move — just open it and look.

WHAT'S NEW IN THIS UPDATE
----------------------------
✓ Removed the ad placeholder boxes (added back once you're ad-approved)
✓ Expanded the About/Mission page with real, fuller content
✓ Explore page no longer commits to "15 articles" — reads as a
  growing library instead, so it won't look outdated as you add more
✓ Every article page now has a "technical log" style frame around
  its content — bordered panel with a small header bar, fits the
  AI/tech branding
✓ Contact page now shows your real email: igrisbloood@gmail.com
✓ Added a real Privacy Policy (privacy.html) and Terms of Service
  (terms.html), linked in the footer of every page
✓ Added a small purple favicon, plus robots.txt and sitemap.xml —
  standard files that help search engines and ad networks trust
  your site


WHAT'S IN THIS FOLDER
------------------------
index.html                -> Home page
about.html                 -> About / Mission page
contact.html               -> Contact page
articles.html               -> Explore Articles (grid of all 15)
articles/article-1.html ... article-15.html -> Individual article pages
assets/style.css            -> All styling (colors, fonts, layout, animations)
assets/script.js             -> Scroll reveal + 3D tilt effects + mobile menu
assets/hero-bg.js            -> Animated 3D particle background (home hero only)
assets/images/                -> Your real article images
assets/videos/                 -> Your real video clips


STEP 1 — PREVIEW THE SITE
----------------------------
1. Open VS Code -> File > Open Folder -> select this "ai-toolkit-hub" folder.
2. Right-click index.html -> "Reveal in File Explorer", then double-click
   it to open in your browser. (Or install the free "Live Server"
   extension in VS Code and use "Open with Live Server" for auto-refresh.)


STEP 2 — ADD YOUR FULL ARTICLE TEXT (when ready)
----------------------------------------------------
Each article page already has the real title and a short intro line.
When you're ready to add the full 1000-word content for each article,
open articles/article-1.html (and so on) and find this section:

    <!-- PASTE THE FULL TEXT FOR THIS ARTICLE BELOW -->
    <p>Paste the introduction paragraph...</p>
    <h2>Subheading goes here</h2>
    <p>Paste body content here.</p>

Replace the placeholder <p>...</p> paragraphs with your real content
(one paragraph per <p>...</p> tag), and use <h2>Your Subheading</h2>
for any subheadings within the article.

TIP: When your file with all 15 full articles is ready, send it to
Claude (me) and I'll tell you exactly what to paste into each page —
or paste the whole file here and I'll do the placement for you.


STEP 3 — ADS (Adsterra / Google AdSense)
------------------------------------------------------
We removed the placeholder ad boxes for now, since ad networks review
your actual site before approving you — having empty "ad space" boxes
visible can look unfinished during that review. Once you're approved
by Adsterra or AdSense, come back here and I'll help you add real ad
placements in spots that won't hurt your content or user experience.

Note: Google AdSense typically wants your site live with real content
(not placeholders) before approving you — so add your full articles
first, then apply.


STEP 4 — UPDATE CONTACT INFO
---------------------------------
Your real email (igrisbloood@gmail.com) is already set on the Contact
page and in the Privacy Policy / Terms of Service footers.

Also note: the contact form is visual only right now — a static HTML
site can't send emails by itself. When you're ready, I can help you
connect a free service like Formspree in a few minutes so it actually
delivers messages to your inbox.


STEP 5 — PUTTING IT ONLINE
-------------------------------
Once you're happy with everything, you'll need hosting to make this a
real, public website (required before AdSense/Adsterra approval).
Simple options: Netlify, GitHub Pages, or Vercel — all have free tiers
that work well for a site like this. Come back and I'll walk you
through whichever one you pick.


A NOTE ON FILE SIZE
-----------------------
Your 5 video clips total a few MB, which is fine, but if your site
ever feels slow to load on mobile, the most common fix is compressing
video clips further (tools like HandBrake, free, do this well) — ask
me if you want help with that later.


QUESTIONS OR CHANGES?
-------------------------
Come back to this chat any time — screenshot what you're seeing or
describe what you want changed, and I'll give you the exact fix.
