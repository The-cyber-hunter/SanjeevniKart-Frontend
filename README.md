# Sanjeevni Kart — Website

Next.js storefront using the **same backend API** as the Expo mobile app (`/api` on port 4000).

## Local setup

**Terminal 1 — backend** (from repo root):

```bash
cd backend
npm install
npm run dev
```

**Terminal 2 — website**:

```bash
cd website
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### How API connection works

| Mode | Config | Behavior |
|------|--------|----------|
| **Render / hosted API** | `API_URL=https://sanjeevnikart-backend.onrender.com` | Browser calls `/api/...`; Next.js **proxies** to Render (no CORS setup needed) |
| **Local backend** | `API_URL=http://127.0.0.1:4000` | Proxy to `npm run dev` in `backend/` |
| **Direct browser calls** | `NEXT_PUBLIC_API_URL=https://...` | Backend `CORS_ALLOWED_ORIGINS` must include your site URL |

All website changes stay in this folder — **no backend code changes required**.

## Features wired to backend

- Catalog: categories, products, promotions, `app-config`
- Cart quote (`POST /cart/quote`)
- Coupons (`POST /coupons/validate`)
- Auto promotions & delivery charge (same rules as mobile)
- Service pincodes (`GET /service-pincodes`)
- Auth: OTP login (`/users/login/*`)
- Orders: create, list, order count
- Razorpay when enabled in `app-config` (`/payments/razorpay/*`)

## Routes

`/`, `/shop`, `/cart`, `/checkout`, `/orders`, `/account`, `/support`, `/farmers`
