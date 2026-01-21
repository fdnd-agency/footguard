# Teamcanvas 

<img width="2466" height="1770" alt="Team Canvas" src="https://github.com/user-attachments/assets/01159b9c-fb36-424b-8fce-1d462c16c8a5" />

https://www.figma.com/design/FcenWarr4zCNYt1xSufqHv/Sprint-14-Footguard?node-id=1-21&t=0Jeb26pnMYttmn42-1

# Taakverdeling
Teamleden pakken openstaande issues zelfstandig op. We wijzen alleen issues toe aan de leden die daadwerkelijk aan deze issues werken. Zo is altijd zichtbaar wie met welke taak bezig is en welke issues nog openstaan. Dit maakt het ook voor nieuwe teamleden eenvoudig om in het project te starten.

# Issue-structuur

Om overzicht te houden gebruiken we een duidelijke structuur met **Epics** en **subissues**.

## Hoofdissue (Epic)
- Vertegenwoordigt een groter onderdeel of feature.
- Label: `Epic`
- Beschrijving bevat **acceptatiecriteria**.
- Elk acceptatiecriterium wordt uitgewerkt in een subissue.

## Subissues
- Worden aangemaakt voor elk acceptatiecriterium.
- Gelinkt aan het hoofdissue.
- Beschrijving bevat details, takenlijst en eventuele referenties.
- Alle subissues moeten afgerond zijn voordat de Epic gesloten kan worden.

## Voorbeeld

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
# Projectmatige afspraken

## Standup

Elke maandag houden we een standup waarin we bespreken wat we deze week willen bereiken als team. Ook vertelt iedereen wat hij/zei gaat doen.

Elke vrijdag houden we weer een standup waarbij we terugkijken naar de week om te kijken of we het doel hebben bereikt. Ook bespreken we wat eventueel volgende week beter kan.

## Projectboard
- Issues's die worden opgepakt moeten eerst worden geclosed voordat je kan beginnen met een nieuwe issue. (alleen als het echt niet mogelijk is om de issue te sluiten omdat je wacht op feedback bijvoorbeeld. Dan mag je wel een nieuwe issue oppakken.)

### Issues
- Alle issues moeten bij het assignen gelijk worden gelabeld met relevante labels.
- De issues moeten een korte beschrijving bevatten van de functie

#### DOR eisen
- De issues's zijn gepokerd op waarde
- Bevat de 'als gebruiker... wil ik... zodat..' format
- Bevat acceptatiecriteria
- Alle relevante labels zijn toegevoegd
- Van alle punten in de acceptatiecriteria maak je een sub issue van en deze per criteria afvinken

#### DOD eisen
- Alle beschreven functionaliteiten zijn uitgevoerd (acceptatiecriteria)
- De functionaliteit is uitgebreidt getest
  - A11y, tab, kleur, screenreader
  - Performance
  - HTML validator
  - Reponsive en device test
  - User test  
- Er is een Merge request aangemaakt.
  - De template van de Pull request is zoveel mogelijk ingevuld.

# Branches
- De branches die al gemerged of niet meer gebruikt worden verwijderen
- De branche namen consistent houden aan FDND Agency richtlijnen
## Je kan ook gebruiken maken van de branch create in je issue
<img width="528" height="227" alt="afbeelding" src="https://github.com/user-attachments/assets/7b29c6ee-af4c-45b2-a2e1-7fa664452882" />


# Taal
De website en het designs worden in het engels verwerkt.
De issues, readme, projectboard en communicatie worden in het nederlands verwerkt.

# Code conventies

## Naamgevingen 
- Animaties schrijven we op als: animation-(de actie bv. fade-in)-(de richting bv. up) --> animation-fade-in-up
- Gebruik maken van kebab-case
- Naamgeving classes, id's etc. in het Engels
- Duidelijke omschrijving bij PR

## Assets
- Foto's in assets duidelijke naamgeving (icoontjes ook bv hamburger-icon.png)
- Gebruik maken van moderne formats zols webp en avif

## Componenten
- Werken met componenten
- Bij index.js alle componenten met een hoofdletter
- Alle assets en componenten via index.js export

## CSS / HTML / JS
- Semantische volgorde van CSS aanhouden zoals HTML
- Nesting in CSS
- Comments bij lastigere code (bij alle code in JS)


Hiernaast wordt er ook gehouden aan de conventions van de [FDND Agency](https://docs.fdnd.nl/conventies.html).

## Branches

We werken met branches volgens de richtlijnen van de [FDND Docs](https://docs.fdnd.nl/conventies.html#branching-strategy).

Het volgt de volgende git flow:
- Main → dit bevat alleen productie-klare code.
- Develop → Hier worden de features getest en gepushed.
- Feature branches → start van development, gebruikt voor het bouwen van nieuwe functies (b.v. feature/login-page).
- Release branches → start van development voor een nieuwe versie na het testen, wordt vervolgens naar de dev en main branche gepushed.
- Hotfix branches → start van main om urgente bugs te fixen. Na de fix wordt het gepushed naar de main en dev branche.

Op deze manier is er een constante manier van werken.

![git-flow-4](https://github.com/user-attachments/assets/69468298-8604-420d-9a62-d4c7f79ce051)

## Button component (usage)
De Button is een herbruikbare component die consistente knoppen binnen Footguard mogelijk maakt. Gebruik dit component voor alle interactieve acties in de interface.

### Props
Prop	Type	Default	Uitleg
- `variant	"primary" | "secondary" | "outline" | "danger"	"primary"` -->	Bepaalt de visuele stijl van de knop.
- `size	"small" | "medium" | "large"	"medium"` --> Regelt de afmeting van de knop.
- `disabled	boolean	false`	--> Maakt de knop niet interactief en past de styling hierop aan.
- `fullWidth	boolean	false` --> Laat de knop de volledige breedte van zijn container innemen.
- `type	"button" | "submit" | "reset"	"button"` --> Native HTML-button type.
- `tabindex	number	0`	--> Regelt de tabbable volgorde.
- `slot	—`	—->	Inhoud van de knop (tekst, iconen).

### Voorbeelden
```html
<Button>Standaard</Button>

<Button variant="secondary">Secundair</Button>
<Button variant="outline">Outline</Button>
<Button variant="danger">Danger</Button>

<Button size="small">Klein</Button>
<Button size="medium">Middel</Button>
<Button size="large">Groot</Button>

<Button variant="outline" size="small">Klein Outline</Button>

<Button disabled>Niet actief</Button>
<Button fullWidth>Volledige breedte</Button>
<Button type="submit">Verzenden</Button>
```

### Accessibility
- Rendert als echte `<button>`, dus correcte toetsenbord­interactie (Enter/Space) en focusgedrag.
- Zichtbare focusring via `:focus-visible`.
- `disabled` voorkomt interactie én maakt de knop visueel minder prominent.
- Gebruik duidelijke tekst in de slot voor screen readers.

### Richtlijnen
- **Primary**: belangrijkste actie op de pagina (bijv. Opslaan, Verzenden).
- **Secondary**: minder nadrukkelijke acties (bijv. Annuleren).
- **Outline**: lichte of secundaire acties (bijv. Bewerken, Meer info).
- **Danger**: destructieve acties (bijv. Verwijderen).
- **Sizes**: small voor compacte UI, large voor belangrijke CTA’s.

