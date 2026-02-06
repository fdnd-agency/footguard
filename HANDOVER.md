# Handover – FootGuard (Sprint 18 · Release Candidate)

Dit document is opgesteld als oplevering van deze sprint. Het beschrijft de huidige **projectstatus**, wat er is **uitgewerkt**, wat nog **openstaat** en wat een volgend team kan oppakken.

## Projectoverzicht

FootGuard is een webbased dashboard-tool voor de **International Working Group on the Diabetic Foot (IWGDF)**.  
De tool helpt specialisten zoals artsen en onderzoekers bij het beoordelen van wetenschappelijke artikelen over diabetische voetproblematiek.

Op dit moment gebeurt dit beoordelingsproces grotendeels via Excel, wat onoverzichtelijk en inefficiënt is. Met FootGuard wordt dit proces samengebracht in één digitale omgeving waarin artikelen toegewezen, beoordeeld en opgevolgd kunnen worden binnen workgroups.

## Huidige status

### Wat werkt op dit moment?

- **Algemene structuur**

  - De applicatie heeft een duidelijke pagina-indeling:
    - Dashboard
    - Grading (vanuit hier ook te navigeren naar de checklist completion page)
    - Results (ook wel de compare grading page)
    - Admin (alleen voor de hoofdgebruiker bedoeld).
    - Notifications center
    - Settings
  - Navigatie via een sidebar aan de linkerkant, die inklapbaar is op kleinere schermen.

