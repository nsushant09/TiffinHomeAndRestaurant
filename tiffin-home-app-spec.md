# Technical Specification: Tiffin Home & Restaurant — Booking Web Application

**Version:** 1.0
**Purpose:** A complete, self-contained brief to hand to Claude (or another coding agent) to build a full website with an integrated booking system for a Next.js + MongoDB stack.
**Status of content:** Business details in Sections 1–4 come directly from the owner. Anything not specified (exact rates, room photos, exact policies) is flagged **[TBD]** and should be treated as a placeholder in the build, not invented.

---

## 1. Business Profile

| Field | Value |
|---|---|
| Name | Tiffin Home & Restaurant |
| Location | Sauraha, Chitwan, Nepal — near the Rapti River (~10 min walk to the river) |
| History | Family-run business, 20+ years in Sauraha. Started as a restaurant and grew into a small hotel and restaurant, now with 10 rooms |
| Email | tiffinhousesauraha@gmail.com |
| Phone | 9845160919 (confirm intl format, e.g. +977 984-516-0919) [TBD] |
| Brand color | `#186131` (from logo) |
| Logo & photos | Owner will supply room photos (standard & deluxe), menu images, and logo files locally in the project's asset folder — build the image pipeline to consume a defined folder structure (see Section 12) |
| Payment | **Onsite only** at v1 — no online payment processing required |

### Brand color palette (derived from the supplied swatch, anchored on `#186131`)

| Token | Hex | Suggested use |
|---|---|---|
| `brand-50` | `#92FCAC` | Backgrounds, subtle highlights |
| `brand-200` | `#41DA76` | Hover accents |
| `brand-400` | `#33AE5D` | Secondary buttons/links |
| `brand-500` | `#268847` | Accent text |
| `brand-600` (**primary**) | `#186131` | Primary buttons, header, links, brand elements |
| `brand-800` | `#0A391A` | Dark backgrounds, footer |
| `brand-900` | `#02160A`/`#021607` | Near-black text on brand surfaces |

Pair with a warm neutral (off-white `#FAF9F6`, warm gray `#4A4A45`) and an earthy accent (terracotta or gold) for CTAs so the palette doesn't read as all-green. Confirm final neutrals during design.

---

## 2. Rooms Inventory

| Room type | Count | Bed configuration | Suitability |
|---|---|---|---|
| Standard Room — Twin/Double | 6 | One single bed + one double (king-size) bed | 1–3 guests |
| Standard Room — King | 2 | One king-size bed | 1–2 guests |
| Deluxe Room | 2 | Larger, more comfortable room (bed config not yet specified) [TBD] | Couples/families |

**Total inventory: 10 rooms.**

Shared amenities across all rooms:
- Air conditioning
- Hot & cold shower
- Free Wi-Fi
- Clean, comfortable accommodation

Family/group accommodation can also be arranged subject to availability (not a fixed room type — treat as a note/enquiry option rather than a bookable unit at v1).

**Missing for full launch [TBD]:** room sizes, max occupancy per room, nightly rates (seasonal or flat), extra-bed/extra-guest charges, exact photos per room.

---

## 3. Restaurant

- Family-run restaurant serving freshly prepared meals, cooked to order.
- **Hours:** 8:00 AM – 10:00 PM daily.
- Menu images will be supplied by the owner (no structured menu data yet — see Section 12 for how to ingest them).
- **Missing [TBD]:** itemized menu with prices, dietary tags (veg/non-veg, vegan, allergens), table reservation policy.

---

## 4. Amenities, Location & Activities

**Hotel amenities**
Free Wi-Fi · Air conditioning · Hot & cold shower · Parking · On-site restaurant · Family-run · Meals on order · Wildlife/nature surroundings · Comfortable rooms · Easy access to Sauraha and Chitwan National Park · Close to the Rapti River

**Location**
Sauraha, Chitwan, Nepal. ~10-minute walk to the Rapti River and sunset viewpoints. Convenient for Chitwan National Park and the surrounding wildlife area. Exact GPS coordinates / Google Maps pin: **[TBD]**.

