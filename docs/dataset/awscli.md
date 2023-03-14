# Downloading from R2 via S3 API

## AWS Credentials

First, you’ll need to add the account and secret key for the indexed.xyz R2 bucket into your AWS credentials, either by running `aws configure` or by adding the following section to the credentials file, usually located at `~/.aws/credentials`

```
[indexedxyz]
aws_access_key_id = 43c31ff797ec2387177cabab6d18f15a
aws_secret_access_key = afb354f05026f2512557922974e9dd2fdb21e5c2f5cbf929b35f0645fb284cf7
```

## Downloading with the AWS CLI tools

> To understand more about the R2 object structure, check our [schema](../schema.md) documentation.

To retrieve the files using the AWS cli tools, you can then run the following command in a terminal with the provided credentials:

```bash
$ aws s3 cp --endpoint-url https://ed5d915e0259fcddb2ab1ce5592040c3.r2.cloudflarestorage.com --profile indexedxyz s3://indexed-xyz/ethereum/decoded/logs/v1.0.0/partition_key=9d/ . --recursive
```

This will download the Parquet files into the current directory.

> Keep in mind that since the partition keys are only two digits, the partitions will contain data for multiple smart contracts, not necessarily just the one that you’re looking for.
