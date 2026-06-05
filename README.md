# FootGuard

## Inhoudsopgave

- [FootGuard](#footguard)
- [Opdrachtomschrijving](#opdrachtomschrijving)
- [Branches](#branches)
- [Ontwerp en design](#ontwerp-en-design)
- [Technische stack](#technische-stack)
- [Datamodel](#datamodel)
- [Pagina's](#paginas)
  - [Dashboard](#dashboard)
  - [Grading](#grading)
  - [Workgroups](#workgroups)
  - [Checklist](#checklist)
  - [Results](#results)
  - [Notifications](#notifications)
  - [Profile](#profile)
  - [Settings](#settings)
- [Gebruikershandleiding](#gebruikershandleiding)
- [Bijdragen aan het project](#bijdragen-aan-het-project)
  - [Conventions](#conventions)
- [Changelog](#changelog)
- [Teamleden](#teamleden)
- [Installatie](#installatie)
- [Licentie](#licentie)
- [Openstaande functionaliteit & aandachtspunten](#openstaande-functionaliteit--aandachtspunten)

## FootGuard

FootGuard is een webbased dashboard-tool voor de **International Working Group on the Diabetic Foot (IWGDF)**.  
Het helpt specialisten zoals artsen en onderzoekers bij het beoordelen van wetenschappelijke artikelen over diabetische voetproblematiek.

Op dit moment gebeurt het beoordelingsproces grotendeels via Excel, wat onoverzichtelijk en inefficiënt is. FootGuard brengt dit proces samen in één digitale omgeving waarin artikelen toegewezen, beoordeeld en opgevolgd kunnen worden binnen workgroups.

**Live versie:** [FootGuard](https://footguard-dev.netlify.app/)

## Opdrachtomschrijving

Het doel van deze sprint was het opzetten van een **release candidate** met basisfunctionaliteiten van de webapplicatie.  
De applicatie brengt artikelen, checklists en reviewers samen in een overzichtelijk dashboard en maakt het beoordelen efficiënter.

## Branches

- [Dev branch](https://github.com/fdnd-agency/footguard/tree/dev)
- [Main branch](https://github.com/fdnd-agency/footguard/tree/main)

**Workflow:**

- Feature branches worden gemaakt vanaf `dev`.
- Alleen volledig geteste features worden naar `dev` gemerched.
- `main` branch wordt alleen gebruikt voor release candidates.

## Ontwerp en design

- **Kleurenpallet:** gebaseerd op het IWGDF-logo, consistent in alle UI-elementen.
- **Typografie:** DM Sans, modern en goed leesbaar.
- **Navigatie:** Sidebar links, inklapbaar op kleinere schermen.
- **Hi-fi designs & UML:** Schetsen en diagrammen in [Figma](https://www.figma.com/design/FcenWarr4zCNYt1xSufqHv/Sprint-14-Footguard?node-id=16-2&p=f).

## Technische stack

- Frontend: Svelte / SvelteKit
- Styling: CSS + Styleguide.css
- Package manager: npm
- Version control: Git / GitHub
- Branching model: Feature branches via `dev` → merge na review
- Conventies: FDND Agency & [`CONTRIBUTING.md`](./CONTRIBUTING.md)

## Datamodel

> **Let op:** Mermaid diagram kan hier handmatig toegevoegd worden als afbeelding of `mermaid` codeblok.

## Pagina's

### Dashboard

- Overzicht van de status van onderzoeken en openstaande taken.
- Navigatie naar onafgemaakte checklists, compare grading pagina en persoonlijke statistieken.

### Grading

- Overzicht van artikelen toegewezen aan de gebruiker.
- Cards bevatten titel, auteur, publicatiejaar en status (Not Started, In Progress, Finished).
- Filteren op status en thema is mogelijk.

### Workgroups

- Overzicht van workgroups.
- Elke workgroup heeft 2 members die samen artikelen beoordelen.
- Klikken op een member opent het profiel.

### Checklist

- PDF van artikel naast de checklist.
- Antwoorden en notities invullen.
- 25 vragen met voortgangscounter.

### Results / Compare Grading

- Overzicht van ingevulde checklist-antwoorden van 2 reviewers.
- Mogelijkheid om verschillen te vergelijken en definitieve beoordeling te bepalen.

### Notifications

- Lijst van meldingen zoals nieuwe ingeleverde checklists door collega’s of workgroup members.

### Profile

- Profielpagina op `/profile` voor de ingelogde gebruiker.
- Gegevens komen uit Directus (`footguard_users`), opgehaald op de server.

**Wat je ziet op de pagina**

- Bovenaan: profielfoto, naam en beroep.
- Daaronder "General Information" (de sectietitel in de UI): role, institution, profession en email.
- Onderaan een link naar Groups.
- Role kun je niet aanpassen — dit wordt beheerd door een admin.

**Profiel aanpassen (als gebruiker)**

- Ga naar Profile in de sidebar en klik **Edit Profile** rechtsboven.
- Je kunt dan naam, beroep, institution, email en profielfoto aanpassen. Role blijft alleen-lezen.
- Kies eventueel een nieuwe foto via **Change photo**.
- Klik **Save Changes** om op te slaan. Wijzigingen gaan via een POST naar `?/saveProfile` en je komt terug op `/profile` met een bevestigingsbanner.
- Klik **Cancel** om te stoppen zonder op te slaan.

**Als Directus niet bereikbaar is**

- De pagina blijft werken met gegevens uit de login-sessie.
- Er is geen aparte foutmelding; de gebruiker ziet dan de sessiegegevens in plaats van de nieuwste data uit Directus.

**Hoe de pagina werkt (voor developers)**

Relevante bestanden: `src/routes/profile/+page.svelte`, `src/routes/profile/+page.server.js`, `src/lib/components/profile/ProfileHero.svelte`, `src/lib/components/profile/ProfileInfo.svelte`, `src/lib/components/profile/EditActions.svelte`.

Als je een veld wilt toevoegen of wijzigen: pas het aan in `ProfileHero` of `ProfileInfo`, voeg het toe in `formFieldsFromUser()` (in `+page.svelte` en `+page.server.js`), en zorg dat `saveProfile` in `+page.server.js` het ook opslaat. Het veld moet ook bestaan in Directus.

Bewerkmodus gaat aan via `?edit` in de url (`/profile?edit`).

### Settings

- Nog niet volledig uitgewerkt.
- Toekomstig: voorkeuren zoals kleurenschema (dark/light) en taalinstellingen.

## Gebruikershandleiding

- Log in met je account.
- Ga naar **Grading** om toegewezen artikelen te bekijken.
- Klik op een artikel om de **Checklist** te openen.
- Vul de checklistvragen in en voeg eventueel notities toe.
- Gebruik **Dashboard** om voortgang te volgen en naar Results te navigeren.
- Bekijk **Notifications** voor updates van je workgroup.

## Bijdragen aan het project

### Conventions

Volg de technische conventies van [FDND Agency](https://docs.fdnd.nl/conventies.html):

- Git workflow
- Commits
- Pull requests
- Code conventions
- Design conventions

> Houd ook rekening met [`CONTRIBUTING.md`](./CONTRIBUTING.md) en [`HANDOVER.md`](./HANDOVER.md):

- Code style & conventions
- Commitregels
- Merge- en reviewproces
- Werkwijze projectboard
- Opbouw van user story’s
- Samenwerking

## Changelog

**Sprint 18 · Release Candidate**

- Basisfunctionaliteiten geïmplementeerd: Dashboard, Grading, Checklist, Results, Notifications.
- Sidebar navigatie, kleurenschema, typografie en hi-fi design toegepast.
- Live versie beschikbaar op [FootGuard](https://footguard.dev.fdnd.nl/).

## Teamleden

- Razan Sagheer - Software Development - [GitHub](https://github.com/RazanSagheer)
- Yamen alsharabi - Frontend Developer - [Github](https://github.com/yamenAl)
- Kim Nikita Schijf – Frontend Developer – [GitHub](https://github.com/Kimnikitaschijf)
- Ravi Tjikhoeri – Frontend Developer – [GitHub](https://github.com/Ravirkt)
- Suleyman Huzeyfe Gokgul – Frontend Developer – [GitHub](https://github.com/SuleymanHG)

## Installatie

```bash
git clone https://github.com/fdnd-agency/footguard.git
cd footguard
npm install
npm run dev
npm install --save-dev eslint
npm install --save-dev prettier
```

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).

## CI/CD Comand

```bash
npm run build       # Build the project for production
npm run preview     # Preview the built project
npm run lint        # Run ESLint to check for code quality issues
npm run format      # Check if code is formatted using Prettier
npm run format:fix  # Automatically format the code using Prettier
npm run test        # Run tests (if available)
```
