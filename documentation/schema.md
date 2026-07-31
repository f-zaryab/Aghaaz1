# Aghaaz

A CLI scafolding tool to spin up projects based in React.js, Next.js and Nest.js

## Local Setup

Run these command for linting, formating, testing and building project.
Npm link must only be run once at start of setup and then once when it is linked in your local machine, it does not need to rerun again. Only build would compile latest changes.

```
Linking and unlinking packages locally
    - npm link
    - npm unlink -g aghaaz

Building project after changes
    - npm run quality:fix
    - npm run test:run
    - npm run test:coverage
    - npm run build
    - npm run ci:quality

Running and testing project locally
    - aghaaz hello
```

## Stack Options

- frontend
  - reactjs
  - nextjs
- backend
  - nestjs
- full
  - frontend
  - backend

### Nextjs

- pages
- component-library
  - material-ui
  - mantine-core
  - none
- styling
  - tailwindcss
  - none
- http-client
  - axios
  - ky
  - native fetch
- custom creations
  - folder creation
    - features
      - folders dictated by users in features
    - lib

### Reactjs

- pages
- oxlint lib
- component-library
  - material-ui
  - mantine-core
  - none
- styling
  - tailwindcss
  - none
- http-client
  - axios
  - ky
  - native fetch
- custom creations
  - folder creation
    - features
      - folders dictated by users in features
    - lib
