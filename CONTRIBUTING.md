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

# Code conventies

## Naamgevingen 
- Animaties schrijven we op als: animation-(de actie bv. fade-in)-(de richting bv. up) --> animation-fade-in-up
- Gebruik maken van kebab-case
- Naamgeving classes, id's etc. in het Engels
- Duidelijke omschrijving bij PR

## Assets
- Foto's in assets duidelijke naamgeving (icoontjes ook bv hmburger-icon.png)
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