**Tours & Activities** (enquiry-based, not directly bookable/paid online at v1)
- Chitwan National Park jungle safari
- Jeep safari
- Jungle walk
- Canoeing
- Bird watching
- Wildlife experiences
- Tharu cultural experiences
- Village/cultural tours
- Rapti River / sunset activities
- General nature and sightseeing around Sauraha

These should render as an informational "Tours & Activities" section with an enquiry form/CTA — not part of the room-booking calendar.

---

## 5. Our Story (content, ready to use)

> Tiffin is a family-run business with more than 20 years of history in Sauraha, Chitwan. It originally started as a restaurant and has grown over the years into a small family-run hotel and restaurant. The property now has 10 rooms, including standard and deluxe rooms, while continuing to operate as a family business. Our aim is to provide guests with comfortable accommodation, freshly prepared food and a warm, personal experience while they explore Sauraha and Chitwan.

Use this near-verbatim on the About/Our Story page; it can be lightly copy-edited but the facts (20+ years, restaurant-to-hotel growth, 10 rooms, family-run) must be preserved.

---

## 6. Functional Scope for v1

### 6.1 Public site
- Home, Rooms, Restaurant, Tours & Activities, Our Story, Location/Contact, FAQ
- Room detail pages with photo gallery, amenities, and a "Check availability & book" flow
- Tours & Activities enquiry form (name, contact, dates, activity of interest, message)
- General contact form and displayed phone/email/map

### 6.2 Booking system (core feature)
- **Calendar-based multi-night booking**: guest selects a room type, a check-in date and a check-out date (or a date range on a calendar widget), and number of guests.
- **Availability logic**: system must check existing confirmed bookings for that room type/date range and prevent double-booking. Since rooms of the same type are interchangeable, treat each room type as having N units (6 / 2 / 2) and only reject a request when all units of that type are already booked for any overlapping night.
- **Guest details required at booking**: full name, email, phone number, number of guests, number of rooms, special requests/notes. (Confirm with owner whether ID/passport number should be collected — flagged **[TBD]**, omit unless confirmed given privacy sensitivity.)
- **Payment:** none collected online. Booking is a **reservation request/confirmation**, payment happens onsite. Clearly state this on the booking form and confirmation email.
- **Booking statuses:** `pending` → `confirmed` → `checked_in` → `checked_out` / `cancelled` / `no_show`. At minimum v1 needs `pending`, `confirmed`, `cancelled`.
- **Confirmation email:** automatically sent to the guest on successful booking submission, containing booking reference, dates, room type, guest details, and property contact info. A separate notification email should go to the owner's inbox for every new booking.
- **Cancellation:** guest-side cancellation is optional for v1 (could be "contact us to cancel"); admin-side cancellation is required (Section 6.3).

### 6.3 Admin panel
- **Authentication:** protected admin login (email/password to start; consider magic link or 2FA later). Only the owner/staff should access this.
- **Dashboard:** list of bookings (upcoming, past, cancelled), filterable by date range, room type, and status.
- **Booking management:** view full booking/guest details, change status (confirm, cancel, mark checked-in/out), add internal notes.
- **Room/availability management:** ability to block out dates per room type (e.g., for maintenance) so they don't appear available.
- **Content management [optional, phase 2]:** ability to edit room descriptions, rates, and menu images without a code deploy. For v1, content can be seeded via a config/CMS-lite approach; flag this as a stretch goal so the core booking engine ships first.

### 6.4 Notifications
- Guest confirmation email (booking system)
- Owner new-booking notification email
- **[Optional/phase 2]** SMS/WhatsApp notification, given the property's reliance on WhatsApp-style contact

---

