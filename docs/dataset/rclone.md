# Downloading from R2 via rclone

## rclone configuration

First, you’ll need to add the account and secret key for the indexed.xyz R2 bucket into your rclone configuration, You can follow along with the instructions from [here](https://rclone.org/s3/#cloudflare-r2), or copy the below configuration into your existing rclone configuration file, typically located at `~/.config/rclone/rclone.conf`

```
[r2]
type = s3
provider = Cloudflare
access_key_id = 094c97e8d9532a90e8b04a910e27e34b
secret_access_key = 9ecf4202fe4c67127e1ce6656626f094585e27494a51d57f457cfff410307ef4
region = auto
endpoint = https://ed5d915e0259fcddb2ab1ce5592040c3.r2.cloudflarestorage.com
```

## rclone configuration inputs

Follow the instructions linked above. You will need three inputs specific to the indexed.xyz R2 bucket:

```
access_key_id = 094c97e8d9532a90e8b04a910e27e34b
secret_access_key = 9ecf4202fe4c67127e1ce6656626f094585e27494a51d57f457cfff410307ef4
endpoint = https://ed5d915e0259fcddb2ab1ce5592040c3.r2.cloudflarestorage.com
```

## Downloading with rclone

> To understand more about the R2 object structure, check our [schema](../schema.md) documentation.

To retrieve the files using the rclone cli tool, you can then run the following command in a terminal with the provided credentials:

```bash
$ rclone copy r2://indexed-xyz-wnam/ethereum/raw/logs/v2.0.0/dt=2020-02-20/ .
```

This will download the Parquet files for the specified date into the current directory.

> Keep in mind that data partitioned by date contains all rows for that particular day. If you want to filter for specific contracts, then you can do it after downloading the data.