- **Mappen structuur SvelteKit project**
    - `src/lib/assets`, hier kunnen jullie alle foto's, svg, fonts, components, css styleguide vinde. Alles rondom content is hier gedocumenteerd
    - `src/lib/assets/index.js` in dit document zitten de imports van de de componenten die we gebruiken, we raden aan om dit te grbuiken voor een overzichtelijk project en clean code.
    - `src/routes` hier zitten alle pages van footguard
    - `static/robot.txt` hebben wij niks niet veel mee gedaan, seo en andere improvents kunnen gedaan worden via dit bestand. zie [bron](https://medium.com/@priyankaharlalka/delving-deeper-into-robots-txt-a-comprehensive-guide-for-seo-optimization-df04972b95c7) voor extra info.
    - 
- **Ontwerp & gebruikservaring**

  - Huisstijl is gebaseerd op het IWGDF-logo.
  - Vast kleurenpalet en typografie (DM Sans), je kan het vinden in de [styleguide.css](https://github.com/fdnd-agency/footguard/blob/dev/src/lib/css/styleguide.css).
  - Hi-fi designs, schetsen en UML-diagrammen zijn uitgewerkt in Figma en vormen de leidraad voor de UI.

- **Pagina’s**
  - **Dashboard**  
    Geeft een overzicht van de status van verschillende onderzoeken en werkt als reminder voor openstaande taken. Vanuit hier te navigeren naar een onafgemaakte checklist, de compare grading pagina van ingevulde artikelen en persoonlijke statistieken.
  - **Grading**  
    Overzicht van artikelen die aan de gebruiker zijn toegewezen. Artikelen worden weergegeven in cards met informatie zoals titel, auteur, publicatiejaar en status (Not Started, In Progress, Finished). Filteren op status en thema is mogelijk.
  - **Checklist completion page**  
    Een PDF-bestand van het betreffende researchartikel. Aan de rechterkant is de checklist weergegeven. Deze kan vanuit hier worden doorgelopen naast het research paper en worden verstuurd.
  - **Results**    
    Overzicht van 2 ingevulde checklist antwoordmodellen. Hier kan er vergeleken worden of de antwoorden overeen komen en de uiteindelijke versie kan hier worden verstuurd.
  - **Admin**
  - Functies voor de admin gebruiker, zoals papieren uploaden, final verdict, managen van workgroups 
  - **Notification centre**  
    Een overzichtelijke pagina waar alle meldingen worden weergeven in een lijst. Hier worden meldingen getoond over mensen uit onder andere jouw workgroup die een research paper hebben ingeleverd, waarna je deze kan gaan comparen met jouw eigen. 
  - **Settings**
    Nog niet uitgewerkt. Hier komen uiteindelijk persoonlijke instellingen over bijvoorbeeld preferred color scheme (dark of light mode) maar ook taal voorkeuren etc. 

- **Technische basis**
  - Lokale ontwikkelomgeving werkt (`npm install` -> `npm install gsap` -> `npm run dev`).
  - Gebruik van een `dev` en `main` branch.
  - `dev` branch werkt met feature branches. Deze worden gemaakt vanaf de dev en ook hiernaartoe gemerched. De `main` branch wordt **niet** zomaar naar gemerched zonder volledige testing.
  - FDND Agency conventies worden gevolgd.


## Wat is nog niet af?

- **Datamodel**
  - Het datamodel is nog niet volledig uitgewerkt of geïmplementeerd.
  - Relaties tussen users, artikelen, workgroups en beoordelingen zijn nog niet vastgelegd in code.
  - Dingen zoals berichten zijn ook nog niet gekoppeld

- **Backend & data-opslag**
  - Er is nog geen backend gebouwd voor onder andere het login systeem.
  - De database is nog niet overal gekoppeld.
  - Ingevoerde data zoals checklist-antwoorden, notities en statussen worden nog niet opgeslagen.
  - Persoonlijke statistieken worden ook nog niet opgeslagen in de database.

- **Checklist-functionaliteit**
  - Antwoorden en notities worden nog niet persistent opgeslagen.
  - Het afronden of indienen van een beoordeling ontbreekt.
  - Samenwerking tussen workgroup-leden binnen één artikel (zoals het vergelijken en samenvoegen van beoordelingen) is nog niet uitgewerkt.

- **Gebruikersbeheer**
  - Er is geen authenticatie of autorisatie.
  - Rollen (bijvoorbeeld reviewer of admin) zijn niet geïmplementeerd.
  - Profielpagina’s zijn nog niet functioneel.
  - Er worden nog geen (e-mail) notifications gestuurd als een checklist klaar is om vergeleken te worden. 

- **Afronding richting productie**
  - Er is nog geen live versie op de `main` branch gezet. Wel al op de `dev`.
  - Error handling, validatie en toegankelijkheid zijn nog niet uitgewerkt.

## Aandachtspunten & uitdagingen

- **Samenwerking binnen workgroups**
  - Er is nog geen oplossing voor het vergelijken of samenvoegen van beoordelingen van meerdere reviewers.

- **PDF-annotaties**
  - Het opslaan en delen van annotaties in PDF’s kan technisch complex worden en vraagt om duidelijke keuzes.

- **Schaalbaarheid**
  - Het huidige concept gaat uit van workgroups van twee personen. Uitbreiding hiervan vraagt aanpassingen in het datamodel en de UI.

- **Ontwerp vs. implementatie**
  - De Figma designs zijn leidend. Nieuwe functionaliteiten moeten hierop blijven aansluiten.

- **Projectafspraken**
  - Het project volgt FDND Agency conventies. Het is belangrijk dat toekomstige teams deze blijven volgen voor consistentie.

## Aanbevolen volgende stappen
1. **Datamodel uitwerken**
   - Vastleggen van entiteiten zoals User, Article, Workgroup, Review en ChecklistAnswer.
   - Relaties en statussen duidelijk definiëren.

2. **Backend en opslag**
   - Implementeren van een backend.
   - Zorgen dat checklist-antwoorden, notities en voortgang automatisch worden opgeslagen.

3. **Checklist afronden**
   - Mogelijkheid toevoegen om een beoordeling af te ronden of in te dienen.
   - Artikelstatus automatisch laten aanpassen op basis van voortgang.

4. **Gebruikersbeheer**
   - Inloggen en rollen toevoegen.
   - Profielpagina’s functioneel maken.

5. **Samenwerking verbeteren**
   - Inzichtelijk maken wie welke antwoorden heeft ingevuld.
   - Eventueel ondersteuning voor feedback of consensus tussen reviewers.

6. **Livegang**
   - Applicatie op de `main` branch deployen.
   - Testen op toegankelijkheid, performance en edge cases.

## Backlog & openstaande issues
Alle issues **zonder status** staan open in de backlog. Deze zijn bedoeld om in volgende sprints verder aan te werken.  
Hierin staan zowel:

- technische taken en open functionaliteiten
- nieuwe ideeën
- feedback en wensen vanuit de opdrachtgever

De backlog fungeert als verzamelplek voor verdere doorontwikkeling van het project.

De prioritering van deze issues is nog niet overal vastgelegd en kan per volgende sprint worden bepaald.

## Installatie (voor volgend team)

```bash
git clone https://github.com/fdnd-agency/footguard.git
cd footguard
npm install
npm run dev
```

<hr>

## Sprint 19, Sprint doel.

## Wie willen we in Sprint 19 vooral helpen (welke gebruiker / stakeholder)?
Het specialisten zoals artsen en onderzoekers bij het beoordelen van wetenschappelijke artikelen over diabetische voetproblematiek.

## Welk probleem lossen we deze sprint op?
We lossen alle gevonden bugs en problemen op de website op, zoals navigatieproblemen tussen pagina's. Dubbele code en componenten worden verwijderd en behoud alleen de volledig werkende versies.

## Welke uitkomst willen we aan het einde kunnen laten zien/demonstreren?
Wij willen een goed functionele website die op alle apparaten werkt en een goed getest eindproduct is. 
Verwijder alle dubbele code en componenten, en behoud alleen de volledig werkende versies.

## Sprintdoel
Voor deze sprint willen we als eerste focus de project board en issues aanmaken, testresultaten fixen, en misschien nog aan de backend werken.







