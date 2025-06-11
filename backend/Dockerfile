# Basis-Image mit Python 3.12 slim
FROM python:3.12-slim

# Arbeitsverzeichnis im Container
WORKDIR /app

# Abhängigkeiten kopieren
COPY backend/requirements.txt .

# Abhängigkeiten installieren
RUN pip install --no-cache-dir -r requirements.txt

# Applikationscode kopieren
COPY backend/app ./app

# .env (optional, kann auch als Docker-Secret gemountet werden)
COPY backend/.env .

# Port freigeben
EXPOSE 8000

# Uvicorn starten mit Hot-Reload (für Entwicklung)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

