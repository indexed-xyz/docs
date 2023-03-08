# Getting Started with DuckDB

## Installation

Make sure you install DuckDB first by following their guide [here](https://duckdb.org/#quickinstall). If you're on macOS, we recommend using [Homebrew](https://docs.brew.sh/Installation), you can install duckdb with the following terminal command: `brew install duckdb`

## Download Parquet Files

You can download the files with the [Goldsky CLI](https://docs.goldsky.com), or by following one of our guides for [AWS CLI](awscli.md), or [rclone](rclone.md).

The prefix we're using is `9d`.

Depending on how you downloaded the files, they may be in a flat directory, or separated out into directories based on the year. If your files are organized by year, just add `*/` in front of the file selection glob in the query, for example:

```sql
select date_trunc('month', to_timestamp(block_time)), count(*) from '*/*.parquet' where lower(address) = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d' and event_signature = 'Transfer(address,address,uint256)' group by 1;
```

Our files are not in a directory so we'll be using a slightly different query in this example.

## Counting the Tokens

Bored Ape Yacht Club minted 10,000 tokens, we can check this by querying the data:

First open DuckDB by running the `duckdb` command in your command line terminal of choice.

```sql
select count(distinct(CAST(event_params[3] AS INTEGER))) from '*.parquet' where lower(address) = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d' and event_signature = 'Transfer(address,address,uint256)';
```

We should see:

| count(DISTINCT CAST(event_params[3] AS INTEGER)) |
|--------------------------------------------------|
| 10000                                            |

What else can we do? How about looking at the transaction volume by month:

```sql
select date_trunc('month', to_timestamp(block_time)), count(*) from '*.parquet' where lower(address) = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d' and event_signature = 'Transfer(address,address,uint256)' group by 1;
```

| date_trunc('month', to_timestamp(block_time)) | count_star() |
|-----------------------------------------------|--------------|
| 2021-04-01                                    | 677          |
| 2021-05-01                                    | 19931        |
| 2021-06-01                                    | 9263         |
| 2021-07-01                                    | 5063         |
| 2021-08-01                                    | 7327         |
| 2021-09-01                                    | 3157         |
| 2021-10-01                                    | 2486         |
| 2021-11-01                                    | 2749         |
| 2021-12-01                                    | 2919         |
| 2022-01-01                                    | 3493         |
| 2022-02-01                                    | 2441         |
| 2022-03-01                                    | 4784         |
| 2022-04-01                                    | 4181         |
| 2022-05-01                                    | 5496         |
| 2022-06-01                                    | 3148         |
| 2022-07-01                                    | 2967         |
| 2022-08-01                                    | 3121         |
| 2022-09-01                                    | 3051         |
| 2022-10-01                                    | 2755         |
| 2022-11-01                                    | 4321         |
| 2022-12-01                                    | 19061        |
| 2023-01-01                                    | 30925        |
| 2023-02-01                                    | 22673        |
| 2023-03-01                                    | 4562         |

You could also use a fun command line tool, [YouPlot](https://github.com/red-data-tools/YouPlot) to visualize this data in a terminal.

I threw the SQL query into a file called bayc.sql and ran this command:
```bash
$ duckdb -header -csv < bayc.sql|youplot -H -d , --width 80 bar
              ┌                                                                                ┐
   2021-04-01 ┤■■ 677.0
   2021-05-01 ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 19931.0
   2021-06-01 ┤■■■■■■■■■■■■■■■■■■■■■ 9263.0
   2021-07-01 ┤■■■■■■■■■■■■ 5063.0
   2021-08-01 ┤■■■■■■■■■■■■■■■■■ 7327.0
   2021-09-01 ┤■■■■■■■ 3157.0
   2021-10-01 ┤■■■■■■ 2486.0
   2021-11-01 ┤■■■■■■ 2749.0
   2021-12-01 ┤■■■■■■■ 2919.0
   2022-01-01 ┤■■■■■■■■ 3493.0
   2022-02-01 ┤■■■■■■ 2441.0
   2022-03-01 ┤■■■■■■■■■■■ 4784.0
   2022-04-01 ┤■■■■■■■■■■ 4181.0
   2022-05-01 ┤■■■■■■■■■■■■■ 5496.0
   2022-06-01 ┤■■■■■■■ 3148.0
   2022-07-01 ┤■■■■■■■ 2967.0
   2022-08-01 ┤■■■■■■■ 3121.0
   2022-09-01 ┤■■■■■■■ 3051.0
   2022-10-01 ┤■■■■■■ 2755.0
   2022-11-01 ┤■■■■■■■■■■ 4321.0
   2022-12-01 ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 19061.0
   2023-01-01 ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 30925.0
   2023-02-01 ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 22673.0
   2023-03-01 ┤■■■■■■■■■■ 4562.0
              └                                                                                ┘
```

That's pretty neat! Let us know how you end up using this data.

