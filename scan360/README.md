# SCAN360 Financial Dashboard

Dashboard finanziaria in stile Stripe per visualizzare report JSON di analisi aziendale.

## 🚀 Quick Start

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Apri http://localhost:3000 nel browser
```

## 📁 Struttura del Progetto

```
scan360/
├── app/
│   ├── page.tsx                    # Home: lista dei report
│   ├── dashboard/[piva]/page.tsx   # Dashboard dettagliata per ogni azienda
│   ├── api/reports/route.ts        # API per recuperare i report
│   ├── layout.tsx                  # Layout principale
│   └── globals.css                 # Stili globali
├── components/
│   ├── ui/                         # Componenti UI base (Card, Button, Badge, Table)
│   └── dashboard/                  # Componenti della dashboard
│       ├── risk-section.tsx        # Sezione valutazione rischio
│       ├── metrics-grid.tsx        # Griglia metriche chiave
│       ├── charts.tsx              # Grafici (Recharts)
│       └── balance-sheet.tsx       # Stato patrimoniale e conto economico
├── data/
│   └── reports/
│       └── [piva].json             # File JSON dei report (es: 03748590928.json)
├── lib/
│   └── utils.ts                    # Utility functions
└── public/                         # Asset statici
```

## 📊 Come Aggiungere Nuovi Report

1. Copia il file JSON nella cartella `data/reports/`
2. Rinomina il file con la P.IVA dell'azienda: `[piva].json`
3. Il report apparirà automaticamente nella home page

## 🎨 Caratteristiche

- **UI in stile Stripe**: Design pulito e professionale
- **Responsive**: Ottimizzato per desktop, tablet e mobile
- **Componenti riutilizzabili**: Architettura modulare
- **TypeScript**: Type-safety completo
- **Tailwind CSS**: Styling moderno e performante
- **Recharts**: Grafici interattivi e responsive

## 📦 Tecnologie Utilizzate

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Recharts** (grafici)
- **Lucide React** (icone)

## 🎯 Sezioni della Dashboard

### Home Page
- Lista di tutti i report disponibili
- Card con informazioni principali (score, rating, ricavi)
- Link diretti alle dashboard dettagliate

### Dashboard Dettagliata
- **Valutazione Rischio**: Score, categoria, rating e trend
- **Metriche Chiave**: KPI finanziari con trend e benchmark
- **Grafici**: Trend economico, sostenibilità debito, capitale circolante
- **Executive Summary**: Punti di forza e criticità
- **Note Tecniche**: Dettagli metodologici (es: calcolo DSCR)
- **Stato Patrimoniale**: Attivo e passivo con trend Y2Y
- **Conto Economico**: Principali voci economiche
- **Outlook**: Raccomandazioni e previsioni

## 🛠️ Comandi Disponibili

```bash
npm run dev      # Avvia in modalità sviluppo
npm run build    # Build per produzione
npm run start    # Avvia il server di produzione
npm run lint     # Verifica il codice con ESLint
```

## 📝 Note

- I dati sono completamente locali (nessuna API esterna)
- I file JSON devono seguire la struttura definita nel progetto
- Personalizza i colori e lo stile modificando `tailwind.config.js` e `globals.css`

## 🔒 Privacy

Tutti i dati finanziari rimangono sul server locale. Nessuna informazione viene inviata a servizi esterni.

---

**Sviluppato con ❤️ usando Next.js e Tailwind CSS**
