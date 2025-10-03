# FootGuard


# 🖥️ Installatie

**Fork de repository**
Ga naar de [repository pagina](https://github.com/fdnd-agency/footguard) en klik op de Fork knop in de rechterbovenhoek om een kopie van de repository naar je eigen GitHub account te maken.

**Clone de repository**
Clone je geforkte repository naar je lokale computer door het volgende command uit te voeren in de terminal: git clone https://github.com/fdnd-agency/footguard.git

**Navigeer naar folder**
Heb je de repo in een nieuwe folder geforkt? Navigeer dan eerst naar die folder via de terminal: 'cd foldernaam'. Anders kan je deze stap overslaan.

**Installeer de packages**
Voer in de terminal de command npm install uit om de packages uit de package.JSON te installeren.

**Start de server**
Voer in de terminal de command 'npm run dev' of 'npm run dev -- --open' om het venster automatischc te openen.

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
