# Inhoudsopgave
- [Inhoudsopgave](#inhoudsopgave)
- [Inleiding](#inleiding)
- [Taakverdeling](#taakverdeling)
  - [Issue-structuur](#issue-structuur)
    - [Hoofdissue (Epic)](#hoofdissue-epic)
    - [Subissues](#subissues)
- [Projectmatige afspraken](#projectmatige-afspraken)
  - [Standup](#standup)
  - [Projectboard](#projectboard)
    - [Issues](#issues)
  - [Definition of Ready (DOR)](#definition-of-ready-dor)
  - [Definition of Done (DoD)](#definition-of-done-dod)
- [Taal](#taal)
- [Code conventies](#code-conventies)
  - [Naamgevingen](#naamgevingen)
  - [Assets](#assets)
  - [Componenten](#componenten)
  - [CSS / HTML / JS](#css--html--js)
  - [Commits](#commits)
  - [Pull requests](#pull-requests)
- [Branches](#branches)
  - [Aanmaken Branches](#aanmaken-branches)
    - [Git flow](#git-flow)

---

# Inleiding

Dit bestand beschrijft de richtlijnen en best practices voor bijdragen aan het project, zodat samenwerking soepel en overzichtelijk verloopt. Hierin vind je informatie over onder andere:

- Het opzetten van een ontwikkelomgeving
- Code conventions en component libraries
- Het maken van issues, branches en pull requests
- Teamprocessen zoals stand-ups en backlogbeheer

Door deze richtlijnen te volgen, help je het project consistent, overzichtelijk en van hoge kwaliteit te houden, en maak je het voor toekomstige teamleden makkelijker om aan het project te werken.  

Voor de **rest van de conventions en aanvullende informatie** kun je terecht bij de [FDND Agency conventions](https://docs.fdnd.nl/conventies.html).


---

# Taakverdeling

Openstaande issues worden zelfstandig opgepakt door teamleden. Issues worden alleen toegewezen aan de leden die daadwerkelijk aan de betreffende taak werken. Hierdoor is altijd inzichtelijk wie met welke taak bezig is en welke issues nog openstaan. Dit maakt het ook voor nieuwe teamleden eenvoudiger om aan het project deel te nemen.

## Issue-structuur

Om overzicht te houden gebruiken we een duidelijke structuur met **Epics** en **subissues**.

### Hoofdissue (Epic)

- Vertegenwoordigt een groter onderdeel of feature.
- Label: `Epic`
- Beschrijving bevat **acceptatiecriteria**.
- Elk acceptatiecriterium wordt uitgewerkt in een subissue.

### Subissues

- Worden aangemaakt voor elk acceptatiecriterium.
- Gelinkt aan het hoofdissue.
- Beschrijving bevat details, takenlijst en eventuele referenties.
- Alle subissues moeten afgerond zijn voordat de Epic gesloten kan worden.

**Voorbeeld:**

**Epic:** `Gebruiker kan inloggen`  
**Labels:** `Epic`, `Feature`  
**Acceptatiecriteria:**
- Loginpagina met e-mail en wachtwoord
- Foutmelding bij verkeerde gegevens
- Redirect naar dashboard na succesvolle login

**Subissues:**
1. `Loginpagina aanmaken` – pagina, route en styling
2. `Validatie inloggegevens` – check en foutmelding
3. `Redirect na login` – naar `/dashboard` en testen

---

# Projectmatige afspraken

## Standup

Elke maandag wordt een stand-up gehouden waarin wordt besproken wat het doel is voor de week en wat het team wil bereiken.

Elke vrijdag vindt een terugblik-stand-up plaats, waarin wordt geëvalueerd of de doelen zijn behaald en besproken wordt wat volgende week eventueel beter kan.

## Projectboard

- Issues die worden opgepakt moeten eerst worden geclosed voordat je een nieuwe issue kan beginnen. (Alleen als het echt niet mogelijk is om een issue te sluiten omdat je wacht op feedback, mag je een nieuwe issue oppakken.)

### Issues

- Alle issues moeten bij het assignen gelijk worden gelabeld met relevante labels.
- De issues moeten een korte beschrijving bevatten van de functie.

### Definition of Ready (DoR)

Een issue is Ready als het duidelijk, uitvoerbaar en afgestemd is. We gebruiken deze criteria:

1. User Story is duidelijk en bruikbaar
- Geschreven in het format: Als <type gebruiker> wil ik <doel>, zodat <reden>.
Omschrijft een concrete waarde voor de gebruiker.
2. Acceptance Criteria aanwezig
- In begrijpelijke taal, zodat het doel helder is.
- Bevat wat er minimaal moet gebeuren om dit "done" te noemen.
3. Technisch voldoende uitgewerkt
- Info over API’s, inputs/outputs of design specs (indien nodig).
- Indien relevant: links naar Figma, componenten of data.
4. Geschat & gepokerd
- Story is ingeschat (bv. via planning poker of story points).
- Prioriteit is duidelijk (bv. MoSCoW-methode).
5. Afgestemd binnen het team
- Teamleden begrijpen de taak en zijn het eens over aanpak.


#### Definition of Done (DoD)

Een issue is pas Done als het voldoet aan deze eisen:

1. Functioneel afgerond
- De functionaliteit werkt zoals beschreven.
- Alle acceptance criteria zijn behaald.
2. Codekwaliteit gewaarborgd
- Code is getest(A11y, screenreader, Performance. etc..)
- Code is gecommit en gepusht in een feature branch.
- De code is via een Pull Request gemerged naar dev.
3. Gereviewd
- Issue is besproken of nagekeken door de ander.
- Feedback is verwerkt (indien van toepassing).
4. Design of UX gecontroleerd
- Aansluitend op het design in Figma of besproken wireframe.
- Visuele en UX-kwaliteit zijn gecheckt.
5. Documentatie up-to-date
- Wiki of readme is aangepast als er iets belangrijks is veranderd.
- Link naar het werkende onderdeel is beschikbaar (dev-link).

---

# Taal

- De website en het design worden in het **Engels** verwerkt.
- De issues, README, projectboard en communicatie worden in het **Nederlands** verwerkt.

---

# Code conventies

## Naamgevingen 

De code conventions worden toegepast volgens de richtlijnen van de
[FDND Agency](https://docs.fdnd.nl/conventies.html#code-conventies), met enkele aanvullende conventies:

- Animaties: `animation-(actie)-(richting)` → `animation-fade-in-up`
- Gebruik van **kebab-case**
- Naamgeving van classes, id's etc. in het **Engels**
- Duidelijke omschrijving bij PR

## Assets

- Foto's in assets duidelijke naamgeving (icoontjes ook bv. `hamburger-icon.png`)
- Gebruik maken van moderne formats zoals **webp** en **avif**

## Componenten

- Bij `index.js` alle componenten met een **hoofdletter**
- Alle assets en componenten via `index.js` exporteren
- Componenten moeten duidelijke namen hebben en worden opgeslagen in de meest geschikte component library

## CSS / HTML / JS

- Semantische volgorde van CSS aanhouden zoals HTML
- Nesting in CSS
- Comments bij complexere code (in JS)

## Commits

De commits worden uitgevoerd volgens de conventies van de
[FDND Agency](https://docs.fdnd.nl/conventies.html)

Elke commit:

- Begint met een [commit type](https://docs.fdnd.nl/conventies.html#allowed-commit-types)
- Eindigt met het bijbehorende [issuenummer](https://docs.fdnd.nl/conventies.html#reference-issues-in-commits)
- (OPTIONAL): gitmoji

Voorbeeld:  

![Commit voorbeeld](https://github.com/user-attachments/assets/e93d52ad-28c4-4df7-8cc8-9fac2adda285)

## Pull requests

Branches die gemerged kunnen worden naar de `dev`-branch moeten via een pull request (PR) worden gecontroleerd. De pull requests dienen de [FDND Agency pull request template](https://github.com/fdnd-agency/.github/blob/main/pull_request_template.md) te gebruiken en zo volledig mogelijk ingevuld te worden.

Enkele richtlijnen voor pull requests:

- Functionaliteiten getest volgens RAPPE-principes en algemene werking voordat een PR wordt aangemaakt
- Kleine, overzichtelijke PR's
- Eigen PR eerst controleren voordat iemand anders reviewt
- Duidelijke beschrijving van wijzigingen en aanwijzingen
- Minimaal twee reviewers toewijzen; PR mag pas gemerged worden als beiden akkoord zijn

---

# Branches

We werken met branches volgens de richtlijnen van de [FDND Docs](https://docs.fdnd.nl/conventies.html#branching-strategy).

## Aanmaken Branches

- Branches die al gemerged of niet meer gebruikt worden, verwijderen
- Branch-namen kunnen op twee manieren worden toegepast. **Voordat nieuwe teamleden aan het project beginnen**, moet worden besproken welke implementatie wordt gehanteerd.

1. Branch aanmaken via de "Create a branch" link in betreffende issue:

![Branch via issue](https://github.com/user-attachments/assets/7b29c6ee-af4c-45b2-a2e1-7fa664452882)

2. Branch naming conventions gelijk aan commits:

- `build/` → Wijzigingen in build-systeem of dependencies → `build/update-webpack-config`  
- `chore/` → Onderhoud of tooling → `chore/update-dependencies`  
- `ci/` → CI-configuratie → `ci/update-workflow`  
- `docs/` → Documentatie → `docs/update-readme`  
- `feat/` → Nieuwe functionaliteit → `feat/login-form`  
- `fix/` → Bugfixes of stijl → `fix/header-styles`  
- `perf/` → Performance verbeteringen → `perf/optimize-images`  
- `refactor/` → Code-structuur of leesbaarheid → `refactor/code-comments`  
- `style/` → Format/indenting → `style/fix-indentation`  
- `test/` → Toevoegen/aanpassen van tests → `test/add-login-tests`

### Git flow

- **Main** → bevat alleen productieklare code
- **Develop** → hier worden features getest en gepushed
- **Feature branches** → start van development, bouwen van nieuwe functies (`feature/login-page`)
- **Release branches** → start van development voor nieuwe versie, daarna push naar `dev` en `main`
- **Hotfix branches** → starten van `main` om urgente bugs te fixen, daarna push naar `main` en `dev`

![Git Flow](https://github.com/user-attachments/assets/69468298-8604-420d-9a62-d4c7f79ce051)




