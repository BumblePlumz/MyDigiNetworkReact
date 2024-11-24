# Utilisation du Frontend React

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version 20 ou supérieure)
- [pnpm](https://pnpm.io/fr/)

## Installation

1. Clonez le dépôt :

  ```bash
  git clone https://github.com/BumblePlumz/MyDigiNetworkReact.git
  ```

2. Accédez au répertoire du projet :

  ```bash
  cd votre-repo
  ```

3. Installez les dépendances :

  ```bash
  pnpm install
  ```

## Démarrage du serveur de développement

Pour démarrer le serveur de développement, exécutez :

```bash
pnpm start
```

Le serveur de développement sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Construction pour la production

Pour créer une version optimisée pour la production, exécutez :

```bash
pnpm run build
```

Les fichiers de production seront générés dans le répertoire `build`.

## Déploiement

Pour déployer l'application, transférez le contenu du répertoire `build` vers votre serveur web.

## Tests

Pour exécuter les tests, utilisez :

```bash
pnpm test
```

## Structure du projet

Voici un aperçu de la structure du projet :

```
votre-repo/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
└── README.md
```

## Contribuer

Les contributions sont les bienvenues ! Veuillez soumettre une pull request ou ouvrir une issue pour discuter des changements que vous souhaitez apporter.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.