# Taxi Bonjour — Site React (Vite + Tailwind)

## 1) Installation
```bash
cd taxi-bonjour
npm install
npm run dev
```

Ouvre http://localhost:5173

## 2) Build (production)
```bash
npm run build
npm run preview
```

Le dossier `dist/` est prêt pour l'hébergement.

## 3) Déploiement Vercel
- Crée un dépôt GitHub et pousse ce projet.
- Sur https://vercel.com → New Project → Import depuis GitHub → Deploy.
- (Option) Ajoute ton domaine dans l'onglet *Domains*.

## 4) Personnalisation
- Modifie `src/TaxiLanding.tsx` : nom, téléphone, email.
- Le numéro `PHONE_TEL` est normalisé (ex: +14385292358) pour les liens `tel:`.