## 7. Recommended Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js** (App Router, latest stable) | Server components for public pages; API routes / server actions for booking logic |
| Language | TypeScript | Type safety for booking/availability logic |
| Database | **MongoDB** (Atlas recommended for hosting) | Document model fits rooms/bookings well |
| ODM | Mongoose | Schema validation, easier query building than raw driver |
| Styling | Tailwind CSS | Fast to theme with the brand palette above |
| Calendar UI | `react-day-picker` or `react-big-calendar` (date-range picker) | Needs range selection + disabled/blocked dates |
| Email service | Provider-agnostic via **Nodemailer** wrapper, or a transactional API (Resend / SendGrid / Postmark) | Keep credentials fully in `.env`, see Section 9 |
| Auth (admin) | NextAuth.js (Credentials provider) or a lightweight custom JWT/session setup | Only one or few admin users expected |
| Image handling | Next.js `<Image>` with local `/public` assets at v1; migrate to a cloud bucket (Cloudinary/S3) later if asset volume grows | Owner is supplying images locally |
| Deployment | Vercel (Next.js) + MongoDB Atlas | Simple, low-maintenance for a small business |
| Validation | Zod | Validate booking form payloads server-side |

---

## 8. Data Models (MongoDB / Mongoose)

```ts
// Room Type
RoomType {
  _id: ObjectId
  slug: string                // "standard-twin", "standard-king", "deluxe"
  name: string                // "Standard Room (Twin & King)"
  description: string
  bedConfiguration: string    // "1 single bed + 1 double/king bed"
  totalUnits: number          // 6, 2, or 2
  maxGuests: number           // [TBD - confirm with owner]
  amenities: string[]         // shared + room-specific
  images: string[]            // paths/URLs
  basePrice: number | null    // nullable until owner confirms rates
  currency: "NPR" | "USD"
  active: boolean
  createdAt, updatedAt
}

// Booking
Booking {
  _id: ObjectId
  bookingReference: string     // human-readable, e.g. "TH-20260924-0001"
  roomTypeId: ObjectId (ref RoomType)
  checkIn: Date
  checkOut: Date
  numRooms: number             // rooms of this type requested
  numGuests: number
  guest: {
    fullName: string
    email: string
    phone: string
    notes?: string
  }
  status: "pending" | "confirmed" | "cancelled" | "checked_in" | "checked_out" | "no_show"
  paymentMethod: "onsite"       // fixed value at v1
  source: "website"             // future-proofing if OTAs are integrated later
  adminNotes?: string
  createdAt, updatedAt
}

// BlockedDate (admin-managed maintenance/holds)
BlockedDate {
  _id: ObjectId
  roomTypeId: ObjectId (ref RoomType)
  date: Date
  reason?: string
  createdAt
}

// AdminUser
AdminUser {
  _id: ObjectId
  name: string
  email: string
  passwordHash: string
  role: "owner" | "staff"
  createdAt, updatedAt
}

// Enquiry (Tours & general contact form submissions)
Enquiry {
  _id: ObjectId
  type: "tour" | "general"
  fullName: string
  email: string
  phone?: string
  message: string
  preferredDates?: { start: Date, end: Date }
  activityInterest?: string    // e.g. "Jeep safari"
  status: "new" | "responded" | "closed"
  createdAt
}
```

### Availability calculation
For a requested room type and date range, count `confirmed` (and optionally `pending`) bookings whose `[checkIn, checkOut)` ranges overlap each night in the requested range, plus any `BlockedDate` entries. If `bookedUnits(night) + 1 > totalUnits` for any night in the range, that room type is unavailable for those dates. Implement as a reusable server-side function (`getAvailability(roomTypeId, startDate, endDate)`) used by both the public booking form and the admin dashboard.

---

## 9. Environment Configuration (`.env`)

Keep **all secrets and service credentials** out of code, loaded via environment variables, so the owner or developer can fill them in later without touching source. Provide a checked-in `.env.example` with empty/placeholder values, and a real `.env.local` (gitignored) for actual secrets.

