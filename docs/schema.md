---
sidebar_label: Schema & File Structure
sidebar_position: 2
---

# Schema & File Structure

## R2 File Structure

We're hosting indexed.xyz on Cloudflare's R2. R2 has an S3 API, so you can grab these files either with the [Goldsky CLI](https://docs.goldsky.com/references/cli) (the quickest way to get started), the [AWS CLI tool](/dataset/awscli.md), or [rclone](/dataset/rclone.md).

The prefix structure for data in R2 is:

`s3://indexed-xyz/<chain>/(decoded|raw)/logs/v1.2.0/partition_key=<XX>/dt=<YYYY>`

For now, the only chain available is ethereum (without the angle brackets), though we will be expanding that as we go, if there's a chain you would like to see, shoot us an [email](mailto:support@goldsky.com) and we'll consider adding it.

You'll probably want the decoded files, as that's what this document describes.

The partition key is a two digit hexadecimal value that's chosen based on the lower-cased md5 hash of the lower-cased smart contract address.

For example:

```javascript
const crypto = require('crypto');
const contract = '0x22c1f6050e56d2876009903609a2cc3fef83b415';
const prefix = crypto
  .createHash('md5')
  .update(`${contract}`)
  .digest('hex')
  .slice(-2);

console.log(prefix);
// e4
```

Finally, the data is further partitioned by year. In most tools you can leave that part of the prefix off and download all years recursively, but to limit downloads and local storage, you may want to pull a smaller subset of the data to get started.

## Decoded Logs

The objects in R2 are [Parquet](https://parquet.apache.org) files.

The Parquet file scheme we're using is:

| column_name       | column_type | null |
| ----------------- | ----------- | ---- |
| block_time        | BIGINT      | YES  |
| address           | VARCHAR     | YES  |
| event_signature   | VARCHAR     | YES  |
| event_params      | VARCHAR[]   | YES  |
| block_number      | BIGINT      | YES  |
| block_hash        | VARCHAR     | YES  |
| log_index         | BIGINT      | YES  |
| transaction_hash  | VARCHAR     | YES  |
| transaction_index | BIGINT      | YES  |
| data              | VARCHAR     | YES  |
| topics            | VARCHAR     | YES  |
| id                | VARCHAR     | YES  |

Here’s an example from one of the files, queried using [DuckDB](https://duckdb.org):

```sql
SELECT * FROM 'ethereum_decoded_logs_v1.2.0_partition_key=00_dt=2021_part-3acd096e-279f-42aa-9c5b-b03397cf6f7f-24-134.parquet' LIMIT 1;
```

| block_time | address                                    | event_signature                   | event_params                                                                                    | block_number | block_hash                                                         | log_index | transaction_hash                                                   | transaction_index | data                                                               | topics                                                                                                                                                                                                   | id                                                                               |
| ---------- | ------------------------------------------ | --------------------------------- | ----------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------ | --------- | ------------------------------------------------------------------ | ----------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| 1609514571 | 0x056fd409e1d7a124bd7017459dfea2f387b6d5cd | Transfer(address,address,uint256) | [0xd24400ae8BfEBb18cA49Be86258a3C749cf46853, 0xe2983860a018FB295ec08C3B63A487874E4d1469, 25000] | 11569225     | 0x8911437fe4d3dad8e887ab58dc4107595cb2541bc3d1fbb27ba6da9dfb12bd50 | 4         | 0xc9e3cb4357516616abddc10f5e63795694e5dbd7bcfa88b757a9aab076263066 | 11                | 0x00000000000000000000000000000000000000000000000000000000000061a8 | 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef,0x000000000000000000000000d24400ae8bfebb18ca49be86258a3c749cf46853,0x000000000000000000000000e2983860a018fb295ec08c3b63a487874e4d1469 | decoded_log_0x8911437fe4d3dad8e887ab58dc4107595cb2541bc3d1fbb27ba6da9dfb12bd50_4 |

Some caveats to keep in mind:

- We're still validating this dataset.
- Though the prefix key we use is based on an all-lowercased address, and md5 digest, the addresses within the parquet files do not have a consistent case in all the fields.
