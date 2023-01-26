# Nostr NIP-05 Verification Server
 
Node application to handle Nostr NIP-05 verification requests.

NIP-05 of the Nostr protocol allows to map "Nostr keys to DNS-based internet identifiers" (https://github.com/nostr-protocol/nips/blob/master/05.md). Nostr Clients will send a GET request to domain.com/.well-known/nostr.json?name=<name> to verify the identifier. This small application responds to this requests by providing the pubkey associated to a NIP-05 identifier saved in a MySQL database.

Hope someone finds this helpful.
