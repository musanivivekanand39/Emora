# Emora server-side authentication API

This service owns password verification and must not be exposed as browser code.

1. In this `server` directory, run `npm install`.
2. Copy `.env.example` to `.env` and set every value. Obtain the Firebase service-account JSON from Firebase Console > Project settings > Service accounts. Keep it only in the server environment.
3. Configure a real SMTP provider. The reset notification cannot be sent without it.
4. Run `npm run dev` locally. Set `authApiUrl` in `../firebase-config.js` to the deployed HTTPS API address plus `/auth` before production.

The API stores bcrypt password hashes in Firestore collection `authUsers`, while `users` contains regular app profile data. Browser Firestore rules must not grant the browser access to `authUsers`; Firebase Admin bypasses those rules.

The included rate/lock state is an in-memory cache, which is suitable only for one server instance. Use Redis or Upstash before running multiple instances, otherwise the 10-requests-per-minute limit and lockout are not shared between instances.

Existing Firebase Email/Password account hashes cannot be exported or re-hashed. Require those users to reset passwords when moving to this API; only legacy records in `authUsers` marked `legacy_plain:` can be upgraded on successful login.
