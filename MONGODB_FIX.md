# MongoDB Timeout Fix - Action Items

## Issue
```
MongooseError: Operation `users.findOne()` buffering timed out after 10000ms
```

## ✅ What I Fixed
1. Added `serverSelectionTimeoutMS: 5000` - Faster timeout detection
2. Added `socketTimeoutMS: 45000` - Query execution timeout
3. Added `maxPoolSize: 10` - Connection pooling
4. Added connection event listeners for debugging
5. Added `process.exit(1)` on connection failure to prevent buffering

---

## ⚠️ CRITICAL: MongoDB Atlas IP Whitelist

Since your app is deployed on **Render**, you MUST whitelist Render's IP:

### Steps:
1. Go to https://cloud.mongodb.com/
2. Login to your cluster (`cluster0.jddn3od.mongodb.net`)
3. Click **Network Access** (left sidebar)
4. Click **ADD IP ADDRESS**
5. Choose one option:
   - **Option A (Recommended for testing)**: Click "ALLOW ACCESS FROM ANYWHERE" → Add entry `0.0.0.0/0`
   - **Option B (More secure)**: Add Render's specific IPs (varies by deployment region)

6. Click Confirm

---

## 🔍 Debugging Steps

### 1. Test Local Connection First
```bash
cd backend
npm start
# Should see: ✅ Connected to MongoDB successfully
#            📡 Mongoose connected to DB
```

### 2. Check Environment Variables on Render
- Go to your Render service
- Settings → Environment
- Verify `MONGO_URI` is set correctly
- Copy exact value from `.env` file

### 3. Test DB Query Directly
Add this temporary route to `server.js` to test:
```javascript
app.get("/test-db", async (req, res) => {
  try {
    const user = await User.findOne({ email: "test@example.com" });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

### 4. Check Render Logs
- Open Render dashboard
- Click your service
- Scroll to **Logs**
- Should see connection messages

---

## 📋 MongoDB Atlas Credentials Check

Your current `.env`:
```
MONGO_URI=mongodb+srv://suryaprakashsahoo4105_db_user:Surya2005@cluster0.jddn3od.mongodb.net/hotel_management
```

⚠️ **SECURITY WARNING**: Your password is visible in `.env`. For production:
1. Never commit `.env` to git
2. Change this password immediately
3. Create new MongoDB user with strong password
4. Update Render environment variables

---

## 🚀 Next Steps

1. **Whitelist Render IP** (CRITICAL - do this first)
2. Deploy again: `git push` (your Render will auto-redeploy)
3. Check logs on Render dashboard
4. Try login/register on your app
5. If still timing out, enable debug mode by adding to UserRoutes.js:
   ```javascript
   User.collection.insertOne({ test: "debug", timestamp: new Date() });
   ```

---

## Additional Configuration (Optional but Helpful)

If you want to increase timeout further, update `server.js`:
```javascript
const mongooseOptions = {
  serverSelectionTimeoutMS: 10000,  // Increased from 5000
  socketTimeoutMS: 60000,             // Increased from 45000
  maxPoolSize: 15,                    // Increased from 10
  // ... rest of options
};
```

---

## Common Causes
- ❌ Render IP not whitelisted on MongoDB Atlas
- ❌ Wrong MongoDB credentials in .env
- ❌ Wrong connection string (check db name)
- ❌ MongoDB Atlas project paused/deleted
- ❌ Wrong cluster selected
- ❌ Firewall blocking connection

---

Contact support if issue persists after whitelisting IP.
