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

require "./spec_helper"

include Bip0039

describe Bip0039::Util do
  describe "word list dictionaries" do
    it "should return some english words from bip-0039 wordlist" do
      Util.word_list.first.should eq "abandon"
      Util.word_list[854].should eq "hello"
      Util.word_list[2029].should eq "world"
      Util.word_list.last.should eq "zoo"
    end
  end

  describe "padded string conversion" do
    it "should convert hex strings to n-bit padded binary strings" do
      Util.hex_to_padded_bin("1", 8).should eq("00000001")
      Util.hex_to_padded_bin("9e885d952ad362caebefe34e91bd2", 128).should eq("00000000000010011110100010000101110110010101001010101101001101100010110010101110101111101111111000110100111010010001101111010010")
    end
    it "should convert any number to n-bit padded binary strings" do
      Util.num_to_padded_bin(1, 8).should eq("00000001")
      Util.num_to_padded_bin(BigInt.new("9e885d952ad362caebefe34e91bd2", 16), 160).should eq("0000000000000000000000000000000000000000000010011110100010000101110110010101001010101101001101100010110010101110101111101111111000110100111010010001101111010010")
    end
    it "should convert binary strings to n-bit padded hex strings" do
      Util.bin_to_padded_hex("1", 8).should eq("01")
      Util.bin_to_padded_hex("00000000000010011110100010000101110110010101001010101101001101100010110010101110101111101111111000110100111010010001101111010010", 8).should eq("9e885d952ad362caebefe34e91bd2")
    end
    it "should convert any number to n-bit padded hex strings" do
      Util.num_to_padded_hex(1, 8).should eq("01")
      Util.num_to_padded_hex(BigInt.new("9e885d952ad362caebefe34e91bd2", 16), 256).should eq("000000000000000000000000000000000009e885d952ad362caebefe34e91bd2")
    end
  end
end
