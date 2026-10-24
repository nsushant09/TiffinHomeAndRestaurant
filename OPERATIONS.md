# Launch and operations

## Required business details

Confirm these with the owner before launch. Do not publish placeholder values as real policy:

- Final room rates, currency, occupancy limits, extra guest/bed charges, and cancellation policy.
- Deluxe room bed configuration and maximum occupancy.
- International phone number format and the correct contact email.
- Exact map pin / coordinates and directions.
- Final menu prices, dietary information, and current room/menu photography.

The site currently treats pending booking requests as holding inventory until an admin changes the status. Review and confirm pending requests promptly; cancel requests that will not be accepted so their rooms become available again. This avoids silently expiring a guest's request.

## Environment and deployment

1. Copy `.env.example` to `.env.local` for local development and fill in the MongoDB, email provider, site URL, and admin seed values. Never commit `.env.local` or production credentials.
2. Use MongoDB Atlas or another replica-set deployment with transaction support. Booking creation and room blocking use MongoDB transactions to serialize room inventory changes. The shared rate limiter also requires MongoDB and creates a TTL index for its counters.
3. In Cloudflare, set `NEXTAUTH_URL` as a Worker variable and add secrets with `wrangler secret put` for `NEXTAUTH_SECRET`, `MONGODB_URI`, and the selected email provider credentials. Set `EMAIL_PROVIDER`, `EMAIL_FROM`, `EMAIL_TO_OWNER`, and `MONGODB_DB_NAME` as Worker variables. Use a unique random `NEXTAUTH_SECRET`; the application has no fallback secret.
4. Verify that the email sender domain is authorized with the chosen provider and that a test message reaches both the guest and owner inboxes.
5. Seed the room types and initial admin user with `npm run seed` after setting `ADMIN_SEED_EMAIL` and `ADMIN_SEED_PASSWORD` in the local environment. Use a strong unique password and remove seed credentials from the environment after setup.
6. Rebuild the Cloudflare output from source with `npx opennextjs-cloudflare build` before deployment, then deploy with `npx wrangler deploy`. Do not deploy a stale `.open-next` build after source changes.

## Routine operations

- Review pending bookings and failed email notifications in `/admin`. The retry action sends only the delivery that failed.
- Review incoming enquiries and retry failed owner notifications in the same dashboard.
- Arrange automated MongoDB backups appropriate to the Atlas tier and periodically confirm that a backup can be restored.
- Keep the app, dependencies, and Cloudflare build output updated. Rebuild from source for each release.
- Set up a maintenance agreement for dependency/security updates, booking workflow support, and incident response. Hosting, domain, MongoDB, and email provider charges are separate third-party costs.

## Reservation and email behavior

- A website booking starts as `pending` and blocks room capacity until staff confirm or cancel it.
- Guest and owner emails are tracked separately. A booking remains saved when email delivery fails; staff can retry failed deliveries from the dashboard.
- Enquiries are saved before owner notification. A failed notification is visible to the guest and can be retried from the dashboard.
- Payment is onsite only; the website does not collect payment details.
