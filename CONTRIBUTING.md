# Teamcanvas 

<img width="2466" height="1770" alt="Team Canvas" src="https://github.com/user-attachments/assets/01159b9c-fb36-424b-8fce-1d462c16c8a5" />

https://www.figma.com/design/FcenWarr4zCNYt1xSufqHv/Sprint-14-Footguard?node-id=1-21&t=0Jeb26pnMYttmn42-1

# Taakverdeling
Teamleden pakken openstaande issues zelfstandig op. We wijzen alleen issues toe aan de leden die daadwerkelijk aan deze issues werken. Zo is altijd zichtbaar wie met welke taak bezig is en welke issues nog openstaan. Dit maakt het ook voor nieuwe teamleden eenvoudig om in het project te starten.

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

#### DOD eisen
- Alle beschreven functionaliteiten zijn uitgevoerd (acceptatiecriteria)
- De functionaliteit is uitgebreidt getest
  - A11y, tab, kleur, screenreader
  - Performance
  - HTML validator
  - Reponsive en device test
  - User test  
- Er is een Merge request aangemaakt.
  - De template van de merge request is zoveel mogelijk ingevuld.

# Branches
- De branches die al gemerged of niet meer gebruikt worden verwijderen
- De branche namen consistent houden aan FDND Agency richtlijnen

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








