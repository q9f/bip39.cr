# Copyright 2021-2022 Afri Schoedon
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
  describe "#bip0039_word_list" do
    it "should return some english words from bip-0039 wordlist" do
      Util.bip0039_word_list.first.should eq "abandon"
      Util.bip0039_word_list[854].should eq "hello"
      Util.bip0039_word_list[2029].should eq "world"
      Util.bip0039_word_list.last.should eq "zoo"
    end
  end
end
