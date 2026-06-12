# Handover – FootGuard (Sprint 19 & 20)

This document is the handover for sprint 19 and 20. It describes the current project status, what has been built, what is still open and what a next team can pick up.

## Project overview

FootGuard is a web-based dashboard tool for the **International Working Group on the Diabetic Foot (IWGDF)**.
The tool helps specialists such as doctors and researchers assess scientific articles about diabetic foot problems.

At the moment this process mostly happens via Excel, which is messy and inefficient. FootGuard brings this together in one digital environment where articles can be assigned, assessed and followed up within groups.

## Current status

### What works right now?

- **Groups page**
  - Group cards showing group name, status, condition label and a header image
  - Card flip — clicking Members flips the card to show a scrollable member list with avatars, names and roles
  - Add member by email — a user can be added directly to a group by entering their email address. No invite email is sent, the user is added immediately
  - Remove member — any member except Super Admin can be removed. This is a soft delete, the row stays in Directus with membership_status set to inactive
  - Create group modal — admins can create a new group via a right-side drawer. The form includes group name, condition label, member search, status select and thumbnail upload
  - Create group — backend functionality implemented including Directus record creation and permission checks.
  - Delete group — admins can delete a group via the three-dot menu. A confirmation dialog appears before the group is removed
  - Admin-only actions — the create button, three-dot menu and delete flow are only visible to admin and super admin users
  - Group theme colors — each group header uses its own theme color based on the group name
  - The page works without JavaScript via progressive enhancement

- **Profile page**
  - Profile hero showing avatar, name and profession
  - General information section showing role, institution, profession and email
  - Inline edit mode — clicking Edit Profile switches the page to edit mode
  - Avatar upload — in edit mode a Change photo button appears
  - Save and cancel — Save Changes posts to the server and updates Directus. Cancel reverts all changes
  - Role is always read-only and cannot be changed by the user
  - Toast feedback shown after every save, cancel or upload
  - If Directus is not reachable the page falls back to session data

- **Authentication & Login**
- Passwordless authentication using Magic Links
- Login page at `/login`
- Secure token generation and SHA-256 token hashing
- Magic Links expire after 15 minutes and can only be used once
- Email delivery through Resend
- Session management using secure HTTP-only cookies
- Role-based route protection through `hooks.server.ts`
- Microsoft Safe Links protection implemented through an intermediate confirmation page before token validation

- **Dashboard**
  - Dashboard data is fetched from Directus and displayed using live data instead of placeholder content.

- **Research / Grading page**
  - Upload Article functionality for Super Admins
  - Upload Article button visible only for Super Admins
  - Modal form with Title, Author, Publisher, Theme and PDF upload
  - PDF validation on both frontend and backend
  - PDF files are uploaded directly to the Directus File Library
  - Article records are automatically created in footguard_articles
  - Uploaded articles appear immediately in the research overview after a successful upload
  - Role-based protection implemented on both frontend and backend

- **Style guide additions**
  - Global button system added to [styleguide.css](https://github.com/fdnd-agency/footguard/blob/dev/src/lib/css/styleguide.css)
  - Variants: `.button-primary`, `.button-secondary`, `.button-outline`, `.button-danger`
  - Sizes: `.button-small`, `.button-medium`, `.button-large`
  - Group theme color tokens added for each IWGDF group
  - In [Figma](https://www.figma.com/design/CNlARnfpaU0koXgKTTtxhM/Footguard-Stage?node-id=1815-2263) there is a Design System tab added

- **Project structure**
  - `src/lib/components` all components including groups and profile
  - `src/lib/css/styleguide.css` global styles and design tokens
  - `src/lib/server/groups.js` all Directus server helpers for the groups page
  - `src/routes/groups` groups page and server actions
  - `src/routes/profile` profile page and server actions

- **Technical foundation**
  - Local dev environment works (`npm install` then `npm run dev`)
  - `dev` and `main` branch setup. Feature branches are made from `dev` and merged back into `dev`. `main` is only used for release candidates
  - FDND Agency conventions are followed
  - CI/CD pipeline runs on every push and pull request

    Automated checks include:

  - ESLint validation
  - Prettier formatting checks
  - Automated tests
  - Production build validation

This ensures code quality before merging into the dev branch.

## What is not finished yet?

- Edit group — the three-dot menu has an Edit Group option but the edit flow is not built yet
- Group articles on the card come from limited data. Connecting this fully to Directus article data can be improved
- The member search in the create group modal loads all users. For large user lists this should be filtered or paginated
- The question page needs a design overhaul. We have made some [designs ins figma](https://www.figma.com/design/CNlARnfpaU0koXgKTTtxhM/Footguard-Stage?node-id=1396-1694&t=3EFE7Jw4NZQSdyym-4) after initial feedback from the client.

## Recommended next steps

1. Build the edit group flow triggered from the three-dot menu
2. Connect group articles fully to the Directus articles dataset

## Backlog and open issues

All issues without a status are open in the backlog. These are meant for future sprints.
The backlog contains technical tasks, new ideas and feedback from the client.
Prioritisation can be decided per sprint by the next team.

## Installation

```bash
git clone https://github.com/fdnd-agency/footguard.git
cd footguard
npm install
npm run dev
```

Make sure you have a `.env` file with:

```
PUBLIC_DIRECTUS_URL=https://fdnd-agency.directus.app
DIRECTUS_TOKEN=your_token_here
PUBLIC_APP_URL=https://footguard.dev.fdnd.nl
```

# SECURITY

During the security assessment one high-severity issue remains open and should be prioritised by the next team.
#402 – Privilege escalation through manipulation of client-side session cookie

The application currently relies on client-side session data for authorisation decisions. By modifying role information stored in the session cookie additional administrative functionality became accessible. Administrative actions performed with the modified role were successfully processed and persisted.

## Recommended next steps

Review the authentication and authorisation flow and ensure that user roles are validated server-side. Client-side session data should not be trusted for authorisation decisions.

Review GitHub issue #402 and the attached PoC document. Verify whether role information can still be manipulated and implement a fix before the next release.

Investigate a more secure session management approach such as signed JWTs, server-side session validation and/or cryptographically protected session data.
