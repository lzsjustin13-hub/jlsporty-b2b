# JuLong Sports B2B Homepage (jlsporty-b2b)

Official B2B website homepage for JuLong Sports Eyewear OEM/ODM manufacturing solutions.

## Architecture
- **Tech Stack**: HTML5 / CSS3 / Vanilla JavaScript / Vercel Serverless Function (`/api/inquiry`)
- **Hosting & CI/CD**: GitHub + Vercel Edge Network
- **Inquiry Notification**: Automated notification dispatch to `lzsjustin13@gmail.com`
- **Domain**: `www.jlsporty.com`

## Directory Structure
```
├── index.html          # Main B2B landing page
├── vercel.json         # Vercel routing, clean URLs & cache-control headers
├── robots.txt          # Search engine crawler configuration
├── sitemap.xml         # XML sitemap
├── api/
│   └── inquiry.js      # Serverless form endpoint
└── assets/
    ├── css/style.css   # Responsive layout & styling
    ├── js/main.js      # Navigation & async inquiry submission
    └── images/         # Optimized product, factory & certification images
```

## Local Development
Run a local static server:
```bash
npx serve .
# or
python -m http.server 8080
```
