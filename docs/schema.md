---
sidebar_label: Schema & File Structure
sidebar_position: 2
---

# Schema & File Structure

## R2 File Structure

We're hosting indexed.xyz on Cloudflare's R2. R2 has an S3 API, so you can grab these files either with the [Goldsky CLI](https://docs.goldsky.com/references/cli) (the quickest way to get started), the [AWS CLI tool](/dataset/awscli.md), or [rclone](/dataset/rclone.md).

The prefix structure for data in R2 is:

`s3://indexed-xyz-wnam/<chain>/(decoded|raw)/logs/v2.0.0/dt=<yyyy-MM-dd>`

Right now [these chains](chains.md) are supported, but if you'd like to see other chains here, shoot us an [email](mailto:support@goldsky.com) and we'll consider adding it.

You'll probably want the decoded files, as that's what this document describes.

The data is partitioned by day. In most tools you can leave that part of the prefix off and download all data recursively, but to limit downloads and local storage, you may want to pull a smaller subset of the data to get started.

## Decoded Logs

The objects in R2 are [Parquet](https://parquet.apache.org) files.

The Parquet file scheme we're using is:

| column_name       | column_type |
| ----------------- | ----------- |
| block_timestam    | BIGINT      |
| address           | VARCHAR     |
| event_signature   | VARCHAR     |
| event_params      | VARCHAR[]   |
| block_number      | BIGINT      |
| block_hash        | VARCHAR     |
| log_index         | BIGINT      |
| transaction_hash  | VARCHAR     |
| transaction_index | BIGINT      |
| data              | VARCHAR     |
| topics            | VARCHAR     |
| id                | VARCHAR     |
| dt                | VARCHAR     |

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

## Raw Blocks

| column_name       | column_type |
| ----------------- | ----------- |
| id                | VARCHAR     |
| number            | BIGINT      |
| hash              | VARCHAR     |
| parent_hash       | VARCHAR     |
| nonce             | VARCHAR     |
| sha3_uncles       | VARCHAR     |
| logs_bloom        | VARCHAR     |
| transactions_root | VARCHAR     |
| state_root        | VARCHAR     |
| receipts_root     | VARCHAR     |
| miner             | VARCHAR     |
| difficulty        | DOUBLE      |
| total_difficulty  | DOUBLE      |
| size              | BIGINT      |
| extra_data        | VARCHAR     |
| gas_limit         | BIGINT      |
| gas_used          | BIGINT      |
| timestamp         | BIGINT      |
| transaction_count | BIGINT      |
| base_fee_per_gas  | BIGINT      |
| dt                | VARCHAR     |

## Raw Transactions

| column_name              | column_type |
| ------------------------ | ----------- |
| id                       | VARCHAR     |
| hash                     | VARCHAR     |
| nonce                    | BIGINT      |
| block_hash               | VARCHAR     |
| block_number             | BIGINT      |
| transaction_index        | BIGINT      |
| from_address             | VARCHAR     |
| to_address               | VARCHAR     |
| value                    | VARCHAR     |
| gas                      | VARCHAR     |
| gas_price                | VARCHAR     |
| input                    | VARCHAR     |
| max_fee_per_gas          | VARCHAR     |
| max_priority_fee_per_gas | VARCHAR     |
| transaction_type         | BIGINT      |
| block_timestamp          | BIGINT      |
| dt                       | VARCHAR     |

## Raw Logs

| column_name       | column_type |
| ----------------- | ----------- |
| block_timestamp   | BIGINT      |
| block_number      | BIGINT      |
| block_hash        | VARCHAR     |
| transaction_hash  | VARCHAR     |
| transaction_index | BIGINT      |
| log_index         | BIGINT      |
| address           | VARCHAR     |
| data              | VARCHAR     |
| topics            | VARCHAR     |
| id                | VARCHAR     |
| dt                | VARCHAR     |

## Arweave Raw Blocks

| column_name    | column_type |
| -------------- | ----------- |
| id             | VARCHAR     |
| height         | INTEGER     |
| mined_at       | TIMESTAMP   |
| created_at     | TIMESTAMP   |
| previous_block | VARCHAR     |
| mined_at_utc   | BIGINT      |

## Arweave Raw Transactions

| column_name   | column_type |
| ------------- | ----------- |
| id            | VARCHAR     |
| owner         | VARCHAR     |
| tags          | VARCHAR     |
| target        | VARCHAR     |
| quantity      | VARCHAR     |
| reward        | VARCHAR     |
| signature     | VARCHAR     |
| last_tx       | VARCHAR     |
| data_size     | BIGINT      |
| content_type  | VARCHAR     |
| format        | INTEGER     |
| created_at    | TIMESTAMP   |
| deleted_at    | TIMESTAMP   |
| height        | INTEGER     |
| owner_address | VARCHAR     |
| data_root     | VARCHAR     |
| parent        | VARCHAR     |

## Sui Raw Checkpoints

| column_name                         | column_type |
| ----------------------------------- | ----------- |
| id                                  | VARCHAR     |
| checkpoint_digest                   | VARCHAR     |
| sequence_number                     | BIGINT      |
| epoch                               | BIGINT      |
| timestamp_ms                        | BIGINT      |
| previous_checkpoint_digest          | VARCHAR     |
| end_of_epoch                        | BOOLEAN     |
| total_gas_cost                      | DOUBLE      |
| computation_cost                    | DOUBLE      |
| storage_cost                        | DOUBLE      |
| storage_rebate                      | DOUBLE      |
| non_refundable_storage_fee          | DOUBLE      |
| total_transaction_blocks            | DOUBLE      |
| total_transactions                  | DOUBLE      |
| total_successful_transaction_blocks | DOUBLE      |
| total_successful_transactions       | DOUBLE      |
| network_total_transaction           | DOUBLE      |
| validator_signature                 | VARCHAR     |

## Sui Raw Events

| column_name        | column_type |
| ------------------ | ----------- |
| id                 | VARCHAR     |
| transaction_digest | VARCHAR     |
| event_index        | BIGINT      |
| checkpoint         | BIGINT      |
| epoch              | BIGINT      |
| timestamp_ms       | BIGINT      |
| sender             | VARCHAR     |
| package            | VARCHAR     |
| module             | VARCHAR     |
| event_type         | VARCHAR     |
| bcs                | VARCHAR     |

## Sui Raw Move Calls

| column_name        | column_type |
| ------------------ | ----------- |
| id                 | VARCHAR     |
| transaction_digest | VARCHAR     |
| checkpoint         | BIGINT      |
| epoch              | BIGINT      |
| timestamp_ms       | BIGINT      |
| package            | VARCHAR     |
| module             | VARCHAR     |
| function\_         | VARCHAR     |

## Sui Raw Packages

| column_name         | column_type |
| ------------------- | ----------- |
| package_id          | VARCHAR     |
| checkpoint          | BIGINT      |
| epoch               | BIGINT      |
| timestamp_ms        | BIGINT      |
| bcs                 | VARCHAR     |
| transaction_digest  | VARCHAR     |
| package_version     | BIGINT      |
| original_package_id | VARCHAR     |
| id                  | VARCHAR     |

## Sui Raw Transaction Objects

| column_name        | column_type |
| ------------------ | ----------- |
| id                 | VARCHAR     |
| object_id          | VARCHAR     |
| version            | BIGINT      |
| transaction_digest | VARCHAR     |
| checkpoint         | BIGINT      |
| epoch              | BIGINT      |
| timestamp_ms       | BIGINT      |
| input_kind         | VARCHAR     |
| object_status      | VARCHAR     |

## Sui Raw Transactions

| column_name                | column_type |
| -------------------------- | ----------- |
| id                         | VARCHAR     |
| transaction_digest         | VARCHAR     |
| checkpoint                 | BIGINT      |
| epoch                      | BIGINT      |
| timestamp_ms               | BIGINT      |
| sender                     | VARCHAR     |
| transaction_kind           | VARCHAR     |
| is_system_txn              | BOOLEAN     |
| is_sponsored_tx            | BOOLEAN     |
| transaction_count          | BIGINT      |
| execution_success          | BOOLEAN     |
| input                      | BIGINT      |
| shared_input               | BIGINT      |
| gas_coins                  | BIGINT      |
| created                    | BIGINT      |
| mutated                    | BIGINT      |
| deleted                    | BIGINT      |
| transfers                  | BIGINT      |
| split_coins                | BIGINT      |
| merge_coins                | BIGINT      |
| publish                    | BIGINT      |
| upgrade                    | BIGINT      |
| others                     | BIGINT      |
| move_calls                 | BIGINT      |
| packages                   | VARCHAR     |
| gas_owner                  | VARCHAR     |
| gas_object_id              | VARCHAR     |
| gas_object_sequence        | BIGINT      |
| gas_object_digest          | VARCHAR     |
| gas_budget                 | DOUBLE      |
| total_gas_cost             | DOUBLE      |
| computation_cost           | DOUBLE      |
| storage_cost               | DOUBLE      |
| storage_rebate             | DOUBLE      |
| non_refundable_storage_fee | DOUBLE      |
| gas_price                  | DOUBLE      |
| raw_transaction            | VARCHAR     |
| has_zklogin_sig            | BOOLEAN     |
| has_upgraded_multisig      | BOOLEAN     |
| transaction_json           | VARCHAR     |
| effects_json               | VARCHAR     |
