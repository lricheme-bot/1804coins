# 🎨 Complete Squarespace Embedding Guide for 1804 Coins

## Prerequisites
✅ Your app is deployed on Vercel (you have the URL)
✅ You have a Squarespace website
✅ You have access to Squarespace admin panel

---

## 📋 Table of Contents
1. [Create Shop Page in Squarespace](#step-1-create-shop-page)
2. [Add Code Block](#step-2-add-code-block)
3. [Paste Embed Code](#step-3-paste-embed-code)
4. [Configure Page Settings](#step-4-configure-page-settings)
5. [Update Navigation Menu](#step-5-update-navigation)
6. [Test & Publish](#step-6-test-publish)
7. [Advanced Options](#advanced-options)
8. [Troubleshooting](#troubleshooting)

---

## Step 1: Create Shop Page in Squarespace

### 1.1 Access Pages Panel
1. Log into your Squarespace admin
2. Click **"Pages"** in the left sidebar
3. Click the **"+"** (plus) button at the top

### 1.2 Choose Page Type
1. Select **"Blank Page"**
   - NOT a Shop page (we're embedding our own)
   - NOT a Blog page
   - Choose the simple Blank Page

### 1.3 Name Your Page
1. Page Title: **"Shop"** or **"Store"**
2. URL Slug: `/shop` (Squarespace auto-generates this)
3. Click **"Save"**

**Your page structure should look like:**
```
Home
About
Contact
Shop  ← New page you just created
```

---

## Step 2: Add Code Block

### 2.1 Enter Edit Mode
1. Click on your new **"Shop"** page
2. Click **"Edit"** button (top right)
3. You'll see the blank page canvas

### 2.2 Add Code Block
1. Hover over the page
2. Click the **"+"** (Add Block) button
3. In the search bar, type: **"code"**
4. Select **"Code"** block (icon looks like `</>`)

### 2.3 Configure Code Block
1. The code editor will appear
2. You'll see two tabs:
   - **HTML** (this is where your code goes)
   - **Display** (preview)
3. Leave settings as:
   - ✅ Display Source
   - ❌ Don't check "Disable in Safe Mode"

---

## Step 3: Paste Embed Code

### 3.1 Get Your Vercel URL
**Example:** `https://1804coins.vercel.app`
- You got this when you deployed to Vercel
- Should look like: `https://[your-project-name].vercel.app`

### 3.2 Copy the Embed Code
Open the file: `/app/SQUARESPACE_EMBED_CODE.html`

Copy this code (Option 1 - Full Page):

```html
<style>
  /* Full-screen iframe styles */
  #coins-store-embed {
    width: 100%;
    min-height: 100vh;
    height: 100vh;
    border: none;
    display: block;
  }
  
  /* Remove Squarespace page padding */
  .sqs-block-code {
    padding: 0 !important;
    margin: 0 !important;
  }
  
  .page-section {
    padding: 0 !important;
  }
  
  .content-wrapper {
    padding: 0 !important;
  }
  
  /* Hide Squarespace header on shop page */
  .header {
    display: none !important;
  }
  
  /* Loading spinner */
  .loading-spinner {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #FF6600;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    z-index: 1000;
  }
  
  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
  
  .loading-spinner.hidden {
    display: none;
  }
</style>

<div class="loading-spinner" id="loading"></div>

<iframe 
  id="coins-store-embed"
  src="YOUR_VERCEL_URL"
  frameborder="0"
  scrolling="yes"
  allowfullscreen
  allow="payment"
  title="1804 Coins Store"
  onload="document.getElementById('loading').classList.add('hidden')"
></iframe>

<script>
  // Dynamic height adjustment
  window.addEventListener('message', function(e) {
    const iframe = document.getElementById('coins-store-embed');
    if (e.data && e.data.height) {
      iframe.style.height = e.data.height + 'px';
    }
  });
  
  // Mobile viewport handling
  if (window.innerWidth < 768) {
    const iframe = document.getElementById('coins-store-embed');
    iframe.style.height = '100vh';
  }
</script>
```

### 3.3 Update the URL
**CRITICAL STEP:**
1. Find this line: `src="YOUR_VERCEL_URL"`
2. Replace `YOUR_VERCEL_URL` with your actual Vercel URL
3. Example: `src="https://1804coins.vercel.app"`

**Before:**
```html
<iframe 
  src="YOUR_VERCEL_URL"
```

**After:**
```html
<iframe 
  src="https://1804coins.vercel.app"
```

### 3.4 Paste into Squarespace
1. Select ALL the code (Ctrl+A / Cmd+A)
2. Copy (Ctrl+C / Cmd+C)
3. Click in the Squarespace HTML tab
4. Paste (Ctrl+V / Cmd+V)
5. Click **"Apply"** button

---

## Step 4: Configure Page Settings

### 4.1 Page Settings
1. Click the **gear icon** (⚙️) next to your Shop page
2. In **"General"** tab:
   - Page Title: `Shop`
   - Navigation Title: `Shop`
   - URL Slug: `/shop`

### 4.2 SEO Settings (Optional)
1. Click **"SEO"** tab
2. Page Title: `Shop - 1804 Coins | Haitian Commemorative Coins`
3. Description: `Browse our collection of premium commemorative coins honoring Haiti's revolutionary heroes. From 1804 to your hands.`

### 4.3 Advanced Settings
1. Click **"Advanced"** tab
2. **Page Header Code Injection** (optional):
```html
<style>
  /* Force full width on this page */
  body.shop-page .header {
    display: none;
  }
  
  body.shop-page .page-section {
    padding: 0 !important;
    max-width: 100% !important;
  }
</style>
```

### 4.4 Add Page ID (for targeting)
1. In **"Advanced"** → **"Page Header Code Injection"**
2. Add this to body class:
```html
<script>
  document.body.classList.add('shop-page');
</script>
```

---

## Step 5: Update Navigation Menu

### 5.1 Add to Main Navigation
1. Go back to **"Pages"**
2. Your Shop page should be visible in the list
3. Drag and drop to reorder (usually after "Home")

Suggested order:
```
- Home
- Shop  ← Your embedded store
- About
- Contact
```

### 5.2 Hide Header on Shop Page (Optional)
If you want the shop to feel completely native:

1. Go to **Design** → **Custom CSS**
2. Add this code:
```css
/* Hide Squarespace header on shop page */
body[class*="shop"] .header {
  display: none !important;
}

/* Full width shop page */
body[class*="shop"] .site-wrapper {
  padding: 0 !important;
}

body[class*="shop"] .page-section {
  padding: 0 !important;
  max-width: 100% !important;
}
```

---

## Step 6: Test & Publish

### 6.1 Preview Before Publishing
1. Click **"Preview"** (eye icon) in Squarespace
2. Navigate to your Shop page
3. Check:
   - ✅ Page loads
   - ✅ Products visible
   - ✅ Can click products
   - ✅ Cart button works
   - ✅ Mobile responsive

### 6.2 Test on Mobile
1. In preview, click the mobile icon
2. Or use your phone to visit the preview link
3. Verify:
   - ✅ Touch scrolling works
   - ✅ Buttons are tappable
   - ✅ Text is readable
   - ✅ Images load

### 6.3 Publish
1. Click **"Save"** (top right)
2. Click **"Publish"** or **"Done"**
3. Visit your live site: `yoursite.com/shop`

---

## Advanced Options

### Option A: Keep Squarespace Header Visible

If you want your Squarespace header to remain:

**Remove this CSS:**
```css
.header {
  display: none !important;
}
```

**Adjust iframe height:**
```css
#coins-store-embed {
  height: calc(100vh - 100px); /* 100px for header */
  margin-top: 0;
}
```

---

### Option B: Embed in Existing Page Section

To embed shop within your existing page (not full page):

**Use this code instead:**
```html
<style>
  #coins-section {
    width: 100%;
    min-height: 1000px;
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    margin: 40px 0;
  }
</style>

<div style="text-align: center; margin: 40px 0;">
  <h2 style="font-size: 48px; margin-bottom: 10px;">Shop Our Collection</h2>
  <p style="font-size: 18px; color: #666;">Commemorative coins honoring Haiti's revolutionary heroes</p>
</div>

<iframe 
  id="coins-section"
  src="https://YOUR_VERCEL_URL/shop"
  frameborder="0"
  scrolling="yes"
  title="1804 Coins Shop"
></iframe>
```

---

### Option C: Multiple Embeds on Same Site

You can embed different pages:

**Shop Products:**
```html
<iframe src="https://your-app.vercel.app/shop"></iframe>
```

**Single Product:**
```html
<iframe src="https://your-app.vercel.app/product/1"></iframe>
```

**Contact Form:**
```html
<iframe src="https://your-app.vercel.app#contact"></iframe>
```

---

## Troubleshooting

### Problem 1: Blank iframe / Nothing loads

**Causes:**
- Wrong Vercel URL
- Vercel app not deployed
- Typo in URL

**Solutions:**
1. Test Vercel URL directly (open in new tab)
2. Check URL has `https://` prefix
3. Verify no extra spaces in code
4. Check browser console (F12) for errors

---

### Problem 2: iframe shows but content is cut off

**Solution 1 - Increase Height:**
```css
#coins-store-embed {
  height: 1200px; /* Increase this */
}
```

**Solution 2 - Auto Height:**
```css
#coins-store-embed {
  min-height: 100vh;
}
```

---

### Problem 3: Can't scroll inside iframe

**Add this attribute:**
```html
<iframe 
  scrolling="yes"
  style="overflow: auto;"
></iframe>
```

---

### Problem 4: Mobile not working properly

**Add viewport meta tag in Page Header:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Adjust mobile CSS:**
```css
@media (max-width: 768px) {
  #coins-store-embed {
    height: 100vh !important;
  }
}
```

---

### Problem 5: "X-Frame-Options" error

**This means:**
- Your Vercel app is blocking iframes
- CORS issue

**Fix in Vercel:**
Add to your frontend `public/index.html`:
```html
<meta http-equiv="X-Frame-Options" content="ALLOWALL">
```

Or add header in `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "ALLOWALL"
        }
      ]
    }
  ]
}
```

---

### Problem 6: Cart doesn't persist

**Check:**
1. Backend URL is correct in Vercel
2. Backend is running on Railway
3. MongoDB is connected
4. Browser allows cookies

**Test:**
- Open Vercel URL directly (not in iframe)
- Add item to cart
- Refresh page
- Item should still be there

---

### Problem 7: Styling conflicts

**Squarespace CSS interfering:**

Add this to isolate iframe:
```css
#coins-store-embed {
  all: initial;
  display: block !important;
  width: 100% !important;
  height: 100vh !important;
}
```

---

## Performance Tips

### 1. Lazy Load iframe
```html
<iframe loading="lazy" src="..."></iframe>
```

### 2. Add Loading Message
```html
<div id="loading-text" style="text-align: center; padding: 100px;">
  <h2>Loading Store...</h2>
  <p>Please wait while we load our collection</p>
</div>

<iframe 
  onload="document.getElementById('loading-text').style.display='none'"
  src="...">
</iframe>
```

### 3. Preconnect to Vercel
In Page Header:
```html
<link rel="preconnect" href="https://your-app.vercel.app">
<link rel="dns-prefetch" href="https://your-app.vercel.app">
```

---

## SEO Considerations

### Limitation:
- Content inside iframe is NOT indexed by Google
- Google sees iframe, not your products

### Workaround:
1. Add product descriptions directly in Squarespace
2. Use Schema markup for products
3. Link to products with proper meta tags

**Example Product Schema:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Jean Jacques Dessalines Commemorative Coin",
  "image": "product-image-url",
  "description": "Premium commemorative coin...",
  "offers": {
    "@type": "Offer",
    "price": "25.00",
    "priceCurrency": "USD"
  }
}
</script>
```

---

## Analytics Tracking

### Track iframe views:
```html
<script>
  // Track when shop page loads
  if (window.analytics) {
    analytics.track('Shop Page Viewed');
  }
  
  // Track iframe load
  document.getElementById('coins-store-embed').addEventListener('load', function() {
    if (window.analytics) {
      analytics.track('Store Embed Loaded');
    }
  });
</script>
```

---

## Custom Domain Setup (Optional)

### Use subdomain for embedded store:
1. In Vercel: Add domain `shop.1804coins.com`
2. Update DNS records (Vercel provides)
3. Use in iframe: `src="https://shop.1804coins.com"`
4. Benefit: Better branding, no "vercel.app" in URL

---

## Maintenance Checklist

**Monthly:**
- [ ] Test all pages load correctly
- [ ] Check cart functionality
- [ ] Verify products display
- [ ] Test mobile experience
- [ ] Check loading speed

**When Updating:**
- [ ] Update in Vercel (just push to GitHub)
- [ ] No changes needed in Squarespace
- [ ] Test after deployment

---

## Final Checklist

Before going live:
- [ ] Vercel URL is correct in embed code
- [ ] All products load and display correctly
- [ ] Cart add/remove works
- [ ] Checkout flow works
- [ ] Mobile responsive (test on phone)
- [ ] Contact form submits
- [ ] Navigation menu updated
- [ ] Page SEO filled out
- [ ] Tested on multiple browsers
- [ ] Loading spinner works
- [ ] No console errors (F12)

---

## Quick Reference

**Your URLs:**
```
Squarespace Site: https://yoursite.squarespace.com
Shop Page: https://yoursite.squarespace.com/shop
Vercel (Direct): https://your-app.vercel.app
Backend (API): https://your-app.railway.app/api
```

**Important Files:**
- Embed Code: `/app/SQUARESPACE_EMBED_CODE.html`
- This Guide: `/app/SQUARESPACE_COMPLETE_GUIDE.md`
- Quick Start: `/app/QUICK_START.md`

---

**Need help?** Check each section or ask specific questions!

🎉 **Once setup, your shop is fully functional and easy to maintain!**
