# Benthos + NeonDB + Hasura

In this document we'll explain how to set up a simple data pipeline that pulls data from indexed.xyz, processes it, and inserts it into a local Postgres database. This example outlines a simple workflow that is both opinionated and facilitates quick setup which can then be easily deployed to production-ready cloud infrastructure (we think [NeonDB](https://neon.tech) is *super rad!*). 

# Install Docker-Compose 

Follow the setup instructions for your system on the Docker website [here](https://docs.docker.com/compose/gettingstarted/). 

# Set Up a Benthos Pipeline

You don't need to install anything to get this example working (besides docker-compose), but you should learn to love the blob. Check out the docs and make friends with him here [here](https://www.benthos.dev/docs/guides/about). You must *not* laugh at the blob, you may hurt its feelings.

The configuration lives in this example directory in `benthos.yaml` and can be tweaked to your needs, it includes the following steps:

1. Pull the data for a specific smart contract from the indexed.xyz R2 container using the S3 API. Make sure to edit the endpoint URL to include the correct prefix for the smart contract & event you’re interested in. For this example, we're using the [Bored Ape Yacht Club](https://etherscan.io/address/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d)'s contract `0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d`.
2. Maps the decoded parquet files into usable variables, pulling one of the nested fields into separate columns for ease of use.
3. Insert the values into a table in Postgres, creating that table if it doesn’t exist.



### What you'll need to modify:

You may also want to tweak the batch count, period, or the `skip` processing step value. Benthos output may overwhelm the Postgres client, causing unwanted errors if these values are too permissive. The current settings may mean that it will take a while to run the whole pipeline.

Another thing to keep in mind is that this will download and insert everything in the partition, which is more than just the events for your selected smart contract. It's quite a lot of data, so you may want to add a filtering step in Benthos, or restrict your download to a single year by adding `dt=YYYY` to the end of the prefix in the config file.

Finally, since there's no primary key on the database, if you re-run this pipeline, it'll duplicate data. You can try adding a primary key to id, but keep in mind that the data may change between versions, or there may be some blocks with incomplete id data. 

Note: to clear out your DB you can drop the tables via `psql` or run provided `cleanup.sh` script which will tear down the docker containers and remove the volumes that were created. **Beware** this is a destructive action and the data that has already been ingested will be no longer accessible. Start the pipeline again via `docker-compose up`. 

# Querying the Data in Hasura

If you're familiar with Hasura, you can get right to querying the data. 

If you're not, perhaps check out the [Hasura Docs](https://hasura.io/docs/latest/getting-started/index/) to get your bearings. 

The configuration Environment Variables in the docker-compose file will automagically track the events table for you, so lack of immediate experience with Hasura isn't a deal-breaker. 

Here's a sample query you can try to see a list of all the tokens in the Bored Ape Yacht Club collection:

```graphql
query GetEvents {
  events_aggregate(distinct_on: value) {
    aggregate {
      count
    }
  }
}
```

Let us know if you have any cool queries by contributing to this document, or sending us an [email](mailto:support@goldsky.com)!
