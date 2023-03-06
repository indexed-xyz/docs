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
| 2021-04-01                                    | 516          |
| 2021-05-01                                    | 14863        |
| 2021-06-01                                    | 6472         |
| 2021-07-01                                    | 3433         |
| 2021-08-01                                    | 4590         |
| 2021-09-01                                    | 1898         |
| 2021-10-01                                    | 1388         |
| 2021-11-01                                    | 1465         |
| 2021-12-01                                    | 1538         |
| 2022-01-01                                    | 1701         |
| 2022-02-01                                    | 1113         |
| 2022-03-01                                    | 2169         |
| 2022-04-01                                    | 1762         |
| 2022-05-01                                    | 2210         |
| 2022-06-01                                    | 1228         |
| 2022-07-01                                    | 1079         |
| 2022-08-01                                    | 1103         |
| 2022-09-01                                    | 1034         |
| 2022-10-01                                    | 947          |
| 2022-11-01                                    | 1344         |
| 2022-12-01                                    | 4933         |
| 2023-01-01                                    | 5453         |
| 2023-02-01                                    | 779          |

> ⚠️
> 
> If your results are different, it's probably because this was written before the full dataset was released, we'll update it once it's all settled in R2!

You could also use a fun command line tool, [YouPlot](https://github.com/red-data-tools/YouPlot) to visualize this data in a terminal.

I threw the SQL query into a file called bayc.sql and ran this command:
```bash
$ duckdb -header -csv < bayc.sql|youplot -H -d , --width 80 bar
              ┌                                                                                ┐
   2021-04-01 ┤■■ 516.0
   2021-05-01 ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 14863.0
   2021-06-01 ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 6472.0
   2021-07-01 ┤■■■■■■■■■■■■■■■■ 3433.0
   2021-08-01 ┤■■■■■■■■■■■■■■■■■■■■■■ 4590.0
   2021-09-01 ┤■■■■■■■■■ 1898.0
   2021-10-01 ┤■■■■■■■ 1388.0
   2021-11-01 ┤■■■■■■■ 1465.0
   2021-12-01 ┤■■■■■■■ 1538.0
   2022-01-01 ┤■■■■■■■■ 1701.0
   2022-02-01 ┤■■■■■ 1113.0
   2022-03-01 ┤■■■■■■■■■■ 2169.0
   2022-04-01 ┤■■■■■■■■ 1762.0
   2022-05-01 ┤■■■■■■■■■■■ 2210.0
   2022-06-01 ┤■■■■■■ 1228.0
   2022-07-01 ┤■■■■■ 1079.0
   2022-08-01 ┤■■■■■ 1103.0
   2022-09-01 ┤■■■■■ 1034.0
   2022-10-01 ┤■■■■■ 947.0
   2022-11-01 ┤■■■■■■ 1344.0
   2022-12-01 ┤■■■■■■■■■■■■■■■■■■■■■■■■ 4933.0
   2023-01-01 ┤■■■■■■■■■■■■■■■■■■■■■■■■■■ 5453.0
   2023-02-01 ┤■■■■ 779.0
              └                                                                                ┘
```

That's pretty neat! Let us know how you end up using this data.

