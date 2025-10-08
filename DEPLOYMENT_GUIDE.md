# 1804 Coins - Deployment Guide for Squarespace Embedding

## Overview
This guide will help you deploy your full-stack 1804 Coins app and embed it in Squarespace.

---

## Phase 1: Deploy Backend (Railway - Free/Paid)

### Step 1: Sign up for Railway
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"

### Step 2: Deploy Backend
1. Click "Deploy from GitHub repo"
2. Connect your GitHub account
3. Select your repository
4. Choose `/backend` as the root directory
5. Railway will auto-detect Python

### Step 3: Configure Environment Variables
In Railway dashboard, add these variables:
```
MONGO_URL=your_mongodb_connection_string
DB_NAME=coins_db
```

### Step 4: Get MongoDB Connection String
**Option A: MongoDB Atlas (Free)**
1. Go to https://cloud.mongodb.com
2. Create free account
3. Create cluster (Free tier)
4. Get connection string
5. Replace `<password>` with your DB password
6. Use format: `mongodb+srv://username:password@cluster.mongodb.net/`

### Step 5: Get Backend URL
- Railway will give you a URL like: `https://your-app.railway.app`
- Copy this URL (you'll need it for frontend)

---

## Phase 2: Deploy Frontend (Vercel - Free)

### Step 1: Sign up for Vercel
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New Project"

### Step 2: Configure Project
1. Import your GitHub repository
2. Set Root Directory: `frontend`
3. Framework Preset: Create React App
4. Build Command: `yarn build`
5. Output Directory: `build`

### Step 3: Add Environment Variable
In Vercel project settings:
```
REACT_APP_BACKEND_URL=https://your-backend.railway.app
```
(Use the Railway URL from Phase 1)

### Step 4: Deploy
- Click "Deploy"
- Wait 2-3 minutes
- You'll get a URL like: `https://your-app.vercel.app`

---

## Phase 3: Embed in Squarespace

### Method 1: Full Page Embed (Recommended)

1. **In Squarespace:**
   - Go to Pages
   - Add new page: "Shop" or "Store"
   - Choose "Blank Page"

2. **Add Code Block:**
   - Click "+" to add block
   - Choose "Code" block
   - Paste this code:

```html
<style>
  #embedded-store {
    width: 100%;
    height: 100vh;
    border: none;
    display: block;
  }
  
  /* Remove Squarespace header on this page (optional) */
  .header {
    display: none;
  }
  
  /* Full width container */
  .sqs-block-code {
    padding: 0 !important;
    margin: 0 !important;
  }
  
  .page-section {
    padding: 0 !important;
  }
</style>

<iframe 
  id="embedded-store"
  src="https://your-app.vercel.app"
  frameborder="0"
  scrolling="yes"
  allowfullscreen
  title="1804 Coins Store"
></iframe>

<script>
  // Auto-adjust iframe height
  window.addEventListener('message', function(e) {
    if (e.data.height) {
      document.getElementById('embedded-store').style.height = e.data.height + 'px';
    }
  });
</script>
```

3. **Replace URL:**
   - Change `https://your-app.vercel.app` to your actual Vercel URL

4. **Save & Publish**

---

### Method 2: Section Embed

Embed just the shop section in existing Squarespace page:

```html
<div style="width: 100%; min-height: 800px;">
  <iframe 
    src="https://your-app.vercel.app/shop"
    style="width: 100%; height: 800px; border: none;"
    frameborder="0"
    scrolling="yes"
    title="Shop"
  ></iframe>
</div>
```

---

## Phase 4: Configure CORS (Important!)

### Update Backend for iframe
Add this to `/app/backend/server.py` (already done, but verify):

```python
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],  # Or specify your Squarespace domain
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Testing Your Deployment

### Test Backend:
```bash
curl https://your-backend.railway.app/api/products
```
Should return JSON with products.

### Test Frontend:
Visit: `https://your-app.vercel.app`
- Should load homepage
- Check cart functionality
- Test add to cart

### Test in Squarespace:
- Visit your Squarespace page
- Test all features work in iframe
- Check mobile responsiveness

---

## Custom Domain (Optional)

### For Vercel (Frontend):
1. In Vercel project settings
2. Go to "Domains"
3. Add your custom domain (e.g., shop.1804coins.com)
4. Update DNS records as instructed

### For Railway (Backend):
1. Railway Pro plan required ($5/month)
2. Add custom domain in settings
3. Or use Vercel URL as is

---

## Troubleshooting

### Issue: Iframe not loading
**Fix:** Check browser console for CORS errors

### Issue: Cart not working
**Fix:** Verify REACT_APP_BACKEND_URL is correct in Vercel

### Issue: Products not showing
**Fix:** Check Railway logs, verify MongoDB connection

### Issue: Mobile not responsive
**Fix:** Add this to Squarespace code block:
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

## Cost Breakdown

- **MongoDB Atlas:** Free (up to 512MB)
- **Railway Backend:** Free tier (500 hours/month) or $5/month
- **Vercel Frontend:** Free
- **Squarespace:** Your existing plan
- **Total:** $0-5/month

---

## Important Notes

### Limitations of iframe embedding:
1. **SEO:** Content inside iframe not indexed by Google
2. **Height:** May need manual height adjustment
3. **Analytics:** Track separately from Squarespace
4. **Cookies:** Some browsers block third-party cookies

### Advantages:
1. Keep ALL features working
2. Easy updates (just redeploy)
3. Independent from Squarespace
4. Full control over functionality

---

## Next Steps

1. ✅ Deploy backend to Railway
2. ✅ Deploy frontend to Vercel
3. ✅ Test both deployments
4. ✅ Add iframe code to Squarespace
5. ✅ Test embedded version
6. ✅ Update links in Squarespace nav to point to your shop page

---

## Support

If you need help:
1. Check Railway logs for backend issues
2. Check Vercel logs for frontend issues
3. Use browser DevTools Console for debugging
4. Test outside iframe first (direct Vercel URL)

---

## Quick Deploy Checklist

- [ ] GitHub repository created
- [ ] Backend deployed to Railway
- [ ] MongoDB Atlas setup
- [ ] Environment variables configured
- [ ] Backend URL obtained
- [ ] Frontend deployed to Vercel
- [ ] Frontend env variable set
- [ ] Frontend URL obtained
- [ ] Squarespace code block added
- [ ] URLs updated in code
- [ ] Tested in Squarespace
- [ ] Mobile tested
- [ ] Cart functionality verified

---

**Ready to deploy? Follow the steps above!**

Need help with any step? Just ask!
