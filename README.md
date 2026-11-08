# Citizen Smith (content source)

A static, source-led UK legal-information website that gives people a practical next step in plain English. For the public. This repo is the editable source; the published copy is the citizen-smith-site repo.

## About
A standalone personal project. It is not part of any other product or platform.

## State
Working. Six areas: debt and credit, housing, energy, telecoms and internet, benefits, employment. Content under `docs/`.

## Not legal advice
General information and document support only. See the disclaimer and sources pages.

## Run it locally (3 steps)
1. `git clone` this repo.
2. `python3 -m http.server 8000` in the folder.
3. Open http://localhost:8000.

## Layout
- `docs/`: guidance by area. `registry/`: source and template indexes. `assets/`: shared style and logic.
- Plain HTML, CSS and JavaScript. No package file, no build.

No licence is set yet. Add one before inviting reuse.
