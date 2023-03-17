---
slug: /
title: Getting Started
sidebar_position: 1
sidebar_label: Getting Started
hide_title: True
---

## Getting Started with indexed.xyz Data

> 🚧 **Technical Preview** 🚧
> When using this dataset in its current form, be aware that it's not yet finalized. Check out our [FAQ](FAQ.md) before getting started.

The Indexed Dataset is a permanently free, public domain, [CC0](https://creativecommons.org/share-your-work/public-domain/cc0/) licensed dataset for doing analysis on near real-time data on blockchains. 

The dataset is backed an alliance of web3 and cloud organizations with the goal of providing a way to easily analyze data from your laptop or servers without being locked into any specific cloud.

The data is kept up to date with the goal of under ten minutes refresh. While not real-time enough for some use-cases, it is fast enough to support a wide range of analyses and features in dapps. 

Indexed is fully available and exportable for free, hosted on Cloudflare R2. The data is stored in the [parquet](https://parquet.apache.org/) format, and once downloaded, can be directly access through tools like [pandas](https://pandas.pydata.org/), [duckdb](https://duckdb.org/), and more.

Our goal is for this dataset to be easily verifiable with decentralized back-up, and optimized with dapp builders in mind.

## What can I use this for?

- Directly query against the dataset with a tool like [Dremio](https://www.dremio.com/) to immediately get a cloud warehouse
- Query smaller subsets of data (like for specific contracts) right in your laptop using duckdb or notebooks.
- Host your own mini dashboard creation tool using [Rill Developer](https://rilldata.com)
- Create a data pipeline that incrementally gets data as soon as it's added to the dataset and [pushes it to a database for querying](examples/benthos_postgres_hasura)
- Make a discord bot that reacts to certain contract events.

## Getting Started

If you want to get started right away, use the [Goldsky CLI tool](https://docs.goldsky.com/references/cli). No registration is required for the `goldsky indexed` command namespace!

The `goldsky indexed` commands just grab data from R2, filter it down to what you need, spit it back out as parquet files.

## Downloading the Data Directly

Since the data is just hosted in a S3 compatible bucket, you can use a variety of tools to export it.

- [Using the AWS CLI](/dataset/awscli.md)
- [Using rclone](/dataset/rclone.md)

## Use Cases and Fun Tools

This section is small today, but we'd love you to add any tools you're using or improved ways to access and use the [indexed.xyz](https://indexed.xyz) data!

- [DuckDB and YouPlot](examples/duckdb.md), a light weight command line starter guide.
- [Benthos + NeonDB + Hasura](examples/benthos_postgres_hasura.md): A start to finish data processing pipeline in the clouds 🌥️!
- [Benthos + Postgres + Hasura](examples/benthos_local_hasura.md): Download contract data locally, query it with Hasura.
- [Get up and running fast with our friends at Rill](https://rilldata.com/indexed-xyz), a hosted analytics tool based on DuckDB. It's cool.

Have some ideas for more? Start a [discussion](https://github.com/indexed-xyz/docs/discussions), open an issue, a pull request, [let us know via email](mailto:support@goldsky.com), or ping our [Telegram bot](https://t.me/goldskysupportbot), if the bot doesn't get back to you, please ping us on another channel, it's kind of new and may need to be oiled! In general, there's no wrong way to get involved. Ok, there's probably a wrong way, but we'll let you know if that happens 💔.

## Versioning

As the community makes improvements, we will regularily re-emit the data in new versions. During the technical preview, data may stop emitting in old versions to save space and resources. If you use the `goldsky indexed` tool to sync, it will automatically increment new versions.

## Roadmap

Our goal is to make Indexed the cleanest and easiest to use web3 data source possible.

With the community's help, we will implement a process where we start decoding as many contracts as possible.

**Usable Technical Preview (V1)**

- [x] Blocks
- [x] Transactions
- [x] Logs
- [x] Token (ERC20) and NFT (ERC721/1155) Decoded Logs
- [ ] Initial set of Custom Contract Decoded Logs (ie. Defi, Game, contracts)

**V2**

- [ ] A process to take community requests for decoding, with backfilling.
- [ ] Regular raw data backups to Arweave for decentralization

**V3**

- [ ] Repo with validation scripts for the public to run easily on the cloud
- [ ] Iceberg support so reorgs can be easily detected and invalidated, along with additional partitions.
