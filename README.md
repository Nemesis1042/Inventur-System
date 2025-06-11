# 🧾 Inventur-System (FastAPI + React + MySQL)

Ein modulares, hybrides Inventursystem zur Bestandsverwaltung von Produkten – automatisierter Import via Web-Scraper, rollenbasiertes Rechtemanagement, Inventur-Logs und Web-Frontend.

## 🔧 Tech Stack

| Schicht       | Technologie               |
|---------------|----------------------------|
| Backend       | Python 3.12, FastAPI       |
| Datenbank     | MySQL                      |
| Frontend Web  | React                      |
| Scraping      | `requests`, `BeautifulSoup` |
| Authentifizierung | JWT Token Auth          |
| Logging       | Audit-Trail für Inventuren |

---

## 📦 Features

- ✅ **Produkt-Import per Web-Scraper** (von proWIN-Website)
- ✅ **Benutzer-Login mit Rollen** (Admin, Lagermitarbeiter, IT)
- ✅ **Wöchentliche Inventurerfassung**
- ✅ **Änderungsprotokoll mit Zeitstempel & Benutzer**
- ✅ **React-Webfrontend** mit Auth, Produktansicht, Inventur-Formular
- ✅ **REST API mit klaren Routen & Validierung**
- ✅ **Zukunftssicher durch modulare Struktur**

---

## 🧑‍💼 Benutzerrollen

| Rolle            | Rechte |
|------------------|--------|
| `admin`          | Volle Rechte (CRUD auf alles) |
| `lager`          | Nur Produkte sehen + Inventur erfassen |
| `it`             | Nur lesender Zugriff auf Web/API |

---

## 📁 Projektstruktur

```bash
inventur-backend/
├── app/
│   ├── auth/            # Login, JWT, Rollenprüfung
│   ├── crud/            # Datenbankoperationen
│   ├── models/          # SQLAlchemy-Modelle
│   ├── routers/         # API-Endpunkte
│   ├── schemas/         # Pydantic-Datenklassen
│   ├── services/
│   │   └── scraper.py   # Produkt-Scraper (z. B. von proWIN)
│   ├── logs/            # Änderungsprotokollierung
│   ├── config.py        # Konfiguration
│   ├── database.py      # MySQL-Anbindung
│   └── main.py          # FastAPI-Startpunkt
├── requirements.txt
├── .env
