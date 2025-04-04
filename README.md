# Quorinnov Frontend

## Installation

```bash
git clone https://github.com/Quorinnov-Game/Quorinnov-frontend.git
cd Quorinnov-Frontend
```

Ensuite, vous devez l'installation le package de nodeJS afin d'utiliser les bibliothèques tels que React, React-router, material-ui, axios ainsi que la gestion de l'application Vite

Ouvre votre terminal et tapez des chaines de caractère suivant:

```bash
npm install
```

Si vous avez l'erreur en installation le package NodeJS `npm install`

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Run Application

Assure que vous êtes dans le répertoire Quorinnov-Frontend

```bash
npm run dev
```

Vous pouvez lire help en tapez `h+enter`, il va lister toutes les consignes par exemple `o+enter` pour ouvrir le navigateur (l'interface utilisateur)

Pour les anciens utilisateurs n'ont pas encore les frameworks tels que framer-motion et tsparticles (effect animation).
Note: - tsparticles-preset-fireworks : effect fireworks pour vainqueur

```bash
npm install framer-motion tsparticles tsparticles-preset-fireworks tsparticles-slim react-tsparticles
npm audit fix
```
