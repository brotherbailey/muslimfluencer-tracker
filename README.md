# muslimfluencer. Content Accountability Tracker

## Deploy to Vercel (Step-by-Step)

### Step 1 — Create a GitHub account
Go to https://github.com and sign up (free).

### Step 2 — Create a new repository
1. Click the **+** icon (top right) → **New repository**
2. Name it: `muslimfluencer-tracker`
3. Set it to **Private**
4. Click **Create repository**

### Step 3 — Upload these files
1. On your new repo page, click **uploading an existing file**
2. Drag and drop the entire contents of this folder (all files + the `src` folder)
3. Click **Commit changes**

### Step 4 — Deploy on Vercel
1. Go to https://vercel.com and sign up with your GitHub account
2. Click **Add New Project**
3. Select your `muslimfluencer-tracker` repository
4. Vercel will auto-detect Vite — just click **Deploy**
5. Wait ~1 minute — you'll get a live URL like:
   `https://muslimfluencer-tracker.vercel.app`

### Step 5 — Embed in Notion
1. Open your client's Notion dashboard
2. Type `/embed` and press Enter
3. Paste your Vercel URL
4. Resize the embed block to fill the page
5. Done ✅

---

## Per-Client Setup
For each new client, either:
- **Share the same URL** (they all see the same tracker, data is per-session only)
- **Duplicate the Vercel project** and give each client their own URL

---

## Local Development (optional)
```bash
npm install
npm run dev
```
