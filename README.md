<p align="center">
  <img src="https://ui.vlaanderen.be/3.latest/icons/app-icon/icon-highres-precomposed.png" width="100" alt="project-logo">
</p>
<p align="center">
    <h1 align="center">FRONTEND-VALIDATION-TOOL</h1>
</p>
<p align="center">
	<img src="https://img.shields.io/github/last-commit/lblod/frontend-validation-tool?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/lblod/frontend-validation-tool?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/lblod/frontend-validation-tool?style=default&color=0080ff" alt="repo-language-count">
<p>

<br><!-- TABLE OF CONTENTS -->

<details>
  <summary>Table of Contents</summary><br>

- [Overview](#overview)
- [Features](#features)
  - [Document Type Validation](#document-type-validation)
  - [Validation Glue](#validation-glue)
- [Installation](#installation)
- [Usage](#usage)
  - [CORS](#cors)
  - [Testing](#testing)
- [Documentation](#documentation)
</details>
<hr>

## Overview

A publication can have several requirements in order to make structural sense. These are the type of requirements that can be checked by this tool:

## Features

### Document Type Validation

Publications must meet structural requirements to ensure consistency and readability. The frontend supports validation for the following document types:

    - Besluitenlijst
    - Notule
    - Agenda

In addition to specific document types, each publication is required to have a title, validated as a string to ensure it is present and correctly formatted. For "Notule" documents, there is an additional requirement to validate the maturity level, ensuring that these documents not only meet structural standards but also adhere to designated maturity criteria, adding a layer of depth to the validation process.

### Validation Glue

In order to properly validate an agenda item exists in a publication, we need to know the following:

    - Agenda item
      - title
      - resolution
      - vote
      - decision
    - Session
      - time
      - governing body

## Installation

<h4>From <code>source</code></h4>

> 1. Clone the frontend-validation-tool repository:
>
> ```console
> $ git clone git@github.com:lblod/frontend-validation-tool.git
> ```
>
> 2. Change to the project directory:
>
> ```console
> $ cd frontend-validation-tool
> ```
>
> 3. Install the dependencies:
>
> ```console
> $ > npm install
> ```
> 3. Build the frontend:
>
> ```console
> $ > npm run build
> ```
> Note that you can define the environment by creating a `.ENV` file in the root and set `ENVIRONMENT=development` for development.

## Usage

> Run the application using the command below:
>
> ```console
> npm run dev
> ```

### CORS

Due to issues with CORS for publications published by vendors other than Gelinkt Notuleren changes needed to be made to the way the app proxies. Either we host a CORS-anywhere service alongside the app or we resort to using a third party. We currently chose the latter and are using [CORS proxy](https://corsproxy.io/). In the future we might want to host our own CORS-anywhere service to avoid the need for a third party.

To change the default proxy, configure the `CORS_PROXY_URL` environment variable in the `.ENV` file. For example, to not use a proxy leave the variable empty:
```
ENVIRONMENT=development
CORS_PROXY_URL=
```

Don't forget to rebuild by running `npm run dev`.

### Testing

> Run the test suite using the command below:
>
> ```console
> npm run test
> ```

## Documentation

Link to the full documentation [here](https://app.gitbook.com/o/-MP9Yduzf5xu7wIebqPG/s/o6NmI5BUsBB4lH0um5Q4/).

[**Return**](#overview)
