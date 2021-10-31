# Copyright 2021-2022 Afr Schoe
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

# A collection of utilities for `Bip0039` mnemonic management, e.g.,
# loading word lists from dictionaries, or n-bit padding operations.
module Bip0039::Util
  # A generic utility to load the standardized english language word list
  # from file.
  #
  # ```
  # Bip0039::Util.word_list
  # # => ["abandon", "ability", "able", "about", "above", ...
  # ```
  def self.word_list : Array(String)
    file_path = Path.new("dict", "english.txt")
    list_file = File.read(file_path)
    word_list = [] of String
    list_file.each_line do |word|
      word_list << word
    end
    return word_list
  end

  # A generic utility to generate a padded binary string from a hex string
  # with given size.
  #
  # Parameters:
  # * `hex` (`String`): the hex string to be formatted as padded binary string.
  # * `size` (`Int`): the size in bits for the resulting hex string, e.g., 128.
  #
  # ```
  # Bip0039::Util.hex_to_padded_bin "69", 32
  # # => "00000000000000000000000001101001"
  # ```
  def self.hex_to_padded_bin(hex : String, size : Int) : String
    num = BigInt.new hex, 16
    bin = num.to_s(2)
    return bin.rjust size, '0'
  end

  # A generic utility to generate a padded binary string from a big number
  # with given size.
  #
  # Parameters:
  # * `num` (`BigInt | Int`): the number to be formatted as padded binary string.
  # * `size` (`Int`): the size in bits for the resulting hex string, e.g., 128.
  #
  # ```
  # Bip0039::Util.num_to_padded_bin 137, 32
  # # => "00000000000000000000000010001001"
  # ```
  def self.num_to_padded_bin(num : BigInt | Int, size : Int) : String
    bin = num.to_s(2)
    return bin.rjust size, '0'
  end

  # A generic utility to generate a padded hex string from a binary string
  # with given size.
  #
  # Parameters:
  # * `bin` (`String`): the binary string to be formatted as padded hex string.
  # * `size` (`Int`): the size in bits for the resulting hex string, e.g., 128.
  #
  # ```
  # Bip0039::Util.bin_to_padded_hex "1100101", 32
  # # => "00000065"
  # ```
  def self.bin_to_padded_hex(bin : String, size : Int) : String
    num = BigInt.new bin, 2
    hex = num.to_s(16)
    return hex.rjust (size / 4).to_i, '0'
  end

  # A generic utility to generate a padded hex string from a big number
  # with given size.
  #
  # Parameters:
  # * `num` (`BigInt | Int`): the number to be formatted as padded hex string.
  # * `size` (`Int`): the size in bits for the resulting hex string, e.g., 128.
  #
  # ```
  # Bip0039::Util.num_to_padded_hex 137, 32
  # # => "00000089"
  # ```
  def self.num_to_padded_hex(num : BigInt | Int, size : Int) : String
    hex = num.to_s(16)
    return hex.rjust (size / 4).to_i, '0'
  end
end