```bash
# --- App ---
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_BRAND_PRIMARY_COLOR=#186131

# --- MongoDB ---
MONGODB_URI=                     # e.g. mongodb+srv://<user>:<pass>@cluster.mongodb.net/tiffin-home
MONGODB_DB_NAME=tiffin-home

# --- Email service (choose ONE provider and fill its keys) ---
EMAIL_PROVIDER=                  # "smtp" | "resend" | "sendgrid" | "postmark"
EMAIL_FROM=bookings@tiffinhomesauraha.com   # or the gmail address, if using that
EMAIL_TO_OWNER=tiffinhousesauraha@gmail.com

# SMTP (if EMAIL_PROVIDER=smtp, e.g. Gmail SMTP or another host)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=

# Resend / SendGrid / Postmark (if used instead of SMTP)
RESEND_API_KEY=
SENDGRID_API_KEY=
POSTMARK_API_KEY=

# --- Admin auth ---
NEXTAUTH_URL=
NEXTAUTH_SECRET=                 # generate with `openssl rand -base64 32`
ADMIN_SEED_EMAIL=                # used only to seed the first admin user
ADMIN_SEED_PASSWORD=

# --- Optional (phase 2) ---
CLOUDINARY_URL=
WHATSAPP_API_KEY=
```

**Implementation notes for the agent building this:**
- Wrap MongoDB connection in a single cached utility (`lib/mongodb.ts`) that reads `MONGODB_URI`/`MONGODB_DB_NAME` and reuses the connection across serverless invocations.
- Wrap email sending in a single abstraction (`lib/email.ts`) exposing `sendBookingConfirmation()`, `sendOwnerNotification()`, etc., internally branching on `EMAIL_PROVIDER` so the rest of the app never touches provider-specific code.
- Fail gracefully and log clearly if required env vars are missing at startup, rather than crashing with an unclear error.

---

## 10. API Surface (App Router route handlers or server actions)

| Route | Method | Purpose |
|---|---|---|
| `/api/room-types` | GET | List active room types with images/amenities |
| `/api/availability` | GET | Query params: `roomTypeId`, `checkIn`, `checkOut` → boolean + remaining units |
| `/api/bookings` | POST | Create a booking (validates availability, guest details; triggers emails) |
| `/api/bookings/:id` | GET | Fetch a single booking (owner reference lookup) |
| `/api/enquiries` | POST | Submit a tour/general enquiry |
| `/api/admin/bookings` | GET | (auth required) list/filter all bookings |
| `/api/admin/bookings/:id` | PATCH | (auth required) update status/notes |
| `/api/admin/blocked-dates` | POST/DELETE | (auth required) manage blocked dates per room type |
| `/api/auth/[...nextauth]` | — | NextAuth admin session handling |

All mutating endpoints validate input with Zod and return typed error responses.

---

## 11. Non-Functional Requirements

- **Mobile-first, responsive** design; most guests will browse and book from phones.
- **Performance:** optimized images (Next.js `<Image>`), lazy-loaded galleries, target Lighthouse mobile performance ≥ 90.
- **SEO:** proper metadata, Open Graph tags, `LodgingBusiness`/`Restaurant` structured data (schema.org), sitemap.xml, robots.txt.
- **Accessibility:** WCAG 2.1 AA basics — labeled form fields, sufficient color contrast against the green palette, keyboard-navigable calendar.
- **Security:** server-side validation of all booking/enquiry input, rate-limiting on public POST endpoints to prevent spam bookings, admin routes protected by session middleware.
- **Timezone handling:** store all dates in UTC; display in Nepal Time (UTC+5:45) consistently across booking form, confirmation email, and admin dashboard.
- **Internationalization:** English only at v1; structure content strings so translation can be added later without a rewrite.

---

## 12. Asset & Content Ingestion

The owner will place room photos (standard & deluxe), menu images, and the logo in a local folder within the project.

**Recommended structure:**
```
/public
  /images
    /logo
    /rooms
      /standard-twin
      /standard-king
      /deluxe
    /menu
    /property        (exterior, restaurant, fireplace, river view, etc.)
```
The agent building this should read images from these folders (or an equivalent asset manifest) rather than hardcoding a fixed image list, so the owner can add/replace photos without a code change. Menu images can initially render as a simple gallery/PDF-style viewer on the Restaurant page until structured menu data (Section 3) is provided.

