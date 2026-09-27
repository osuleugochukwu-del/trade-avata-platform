# Trade Avata Firebase — Layer 3

This directory contains the Layer 3 backend rules and indexes.

## Collections

- `users/{uid}` — private profile
- `roles/{uid}` — admin/staff role records
- `products/{productId}` — public product catalogue data
- `courses/{courseId}` — public course metadata
- `courses/{courseId}/modules/{moduleId}` — course modules
- `courses/{courseId}/modules/{moduleId}/lessons/{lessonId}` — lessons
- `enrollments/{id}` — course access records
- `progress/{id}` — lesson progress
- `entitlements/{id}` — product/course ownership
- `orders/{id}` — purchase records
- `subscriptions/{id}` — subscription records
- `announcements/{id}` — public/scheduled announcements
- `notifications/{id}` — private user notifications
- `certificates/{id}` — issued certificates
- `articles/{id}` — public knowledge content
- `supportTickets/{id}` — user/admin support records
- `auditLogs/{id}` — administrative audit records
- `siteSettings/{id}` — public/admin site configuration
- `featureFlags/{id}` — controlled feature flags

## First admin

Do not create an admin role from the browser. After the Firebase project is created, create the first `roles/{uid}` document through a trusted/admin workflow with:

```json
{
  "role": "admin",
  "permissions": ["*"],
  "createdAt": "server timestamp"
}
```

Payment verification and entitlement issuance must be performed by a trusted backend workflow, not by browser code.
