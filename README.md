# bip39.cr

[![Build Status](https://img.shields.io/github/workflow/status/q9f/bip39.cr/Nightly)](https://github.com/q9f/bip39.cr/actions)
[![Code Coverage](https://codecov.io/gh/q9f/bip39.cr/branch/main/graph/badge.svg?token=ngxRs9HdJA)](https://codecov.io/gh/q9f/bip39.cr)
[![Documentation](https://img.shields.io/badge/docs-html-black)](https://q9f.github.io/secp256k1.cr/)
[![Release](https://img.shields.io/github/v/release/q9f/bip39.cr?include_prereleases&color=black)](https://github.com/q9f/bip39.cr/releases/latest)
[![Language](https://img.shields.io/github/languages/top/q9f/bip39.cr?color=black)](https://github.com/q9f/bip39.cr/search?l=crystal)
[![License](https://img.shields.io/github/license/q9f/bip39.cr.svg?color=black)](LICENSE)

a native library implementing `bip-0039` mnemonics purely for the crystal language.

> _this bip (0039) describes the implementation of a mnemonic code or mnemonic sentence -- a group of easy to remember words -- for the generation of deterministic wallets._
>
> _it consists of two parts: generating the mnemonic and converting it into a binary seed. this seed can be later used to generate deterministic wallets using bip-0032 or similar methods._

ref: [bitcoin/bips/bip-0039](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)

# installation

add the `bip39` library to your `shard.yml`

```yaml
dependencies:
  bip39:
    github: q9f/bip39.cr
    version: "~> 0.1"
```

# usage

```crystal
# import bip39
require "bip39"
```

you can generate and recover mnemonics fully adhering to the [bip-0039 specification](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).

```crystal
m0 = Bip0039::Mnemonic.new
# => <Bip0039::Mnemonic:0x7f51769bcd20 @ent=128, @seed=183297182565288719506055787609377395053>

m0.to_words
# => ["measure", "come", "cube", "ostrich", "wide", "inspire", "hello", "essay", "ready", "cute", "reform", "sustain"]

m0.to_hex
# => "89e5c0d5ce7faaea9ab269b2c6d6d16d"
```

the default entropy is of 128 bits. this shard can generate seeds of of 128/160/192/224/256-bit entropy. just initialize mnemonics with the bit-size, e.g., `Bip0039::Mnemonic.new 256`.

it's easily possible to recover bip-0039 mnemonics from a phrase or a seed by simply passing it to the constructor.

```crystal
m1 = Bip0039::Mnemonic.new ["measure", "come", "cube", "ostrich", "wide", "inspire", "hello", "essay", "ready", "cute", "reform", "sustain"]
# => <Bip0039::Mnemonic:0x7f37ca6e4c80 @ent=128, @seed=183297182565288719506055787609377395053>
m1.to_hex
# => "89e5c0d5ce7faaea9ab269b2c6d6d16d"

m2 = Bip0039::Mnemonic.new "89e5c0d5ce7faaea9ab269b2c6d6d16d"
# => <Bip0039::Mnemonic:0x7f37ca6e4be0 @ent=128, @seed=183297182565288719506055787609377395053>
m2.to_words
# => ["measure", "come", "cube", "ostrich", "wide", "inspire", "hello", "essay", "ready", "cute", "reform", "sustain"]
```

# documentation

the full library documentation can be found here: [q9f.github.io/bip39.cr](https://q9f.github.io/bip39.cr/)

generate a local copy with:

```
crystal docs
```

# testing

the library is entirely specified through tests in `./spec`; run:

```bash
crystal spec --verbose
```

# contribute

create a pull request, and make sure tests and linter passes.

license: apache license v2.0

contributors: [**@q9f**](https://github.com/q9f/)