---

## 13. Open Items to Confirm Before/During Build

1. Deluxe room bed configuration and max occupancy for all room types.
2. Nightly rates per room type (flat or seasonal) — required before "Book Now" can show real prices; can launch with "Rates on request" if unavailable.
3. Whether guest ID/passport capture is required at booking (recommend omitting unless legally required, for privacy).
4. Cancellation/no-show policy wording for the confirmation email and terms page.
5. Preferred email sending address (a dedicated domain address vs. the existing Gmail address) and which provider (Gmail SMTP is simplest to start, but has sending limits — a transactional provider like Resend is more reliable for confirmation emails).
6. Whether the owner wants SMS/WhatsApp notifications in addition to email (phase 2).
7. Domain name and hosting account ownership.
8. Exact Google Maps location pin.

---

## 14. Suggested Build Phases

1. **Phase 1 — Foundation:** Next.js project setup, Tailwind theme with brand palette, MongoDB connection, room type seed data, static content pages (Home, Rooms, Restaurant, Tours, Story, Contact) using the content in Sections 2–5.
2. **Phase 2 — Booking engine:** Room detail pages with calendar picker, availability API, booking creation flow, guest-facing confirmation page, confirmation + owner notification emails via the `.env`-driven email abstraction.
3. **Phase 3 — Admin panel:** Admin auth, booking dashboard with filters, status updates, blocked-dates management.
4. **Phase 4 — Polish:** SEO/structured data, accessibility pass, performance tuning, enquiry form for Tours & Activities, FAQ page.
5. **Phase 5 (optional/future):** Lightweight CMS for rates/content, WhatsApp/SMS notifications, cloud image hosting, multilingual support.

---

## Appendix: Structured Content Block (for prompting)

```yaml
business:
  name: Tiffin Home & Restaurant
  email: tiffinhousesauraha@gmail.com
  phone: "9845160919"
  location: "Sauraha, Chitwan, Nepal"
  years_in_business: "20+"
  brand_primary_color: "#186131"
  brand_palette: ["#92FCAC", "#41DA76", "#33AE5D", "#268847", "#186131", "#0A391A", "#021607"]

room_types:
  - slug: standard-twin
    name: "Standard Room (Twin/Double)"
    units: 6
    bed_configuration: "1 single bed + 1 double/king-size bed"
    amenities: [air_conditioning, hot_cold_shower, wifi]
  - slug: standard-king
    name: "Standard Room (King)"
    units: 2
    bed_configuration: "1 king-size bed"
    amenities: [air_conditioning, hot_cold_shower, wifi]
  - slug: deluxe
    name: "Deluxe Room"
    units: 2
    bed_configuration: "TBD"
    amenities: [air_conditioning, hot_cold_shower, wifi, larger_room]

restaurant:
  hours: "08:00-22:00 daily"
  style: "Freshly prepared, made-to-order family-run restaurant"

amenities: [free_wifi, air_conditioning, hot_cold_shower, parking, onsite_restaurant,
            family_run, meals_on_order, nature_surroundings, comfortable_rooms,
            near_chitwan_national_park, near_rapti_river]

tours_and_activities:
  - Chitwan National Park jungle safari
  - Jeep safari
  - Jungle walk
  - Canoeing
  - Bird watching
  - Wildlife experiences
  - Tharu cultural experiences
  - Village/cultural tours
  - Rapti River / sunset activities
  - Nature and sightseeing around Sauraha

booking:
  payment: onsite_only
  requires_confirmation_email: true
  requires_owner_notification_email: true
  multi_night: true
  calendar_based: true

admin:
  capabilities: [view_bookings, filter_bookings, update_booking_status,
                 cancel_bookings, manage_blocked_dates, internal_notes]

tech_stack:
  framework: Next.js (App Router, TypeScript)
  database: MongoDB (Mongoose)
  styling: Tailwind CSS
  auth: NextAuth.js
  email: env_configurable (SMTP / Resend / SendGrid / Postmark)
  hosting: Vercel + MongoDB Atlas
```
