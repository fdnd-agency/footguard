# Technische documentatie

## Inleiding
Dit document beschrijft de technische componenten die zijn toegepast binnen hete project.  
De focus ligt op de opbouw van de interface, de gebruikte componenten en de manier waarop deze met elkaar communiceren.  

---

## Component Library

De component library is opgebouwd volgens een vaste en overzichtelijke mappenstructuur.  
Elke map bevat componenten die een vergelijkbare functie of stijl delen.  

### Structuur van de component library

- **Animations**  
  Componenten voor animaties en visuele overgangen.

- **Buttons**  
  Herbruikbare knoppen in verschillende stijlen en varianten.

- **Cards**  
  Componenten voor het weergeven van informatie in kaartvorm.

- **Charts**  
  Componenten voor datavisualisatie, zoals grafieken en tabellen.

- **Dashboard**  
  Componenten die specifiek worden gebruikt op dashboardpagina’s.

- **Form**  
  Formulierelementen zoals input elementen, formulieren en fieldsets.

- **Layout**  
  Componenten voor de algemene paginalay-out, zoals grids en containers.

- **Navbar-icons**  
  Iconen en navigatie-elementen voor de navigatiebalk.

- **Textual**  
  Tekstuele componenten zoals headings en labels.

---

## Inhoudsopgave
1. Componenten in de Researchpagina  
   1.1 Heading  
   1.2 Research page  
   1.3 ResearchArticleCard  
   1.4 Thema- en Statuslabel  
   1.5 FilterForm  
   1.6 NoItemsFoundNote  

2. Checklistpagina  
   2.1 PdfCard.svelte  
   2.2 QuestionFieldSet  
   2.3 QuestionsForm  

3. Compare Grading pagina  
   3.1 CompareGradingTable  
   3.2 QuestionCard  
   3.3 GradingValue  

---

## 1. Componenten in de Researchpagina

### 1.1 Heading
De heading bevat de titel en subtitel van de pagina.  
De titel en subtitel worden dynamisch ingevuld met behulp van variabelen.

<img width="457" height="96" alt="Image" src="https://github.com/user-attachments/assets/4518cf60-2ba1-4cb1-b620-415e1c550f20" />

---

### 1.2 Research page
De researchpagina toont de verschillende papers die zijn toegewezen aan een grader.  
De kaarten (cards) kunnen worden gefilterd met filterknoppen.  
Wanneer op een card wordt geklikt, wordt de gebruiker doorgestuurd naar de gradingpagina waar de beoordeling kan worden uitgevoerd.

---

### 1.3 ResearchArticleCard
Dit component vormt de volledige kaart met informatie over een researchpaper.  
De volgende gegevens worden weergegeven:

- Titel van het researchpaper  
- Uitgever  
- Datum van uitgave  
- Thema-label  
- Status-label  

<img width="622" height="181" alt="Image" src="https://github.com/user-attachments/assets/f5fdf601-65e3-41c8-acb6-d722191aac82" />

#### Child components
Binnen de ResearchArticleCard worden twee childcomponenten gebruikt:

- Statuslabel  
- Themalabel  

<img width="98" height="44" alt="Image" src="https://github.com/user-attachments/assets/acd8e805-3c8c-4e38-ae82-5a1f705f4e14" />
<img width="114" height="43" alt="Image" src="https://github.com/user-attachments/assets/43a9d710-4837-4050-8eb9-67c7555c7cd3" />
<img width="112" height="43" alt="Image" src="https://github.com/user-attachments/assets/0c03e54a-8464-47d5-a70b-8f8c72d47a2b" />

Met behulp van een **if-else statement** wordt het juiste label toegewezen aan de card.

---

### 1.4 Thema-label
Het themalabel ontvangt via props een dynamische waarde, die wordt weergegeven op de card.

<img width="86" height="40" alt="Image" src="https://github.com/user-attachments/assets/469ba75d-3912-4178-bbfe-4de95c4c7142" />

