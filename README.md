[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/suchonamehzabin8-maker/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/suchonamehzabin8-maker/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# AtlasStat — National Statistics, Clearly

An independent atlas of national statistics: population, economy, health, work and climate for 28 countries — home to about 5.9 billion people — with real figures from the World Bank, the United Nations, the IMF, the ILO, the UNDP and the ITU, and the source and year printed next to every number.

## What it does

- **Dashboard** — the world at a glance, the largest economies, the most populous countries, the longest lives and the fastest-growing populations.
- **Countries** — browse, search and sort all 28 countries by any headline figure.
- **Country profiles** — twelve indicators, population and GDP trends since 2014, age structure, and each country set against the world average.
- **Compare** — up to three countries side by side, chart and table.
- **Rankings** — every country ranked on any of the twelve indicators.

## Run it

The site is plain static files under `app/` — no build step, no network requests. Serve `app/` with any static server and open `index.html`, or:

```sh
python3 -m http.server --directory app 8080
```

Then open http://localhost:8080. It works on a desktop and on a phone.

## Hand-in

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to `/output` and writes `/output/dossier.json` with the vendored make.fun library:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see `LICENSE`.
