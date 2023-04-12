---
sidebar_label: FAQ
hide_title: True
---

## What is indexed.xyz?

[indexed.xyz](http://indexed.xyz) is a free, publicly available data set that includes blocks, traces, events and logs for Ethereum. We built indexed.xyz because we believe that making this data publicly available will help grow the blockchain ecosystem.

## Is Ethereum the only supported chain?

It is at the time of launch, but we’ll have much more to share about additional chains in the near future! Follow us on Twitter at @goldskyio to get updates.

## Is this dataset updated in real-time?

The publicly available free dataset has a multi-minute delay. If you're interested in the same data but real-time, check out [Goldsky](https://goldsky.com).

## Is this an open source community effort?

[indexed.xyz](https://indexed.xyz) is built by Goldsky and sponsored by numerous partners including Coinbase, Gnosis, Arweave, Rill, and Cloudflare. Over time, we plan to open-source all the components of indexed.xyz to make it a true community effort.

## What types of decoded data is in indexed.xyz?

It currently includes NFT collections (ERC-721), token transfers, and ERC-1155, which is a token standard common in blockchain-based gaming. This is an ongoing project and we’ll decode more data over time.

## Where is the data stored?

The dataset currently lives in Cloudflare R2, but is free to be downloaded. The hosting was generously donated by [Cloudflare](https://cloudflare.com), and access is free without any cloudflare account needed.

Our roadmap includes backing up all this data to decentralized networks like [Arweave](https://www.arweave.org/) as well!

## Do I need the goldsky cli to use this?

Nope! The goldsky CLI simply provides some shortcuts. All it does is download from the bucket, filter down to the contract you want, and delete the rest, along with some convenience methods to do this in an ongoing basis.
