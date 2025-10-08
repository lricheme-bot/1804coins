# ✅ Squarespace Setup Checklist

Print this out and check off each step as you complete it!

---

## 📦 Pre-Setup (Must have these ready)

- [ ] Vercel URL (Example: `https://1804coins.vercel.app`)
- [ ] Squarespace admin access
- [ ] 10 minutes of time

---

## 🎯 Part 1: Create the Shop Page (2 minutes)

### In Squarespace Admin:

- [ ] 1. Click "Pages" in left sidebar
- [ ] 2. Click the "+" button
- [ ] 3. Select "Blank Page"
- [ ] 4. Name it "Shop"
- [ ] 5. Click "Save"

**✓ You should now see "Shop" in your pages list**

---

## 💻 Part 2: Add the Code (3 minutes)

### On Your Shop Page:

- [ ] 1. Click "Edit" on the Shop page
- [ ] 2. Click "+" to add a block
- [ ] 3. Search for "Code"
- [ ] 4. Select "Code" block
- [ ] 5. Switch to "HTML" tab

### Get the Embed Code:

- [ ] 6. Open file: `/app/SQUARESPACE_EMBED_CODE.html`
- [ ] 7. Copy the "OPTION 1" code (lines 9-77)
- [ ] 8. Paste into Squarespace HTML tab

### Update Your URL:

- [ ] 9. Find line: `src="YOUR_VERCEL_URL"`
- [ ] 10. Replace with: `src="https://your-actual-vercel-url.vercel.app"`
- [ ] 11. Double-check URL is correct (no typos!)
- [ ] 12. Click "Apply" button

**✓ Code block should now show a preview**

---

## ⚙️ Part 3: Configure Page Settings (2 minutes)

### Page Settings:

- [ ] 1. Click gear icon ⚙️ next to "Shop" page
- [ ] 2. Check Page Title: `Shop`
- [ ] 3. Check URL Slug: `/shop`
- [ ] 4. Click "SEO" tab
- [ ] 5. Add Page Title: `Shop - 1804 Coins`
- [ ] 6. Add Description: `Browse our collection of Haitian commemorative coins`
- [ ] 7. Click "Save"

**✓ Settings saved**

---

## 🔗 Part 4: Update Navigation (1 minute)

### Add to Menu:

- [ ] 1. Go to "Pages" panel
- [ ] 2. Your "Shop" page should be visible
- [ ] 3. Drag to desired position (usually after "Home")
- [ ] 4. Verify it appears in navigation menu

**✓ Shop link visible in navigation**

---

## 🧪 Part 5: Test Everything (3 minutes)

### Preview Mode:

- [ ] 1. Click "Preview" (eye icon) in top right
- [ ] 2. Click "Shop" in navigation
- [ ] 3. Wait 3-5 seconds for loading

### Desktop Tests:

- [ ] 4. Store loads completely
- [ ] 5. Can see products
- [ ] 6. Can click on a product
- [ ] 7. Product detail page opens
- [ ] 8. Can add item to cart
- [ ] 9. Cart count increases
- [ ] 10. Can view cart
- [ ] 11. Can navigate back to shop

### Mobile Tests:

- [ ] 12. Click mobile icon in preview OR
- [ ] 13. Test on your actual phone
- [ ] 14. Touch scrolling works
- [ ] 15. Products display correctly
- [ ] 16. Buttons are tappable
- [ ] 17. Cart works on mobile

**✓ All tests passed**

---

## 🚀 Part 6: Publish (1 minute)

### Go Live:

- [ ] 1. Exit preview mode
- [ ] 2. Click "Save" (top right)
- [ ] 3. Click "Publish" or "Done"
- [ ] 4. Visit your live site
- [ ] 5. Navigate to Shop page
- [ ] 6. Verify everything works

**✓ LIVE! 🎉**

---

## 🔧 Troubleshooting Quick Fixes

### If iframe is blank:

- [ ] Check Vercel URL is correct
- [ ] Open Vercel URL directly in new tab (should work)
- [ ] Check for typos in URL
- [ ] Press F12, check Console for errors

### If products don't load:

- [ ] Backend might be down - check Railway
- [ ] Check browser console for errors
- [ ] Verify REACT_APP_BACKEND_URL in Vercel

### If height is wrong:

- [ ] Increase height in CSS: `height: 1200px;`
- [ ] Or use: `min-height: 100vh;`

### If mobile doesn't work:

- [ ] Check if scrolling="yes" in iframe
- [ ] Add mobile CSS adjustments
- [ ] Test on actual device, not just preview

---

## 📝 Post-Launch Checklist

### First Week:

- [ ] Test on different browsers (Chrome, Safari, Firefox)
- [ ] Test on different devices (phone, tablet, desktop)
- [ ] Share with friends for testing
- [ ] Monitor for any errors
- [ ] Check cart functionality daily

### First Month:

- [ ] Verify all products still loading
- [ ] Test checkout flow
- [ ] Check mobile experience
- [ ] Review any customer feedback
- [ ] Update products as needed

---

## 🎯 Success Criteria

**You're ready to launch when:**

✅ Shop page loads without errors
✅ All products display correctly
✅ Cart add/remove works perfectly
✅ Mobile experience is smooth
✅ No console errors (F12)
✅ Loading time is under 3 seconds
✅ Tested on multiple devices
✅ Navigation works seamlessly

---

## 📞 Quick Help

**Problem:** Can't find Code block
**Solution:** Search "code" in block selector

**Problem:** Preview shows blank
**Solution:** URL might be wrong, check it carefully

**Problem:** Changes not showing
**Solution:** Clear cache (Ctrl+Shift+R) or try incognito

**Problem:** Iframe too small
**Solution:** Change `height: 100vh` to `height: 1500px`

---

## 🔄 Making Updates Later

**To update your store:**
1. Make changes in your code
2. Push to GitHub
3. Vercel auto-deploys
4. NO changes needed in Squarespace!

**Squarespace just displays your app, so updates are automatic!**

---

## 💡 Pro Tips

✨ **Test first in preview** before publishing
✨ **Keep Vercel URL handy** - you'll need it
✨ **Take screenshots** of working version
✨ **Save your embed code** somewhere safe
✨ **Bookmark your Vercel dashboard** for quick access

---

## 🎉 Celebration Checklist

Once everything works:

- [ ] Take a screenshot
- [ ] Share with friends/family
- [ ] Post on social media
- [ ] Tell customers about your store
- [ ] Pat yourself on the back! 🎊

---

**Total Time: ~15 minutes**
**Difficulty: Easy** ⭐⭐☆☆☆

**You got this! 💪**

---

## 📚 Reference Documents

- Full Guide: `/app/SQUARESPACE_COMPLETE_GUIDE.md`
- Embed Code: `/app/SQUARESPACE_EMBED_CODE.html`
- Quick Start: `/app/QUICK_START.md`
- Deployment Guide: `/app/DEPLOYMENT_GUIDE.md`

---

**Print this checklist and mark it off as you go!** ✓
