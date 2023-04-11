---
sidebar_position: 1
---

# Downloading with the Goldsky CLI and Docker

You can always install and use the [Goldsky CLI](https://docs.goldsky.com/#quick-start), but in this document we're going to use a Docker image to let you get up and running without directly installing the Goldsky CLI.

## Syncing Data with Docker and the Goldsky CLI

We're assuming you already have [Docker installed](https://docs.docker.com/get-docker/), and if you do, all you need to do is run the following command in your terminal:

`docker run -v $(pwd):/var/opt/indexed-xyz -it goldsky/indexed.xyz:latest goldsky indexed sync decoded-logs --data-version 1.2.0`

If you're using an Apple Silicon system, or see an error like `docker: no matching manifest for linux/arm64/v8 in the manifest list entries.`, then try adding `--platform linux/x86_64` like so:

`docker run --platform linux/x86_64 -v $(pwd):/var/opt/indexed-xyz -it goldsky/indexed.xyz:latest goldsky indexed sync decoded-logs --data-version 1.2.0`

This will start the Goldsky CLI, and prompt you for a contract address to start downloading data for. If you're not sure where to start, a lot of the examples use the contract address for the [Bored Ape Yacht Club](https://etherscan.io/address/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d), `0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d`.

Data is downloaded into the `./data` directory for you to use. If you want to get started with querying the data without installing anything more, check out our [DuckDB](/examples/duckdb.md) example.

One benefit of downloading the data this way is that it will pre-filter the downloaded data to include only data for the contract you are interested in. As you will see in the [DuckDB](/examples/duckdb.md) example, we're often filtering for a specific `address` because other download methods will download more data than just a single contract, so the filter is necessary.
