# Downloading from R2 via rclone

## rclone configuration

First, you’ll need to add the account and secret key for the indexed.xyz R2 bucket into your rclone configuration, You can follow along with the instructions from [here](https://rclone.org/s3/#cloudflare-r2), or copy the below configuration into your existing rclone configuration file, typically located at `~/.config/rclone/rclone.conf`

```
[r2]
type = s3
provider = Cloudflare
access_key_id = 43c31ff797ec2387177cabab6d18f15a
secret_access_key = afb354f05026f2512557922974e9dd2fdb21e5c2f5cbf929b35f0645fb284cf7
region = auto
endpoint = https://data.indexed.xyz
```

## rclone configuration inputs

Follow the instructions linked above. You will need three inputs specific to the indexed.xyz R2 bucket:

```
access_key_id = 43c31ff797ec2387177cabab6d18f15a
secret_access_key = afb354f05026f2512557922974e9dd2fdb21e5c2f5cbf929b35f0645fb284cf7
endpoint = https://data.indexed.xyz
```

## Downloading with rclone

> To understand more about the R2 object structure, check our [schema](../schema.md) documentation.

To retrieve the files using the rclone cli tool, you can then run the following command in a terminal with the provided credentials:

```bash
$ rclone copy r2://indexed-xyz/ethereum/decoded/logs/v1.2.0/partition_key=9d/ .
```

This will download the Parquet files into the current directory.

> Keep in mind that since the partition keys are only two digits, the partitions will contain data for multiple smart contracts, not necessarily just the one that you’re looking for.
