# Copyright 2021-23 Afri Schoedon @q9f
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

require "big"
require "random"
require "openssl"

require "./util"
require "./version"

# Implements 128/160/192/224/256-bit `BIP-0039` Mnemonics.
# Ref: [bitcoin/bips/bip-0039](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
module Bip0039
  # Implements a `Bip0039` Mnemonic class.
  # Ref: [bitcoin/bips/bip-0039](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
  class Mnemonic
    # The bit-size of the entropy of the mnemonic.
    property ent : Int32

    # The random seed of the mnemonic.
    property seed : BigInt

    # Implements a `Bip0039` Mnemonic with a default 128-bit entropy.
    #
    # ```
    # mnemonic = Bip0039::Mnemonic.new
    # # => #<Bip0039::Mnemonic:0x7f8be5611d80>
    # ```
    def initialize
      @ent = 128
      @seed = generate_random_seed(@seed)
    end

    # Implements a `Bip0039` Mnemonic with a random entropy of ENT bits.
    #
    # Parameters:
    # * `ent` (`Int32`): the bit-size of the random entropy to use (128/160/192/224/256).
    #
    # ```
    # mnemonic = Bip0039::Mnemonic.new 256
    # # => #<Bip0039::Mnemonic:0x7f8be5611d80>
    # ```
    def initialize(ent : Int32 = 128)
      if ent % 32 != 0 || ent < 128 || ent > 256
        raise "Can only generate seeds of 128/160/192/224/256-bit entropy"
      end
      @ent = ent
      @seed = generate_random_seed(ent)
    end

    # Implements a `Bip0039` Mnemonic restored from a hexadecimal seed.
    #
    # Parameters:
    # * `hex` (`String`): the hex-seed to use to generate the mnemonic from.
    #
    # ```
    # mnemonic = Bip0039::Mnemonic.new "9e885d952ad362caebefe34e91bd2"
    # # => #<Bip0039::Mnemonic:0x7f8be5611d80>
    # ```
    def initialize(hex : String)
      if hex.size % 8 != 0 || hex.size < 32 || hex.size > 64
        raise "Can only parse 128/160/192/224/256-bit hex seeds"
      end
      @ent = hex.size * 4
      @seed = BigInt.new hex, 16
    end

    # Implements a `Bip0039` Mnemonic restored from a numeric seed of given size.
    #
    # Parameters:
    # * `seed` (`BigInt`): the numeric seed to use to generate the mnemonic from.
    # * `ent` (`Int32`): the bit-size of the random entropy to use (128/160/192/224/256).
    #
    # ```
    # mnemonic = Bip0039::Mnemonic.new BigInt.new("9e885d952ad362caebefe34e91bd2", 16), 128
    # # => #<Bip0039::Mnemonic:0x7f8be5611d80>
    # ```
    def initialize(seed : BigInt, ent : Int32 = 128)
      if ent % 32 != 0 || ent < 128 || ent > 256
        raise "Can only recover seeds of 128/160/192/224/256-bit entropy"
      end
      @ent = ent
      @seed = seed
    end

    # Implements a `Bip0039` Mnemonic restored from a seed phrase.
    #
    # Parameters:
    # * `phrase` (`Array(String)`): the seed phrase to recover the mnemonic from (12/15/18/21/24 words).
    #
    # ```
    # mnemonic = Bip0039::Mnemonic.new ["ozone", "drill", "grab", "fiber", "curtain", "grace", "pudding", "thank", "cruise", "elder", "eight", "picnic"]
    # # => #<Bip0039::Mnemonic:0x7f8be5611d80>
    # ```
    def initialize(phrase : Array(String))
      raise "Invalid seed phrase: wrong size" if phrase.size < 12 || phrase.size > 24 || phrase.size % 3 != 0

      # Load the english dictionary for BIP-0039.
      dictionary = Util.word_list

      # Get indices for each of the words and compute a checksummed seed.
      checksummed_seed = ""
      phrase.each do |word|
        index = dictionary.index(word)

        # Ensure every word is part of our dictionary.
        raise "Invalid seed phrase: word not in dictionary" if index.nil?
        checksummed_seed += Util.num_to_padded_bin index, 11
      end

      # Retrieve seed and checksum.
      seed_length = (checksummed_seed.size * 32 / 33).to_i
      checksum_length = checksummed_seed.size - seed_length
      seed = checksummed_seed[0, seed_length]
      checksum = checksummed_seed[seed_length, checksum_length]

      # Not every phrase is valid, therefore we verify the checksum bits.
      raise "Invalid seed phrase: checksum mismatch" if checksum != checksum Util.bin_to_padded_hex seed, seed.size

      # Store the seed.
      @ent = seed.size
      @seed = BigInt.new seed, 2
    end

    # Generates a phrase of words according to the `Bip0039` specification
    # based on the used seed.
    #
    # ```
    # Bip0039::Mnemonic.new.to_words
    # # => ["ozone", "drill", "grab", "fiber", "curtain", "grace", "pudding", "thank", "cruise", "elder", "eight", "picnic"]
    # ```
    def to_words : Array(String)
      # A checksum is generated by taking the first ENT / 32 bits of its SHA256 hash.
      seed_hex = Util.num_to_padded_hex @seed, @ent
      checksum_bin = checksum seed_hex

      # This checksum is appended to the end of the initial entropy.
      seed_bin = Util.num_to_padded_bin @seed, @ent
      checksummed_seed = seed_bin + checksum_bin

      # Next, these concatenated bits are split into groups of 11 bits,
      # each encoding a number from 0-2047, serving as an index into a wordlist.
      iterator = 0
      split_size = 11
      word_indices = [] of Int32
      while iterator < checksummed_seed.size
        word_indices << checksummed_seed[iterator, split_size].to_i(2)
        iterator += split_size
      end

      # Finally, we convert these numbers into words and use the joined words
      # as a mnemonic sentence.
      word_list = Util.word_list
      phrase = [] of String
      word_indices.each do |index|
        phrase << word_list[index]
      end
      return phrase
    end

    # Generates a padded hex string containing the seed of the size of ENT bits.
    #
    # ```
    # Bip0039::Mnemonic.new.to_hex
    # # => "9e885d952ad362caeb4efe34a8e91bd2"
    # ```
    def to_hex : String
      return Util.num_to_padded_hex @seed, @ent
    end

    # Extracts the first N SHA256-checksum bits from a given hexadecimal seed.
    #
    # Parameters:
    # * `hex` (`String`): the seed to be checksummed.
    private def checksum(hex : String) : String
      sha256sum_hex = OpenSSL::Digest.new("SHA256").update(hex.hexbytes).final.hexstring
      sha256sum_bin = Util.hex_to_padded_bin sha256sum_hex, 256
      checksum_length = (hex.size / 8).to_i
      return sha256sum_bin[0, checksum_length]
    end

    # Generates a random seed of ENT bits of entropy.
    #
    # Parameters:
    # * `ent` (`Int32`): the bit-size of the random entropy to use (128/160/192/224/256).
    private def generate_random_seed(ent : Int32) : BigInt
      raise "Invalid entropy provided" if ent % 32 != 0
      seed = Random::Secure.hex (ent / 8).to_i
      return BigInt.new seed, 16
    end
  end
end
