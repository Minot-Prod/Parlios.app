# Parlios Ops — Base44 Light

## Pipelines
- **Build** : build du projet si package.json existe.
- **Knowledge Lint** : vérifie front-matter des .md.
- **Telemetry** : scripts d'agrégation (optionnels).

## Scripts
- scripts/deploy.sh : squelette de déploiement CLI
- scripts/qa.sh : contrôle qualité rapide
- scripts/telemetry_sync.sh : exemple d'agrégation

> Tous les scripts sont **non-destructifs** par défaut.