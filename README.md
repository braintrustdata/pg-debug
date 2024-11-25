# pg-debug

## Instructions

First, find your postgres URL and set it as an environment variable:

```
export PG_URL="..."
```

Then, install the necessary dependencies:

```
npm install
```

Finally, run the script:

```
node index.mjs
```

Tweak the `PG_URL` as needed, e.g. adding `sslmode=require` or `sslmode=no-verify`, until the
connection works.
