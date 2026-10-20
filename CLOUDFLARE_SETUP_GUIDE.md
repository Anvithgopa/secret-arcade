# ☁️ Cloudflare Worker + Cashfree Setup Guide (Pure Email Verification)

This guide takes **under 5 minutes** and uses Cloudflare's **100% Free Tier** (100,000 free requests per day, zero monthly cost).

---

## 1. Create the Cloudflare Worker

1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com).
2. On the left sidebar, click **Workers & Pages** → **Create Application** → **Create Worker**.
3. Name it: `secret-arcade-verify` (or any name you like).
4. Click **Deploy**.

---

## 2. Create the KV Storage (Stores Paid Emails)

1. On the left sidebar in Cloudflare, click **Workers & Pages** → **KV**.
2. Click **Create a Namespace**.
3. Name it: `PAID_EMAILS` and click **Add**.

---

## 3. Link the KV Namespace & Environment Variables to your Worker

1. Go back to **Workers & Pages** → click on your worker (`secret-arcade-verify`).
2. Go to the **Settings** tab:

### A. Add KV Binding:
- Scroll down to **KV Namespace Bindings** → click **Add binding**.
- **Variable name**: `PAID_EMAILS` *(must be exact)*
- **KV namespace**: select `PAID_EMAILS` from the dropdown.
- Click **Save**.

### B. Add Environment Variables:
- In the same Settings tab, scroll to **Variables and Secrets** → click **Add**:
  - `CASHFREE_APP_ID`: `your_cashfree_app_id`
  - `CASHFREE_SECRET_KEY`: *(paste your Cashfree secret key here)*
  - `CASHFREE_ENV`: `SANDBOX` (or `PRODUCTION` when you go live)
  - `EXPECTED_AMOUNT_INR`: `299`
- Click **Save**.

---

## 4. Paste the Worker Code

1. In your worker page, click **Edit code** (top right).
2. Delete whatever is in the editor and copy & paste the entire contents of:
   [`verify-worker.js (backend service)`](file:///Users/anvithgopa/Documents/Chrome%20Extension/verify-worker.js (backend service))
3. Click **Save and Deploy**.

Cloudflare will give you a public URL like:
`https://secret-arcade-verify.YOUR_NAME.workers.dev`

---

## 5. Add Webhook to Cashfree Dashboard

1. Open your [Cashfree Merchant Dashboard](https://merchant.cashfree.com).
2. Go to **Developers** → **Webhooks** (or Payment Gateway → Webhooks).
3. Click **Add Webhook** / **Create Webhook**:
   - **Webhook URL**: `https://secret-arcade-verify.YOUR_NAME.workers.dev/webhook`
   - **Events**: Select **Payment Success** / **Order Paid**
4. Click **Save Webhook**.

*(Whenever a player pays, Cashfree instantly notifies your worker, which saves their email into Cloudflare KV).*

---

## 6. Update `.env` in Your Extension

In your [`.env`](file:///Users/anvithgopa/Documents/Chrome%20Extension/.env) file, update line 15:

```ini
VITE_VERIFY_ENDPOINT=https://secret-arcade-verify.YOUR_NAME.workers.dev/verify
```

Then rebuild the extension:
```bash
npm run build
```

🎉 **That's it!** Now any user who pays on Cashfree simply enters their **Email Address** and clicks **VERIFY EMAIL & UNLOCK ARCADE** to unlock all 8 games instantly!
