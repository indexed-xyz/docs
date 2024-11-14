---
title: Databend Cloud
---

In this document we'll show how to set up a simple data pipeline to load data from indexed.xyz to Databend Cloud and perform analysis with SQL.

Currently, Databend Cloud is under beta access, and offers a trial with $200 credit on their [homepage](https://app.databend.com/)

## Load data from indexed.xyz

Indexed.xyz file sare stored in [cloudflare R2](https://www.cloudflare.com/products/r2/), and for this example, we'll be using the prefix `9d` for the demo. We can set up a Databend [worksheet](https://docs.databend.com/using-databend-cloud/worksheet) to run all queries with an XSmall instance.

First, we need to add indexed.xyz R2 as a Databend [stage](https://docs.databend.com/sql/sql-commands/ddl/stage/).

```sql
CREATE STAGE r2_stage
URL = 's3://indexed-xyz-wnam/ethereum/raw/logs/v2.0.0/dt=2020-02-20/'
CONNECTION = (
  ENDPOINT_URL = 'https://ed5d915e0259fcddb2ab1ce5592040c3.r2.cloudflarestorage.com/'
  REGION = 'auto'
  ACCESS_KEY_ID = '43c31ff797ec2387177cabab6d18f15a'
  SECRET_ACCESS_KEY = 'afb354f05026f2512557922974e9dd2fdb21e5c2f5cbf929b35f0645fb284cf7'
);
```

You can take a look at the loaded files with the following command:

```sql
LIST @r2_stage;
```

This should return something like the following table:

| name                                                                  | size    | md5                              | last_modified                 | creator |
| --------------------------------------------------------------------- | ------- | -------------------------------- | ----------------------------- | ------- |
| dt=2015/1680119600-25ee0299-28eb-47a4-b81e-f49f5399617b-0-4.parquet   | 12616   | e273f913a5f75fea96f9fe7d2f086a6f | 2023-04-07 02:02:21.717 +0000 | NULL    |
| dt=2015/1680119600-25ee0299-28eb-47a4-b81e-f49f5399617b-0-42.parquet  | 5470    | a29c8427372d02dece62924dd985ae51 | 2023-04-07 02:02:21.725 +0000 | NULL    |
| dt=2016/1680119600-25ee0299-28eb-47a4-b81e-f49f5399617b-37-26.parquet | 32708   | 2c21a9ffbec6d900f21fe4e8ff30d00f | 2023-04-07 02:02:22.131 +0000 | NULL    |
| dt=2016/1680119600-25ee0299-28eb-47a4-b81e-f49f5399617b-37-27.parquet | 261112  | 8efed0a4490b52bb35a12eb1d2162d18 | 2023-04-07 02:02:21.724 +0000 | NULL    |
| dt=2016/1680119600-25ee0299-28eb-47a4-b81e-f49f5399617b-37-44.parquet | 10927   | d5f7c980ac9e1e1c3de8d42c4388a7b1 | 2023-04-07 02:02:21.794 +0000 | NULL    |
| dt=2016/1680119600-25ee0299-28eb-47a4-b81e-f49f5399617b-37-45.parquet | 273489  | e41f8268c73ff9e8062a16fd1bd3d8bf | 2023-04-07 02:02:22.180 +0000 | NULL    |
| dt=2016/1680119600-25ee0299-28eb-47a4-b81e-f49f5399617b-37-9.parquet  | 4220496 | f206d6bcb48483dc684ba8c67d5c6733 | 2023-04-07 02:02:22.145 +0000 | NULL    |

### Create contract table

Build the target table using the following SQL:

```sql
CREATE DATABASE indexedxyz;

USE indexedxyz;

CREATE TABLE `contract` (
  `block_time` BIGINT NULL,
  `address` VARCHAR NULL,
  `event_signature` VARCHAR NULL,
  `event_params` ARRAY(STRING NULL) NULL,
  `block_number` BIGINT NULL,
  `block_hash` VARCHAR NULL,
  `log_index` BIGINT NULL,
  `transaction_hash` VARCHAR NULL,
  `transaction_index` BIGINT NULL,
  `data` VARCHAR NULL,
  `topics` VARCHAR NULL,
  `id` VARCHAR NULL
);
```

### Load data from stage

```sql
COPY INTO contract FROM @r2_stage FILE_FORMAT = (type = PARQUET);
```

The above command is idempotent, once files are loaded into the contract table, redoing the copy would not load the file again. Once data is loaded into the `contract` table (typically takes 1-10 minutes), we can start to query it.

## Counting the tokens

We could check on BAYC mints under the partiion `9d` by querying the data:

```sql
SELECT COUNT(DISTINCT(CAST(event_params[3] AS INTEGER)))
FROM contract
WHERE LOWER(address) = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'
  AND event_signature = 'Transfer(address,address,uint256)';

```

| count() |
| 5374 |

And if we want to check on the transaction volume by month, we can use the following command:

```sql
SELECT
    date_trunc('month', to_timestamp(block_time)),
    count(*)
FROM
    contract
WHERE
    lower(address) = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'
    AND event_signature = 'Transfer(address,address,uint256)'
GROUP BY
    1;
```

The result should look something like:

| date_trunc(month, to_timestamp(block_time)) | count(\*) |
| ------------------------------------------- | --------- |
| 2021-05-01                                  | 1742      |
| 2022-04-01                                  | 352       |
| 2023-03-01                                  | 1622      |
| 2022-07-01                                  | 244       |
| 2023-01-01                                  | 2556      |
| 2021-12-01                                  | 262       |
| 2021-10-01                                  | 190       |
| 2022-06-01                                  | 257       |
| 2022-02-01                                  | 205       |
| 2022-08-01                                  | 285       |
| 2021-07-01                                  | 357       |
| 2022-10-01                                  | 225       |
| 2021-11-01                                  | 219       |
| 2022-11-01                                  | 334       |
| 2021-08-01                                  | 563       |
| 2021-06-01                                  | 727       |
| 2023-04-01                                  | 121       |
| 2022-12-01                                  | 1566      |
| 2022-01-01                                  | 272       |
| 2022-05-01                                  | 426       |
| 2022-03-01                                  | 415       |
| 2021-04-01                                  | 48        |
| 2021-09-01                                  | 257       |
| 2023-02-01                                  | 1950      |
| 2022-09-01                                  | 245       |

### Visualize results through Databend worksheet

Databend Cloud natively provides a visualization toolkits on worksheets.

![Databend](./imgs/goldsky_databend.png 'databend worksheet')
