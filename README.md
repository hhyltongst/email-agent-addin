# AI Email Agent — Outlook Add-in
## Deploy to Vercel + Install in Outlook (Desktop & Web)

---

## STEP 1 — Deploy to Vercel (5 minutes)

### 1a. Install Vercel CLI
```
npm install -g vercel
```

### 1b. Deploy
```
cd email-agent-addin
vercel --prod
```

Follow the prompts. When done, Vercel gives you a URL like:
`https://email-agent-addin-abc123.vercel.app`

**Copy this URL — you need it in steps below.**

---

## STEP 2 — Add your Anthropic API key to Vercel

1. Go to https://vercel.com → your project → Settings → Environment Variables
2. Add:
   - Name: `ANTHROPIC_API_KEY`
   - Value: your key from https://console.anthropic.com
3. Click Save, then redeploy: `vercel --prod`

---

## STEP 3 — Update the manifest with your URL

Open `manifest.xml` and replace ALL instances of `YOUR_VERCEL_URL` with your actual URL.

Example — replace:
```
https://YOUR_VERCEL_URL/taskpane.html
```
With:
```
https://email-agent-addin-abc123.vercel.app/taskpane.html
```

There are 8 places to update. Use Find & Replace in any text editor.

---

## STEP 4 — Install in Outlook Web (OWA)

1. Go to https://outlook.office.com
2. Open any email
3. Click the **...** (More actions) button in the toolbar
4. Click **"Get Add-ins"**
5. Click **"My add-ins"** in the left sidebar
6. Scroll down to **"Custom add-ins"** → click **"+ Add a custom add-in"**
7. Choose **"Add from file..."**
8. Upload your `manifest.xml`
9. Click Install

✅ Done! You'll now see **"AI Email Agent"** button in the Outlook toolbar when reading any email.

---

## STEP 5 — Install in Outlook Desktop (Windows)

### Option A: Via Outlook (easiest)
1. Open Outlook desktop
2. Click **File** → **Manage Add-ins** (opens OWA in browser)
3. Follow the same steps as Outlook Web above

### Option B: Via Microsoft 365 Admin Center (deploys to your whole org)
1. Go to https://admin.microsoft.com
2. Settings → Integrated apps → Upload custom apps
3. Upload `manifest.xml`
4. Assign to yourself or your team

---

## OPTIONAL — Enable real folder creation (Microsoft Graph)

To make the "Create Folder" button actually create folders in your mailbox:

1. Go to https://portal.azure.com
2. Azure Active Directory → App registrations → New registration
3. Name it "Email Agent", click Register
4. Note the **Application (client) ID** and **Directory (tenant) ID**
5. Certificates & secrets → New client secret → copy the value
6. API permissions → Add permission → Microsoft Graph → Application → Mail.ReadWrite → Grant admin consent

Then add to Vercel environment variables:
- `MS_TENANT_ID` = your tenant ID
- `MS_CLIENT_ID` = your app client ID  
- `MS_CLIENT_SECRET` = your client secret
- `MS_USER_EMAIL` = your email address (e.g. you@yourcompany.com)

Redeploy: `vercel --prod`

---

## What the add-in does

| Feature | Works immediately | Requires MS Graph setup |
|---------|------------------|------------------------|
| Summarize emails | ✅ | — |
| Draft replies | ✅ | — |
| Send replies | ✅ (via Outlook compose) | — |
| Archive emails | ✅ | — |
| Chat with AI about email | ✅ | — |
| Create folders in mailbox | ⚠️ Shown as tip | ✅ Full auto |
| Auto-organize inbox | ⚠️ AI tips | ✅ Full auto |

---

## Troubleshooting

**"App not loading"** — Make sure your Vercel URL is HTTPS and all manifest URLs are updated.

**"API error 500"** — Check that ANTHROPIC_API_KEY is set in Vercel env vars and redeployed.

**"Not seeing the button in Outlook Desktop"** — Restart Outlook after installing the add-in.

**Add-in doesn't appear** — Make sure you uploaded the manifest (not the whole folder). The file is `manifest.xml`.
