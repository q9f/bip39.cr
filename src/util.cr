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

module Bip0039
  class Util
    # reads the bip-39 english wordlist from file
    def self.bip0039_word_list : Array(String)
      file_path = Path.new("dict", "english.txt")
      list_file = File.read(file_path)
      word_list = [] of String
      list_file.each_line do |word|
        word_list << word
      end
      return word_list
    end

    # generates a padded binary string from hex with given size
    def self.hex_to_padded_bin(hex : String, size : Int) : String
      num = BigInt.new hex, 16
      bin = num.to_s(2)
      return bin.rjust size, '0'
    end

    # generates a padded binary string from a big number with given size
    def self.num_to_padded_bin(num : BigInt | Int, size : Int) : String
      bin = num.to_s(2)
      return bin.rjust size, '0'
    end

    # generates a padded hex string from a binary string with given size
    def self.bin_to_padded_hex(bin : String, size : Int) : String
      num = BigInt.new bin, 2
      hex = num.to_s(16)
      return hex.rjust (size / 4).to_i, '0'
    end

    # generates a padded hex string from a big number with given size
    def self.num_to_padded_hex(num : BigInt | Int, size : Int) : String
      hex = num.to_s(16)
      return hex.rjust (size / 4).to_i, '0'
    end
  end
end
