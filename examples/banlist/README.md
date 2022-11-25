# Banlist example

This is an example of verifying a circuit, which proves that provided country code string is not in the list of banned country codes.

At the time of proof creation, the following arguments were supplied:
- a country code "NL" as big-endian bits of ASCII characters
- a secret as 128 bits
- banlist string "USIRRU" as big-endian bits of ASCII characters
- Pedersen hash of country code + secret, as 2 BigIntegers

To verify a proof, you supply only the following inputs (serialized into `public_inputs.json`):
- Pedersen hash of country code + secret
- banlist string
