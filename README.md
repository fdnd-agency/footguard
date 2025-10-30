# 📚 Inhoudsopgave

- [📖 FootGuard](#-footguard)
- [🔍 Opdrachtomschrijving](#-opdrachtomschrijving)
- [🪾 Branches](#-branches)
- [🎨 Ontwerp en design](#-ontwerp-en-design)
- [📊 Datamodel](#-datamodel)
- [📱 Pagina's](#-paginas)
  - [Dashboard](#dashboard)
  - [Grading](#grading)
  - [Workgroups](#workgroups)
  - [Checklist](#checklist)
- [🚓 Bijdragen aan het project](#-bijdragen-aan-het-project)
  - [📋 Stappen om bij te dragen](#-conventions)
- [🖥️ Installatie](#️-installatie)
- [🪪 Licentie](#-licentie)

---

# 📖 FootGuard

De International Working Group on the Diabetic Foot (IWGDF) is een wereldwijd
samenwerkingsverband van specialisten die richtlijnen ontwikkelt voor de preventie en
behandeling van diabetische voetproblemen. Deze richtlijnen worden internationaal
gebruikt door artsen, verpleegkundigen en onderzoekers om de zorg voor patiënten met
diabetesvoet te verbeteren.

- Livelink(TBD)

---

# 🔍 Opdrachtomschrijving

De huidige website is verouderd en het beoordelen van onderzoeken gebeurt nu nog op
een ineIiciënte manier, onder andere met Excel. Dit proces kan veel beter en makkelijker.
Wij hebben de opdracht gekregen om een nieuwe website te ontwikkelen waarin dit
onderzoeksproces geïntegreerd wordt. In deze website worden verschillende
functionaliteiten toegevoegd om het beoordelen overzichtelijker, gebruiksvriendelijker
en eficiënter te maken.

---

# 🪾 Branches
- [Dev branche](https://github.com/fdnd-agency/footguard/tree/dev-main)
- [Main branche](https://github.com/fdnd-agency/footguard/tree/main)

---

# 🎨 Ontwerp en design

Bij het ontwerpen van deze tool zijn de volgende ontwerpkeuzen gemaakt.

- **Kleurenpallet:**  
De primaire kleuren van de tool zijn afgeleid van het logo. Vanuit deze kleuren zijn meerdere iteraties gemaakt, wat uiteindelijk heeft geleid tot het definitieve kleurenpalet.

- **Typografie:**  
Voor de typografie is gekozen voor DM Sans vanwege de moderne en goed leesbare stijl. Als fallback wordt de font sans-serif gebruikt.

- **Navigatie:**  
De tool functioneert als een dashboard. De navigatie bevindt zich in een sidebar aan de linkerkant van het scherm. Op kleinere schermen wordt deze sidebar inklapbaar om ruimte te besparen en de gebruikservaring te verbeteren.

- **Hi-fi designs:**  
De hi-fi designs laten zien hoe de uiteindelijke schermen eruitzien. Daarnaast visualiseert het UML-diagram de gebruikersflow en de structuur van de verschillende pagina’s.

De kleurenpallet, huisstijl, UML-diagrammen, schetsen en hi-fi designs zijn te vinden in het [Figma-bestand](https://www.figma.com/design/FcenWarr4zCNYt1xSufqHv/Sprint-14-Footguard?node-id=16-2&p=f).

# 📊 Datamodel

```mermaid

erDiagram
    USERINFO }o--o{ ARTICLES : many_to_many
    USERINFO }o--|| WORKGROUPS : many_to_one
    ARTICLES }o--|| WORKGROUPS : many_to_one
    ARTICLES ||--|| INSPECTIONS : one_to_one
    INSPECTIONS }o--o{ CHECKLIST : one_to_many


  USERINFO {
        int user_id
        string name
        string profession
        string email
        string institute
        string photo
        string role "admin, bestuur, assesor"
        JSON assigned_articles "reeks van article_id die assigned zijn aan deze user (JSON object)"
    }

  ARTICLES {
        int article_id
        string title
        string publisher
        number publishing_year
        string theme
        string pdf "dit wordt de path van de pdf"
        int workgroup_id "id van een toegewezen workgroup"
        string status
    }

    WORKGROUPS {
        int workgroup_id
        string country
        string group_name
        JSON members "elke group heeft 2 users (2 keer user_id) (JSON object)"
    }

    INSPECTIONS {
        int inspection_id
        int article_id
        in user_id
        JSON checklist_id
}

CHECKLIST {
    int checklist_id "uniek id voor elke checklist"
    int inspection_id
    int article_id "id van een article zodat je weet welke article gelinkt is aan deze checklist"
    json questions "25 vragen in (JSON object)"
}
```

# 📱 Pagina's

### Dashboard
De dashboardpagina is de homepagina van de gebruiker na het inloggen. Hier ziet de gebruiker in één keer alle belangrijke informatie, zoals de huidige status van verschillende onderzoeken. Het dashboard werkt als een status reminder, zodat de gebruiker snel kan zien wat er gedaan moet worden en snel weer verder kan gaan met zijn taken.

### Grading
Op deze pagina kan de gebruiker alle artikelen zien die toegewezen aan hem/haar. Elk artikel wordt weergegeven in een card met belangrijke informatie, zoals titel, auteur van het onderzoek en uitgeef jaar. De status kan Finished, In Progress of Not Started zijn, zodat de gebruiker direct ziet waar een artikel staat in het beoordelingsproces. De gebruiker kan de artikeen filteren op status en/of thema.

### Workgroups
Op deze pagina ziet de gebruiker een overzicht van alle workgroups. Elke workgroup bestaat uit 2 members die samen artikelen beoordelen. De gebruiker ziet wie er in welke workgroup zit en kan op een member klikken op naar zijn profiel te gaan.

### Checklist
Op deze pagina start de gebruiker met het beoordelen van een artikel. De gebruiker kan door de pdf file scrollen en kan aantekeningen of markeringen toevoegen. Rechts bevindt zich de vragenlijst die de gebruiker invult. Elke vraag heeft een tekstvak om aantekeningen in te voeren die eventueel later gebruikt kunnen worden bij de definieve oordeel. De checklist bevat 25 vragen waarbij er een counter is die aangeeft hoeveel vragen van de 25 al zijn ingevuld.

| Dashboard | Grading |
|------------|----------|
| <video width="150" height="250" alt="Dashboard video" src="https://github.com/user-attachments/assets/d9306041-19b1-46b9-badd-9e075fe532b1" /> | <video width="150" height="250" alt="Grading video" src="https://github.com/user-attachments/assets/3dd91bdb-86c8-4c86-b658-5e5cd98009d9" /> |

| Workgroups | Checklist |
|-------------|------------|
| <video width="150" height="250" alt="Workgroups video" src="https://github.com/user-attachments/assets/aff179ec-6577-4974-9e57-38541aca3245" /> | <video width="150" height="250" alt="Checklist video" src="https://github.com/user-attachments/assets/af512d10-9d8d-43d5-8977-58d825660a8d" /> |

---

## 🚓 Bijdragen aan het project

Volg dan de onderstaande richtlijnen om een bijdrage te kunnen leveren.

### 📋 Convetions

Om bij te dragen aan dit project, dien je de werkwijze te volgen van **FDND Agency**:

- Werken volgens de technische conventies van [FDND Agency](https://docs.fdnd.nl/conventies.html):
  - 🌀 **Git workflow**
  - 💬 **Commits**
  - 🔀 **Pull requests**
  - 💻 **Code conventions**
  - 🎨 **Design conventions**
---

Ook dien je je te houden aan de afspraken die zijn vastgelegd in de [`CONTRIBUTING.md`](./CONTRIBUTING.md):
- ✏️ Code style & conventions  
- 🧩 Commitregels  
- 🔎 Merge- en reviewproces  
- 🗂️ Werkwijze projectboard  
- 🧠 Opbouw van user story’s  
- 🤝 Samenwerking  

---

# 🖥️ Installatie

- **Fork de repository:**
Ga naar de [repository pagina](https://github.com/fdnd-agency/footguard) en klik op de Fork knop in de rechterbovenhoek om een kopie van de repository naar je eigen GitHub account te maken.

- **Clone de repository:**
Clone je geforkte repository naar je lokale computer door het volgende command uit te voeren in de terminal: git clone https://github.com/fdnd-agency/footguard.git

- **Navigeer naar folder:**
Heb je de repo in een nieuwe folder geforkt? Navigeer dan eerst naar die folder via de terminal: 'cd foldernaam'. Anders kan je deze stap overslaan.

- **Installeer de packages:**
Voer in de terminal de command npm install uit om de packages uit de package.JSON te installeren.

- **Start de server:**
Voer in de terminal de command 'npm run dev' of 'npm run dev -- --open' om het venster automatisch te openen.

# 🪪 Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
