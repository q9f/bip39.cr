var data = {lines:[
{"lineNum":"    1","line":"# Copyright 2019-2020 @q9f"},
{"lineNum":"    2","line":"#"},
{"lineNum":"    3","line":"# Licensed under the Apache License, Version 2.0 (the \"License\");"},
{"lineNum":"    4","line":"# you may not use this file except in compliance with the License."},
{"lineNum":"    5","line":"# You may obtain a copy of the License at"},
{"lineNum":"    6","line":"#"},
{"lineNum":"    7","line":"#     http://www.apache.org/licenses/LICENSE-2.0"},
{"lineNum":"    8","line":"#"},
{"lineNum":"    9","line":"# Unless required by applicable law or agreed to in writing, software"},
{"lineNum":"   10","line":"# distributed under the License is distributed on an \"AS IS\" BASIS,"},
{"lineNum":"   11","line":"# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied."},
{"lineNum":"   12","line":"# See the License for the specific language governing permissions and"},
{"lineNum":"   13","line":"# limitations under the License."},
{"lineNum":"   14","line":""},
{"lineNum":"   15","line":"# Implements 256-bit `Secp256k1` Koblitz elliptic curve."},
{"lineNum":"   16","line":"# Ref: [secg.org/sec2-v2.pdf](https://www.secg.org/sec2-v2.pdf)"},
{"lineNum":"   17","line":"#"},
{"lineNum":"   18","line":"# `Secp256k1` has the characteristic prime `p`, it is defined over the prime field ℤ_p."},
{"lineNum":"   19","line":"# Ref: [en.bitcoin.it/wiki/Secp256k1](https://en.bitcoin.it/wiki/Secp256k1)"},
{"lineNum":"   20","line":"module Secp256k1::Core"},
{"lineNum":"   21","line":"  # Computes the elliptic curve modular multiplicative inverse of `a`."},
{"lineNum":"   22","line":"  #"},
{"lineNum":"   23","line":"  # Paremeters:"},
{"lineNum":"   24","line":"  # * `a` (`BigInt`): the integer that we want the modular inverse of."},
{"lineNum":"   25","line":"  # * `prime` (`BigInt`): the prime number that shapes the field, default: `EC_PRIME_P`."},
{"lineNum":"   26","line":"  #"},
{"lineNum":"   27","line":"  # Returns a `BigInt` value as result."},
{"lineNum":"   28","line":"  def self.ec_mod_inv(a : BigInt, prime = EC_PRIME_P)","class":"lineCov","hits":"4","order":"42","possible_hits":"4",},
{"lineNum":"   29","line":"    m_low = 1","class":"lineCov","hits":"1","order":"43","possible_hits":"1",},
{"lineNum":"   30","line":"    m_high = 0","class":"lineCov","hits":"1","order":"44","possible_hits":"1",},
{"lineNum":"   31","line":"    v_low = a % prime","class":"lineCov","hits":"1","order":"45","possible_hits":"1",},
{"lineNum":"   32","line":"    v_high = prime","class":"lineCov","hits":"1","order":"46","possible_hits":"1",},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"    while v_low > 1","class":"lineCov","hits":"1","order":"47","possible_hits":"1",},
{"lineNum":"   35","line":"      v_ratio = v_high // v_low","class":"lineCov","hits":"2","order":"48","possible_hits":"2",},
{"lineNum":"   36","line":"      m_low_r = m_low * v_ratio","class":"lineCov","hits":"2","order":"49","possible_hits":"2",},
{"lineNum":"   37","line":"      v_low_r = v_low * v_ratio","class":"lineCov","hits":"2","order":"50","possible_hits":"2",},
{"lineNum":"   38","line":"      m = m_high - m_low_r","class":"lineCov","hits":"2","order":"51","possible_hits":"2",},
{"lineNum":"   39","line":"      v = v_high - v_low_r","class":"lineCov","hits":"1","order":"52","possible_hits":"1",},
{"lineNum":"   40","line":"      m_high = m_low","class":"lineCov","hits":"1","order":"53","possible_hits":"1",},
{"lineNum":"   41","line":"      v_high = v_low","class":"lineCov","hits":"1","order":"54","possible_hits":"1",},
{"lineNum":"   42","line":"      m_low = m","class":"lineCov","hits":"1","order":"55","possible_hits":"1",},
{"lineNum":"   43","line":"      v_low = v","class":"lineCov","hits":"3","order":"56","possible_hits":"3",},
{"lineNum":"   44","line":"    end"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"    m_low % prime","class":"lineCov","hits":"1","order":"57","possible_hits":"1",},
{"lineNum":"   47","line":"  end"},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"  # The elliptic curve jive addition of point `p(x, y)` and `q(x, y)`."},
{"lineNum":"   50","line":"  #"},
{"lineNum":"   51","line":"  # We basically _draw_ a line between `p` and `q` which will intersect the"},
{"lineNum":"   52","line":"  # curve in the point `r` which will be mirrored over the `x`-axis."},
{"lineNum":"   53","line":"  #"},
{"lineNum":"   54","line":"  # Paramters:"},
{"lineNum":"   55","line":"  # * `p` (`ECPoint`): the point `p(x, y)` to be used in the jive addition."},
{"lineNum":"   56","line":"  # * `q` (`ECPoint`): the point `q(x, y)` to be used in the jive addition."},
{"lineNum":"   57","line":"  # * `prime` (`BigInt`): the prime number that shapes the field, default: `EC_PRIME_P`."},
{"lineNum":"   58","line":"  #"},
{"lineNum":"   59","line":"  # Returns another `ECPoint` as result."},
{"lineNum":"   60","line":"  def self.ec_add(p : ECPoint, q : ECPoint, prime = EC_PRIME_P)","class":"lineCov","hits":"4","order":"65","possible_hits":"4",},
{"lineNum":"   61","line":"    x_delta = q.x - p.x","class":"lineCov","hits":"1","order":"66","possible_hits":"1",},
{"lineNum":"   62","line":"    x_inv = ec_mod_inv x_delta","class":"lineCov","hits":"1","order":"67","possible_hits":"1",},
{"lineNum":"   63","line":"    y_delta = q.y - p.y","class":"lineCov","hits":"1","order":"68","possible_hits":"1",},
{"lineNum":"   64","line":"    m = (y_delta * x_inv) % prime","class":"lineCov","hits":"1","order":"69","possible_hits":"1",},
{"lineNum":"   65","line":"    x = (m * m - p.x - q.x) % prime","class":"lineCov","hits":"1","order":"70","possible_hits":"1",},
{"lineNum":"   66","line":"    y = (m * (p.x - x) - p.y) % prime","class":"lineCov","hits":"1","order":"71","possible_hits":"1",},
{"lineNum":"   67","line":"    x = BigInt.new x","class":"lineCov","hits":"1","order":"72","possible_hits":"1",},
{"lineNum":"   68","line":"    y = BigInt.new y","class":"lineCov","hits":"1","order":"73","possible_hits":"1",},
{"lineNum":"   69","line":"    ECPoint.new x, y","class":"lineCov","hits":"1","order":"74","possible_hits":"1",},
{"lineNum":"   70","line":"  end"},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"  # The elliptic curve juke point doubling of `p(x, y)`."},
{"lineNum":"   73","line":"  #"},
{"lineNum":"   74","line":"  # This is a special case of addition where both points are the same."},
{"lineNum":"   75","line":"  # We _draw_ a tangent line at `p` which will intersect the curve"},
{"lineNum":"   76","line":"  # at point `r` which will be mirrored over the `x`-axis."},
{"lineNum":"   77","line":"  #"},
{"lineNum":"   78","line":"  # Paramters:"},
{"lineNum":"   79","line":"  # * `p` (`ECPoint`): the point `p(x, y)` to be used in the juke doubling."},
{"lineNum":"   80","line":"  # * `prime` (`BigInt`): the prime number that shapes the field, default: `EC_PRIME_P`."},
{"lineNum":"   81","line":"  #"},
{"lineNum":"   82","line":"  # Returns another `ECPoint` as result."},
{"lineNum":"   83","line":"  def self.ec_double(p : ECPoint, prime = EC_PRIME_P)","class":"lineCov","hits":"4","order":"38","possible_hits":"4",},
{"lineNum":"   84","line":"    lam_numer = 3 * p.x * p.x + EC_FACTOR_A","class":"lineCov","hits":"1","order":"39","possible_hits":"1",},
{"lineNum":"   85","line":"    lam_denom = 2 * p.y","class":"lineCov","hits":"1","order":"40","possible_hits":"1",},
{"lineNum":"   86","line":"    lam_inv = ec_mod_inv lam_denom","class":"lineCov","hits":"1","order":"41","possible_hits":"1",},
{"lineNum":"   87","line":"    lam = (lam_numer * lam_inv) % prime","class":"lineCov","hits":"1","order":"58","possible_hits":"1",},
{"lineNum":"   88","line":"    x = (lam * lam - 2 * p.x) % prime","class":"lineCov","hits":"1","order":"59","possible_hits":"1",},
{"lineNum":"   89","line":"    y = (lam * (p.x - x) - p.y) % prime","class":"lineCov","hits":"1","order":"60","possible_hits":"1",},
{"lineNum":"   90","line":"    x = BigInt.new x","class":"lineCov","hits":"1","order":"61","possible_hits":"1",},
{"lineNum":"   91","line":"    y = BigInt.new y","class":"lineCov","hits":"1","order":"62","possible_hits":"1",},
{"lineNum":"   92","line":"    ECPoint.new x, y","class":"lineCov","hits":"1","order":"63","possible_hits":"1",},
{"lineNum":"   93","line":"  end"},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"  # The elliptic curve sequence multiplication of point `p(x, y)` and"},
{"lineNum":"   96","line":"  # a skalar `s`."},
{"lineNum":"   97","line":"  #"},
{"lineNum":"   98","line":"  # With `s` being a private key within the elliptic curve field size of `EC_ORDER_N`."},
{"lineNum":"   99","line":"  #"},
{"lineNum":"  100","line":"  # Paramters:"},
{"lineNum":"  101","line":"  # * `p` (`ECPoint`): the point `p(x, y)` to be used in the sequencing."},
{"lineNum":"  102","line":"  # * `s` (`BigInt`): a skalar, in most cases a private key."},
{"lineNum":"  103","line":"  #"},
{"lineNum":"  104","line":"  # Returns another `ECPoint` as result, in most cases a public key."},
{"lineNum":"  105","line":"  def self.ec_mul(p : ECPoint, s : BigInt)","class":"lineCov","hits":"2","order":"31","possible_hits":"2",},
{"lineNum":"  106","line":"    # catch skalars outside of the ec field size and exit"},
{"lineNum":"  107","line":"    if s === 0 || s >= EC_ORDER_N","class":"lineCov","hits":"2","order":"32","possible_hits":"2",},
{"lineNum":"  108","line":"      raise \"invalid private key: outside of ec field size.\"","class":"lineCov","hits":"1","order":"304","possible_hits":"1",},
{"lineNum":"  109","line":"    end"},
{"lineNum":"  110","line":"    s_bin = s.to_s 2","class":"lineCov","hits":"1","order":"33","possible_hits":"1",},
{"lineNum":"  111","line":"    q = p","class":"lineCov","hits":"1","order":"34","possible_hits":"1",},
{"lineNum":"  112","line":"    s_bin.each_char_with_index do |char, index|"},
{"lineNum":"  113","line":"      next if index === 0","class":"linePartCov","hits":"1","order":"35","possible_hits":"3",},
{"lineNum":"  114","line":"      q = ec_double q","class":"linePartCov","hits":"1","order":"37","possible_hits":"2",},
{"lineNum":"  115","line":"      if char === \'1\'","class":"linePartCov","hits":"2","order":"64","possible_hits":"4",},
{"lineNum":"  116","line":"        q = ec_add q, p","class":"linePartCov","hits":"2","order":"36","possible_hits":"4",},
{"lineNum":"  117","line":"      end"},
{"lineNum":"  118","line":"    end"},
{"lineNum":"  119","line":"    q"},
{"lineNum":"  120","line":"  end"},
{"lineNum":"  121","line":"end"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "run_coverage", "date" : "2021-09-29 14:42:48", "instrumented" : 45, "covered" : 45,};
var merged_data = [];
