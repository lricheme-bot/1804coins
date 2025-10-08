# 🚀 Quick Start: Deploy & Embed in 15 Minutes

## What You're Doing:
1. ✅ Deploy backend → Railway (handles products, cart, database)
2. ✅ Deploy frontend → Vercel (the website users see)
3. ✅ Embed in Squarespace → iframe code block

---

## ⚡ Step 1: Get MongoDB Database (3 minutes)

1. **Go to:** https://cloud.mongodb.com
2. **Sign up** (free)
3. **Create Cluster:**
   - Click "Build a Database"
   - Choose "FREE" (M0)
   - Select region closest to you
   - Name: `1804coins`

4. **Create Database User:**
   - Username: `admin`
   - Password: (save this somewhere safe!)
   - Click "Create User"

5. **Get Connection String:**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password
   - **Save this! You'll need it**

Example: `mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/`

---

## ⚡ Step 2: Deploy Backend to Railway (5 minutes)

1. **Go to:** https://railway.app
2. **Sign up** with GitHub
3. **New Project** → "Deploy from GitHub repo"
4. **Select your repo** (you need to push code to GitHub first)
5. **Settings:**
   - Root Directory: `/backend`
   - Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`

6. **Add Environment Variables:**
   - Click "Variables" tab
   - Add these:
   ```
   MONGO_URL=your_mongodb_connection_string_from_step1
   DB_NAME=coins_db
   PORT=8000
   ```

7. **Deploy!** (takes 2-3 minutes)
8. **Copy your Railway URL** (looks like: `https://xxx.railway.app`)

---

## ⚡ Step 3: Deploy Frontend to Vercel (3 minutes)

1. **Go to:** https://vercel.com
2. **Sign up** with GitHub
3. **Import Project** → Select your GitHub repo
4. **Configure:**
   - Root Directory: `frontend`
   - Framework: Create React App
   - Build Command: `yarn build`
   - Output Directory: `build`

5. **Add Environment Variable:**
   - Name: `REACT_APP_BACKEND_URL`
   - Value: Your Railway URL from Step 2
   - Example: `https://xxx.railway.app`

6. **Deploy!** (takes 2-3 minutes)
7. **Copy your Vercel URL** (looks like: `https://xxx.vercel.app`)

---

## ⚡ Step 4: Embed in Squarespace (4 minutes)

1. **Open Squarespace:**
   - Go to your Squarespace site
   - Pages → Add Page
   - Choose "Blank Page"
   - Name it "Shop"

2. **Add Code Block:**
   - Click "+" to add content
   - Choose "Code" block
   - Open file: `/app/SQUARESPACE_EMBED_CODE.html`
   - Copy OPTION 1 code
   - Paste in Squarespace

3. **Update URL:**
   - Find: `YOUR_VERCEL_URL`
   - Replace with: your actual Vercel URL from Step 3
   - Example: `https://your-1804coins.vercel.app`

4. **Save & Publish!**

---

## ✅ Test Your Setup

### Test 1: Backend Working?
Open in browser: `https://your-railway-url.railway.app/api/products`
Should see: JSON list of products

### Test 2: Frontend Working?
Open in browser: `https://your-vercel-url.vercel.app`
Should see: Your 1804 Coins website

### Test 3: Squarespace Embed Working?
Visit your Squarespace shop page
Should see: Full website embedded

### Test 4: Cart Working?
- Click "Add to Cart" on a product
- Cart count should increase
- Go to cart page
- Should see your item

---

## 🆘 Quick Fixes

**Problem:** Backend not deploying on Railway
**Fix:** Check Railway logs, verify MONGO_URL is correct

**Problem:** Frontend shows blank page
**Fix:** Check Vercel logs, verify REACT_APP_BACKEND_URL is set

**Problem:** Products not loading
**Fix:** Backend might not be seeded. Check Railway logs for "Seeded X products"

**Problem:** Iframe blank in Squarespace
**Fix:** 
1. Check if Vercel URL works directly (open in new tab)
2. Check browser console for errors
3. Verify URL in embed code is correct

**Problem:** CORS errors
**Fix:** Already handled in backend code, but verify in Railway env vars

---

## 💰 Costs

- MongoDB Atlas: **FREE** (512MB)
- Railway: **FREE** tier (500 hours/month) or **$5/month**
- Vercel: **FREE** forever
- **Total: $0-5/month**

---

## 🎯 What You Get

✅ Full e-commerce website
✅ Shopping cart that persists
✅ Product management
✅ Contact form
✅ Mobile responsive
✅ Fast loading
✅ Secure (HTTPS)
✅ Professional hosting
✅ Easy to update

---

## 📝 Before You Start

**You need:**
- [ ] GitHub account (free)
- [ ] Your code pushed to GitHub
- [ ] 15 minutes of time
- [ ] Squarespace account (you already have)

**Don't have GitHub repo yet?**
Ask me and I'll help you set it up!

---

## 🚨 Important Notes

1. **First deployment takes longest** (5-10 min)
2. **Subsequent updates are instant** (just push to GitHub)
3. **Keep your MongoDB password safe**
4. **Save all URLs** (Railway, Vercel, MongoDB)
5. **Test thoroughly before going live**

---

## What's Next?

After deployment:
1. ✅ Test all features
2. ✅ Add your custom domain (optional)
3. ✅ Update Squarespace navigation
4. ✅ Tell customers about your store!

---

**Ready to deploy?** Let me know if you need help with any step!
