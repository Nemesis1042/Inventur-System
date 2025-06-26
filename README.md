# Inventur-System

## Projektübersicht
Modernes Inventur- und Lagerverwaltungssystem mit Backend (Python FastAPI) und Frontend (React).  
Ziel ist eine skalierbare, wartbare Anwendung mit klar definierten Rollen und automatisiertem Produktscraping.

---

## Features

- Produktverwaltung inkl. Import, Update, Delete  
- Bestandsaufnahme und Inventurmanagement  
- Rollenbasierte Zugriffssteuerung (Admin, Lagermitarbeiter, IT)  
- Logging aller wichtigen Aktionen  
- Hybrid-Frontend (Web + Mobile) mit React  

---

## Tech-Stack

| Komponente | Technologie           |
|------------|----------------------|
| Backend    | Python 3.12, FastAPI |
| DB         | MySQL, SQLAlchemy    |
| Frontend   | React 18, Vite       |
| Container  | Docker, Docker Compose|

---

## Projektstruktur



Inventur-System/
├── backend
│ ├── app
│ │ ├── auth
│ │ │ ├── init.py
│ │ │ └── auth.py
│ │ ├── crud
│ │ │ ├── init.py
│ │ │ ├── inventory_crud.py
│ │ │ ├── product_crud.py
│ │ │ └── user_crud.py
│ │ ├── logs
│ │ │ └── init.py
│ │ ├── models
│ │ │ ├── init.py
│ │ │ ├── inventory.py
│ │ │ ├── product.py
│ │ │ └── user.py
│ │ ├── routers
│ │ │ ├── init.py
│ │ │ ├── auth_router.py
│ │ │ ├── inventory_router.py
│ │ │ ├── product_router.py
│ │ │ └── user_router.py
│ │ ├── schemas
│ │ │ ├── init.py
│ │ │ ├── inventory_schema.py
│ │ │ ├── product_schema.py
│ │ │ └── user_schema.py
│ │ ├── services
│ │ │ └── scraper.py
│ │ ├── init.py
│ │ ├── config.py
│ │ ├── database.py
│ │ └── main.py
│ ├── Dockerfile
│ └── requirements.txt
├── frontend
│ ├── public
│ ├── src
│ │ ├── components
│ │ ├── pages
│ │ ├── services
│ │ ├── App.jsx
│ │ └── index.jsx
│ ├── Dockerfile
│ ├── package.json
│ └── vite.config.js
├── docker-compose.yml
├── LICENSE
├── README.md
└── requirements.txt

---

## API Dokumentation (Auszug)

| Methode | Endpoint               | Beschreibung                   | Auth benötigt |
|---------|------------------------|-------------------------------|--------------|
| POST    | `/auth/login`           | User Login                    | Nein         |
| POST    | `/auth/register`        | Neuen User anlegen            | Nein         |
| GET     | `/products`             | Alle Produkte abfragen        | Ja           |
| POST    | `/products`             | Neues Produkt anlegen         | Ja (Admin)   |
| PUT     | `/products/{id}`        | Produktdaten aktualisieren    | Ja (Admin)   |
| DELETE  | `/products/{id}`        | Produkt löschen               | Ja (Admin)   |
| GET     | `/inventory`            | Inventar anzeigen             | Ja           |
| POST    | `/inventory`            | Bestand hinzufügen            | Ja           |

---

## 🛠️ Development Setup

### 🔙 Backend lokal starten

1. Virtuelle Umgebung anlegen und aktivieren:

   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/macOS
   .\venv\Scripts\activate   # Windows
   ```

2. Abhängigkeiten installieren:

   ```bash
   pip install -r backend/requirements.txt
   ```

3. `.env` Datei im `backend`-Verzeichnis anlegen und DB-Zugangsdaten setzen.

4. API starten (mit Hot-Reload):

   ```bash
   uvicorn app.main:app --reload
   ```

---

### 🎨 Frontend lokal starten

1. Zum `frontend`-Verzeichnis wechseln:

   ```bash
   cd frontend
   ```

2. Abhängigkeiten installieren:

   ```bash
   npm install
   ```

3. Dev-Server starten:

   ```bash
   npm run dev
   ```

---

### ✅ Testing

- **Backend:** `pytest` (Tests liegen im Ordner `backend/tests`)
- **Frontend:** `Jest` & `React Testing Library` (geplant)

---

### 🔁 Git-Workflow

- Arbeite mit Feature-Branches (`feature/xyz`) basierend auf `main`
- Klar und präzise committen (`fix:`, `feat:`, `chore:`, etc.)
- Pull Requests mit Review-Prozess nutzen
- CI/CD-Anbindung (optional via GitHub Actions, geplant)

---

### 🧠 Rollen

- **Admin:** Vollzugriff auf alle Funktionen  
- **Lagermitarbeiter:** Nur Lesen/Schreiben, keine User-Verwaltung  
- **IT:** Zugriff auf Webapp, aber keine Änderungen an Datenbeständen  

---

### 📦 Geplante Erweiterungen

- Mobiler App-Wrapper via Capacitor oder React Native  
- Produkt-Bilder aus Scraper übernehmen  
- Verfallsdatum-Warnsystem  
- Mehrsprachigkeit  
- QR-/Barcode-Unterstützung  