---

### 1.5 FilterForm
Dit component bevat twee selectknoppen waarmee de ResearchArticleCards gefilterd kunnen worden.  
De filtering werkt met **two-way binding**.  
Via props worden dynamische waarden doorgegeven aan het component.  
Bij wijzigingen worden de nieuwe waarden teruggestuurd naar de parentcomponent.

<img width="285" height="55" alt="Image" src="https://github.com/user-attachments/assets/0ba1b798-9c6d-4a63-95ee-56cbfd783f2b" />

De selectknoppen bestaan elk uit een apart component.

---

### 1.6 NoItemsFoundNote
Wanneer de gekozen filtercombinatie geen resultaten oplevert, wordt een “No items found”-melding weergegeven.

<img width="625" height="181" alt="Image" src="https://github.com/user-attachments/assets/f8155ef2-3b5b-458d-af62-0d6f03657cc4" />

---

## 2. Checklistpagina

In de checklistpagina beoordeelt de grader de researchpaper aan de hand van een vragenlijst.  
Per vraag zijn er drie antwoordopties en kan een commentaar worden toegevoegd.

---

### 2.1 PdfCard.svelte
Dit component rendert de card waarin het PDF-bestand van de researchpaper wordt weergegeven.

<img width="628" height="726" alt="Image" src="https://github.com/user-attachments/assets/069e44d7-9d0d-4e8d-a935-ceac458dee4d" />

---

### 2.2 QuestionFieldSet
Dit component bevat de kaart van één enkele vraag.  
Het is een childcomponent van de QuestionsForm.

<img width="588" height="361" alt="Image" src="https://github.com/user-attachments/assets/eb1ed2ab-df18-413b-805f-ec8ec51c2c45" />

---

### 2.3 QuestionsForm
Dit is de volledige vragenlijst met alle vragen en de titel van het researchpaper.

<img width="629" height="727" alt="Image" src="https://github.com/user-attachments/assets/45ce3ace-73ce-4f47-8592-c7edf4c121c7" />

---

## 3. Compare Grading pagina

### 3.1 CompareGradingTable
Deze tabel toont alle vragen en de antwoorden van beide graders naast elkaar.  
Het component bevat de volgende childcomponenten:

- GradingValue  
- QuestionCard  

<img width="620" height="726" alt="Image" src="https://github.com/user-attachments/assets/23675a15-dbfb-4346-bc1c-9dbb764364dd" />

---

### 3.2 QuestionCard
De kaart waarin de vragen worden weergegeven.

<img width="327" height="85" alt="Image" src="https://github.com/user-attachments/assets/1d662030-c1cf-43d5-9314-961c4974bccd" />

---

### 3.3 GradingValue
Dit component toont de antwoorden (bijvoorbeeld “Yes” of “No”) in de tabel.

<img width="176" height="34" alt="Image" src="https://github.com/user-attachments/assets/cea7cf16-bbab-4c82-8f55-a3e09daae06e" />


---

# Button component (usage)

De Button is een herbruikbare component die consistente knoppen binnen Footguard mogelijk maakt. Gebruik dit component voor alle interactieve acties in de interface.

## Props

| Prop       | Type                        | Default    | Uitleg |
|------------|----------------------------|-----------|--------|
| `variant`  | "primary" \| "secondary" \| "outline" \| "danger" | "primary" | Bepaalt de visuele stijl van de knop |
| `size`     | "small" \| "medium" \| "large" | "medium" | Regelt de afmeting van de knop |
| `disabled` | boolean                     | false     | Maakt de knop niet interactief |
| `fullWidth`| boolean                     | false     | Laat de knop volledige breedte gebruiken |
| `type`     | "button" \| "submit" \| "reset" | "button" | HTML button type |
| `tabindex` | number                      | 0         | Tabbable volgorde |
| `slot`     | —                           | —         | Inhoud van de knop (tekst, iconen) |

## Voorbeelden

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
