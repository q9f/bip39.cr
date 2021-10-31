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

describe Bip0039::Mnemonic do
  describe "#new" do
    it "should raise an error if a non 32 bit argument is supplied" do
      expect_raises(Exception, "Can only generate seeds of 128/160/192/224/256-bit entropy") do
        Bip0039::Mnemonic.new(7)
      end
    end
    it "should raise an error if a non 32 bit hex string is supplied" do
      expect_raises(Exception, "Can only parse 128/160/192/224/256-bit hex seeds") do
        Bip0039::Mnemonic.new("9e885d952ad362caebefe34e91bd2")
      end
    end
    it "should raise an error if a non 32 bit big number is supplied" do
      expect_raises(Exception, "Can only recover seeds of 128/160/192/224/256-bit entropy") do
        Bip0039::Mnemonic.new(BigInt.new(3), 7)
      end
    end
    it "should raise an error if phrase is invalid" do
      expect_raises(Exception, "Invalid seed phrase: wrong size") do
        Bip0039::Mnemonic.new(["mad", "find", "cup", "either"])
      end
      expect_raises(Exception, "Invalid seed phrase: word not in dictionary") do
        Bip0039::Mnemonic.new(["lorem", "ipsum", "cup", "palace", "exile", "pelican", "impose", "tissue", "media", "destroy", "cotton", "either"])
      end
      expect_raises(Exception, "Invalid seed phrase: checksum mismatch") do
        Bip0039::Mnemonic.new(["mad", "find", "cup", "palace", "exile", "pelican", "impose", "tissue", "media", "either", "cotton", "destroy"])
      end
    end
    it "should accept a big number of given entropy as a seed" do
      ent = 128
      b = Bip0039::Mnemonic.new(Bip0039::Mnemonic.new(ent).seed, ent)
      b.to_words.size.should eq(12)
      b.ent.should eq(ent)
    end
    it "should have 128 as default" do
      b = Bip0039::Mnemonic.new
      b.to_words.size.should eq(12)
      b.ent.should eq(128)
    end
    it "should make seeds of the correct length" do
      Bip0039::Mnemonic.new(128).to_hex.size.should eq(32)
      Bip0039::Mnemonic.new(160).to_hex.size.should eq(40)
      Bip0039::Mnemonic.new(192).to_hex.size.should eq(48)
      Bip0039::Mnemonic.new(224).to_hex.size.should eq(56)
      Bip0039::Mnemonic.new(256).to_hex.size.should eq(64)
    end
  end

  describe "#to_words" do
    it "should generate a word list" do
      Bip0039::Mnemonic.new.to_words.size.should eq(12)
    end

    it "should make phrases of the correct length" do
      Bip0039::Mnemonic.new(128).to_words.size.should eq(12)
      Bip0039::Mnemonic.new(160).to_words.size.should eq(15)
      Bip0039::Mnemonic.new(192).to_words.size.should eq(18)
      Bip0039::Mnemonic.new(224).to_words.size.should eq(21)
      Bip0039::Mnemonic.new(256).to_words.size.should eq(24)
    end

   it "it should recover bip0039 from words" do
     Bip0039::Mnemonic.new(Bip0039::Mnemonic.new.to_words).to_hex.size.should eq(32)
   end
  end

  describe "#to_hex" do
    it "should generate a hex string" do
      Bip0039::Mnemonic.new.to_hex.size.should eq(32)
    end

    it "should recover bip0039 from hex" do
      Bip0039::Mnemonic.new(Bip0039::Mnemonic.new.to_hex).to_hex.size.should eq(32)
    end
  end

  describe "functional tests" do
    it "should return deterministic results" do
      words = ["mad", "find", "cup", "palace", "exile", "pelican", "impose", "tissue", "media", "destroy", "cotton", "either"]
      hex = "85aad4d6cf94fb449c7f168a6784c323"
      m0 = Bip0039::Mnemonic.new(words)
      m0.to_hex.should eq(hex)
      m1 = Bip0039::Mnemonic.new(hex)
      m1.to_words.should eq(words)
    end
  end

  describe "bip0039 test vectors" do
    # see https://github.com/trezor/python-mnemonic/blob/master/vectors.json
    it "should pass case 00000000000000000000000000000000" do
      Bip0039::Mnemonic.new("00000000000000000000000000000000").to_words.should eq ["abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","about"]
      Bip0039::Mnemonic.new(["abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","about"]).to_hex.should eq "00000000000000000000000000000000"
    end
    it "should pass case 7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f" do
      Bip0039::Mnemonic.new("7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f").to_words.should eq ["legal","winner","thank","year","wave","sausage","worth","useful","legal","winner","thank","yellow"]
      Bip0039::Mnemonic.new(["legal","winner","thank","year","wave","sausage","worth","useful","legal","winner","thank","yellow"]).to_hex.should eq "7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f"
    end
    it "should pass case 80808080808080808080808080808080" do
      Bip0039::Mnemonic.new("80808080808080808080808080808080").to_words.should eq ["letter","advice","cage","absurd","amount","doctor","acoustic","avoid","letter","advice","cage","above"]
      Bip0039::Mnemonic.new(["letter","advice","cage","absurd","amount","doctor","acoustic","avoid","letter","advice","cage","above"]).to_hex.should eq "80808080808080808080808080808080"
    end
    it "should pass case ffffffffffffffffffffffffffffffff" do
      Bip0039::Mnemonic.new("ffffffffffffffffffffffffffffffff").to_words.should eq ["zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","wrong"]
      Bip0039::Mnemonic.new(["zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","wrong"]).to_hex.should eq "ffffffffffffffffffffffffffffffff"
    end
    it "should pass case 000000000000000000000000000000000000000000000000" do
      Bip0039::Mnemonic.new("000000000000000000000000000000000000000000000000").to_words.should eq ["abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","agent"]
      Bip0039::Mnemonic.new(["abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","agent"]).to_hex.should eq "000000000000000000000000000000000000000000000000"
    end
    it "should pass case 7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f" do
      Bip0039::Mnemonic.new("7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f").to_words.should eq ["legal","winner","thank","year","wave","sausage","worth","useful","legal","winner","thank","year","wave","sausage","worth","useful","legal","will"]
      Bip0039::Mnemonic.new(["legal","winner","thank","year","wave","sausage","worth","useful","legal","winner","thank","year","wave","sausage","worth","useful","legal","will"]).to_hex.should eq "7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f"
    end
    it "should pass case 808080808080808080808080808080808080808080808080" do
      Bip0039::Mnemonic.new("808080808080808080808080808080808080808080808080").to_words.should eq ["letter","advice","cage","absurd","amount","doctor","acoustic","avoid","letter","advice","cage","absurd","amount","doctor","acoustic","avoid","letter","always"]
      Bip0039::Mnemonic.new(["letter","advice","cage","absurd","amount","doctor","acoustic","avoid","letter","advice","cage","absurd","amount","doctor","acoustic","avoid","letter","always"]).to_hex.should eq "808080808080808080808080808080808080808080808080"
    end
    it "should pass case ffffffffffffffffffffffffffffffffffffffffffffffff" do
      Bip0039::Mnemonic.new("ffffffffffffffffffffffffffffffffffffffffffffffff").to_words.should eq ["zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","when"]
      Bip0039::Mnemonic.new(["zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","when"]).to_hex.should eq "ffffffffffffffffffffffffffffffffffffffffffffffff"
    end
    it "should pass case 0000000000000000000000000000000000000000000000000000000000000000" do
      Bip0039::Mnemonic.new("0000000000000000000000000000000000000000000000000000000000000000").to_words.should eq ["abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","art"]
      Bip0039::Mnemonic.new(["abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","abandon","art"]).to_hex.should eq "0000000000000000000000000000000000000000000000000000000000000000"
    end
    it "should pass case 7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f" do
      Bip0039::Mnemonic.new("7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f").to_words.should eq ["legal","winner","thank","year","wave","sausage","worth","useful","legal","winner","thank","year","wave","sausage","worth","useful","legal","winner","thank","year","wave","sausage","worth","title"]
      Bip0039::Mnemonic.new(["legal","winner","thank","year","wave","sausage","worth","useful","legal","winner","thank","year","wave","sausage","worth","useful","legal","winner","thank","year","wave","sausage","worth","title"]).to_hex.should eq "7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f"
    end
    it "should pass case 8080808080808080808080808080808080808080808080808080808080808080" do
      Bip0039::Mnemonic.new("8080808080808080808080808080808080808080808080808080808080808080").to_words.should eq ["letter","advice","cage","absurd","amount","doctor","acoustic","avoid","letter","advice","cage","absurd","amount","doctor","acoustic","avoid","letter","advice","cage","absurd","amount","doctor","acoustic","bless"]
      Bip0039::Mnemonic.new(["letter","advice","cage","absurd","amount","doctor","acoustic","avoid","letter","advice","cage","absurd","amount","doctor","acoustic","avoid","letter","advice","cage","absurd","amount","doctor","acoustic","bless"]).to_hex.should eq "8080808080808080808080808080808080808080808080808080808080808080"
    end
    it "should pass case ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" do
      Bip0039::Mnemonic.new("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").to_words.should eq ["zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","vote"]
      Bip0039::Mnemonic.new(["zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","zoo","vote"]).to_hex.should eq "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    end
    it "should pass case 9e885d952ad362caeb4efe34a8e91bd2" do
      Bip0039::Mnemonic.new("9e885d952ad362caeb4efe34a8e91bd2").to_words.should eq ["ozone","drill","grab","fiber","curtain","grace","pudding","thank","cruise","elder","eight","picnic"]
      Bip0039::Mnemonic.new(["ozone","drill","grab","fiber","curtain","grace","pudding","thank","cruise","elder","eight","picnic"]).to_hex.should eq "9e885d952ad362caeb4efe34a8e91bd2"
    end
    it "should pass case 6610b25967cdcca9d59875f5cb50b0ea75433311869e930b" do
      Bip0039::Mnemonic.new("6610b25967cdcca9d59875f5cb50b0ea75433311869e930b").to_words.should eq ["gravity","machine","north","sort","system","female","filter","attitude","volume","fold","club","stay","feature","office","ecology","stable","narrow","fog"]
      Bip0039::Mnemonic.new(["gravity","machine","north","sort","system","female","filter","attitude","volume","fold","club","stay","feature","office","ecology","stable","narrow","fog"]).to_hex.should eq "6610b25967cdcca9d59875f5cb50b0ea75433311869e930b"
    end
    it "should pass case 68a79eaca2324873eacc50cb9c6eca8cc68ea5d936f98787c60c7ebc74e6ce7c" do
      Bip0039::Mnemonic.new("68a79eaca2324873eacc50cb9c6eca8cc68ea5d936f98787c60c7ebc74e6ce7c").to_words.should eq ["hamster","diagram","private","dutch","cause","delay","private","meat","slide","toddler","razor","book","happy","fancy","gospel","tennis","maple","dilemma","loan","word","shrug","inflict","delay","length"]
      Bip0039::Mnemonic.new(["hamster","diagram","private","dutch","cause","delay","private","meat","slide","toddler","razor","book","happy","fancy","gospel","tennis","maple","dilemma","loan","word","shrug","inflict","delay","length"]).to_hex.should eq "68a79eaca2324873eacc50cb9c6eca8cc68ea5d936f98787c60c7ebc74e6ce7c"
    end
    it "should pass case c0ba5a8e914111210f2bd131f3d5e08d" do
      Bip0039::Mnemonic.new("c0ba5a8e914111210f2bd131f3d5e08d").to_words.should eq ["scheme","spot","photo","card","baby","mountain","device","kick","cradle","pact","join","borrow"]
      Bip0039::Mnemonic.new(["scheme","spot","photo","card","baby","mountain","device","kick","cradle","pact","join","borrow"]).to_hex.should eq "c0ba5a8e914111210f2bd131f3d5e08d"
    end
    it "should pass case 6d9be1ee6ebd27a258115aad99b7317b9c8d28b6d76431c3" do
      Bip0039::Mnemonic.new("6d9be1ee6ebd27a258115aad99b7317b9c8d28b6d76431c3").to_words.should eq ["horn","tenant","knee","talent","sponsor","spell","gate","clip","pulse","soap","slush","warm","silver","nephew","swap","uncle","crack","brave"]
      Bip0039::Mnemonic.new(["horn","tenant","knee","talent","sponsor","spell","gate","clip","pulse","soap","slush","warm","silver","nephew","swap","uncle","crack","brave"]).to_hex.should eq "6d9be1ee6ebd27a258115aad99b7317b9c8d28b6d76431c3"
    end
    it "should pass case 9f6a2878b2520799a44ef18bc7df394e7061a224d2c33cd015b157d746869863" do
      Bip0039::Mnemonic.new("9f6a2878b2520799a44ef18bc7df394e7061a224d2c33cd015b157d746869863").to_words.should eq ["panda","eyebrow","bullet","gorilla","call","smoke","muffin","taste","mesh","discover","soft","ostrich","alcohol","speed","nation","flash","devote","level","hobby","quick","inner","drive","ghost","inside"]
      Bip0039::Mnemonic.new(["panda","eyebrow","bullet","gorilla","call","smoke","muffin","taste","mesh","discover","soft","ostrich","alcohol","speed","nation","flash","devote","level","hobby","quick","inner","drive","ghost","inside"]).to_hex.should eq "9f6a2878b2520799a44ef18bc7df394e7061a224d2c33cd015b157d746869863"
    end
    it "should pass case 23db8160a31d3e0dca3688ed941adbf3" do
      Bip0039::Mnemonic.new("23db8160a31d3e0dca3688ed941adbf3").to_words.should eq ["cat","swing","flag","economy","stadium","alone","churn","speed","unique","patch","report","train"]
      Bip0039::Mnemonic.new(["cat","swing","flag","economy","stadium","alone","churn","speed","unique","patch","report","train"]).to_hex.should eq "23db8160a31d3e0dca3688ed941adbf3"
    end
    it "should pass case 8197a4a47f0425faeaa69deebc05ca29c0a5b5cc76ceacc0" do
      Bip0039::Mnemonic.new("8197a4a47f0425faeaa69deebc05ca29c0a5b5cc76ceacc0").to_words.should eq ["light","rule","cinnamon","wrap","drastic","word","pride","squirrel","upgrade","then","income","fatal","apart","sustain","crack","supply","proud","access"]
      Bip0039::Mnemonic.new(["light","rule","cinnamon","wrap","drastic","word","pride","squirrel","upgrade","then","income","fatal","apart","sustain","crack","supply","proud","access"]).to_hex.should eq "8197a4a47f0425faeaa69deebc05ca29c0a5b5cc76ceacc0"
    end
    it "should pass case 066dca1a2bb7e8a1db2832148ce9933eea0f3ac9548d793112d9a95c9407efad" do
      Bip0039::Mnemonic.new("066dca1a2bb7e8a1db2832148ce9933eea0f3ac9548d793112d9a95c9407efad").to_words.should eq ["all","hour","make","first","leader","extend","hole","alien","behind","guard","gospel","lava","path","output","census","museum","junior","mass","reopen","famous","sing","advance","salt","reform"]
      Bip0039::Mnemonic.new(["all","hour","make","first","leader","extend","hole","alien","behind","guard","gospel","lava","path","output","census","museum","junior","mass","reopen","famous","sing","advance","salt","reform"]).to_hex.should eq "066dca1a2bb7e8a1db2832148ce9933eea0f3ac9548d793112d9a95c9407efad"
    end
    it "should pass case f30f8c1da665478f49b001d94c5fc452" do
      Bip0039::Mnemonic.new("f30f8c1da665478f49b001d94c5fc452").to_words.should eq ["vessel","ladder","alter","error","federal","sibling","chat","ability","sun","glass","valve","picture"]
      Bip0039::Mnemonic.new(["vessel","ladder","alter","error","federal","sibling","chat","ability","sun","glass","valve","picture"]).to_hex.should eq "f30f8c1da665478f49b001d94c5fc452"
    end
    it "should pass case c10ec20dc3cd9f652c7fac2f1230f7a3c828389a14392f05" do
      Bip0039::Mnemonic.new("c10ec20dc3cd9f652c7fac2f1230f7a3c828389a14392f05").to_words.should eq ["scissors","invite","lock","maple","supreme","raw","rapid","void","congress","muscle","digital","elegant","little","brisk","hair","mango","congress","clump"]
      Bip0039::Mnemonic.new(["scissors","invite","lock","maple","supreme","raw","rapid","void","congress","muscle","digital","elegant","little","brisk","hair","mango","congress","clump"]).to_hex.should eq "c10ec20dc3cd9f652c7fac2f1230f7a3c828389a14392f05"
    end
    it "should pass case f585c11aec520db57dd353c69554b21a89b20fb0650966fa0a9d6f74fd989d8f" do
      Bip0039::Mnemonic.new("f585c11aec520db57dd353c69554b21a89b20fb0650966fa0a9d6f74fd989d8f").to_words.should eq ["void","come","effort","suffer","camp","survey","warrior","heavy","shoot","primary","clutch","crush","open","amazing","screen","patrol","group","space","point","ten","exist","slush","involve","unfold"]
      Bip0039::Mnemonic.new(["void","come","effort","suffer","camp","survey","warrior","heavy","shoot","primary","clutch","crush","open","amazing","screen","patrol","group","space","point","ten","exist","slush","involve","unfold"]).to_hex.should eq "f585c11aec520db57dd353c69554b21a89b20fb0650966fa0a9d6f74fd989d8f"
    end
  end
end
