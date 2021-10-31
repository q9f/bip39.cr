crystal_doc_search_index_callback({"repository_name":"bip39","body":"# bip39.cr\n\n[![Build Status](https://img.shields.io/github/workflow/status/q9f/bip39.cr/Nightly)](https://github.com/q9f/bip39.cr/actions)\n[![Code Coverage](https://codecov.io/gh/q9f/bip39.cr/branch/main/graph/badge.svg?token=ngxRs9HdJA)](https://codecov.io/gh/q9f/bip39.cr)\n[![Documentation](https://img.shields.io/badge/docs-html-black)](https://q9f.github.io/secp256k1.cr/)\n[![Release](https://img.shields.io/github/v/release/q9f/bip39.cr?include_prereleases&color=black)](https://github.com/q9f/bip39.cr/releases/latest)\n[![Language](https://img.shields.io/github/languages/top/q9f/bip39.cr?color=black)](https://github.com/q9f/bip39.cr/search?l=crystal)\n[![License](https://img.shields.io/github/license/q9f/bip39.cr.svg?color=black)](LICENSE)\n\na native library implementing `bip-0039` mnemonics purely for the crystal language.\n\n> _this bip (0039) describes the implementation of a mnemonic code or mnemonic sentence -- a group of easy to remember words -- for the generation of deterministic wallets._\n>\n> _it consists of two parts: generating the mnemonic and converting it into a binary seed. this seed can be later used to generate deterministic wallets using bip-0032 or similar methods._\n\nref: [bitcoin/bips/bip-0039](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)\n\n# installation\n\nadd the `bip39` library to your `shard.yml`\n\n```yaml\ndependencies:\n  bip39:\n    github: q9f/bip39.cr\n    version: \"~> 0.1\"\n```\n\n# usage\n\n```crystal\n# import bip39\nrequire \"bip39\"\n```\n\nyou can generate and recover mnemonics fully adhering to the [bip-0039 specification](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).\n\n```crystal\nm0 = Bip0039::Mnemonic.new\n# => <Bip0039::Mnemonic:0x7f51769bcd20 @ent=128, @seed=183297182565288719506055787609377395053>\n\nm0.to_words\n# => [\"measure\", \"come\", \"cube\", \"ostrich\", \"wide\", \"inspire\", \"hello\", \"essay\", \"ready\", \"cute\", \"reform\", \"sustain\"]\n\nm0.to_hex\n# => \"89e5c0d5ce7faaea9ab269b2c6d6d16d\"\n```\n\nthe default entropy is of 128 bits. this shard can generate seeds of of 128/160/192/224/256-bit entropy. just initialize mnemonics with the bit-size, e.g., `Bip0039::Mnemonic.new 256`.\n\nit's easily possible to recover bip-0039 mnemonics from a phrase or a seed by simply passing it to the constructor.\n\n```crystal\nm1 = Bip0039::Mnemonic.new [\"measure\", \"come\", \"cube\", \"ostrich\", \"wide\", \"inspire\", \"hello\", \"essay\", \"ready\", \"cute\", \"reform\", \"sustain\"]\n# => <Bip0039::Mnemonic:0x7f37ca6e4c80 @ent=128, @seed=183297182565288719506055787609377395053>\nm1.to_hex\n# => \"89e5c0d5ce7faaea9ab269b2c6d6d16d\"\n\nm2 = Bip0039::Mnemonic.new \"89e5c0d5ce7faaea9ab269b2c6d6d16d\"\n# => <Bip0039::Mnemonic:0x7f37ca6e4be0 @ent=128, @seed=183297182565288719506055787609377395053>\nm2.to_words\n# => [\"measure\", \"come\", \"cube\", \"ostrich\", \"wide\", \"inspire\", \"hello\", \"essay\", \"ready\", \"cute\", \"reform\", \"sustain\"]\n```\n\n# documentation\n\nthe full library documentation can be found here: [q9f.github.io/bip39.cr](https://q9f.github.io/bip39.cr/)\n\ngenerate a local copy with:\n\n```\ncrystal docs\n```\n\n# testing\n\nthe library is entirely specified through tests in `./spec`; run:\n\n```bash\ncrystal spec --verbose\n```\n\n# contribute\n\ncreate a pull request, and make sure tests and linter passes.\n\nlicense: apache license v2.0\n\ncontributors: [**@q9f**](https://github.com/q9f/)\n","program":{"html_id":"bip39/toplevel","path":"toplevel.html","kind":"module","full_name":"Top Level Namespace","name":"Top Level Namespace","abstract":false,"superclass":null,"ancestors":[],"locations":[],"repository_name":"bip39","program":true,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[],"macros":[],"types":[{"html_id":"bip39/Bip0039","path":"Bip0039.html","kind":"module","full_name":"Bip0039","name":"Bip0039","abstract":false,"superclass":null,"ancestors":[],"locations":[{"filename":"src/bip39.cr","line_number":24,"url":"https://github.com/q9f/bip39.cr/blob/v0.1.0/src/bip39.cr#L24"},{"filename":"src/util.cr","line_number":17,"url":"https://github.com/q9f/bip39.cr/blob/v0.1.0/src/util.cr#L17"},{"filename":"src/version.cr","line_number":17,"url":"https://github.com/q9f/bip39.cr/blob/v0.1.0/src/version.cr#L17"}],"repository_name":"bip39","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[{"id":"VERSION","name":"VERSION","value":"\"0.1.0\"","doc":"The `VERSION` of the `Bip0039` module.","summary":"<p>The <code><a href=\"Bip0039.html#VERSION\">VERSION</a></code> of the <code><a href=\"Bip0039.html\">Bip0039</a></code> module.</p>"}],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":"Implements 128/160/192/224/256-bit `BIP-0039` Mnemonics.\nRef: [bitcoin/bips/bip-0039](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)","summary":"<p>Implements 128/160/192/224/256-bit <code>BIP-0039</code> Mnemonics.</p>","class_methods":[],"constructors":[],"instance_methods":[],"macros":[],"types":[{"html_id":"bip39/Bip0039/Mnemonic","path":"Bip0039/Mnemonic.html","kind":"class","full_name":"Bip0039::Mnemonic","name":"Mnemonic","abstract":false,"superclass":{"html_id":"bip39/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"bip39/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"bip39/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/bip39.cr","line_number":27,"url":"https://github.com/q9f/bip39.cr/blob/v0.1.0/src/bip39.cr#L27"}],"repository_name":"bip39","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"bip39/Bip0039","kind":"module","full_name":"Bip0039","name":"Bip0039"},"doc":"Implements a `Bip0039` Mnemonic class.\nRef: [bitcoin/bips/bip-0039](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)","summary":"<p>Implements a <code><a href=\"../Bip0039.html\">Bip0039</a></code> Mnemonic class.</p>","class_methods":[],"constructors":[{"html_id":"new(ent:Int32=128)-class-method","name":"new","doc":"Implements a `Bip0039` Mnemonic with a random entropy of ENT bits.\n\nParameters:\n* `ent` (`Int32`): the bit-size of the random entropy to use (128/160/192/224/256).\n\n```\nmnemonic = Bip0039::Mnemonic.new 256\n# => #<Bip0039::Mnemonic:0x7f8be5611d80>\n```","summary":"<p>Implements a <code><a href=\"../Bip0039.html\">Bip0039</a></code> Mnemonic with a random entropy of ENT bits.</p>","abstract":false,"args":[{"name":"ent","doc":null,"default_value":"128","external_name":"ent","restriction":"Int32"}],"args_string":"(ent : Int32 = 128)","args_html":"(ent : Int32 = <span class=\"n\">128</span>)","location":{"filename":"src/bip39.cr","line_number":54,"url":"https://github.com/q9f/bip39.cr/blob/v0.1.0/src/bip39.cr#L54"},"def":{"name":"new","args":[{"name":"ent","doc":null,"default_value":"128","external_name":"ent","restriction":"Int32"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(ent)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}},{"html_id":"new(hex:String)-class-method","name":"new","doc":"Implements a `Bip0039` Mnemonic restored from a hexadecimal seed.\n\nParameters:\n* `hex` (`String`): the hex-seed to use to generate the mnemonic from.\n\n```\nmnemonic = Bip0039::Mnemonic.new \"9e885d952ad362caebefe34e91bd2\"\n# => #<Bip0039::Mnemonic:0x7f8be5611d80>\n```","summary":"<p>Implements a <code><a href=\"../Bip0039.html\">Bip0039</a></code> Mnemonic restored from a hexadecimal seed.</p>","abstract":false,"args":[{"name":"hex","doc":null,"default_value":"","external_name":"hex","restriction":"String"}],"args_string":"(hex : String)","args_html":"(hex : String)","location":{"filename":"src/bip39.cr","line_number":71,"url":"https://github.com/q9f/bip39.cr/blob/v0.1.0/src/bip39.cr#L71"},"def":{"name":"new","args":[{"name":"hex","doc":null,"default_value":"","external_name":"hex","restriction":"String"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(hex)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}},{"html_id":"new(seed:BigInt,ent:Int32=128)-class-method","name":"new","doc":"Implements a `Bip0039` Mnemonic restored from a numeric seed of given size.\n\nParameters:\n* `seed` (`BigInt`): the numeric seed to use to generate the mnemonic from.\n* `ent` (`Int32`): the bit-size of the random entropy to use (128/160/192/224/256).\n\n```\nmnemonic = Bip0039::Mnemonic.new BigInt.new(\"9e885d952ad362caebefe34e91bd2\", 16), 128\n# => #<Bip0039::Mnemonic:0x7f8be5611d80>\n```","summary":"<p>Implements a <code><a href=\"../Bip0039.html\">Bip0039</a></code> Mnemonic restored from a numeric seed of given size.</p>","abstract":false,"args":[{"name":"seed","doc":null,"default_value":"","external_name":"seed","restriction":"BigInt"},{"name":"ent","doc":null,"default_value":"128","external_name":"ent","restriction":"Int32"}],"args_string":"(seed : BigInt, ent : Int32 = 128)","args_html":"(seed : BigInt, ent : Int32 = <span class=\"n\">128</span>)","location":{"filename":"src/bip39.cr","line_number":89,"url":"https://github.com/q9f/bip39.cr/blob/v0.1.0/src/bip39.cr#L89"},"def":{"name":"new","args":[{"name":"seed","doc":null,"default_value":"","external_name":"seed","restriction":"BigInt"},{"name":"ent","doc":null,"default_value":"128","external_name":"ent","restriction":"Int32"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(seed, ent)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}},{"html_id":"new(phrase:Array(String))-class-method","name":"new","doc":"Implements a `Bip0039` Mnemonic restored from a seed phrase.\n\nParameters:\n* `phrase` (`Array(String)`): the seed phrase to recover the mnemonic from (12/15/18/21/24 words).\n\n```\nmnemonic = Bip0039::Mnemonic.new [\"ozone\", \"drill\", \"grab\", \"fiber\", \"curtain\", \"grace\", \"pudding\", \"thank\", \"cruise\", \"elder\", \"eight\", \"picnic\"]\n# => #<Bip0039::Mnemonic:0x7f8be5611d80>\n```","summary":"<p>Implements a <code><a href=\"../Bip0039.html\">Bip0039</a></code> Mnemonic restored from a seed phrase.</p>","abstract":false,"args":[{"name":"phrase","doc":null,"default_value":"","external_name":"phrase","restriction":"Array(String)"}],"args_string":"(phrase : Array(String))","args_html":"(phrase : Array(String))","location":{"filename":"src/bip39.cr","line_number":106,"url":"https://github.com/q9f/bip39.cr/blob/v0.1.0/src/bip39.cr#L106"},"def":{"name":"new","args":[{"name":"phrase","doc":null,"default_value":"","external_name":"phrase","restriction":"Array(String)"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(phrase)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"html_id":"ent:Int32-instance-method","name":"ent","doc":"The bit-size of the entropy of the mnemonic.","summary":"<p>The bit-size of the entropy of the mnemonic.</p>","abstract":false,"args":[],"args_string":" : Int32","args_html":" : Int32","location":{"filename":"src/bip39.cr","line_number":29,"url":"https://github.com/q9f/bip39.cr/blob/v0.1.0/src/bip39.cr#L29"},"def":{"name":"ent","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Int32","visibility":"Public","body":"@ent"}},{"html_id":"ent=(ent:Int32)-instance-method","name":"ent=","doc":"The bit-size of the entropy of the mnemonic.","summary":"<p>The bit-size of the entropy of the mnemonic.</p>","abstract":false,"args":[{"name":"ent","doc":null,"default_value":"","external_name":"ent","restriction":"Int32"}],"args_string":"(ent : Int32)","args_html":"(ent : Int32)","location":{"filename":"src/bip39.cr","line_number":29,"url":"https://github.com/q9f/bip39.cr/blob/v0.1.0/src/bip39.cr#L29"},"def":{"name":"ent=","args":[{"name":"ent","doc":null,"default_value":"","external_name":"ent","restriction":"Int32"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@ent = ent"}},{"html_id":"seed:BigInt-instance-method","name":"seed","doc":"The random seed of the mnemonic.","summary":"<p>The random seed of the mnemonic.</p>","abstract":false,"args":[],"args_string":" : BigInt","args_html":" : BigInt","location":{"filename":"src/bip39.cr","line_number":32,"url":"https://github.com/q9f/bip39.cr/blob/v0.1.0/src/bip39.cr#L32"},"def":{"name":"seed","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"BigInt","visibility":"Public","body":"@seed"}},{"html_id":"seed=(seed:BigInt)-instance-method","name":"seed=","doc":"The random seed of the mnemonic.","summary":"<p>The random seed of the mnemonic.</p>","abstract":false,"args":[{"name":"seed","doc":null,"default_value":"","external_name":"seed","restriction":"BigInt"}],"args_string":"(seed : BigInt)","args_html":"(seed : BigInt)","location":{"filename":"src/bip39.cr","line_number":32,"url":"https://github.com/q9f/bip39.cr/blob/v0.1.0/src/bip39.cr#L32"},"def":{"name":"seed=","args":[{"name":"seed","doc":null,"default_value":"","external_name":"seed","restriction":"BigInt"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@seed = seed"}},{"html_id":"to_hex:String-instance-method","name":"to_hex","doc":"Generates a padded hex string containing the seed of the size of ENT bits.\n\n```\nBip0039::Mnemonic.new.to_hex\n# => \"9e885d952ad362caeb4efe34a8e91bd2\"\n```","summary":"<p>Generates a padded hex string containing the seed of the size of ENT bits.</p>","abstract":false,"args":[],"args_string":" : String","args_html":" : String","location":{"filename":"src/bip39.cr","line_number":178,"url":"https://github.com/q9f/bip39.cr/blob/v0.1.0/src/bip39.cr#L178"},"def":{"name":"to_hex","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String","visibility":"Public","body":"return Util.num_to_padded_hex(@seed, @ent)"}},{"html_id":"to_words:Array(String)-instance-method","name":"to_words","doc":"Generates a phrase of words according to the `Bip0039` specification\nbased on the used seed.\n\n```\nBip0039::Mnemonic.new.to_words\n# => [\"ozone\", \"drill\", \"grab\", \"fiber\", \"curtain\", \"grace\", \"pudding\", \"thank\", \"cruise\", \"elder\", \"eight\", \"picnic\"]\n```","summary":"<p>Generates a phrase of words according to the <code><a href=\"../Bip0039.html\">Bip0039</a></code> specification based on the used seed.</p>","abstract":false,"args":[],"args_string":" : Array(String)","args_html":" : Array(String)","location":{"filename":"src/bip39.cr","line_number":143,"url":"https://github.com/q9f/bip39.cr/blob/v0.1.0/src/bip39.cr#L143"},"def":{"name":"to_words","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Array(String)","visibility":"Public","body":"seed_hex = Util.num_to_padded_hex(@seed, @ent)\nchecksum_bin = checksum(seed_hex)\nseed_bin = Util.num_to_padded_bin(@seed, @ent)\nchecksummed_seed = seed_bin + checksum_bin\niterator = 0\nsplit_size = 11\nword_indices = [] of Int32\nwhile iterator < checksummed_seed.size\n  word_indices << (checksummed_seed[iterator, split_size].to_i(2))\n  iterator = iterator + split_size\nend\nword_list = Util.word_list\nphrase = [] of String\nword_indices.each do |index|\n  phrase << word_list[index]\nend\nreturn phrase\n"}}],"macros":[],"types":[]},{"html_id":"bip39/Bip0039/Util","path":"Bip0039/Util.html","kind":"module","full_name":"Bip0039::Util","name":"Util","abstract":false,"superclass":null,"ancestors":[],"locations":[{"filename":"src/util.cr","line_number":17,"url":"https://github.com/q9f/bip39.cr/blob/v0.1.0/src/util.cr#L17"}],"repository_name":"bip39","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"bip39/Bip0039","kind":"module","full_name":"Bip0039","name":"Bip0039"},"doc":"A collection of utilities for `Bip0039` mnemonic management, e.g.,\nloading word lists from dictionaries, or n-bit padding operations.","summary":"<p>A collection of utilities for <code><a href=\"../Bip0039.html\">Bip0039</a></code> mnemonic management, e.g., loading word lists from dictionaries, or n-bit padding operations.</p>","class_methods":[{"html_id":"bin_to_padded_hex(bin:String,size:Int):String-class-method","name":"bin_to_padded_hex","doc":"A generic utility to generate a padded hex string from a binary string\nwith given size.\n\nParameters:\n* `bin` (`String`): the binary string to be formatted as padded hex string.\n* `size` (`Int`): the size in bits for the resulting hex string, e.g., 128.\n\n```\nBip0039::Util.bin_to_padded_hex \"1100101\", 32\n# => \"00000065\"\n```","summary":"<p>A generic utility to generate a padded hex string from a binary string with given size.</p>","abstract":false,"args":[{"name":"bin","doc":null,"default_value":"","external_name":"bin","restriction":"String"},{"name":"size","doc":null,"default_value":"","external_name":"size","restriction":"Int"}],"args_string":"(bin : String, size : Int) : String","args_html":"(bin : String, size : Int) : String","location":{"filename":"src/util.cr","line_number":79,"url":"https://github.com/q9f/bip39.cr/blob/v0.1.0/src/util.cr#L79"},"def":{"name":"bin_to_padded_hex","args":[{"name":"bin","doc":null,"default_value":"","external_name":"bin","restriction":"String"},{"name":"size","doc":null,"default_value":"","external_name":"size","restriction":"Int"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String","visibility":"Public","body":"num = BigInt.new(bin, 2)\nhex = num.to_s(16)\nreturn hex.rjust((size / 4).to_i, '0')\n"}},{"html_id":"hex_to_padded_bin(hex:String,size:Int):String-class-method","name":"hex_to_padded_bin","doc":"A generic utility to generate a padded binary string from a hex string\nwith given size.\n\nParameters:\n* `hex` (`String`): the hex string to be formatted as padded binary string.\n* `size` (`Int`): the size in bits for the resulting hex string, e.g., 128.\n\n```\nBip0039::Util.hex_to_padded_bin \"69\", 32\n# => \"00000000000000000000000001101001\"\n```","summary":"<p>A generic utility to generate a padded binary string from a hex string with given size.</p>","abstract":false,"args":[{"name":"hex","doc":null,"default_value":"","external_name":"hex","restriction":"String"},{"name":"size","doc":null,"default_value":"","external_name":"size","restriction":"Int"}],"args_string":"(hex : String, size : Int) : String","args_html":"(hex : String, size : Int) : String","location":{"filename":"src/util.cr","line_number":46,"url":"https://github.com/q9f/bip39.cr/blob/v0.1.0/src/util.cr#L46"},"def":{"name":"hex_to_padded_bin","args":[{"name":"hex","doc":null,"default_value":"","external_name":"hex","restriction":"String"},{"name":"size","doc":null,"default_value":"","external_name":"size","restriction":"Int"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String","visibility":"Public","body":"num = BigInt.new(hex, 16)\nbin = num.to_s(2)\nreturn bin.rjust(size, '0')\n"}},{"html_id":"num_to_padded_bin(num:BigInt|Int,size:Int):String-class-method","name":"num_to_padded_bin","doc":"A generic utility to generate a padded binary string from a big number\nwith given size.\n\nParameters:\n* `num` (`BigInt | Int`): the number to be formatted as padded binary string.\n* `size` (`Int`): the size in bits for the resulting hex string, e.g., 128.\n\n```\nBip0039::Util.num_to_padded_bin 137, 32\n# => \"00000000000000000000000010001001\"\n```","summary":"<p>A generic utility to generate a padded binary string from a big number with given size.</p>","abstract":false,"args":[{"name":"num","doc":null,"default_value":"","external_name":"num","restriction":"BigInt | Int"},{"name":"size","doc":null,"default_value":"","external_name":"size","restriction":"Int"}],"args_string":"(num : BigInt | Int, size : Int) : String","args_html":"(num : BigInt | Int, size : Int) : String","location":{"filename":"src/util.cr","line_number":63,"url":"https://github.com/q9f/bip39.cr/blob/v0.1.0/src/util.cr#L63"},"def":{"name":"num_to_padded_bin","args":[{"name":"num","doc":null,"default_value":"","external_name":"num","restriction":"BigInt | Int"},{"name":"size","doc":null,"default_value":"","external_name":"size","restriction":"Int"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String","visibility":"Public","body":"bin = num.to_s(2)\nreturn bin.rjust(size, '0')\n"}},{"html_id":"num_to_padded_hex(num:BigInt|Int,size:Int):String-class-method","name":"num_to_padded_hex","doc":"A generic utility to generate a padded hex string from a big number\nwith given size.\n\nParameters:\n* `num` (`BigInt | Int`): the number to be formatted as padded hex string.\n* `size` (`Int`): the size in bits for the resulting hex string, e.g., 128.\n\n```\nBip0039::Util.num_to_padded_hex 137, 32\n# => \"00000089\"\n```","summary":"<p>A generic utility to generate a padded hex string from a big number with given size.</p>","abstract":false,"args":[{"name":"num","doc":null,"default_value":"","external_name":"num","restriction":"BigInt | Int"},{"name":"size","doc":null,"default_value":"","external_name":"size","restriction":"Int"}],"args_string":"(num : BigInt | Int, size : Int) : String","args_html":"(num : BigInt | Int, size : Int) : String","location":{"filename":"src/util.cr","line_number":96,"url":"https://github.com/q9f/bip39.cr/blob/v0.1.0/src/util.cr#L96"},"def":{"name":"num_to_padded_hex","args":[{"name":"num","doc":null,"default_value":"","external_name":"num","restriction":"BigInt | Int"},{"name":"size","doc":null,"default_value":"","external_name":"size","restriction":"Int"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String","visibility":"Public","body":"hex = num.to_s(16)\nreturn hex.rjust((size / 4).to_i, '0')\n"}},{"html_id":"word_list:Array(String)-class-method","name":"word_list","doc":"A generic utility to load the standardized english language word list\nfrom file.\n\n```\nBip0039::Util.word_list\n# => [\"abandon\", \"ability\", \"able\", \"about\", \"above\", ...\n```","summary":"<p>A generic utility to load the standardized english language word list from file.</p>","abstract":false,"args":[],"args_string":" : Array(String)","args_html":" : Array(String)","location":{"filename":"src/util.cr","line_number":25,"url":"https://github.com/q9f/bip39.cr/blob/v0.1.0/src/util.cr#L25"},"def":{"name":"word_list","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Array(String)","visibility":"Public","body":"file_path = Path.new(\"dict\", \"english.txt\")\nlist_file = File.read(file_path)\nword_list = [] of String\nlist_file.each_line do |word|\n  word_list << word\nend\nreturn word_list\n"}}],"constructors":[],"instance_methods":[],"macros":[],"types":[]}]}]}})