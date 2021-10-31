# bip39.cr

[![Build Status](https://img.shields.io/github/workflow/status/q9f/bip39.cr/Nightly)](https://github.com/q9f/bip39.cr/actions)
[![Code Coverage](https://codecov.io/gh/q9f/bip39.cr/branch/main/graph/badge.svg?token=ngxRs9HdJA)](https://codecov.io/gh/q9f/bip39.cr)
[![Documentation](https://img.shields.io/badge/docs-html-black)](https://q9f.github.io/secp256k1.cr/)
[![Release](https://img.shields.io/github/v/release/q9f/bip39.cr?include_prereleases&color=black)](https://github.com/q9f/bip39.cr/releases/latest)
[![Language](https://img.shields.io/github/languages/top/q9f/bip39.cr?color=black)](https://github.com/q9f/bip39.cr/search?l=crystal)
[![License](https://img.shields.io/github/license/q9f/bip39.cr.svg?color=black)](LICENSE)

a native library implementing `bip-0039` mnemonics purely for the crystal language.

# installation

add the `bip39` library to your `shard.yml`

```yaml
dependencies:
  secp256k1:
    github: q9f/bip39.cr
    version: "~> 0.1"
```

# usage

```crystal
# import bip39
require "bip39"
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
