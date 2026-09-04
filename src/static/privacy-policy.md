---
title: Privacy Policy
published: 2026-09-04
---

# Privacy Policy

**Last updated: June 2026**

---

## 1. Data Controller

**tattou.ink** is operated by the sole proprietorship distrAnS (registered in France — SIREN 103 686 655), headquartered in Paris, France.

Contact: privacy@tattou.ink

---

## 2. Purpose of this Policy

This privacy policy describes how tattou.ink collects, uses, retains, and protects the personal data of platform users, in accordance with the **General Data Protection Regulation (GDPR)** (EU) 2016/679 and the French Data Protection Act (*loi Informatique et Libertés*) of 6 January 1978, as amended.

It applies to:

- **Tattoo artists** who use tattou.ink as their management software (hereinafter "Artists").
- **Clients** who book tattoo sessions through the platform (hereinafter "Clients").

---

## 3. Data Collected

### 3.1 Data collected when an Artist signs up

When registering on tattou.ink as an Artist, we collect the following data:

- Email address
- First and last name
- Gender (optional, self-declared)
- Social media handles (e.g. Instagram, TikTok) (optional, self-declared)

### 3.2 Data collected when a Client signs up

When a Client registers to book a session, we collect:

- Email address
- First and last name
- Instagram handle (optional, self-declared)
- Whether it is their first tattoo (yes / no)
- Skin tone (potentially sensitive data — see section 4) (optional, self-declared)
- Billing address (for invoicing purposes, so Artists can issue invoices with the Client's information)

### 3.3 Data collected during use of the platform

During use of the platform, we may process:

- **Chat messages** exchanged between Artist and Client, including shared images and documents.
- **Responses to custom forms** created by Artists to gather information specific to their practice.
- **Calendar data**: private events imported from Google Calendar (Artists only, to prevent scheduling conflicts). These events are never exposed to Clients.
- **Payment information**: where a booking fee or payment link is used via Stripe. Card numbers and sensitive payment data are never processed directly by tattou.ink; they are handled exclusively by Stripe.
- **Studio addresses** entered via the Google Places service.
- **Technical data**: IP addresses, error logs, session identifiers, browser or device type.
- **Push notification tokens** for sending notifications via Expo.

---

## 4. Sensitive Data

Skin tone constitutes personal data that may be classified as **data relating to ethnic origin**, a special category under Article 9 of the GDPR.

This data is collected for a purely operational and artistic purpose: to allow the Artist to adapt inks and tattooing techniques to the Client's skin characteristics.

**Legal basis**: explicit consent of the Client, collected at registration (Article 9.2(a) of the GDPR).

The Client may withdraw this consent at any time, which will result in the deletion of this data.

---

## 5. Legal Bases for Processing

| Processing activity | Legal basis |
|---|---|
| Creating and managing an Artist or Client account | Performance of a contract (Art. 6.1.b) |
| Displaying the calendar, managing bookings | Performance of a contract (Art. 6.1.b) |
| Sending transactional emails | Performance of a contract (Art. 6.1.b) |
| Processing payments via Stripe | Performance of a contract (Art. 6.1.b) |
| Collecting skin tone | Explicit consent (Art. 9.2.a) |
| Sending push notifications | Consent (Art. 6.1.a) |
| Error logs and monitoring (Sentry) | Legitimate interest — security and reliability of the service (Art. 6.1.f) |
| Platform improvement | Legitimate interest (Art. 6.1.f) |
| Compliance with legal obligations (accounting, transaction records) | Legal obligation (Art. 6.1.c) |

---

## 6. Purposes of Processing

Your data is used exclusively for the following purposes:

- Creating and managing your user account.
- Connecting Artists and Clients.
- Managing bookings, calendar, and availability.
- Displaying flashbooks and Artist information on their personalised website (subdomain `artist.tattou.ink`).
- Enabling chat communication between Artist and Client.
- Sending automated emails related to bookings (confirmations, reminders, etc.).
- Processing booking fees and sending payment links (if activated by the Artist).
- Enabling Artists to issue invoices to Clients using their billing address.
- Ensuring the technical security and stability of the platform.
- Complying with our legal and accounting obligations.

---

## 7. Sub-processors and Data Recipients

tattou.ink uses the following sub-processors. Each has contractual guarantees in place that comply with the GDPR (Standard Contractual Clauses or an equivalent adequacy mechanism where applicable).

| Sub-processor | Role | Location |
|---|---|---|
| **Supabase** | Database and authentication | European Union (via AWS Paris) |
| **Cloudflare** | Image storage | France |
| **Amazon Web Services (AWS)** | Email sending (Amazon SES) | France |
| **Fly.io** | Application server hosting | France |
| **Netlify** | Front-end hosting | European Union / United States* |
| **Stripe** | Online payments (only if activated by the Artist) | United States* |
| **Google Places API** | Studio address search | United States* |
| **Expo** | Push notification delivery | United States* |
| **Sentry** | Monitoring and error logging | United States* |

\* For transfers outside the EU, these providers rely on **Standard Contractual Clauses (SCCs)** approved by the European Commission, or benefit from a recognised adequacy decision.

Your data is never sold to third parties or used for advertising purposes.

---

## 8. Data Retention

| Data | Retention period |
|---|---|
| Artist account (registration data) | Duration of the contractual relationship + 3 years |
| Client account (registration data) | Duration of the contractual relationship + 3 years |
| Chat messages and shared files | 2 years after the last interaction |
| Booking data | 5 years (accounting obligations) |
| Payment data (Stripe references) | 5 years (accounting obligations) |
| Skin tone | Until consent is withdrawn or account is deleted |
| Technical logs (Sentry, server logs) | 90 days |
| Push notification tokens | Until revoked or the application is uninstalled |

---

## 9. Your Rights

Under the GDPR, you have the following rights regarding your personal data:

- **Right of access** (Art. 15): obtain a copy of the data we hold about you.
- **Right to rectification** (Art. 16): correct inaccurate or incomplete data.
- **Right to erasure** (Art. 17): request the deletion of your data, subject to our legal obligations.
- **Right to restriction of processing** (Art. 18): temporarily suspend the use of your data.
- **Right to data portability** (Art. 20): receive your data in a structured, machine-readable format.
- **Right to object** (Art. 21): object to certain processing activities based on legitimate interest.
- **Right to withdraw consent**: for processing activities based on your consent (skin tone, push notifications), you may withdraw your consent at any time without affecting the lawfulness of processing carried out before the withdrawal.
- **Right not to be subject to automated decision-making** (Art. 22): tattou.ink does not make automated decisions that produce legal effects or similarly significantly affect you.

To exercise your rights, contact us at: **privacy@tattou.ink**

We will respond within one month. If you are not satisfied with our response, you have the right to lodge a complaint with the **CNIL** (Commission Nationale de l'Informatique et des Libertés): [www.cnil.fr](https://www.cnil.fr).

---

## 10. Data Security

tattou.ink implements appropriate technical and organisational measures to protect your data against unauthorised access, loss, alteration, or disclosure, including:

- Encrypted communications (HTTPS / TLS).
- Secure authentication via Supabase (hashed passwords).
- Data access restricted to authorised personnel.
- Error and incident monitoring via Sentry.
- Image data stored on Cloudflare (French data centre).

In the event of a data breach likely to result in a risk to your rights and freedoms, we undertake to notify the CNIL within 72 hours in accordance with Article 33 of the GDPR, and to inform you directly if the risk is high (Art. 34).

---

## 11. Cookies and Trackers

tattou.ink uses only cookies that are strictly necessary for the operation of the platform (authentication session management). No advertising or third-party tracking cookies are used.

---

## 12. Minors

tattou.ink is a platform intended for adults. Tattooing minors is regulated or prohibited in many countries. We do not knowingly collect personal data from individuals under the age of 18. If you believe a minor has registered on the platform, please contact us so that we can delete the relevant data.

---

## 13. Changes to this Policy

We may update this policy to reflect legal, technical, or service-related changes. In the event of a material change, you will be notified by email or via a prominent notice on the platform. The date of the last update is shown at the top of this document.

---

## 14. Contact

For any questions regarding this policy or the exercise of your rights:

**tattou.ink**
distrAnS
Paris, France
privacy@tattou.ink
