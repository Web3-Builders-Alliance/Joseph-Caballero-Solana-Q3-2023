import { bundlrStorage, keypairIdentity, Metaplex, toMetaplexFile } from "@metaplex-foundation/js";
import { Commitment, Connection, Keypair } from "@solana/web3.js";
import wallet from "../../wba-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(keypair))
  .use(bundlrStorage({
    address: 'https://devnet.bundlr.network',
    providerUrl: "https://api.devnet.solana.com",
    timeout: 60000,
  }));

(async () => {
  try {
    const { uri: metadataUri } = await metaplex.nfts().uploadMetadata({
      "name": "Another Rug",
      "description": "It's a rug.",
      "image": "https://arweave.net/Z2HH8X3kEyCZ7g3Fjh2gOB0bRA685F02e25_fHM7qRc",
      "attributes": [
        {
          "trait_type": "background",
          "value": "teal"
        },
        {
          "trait_type": "pattern",
          "value": "squares"
        }
      ],
      "properties": {
        "files": [
          {
            "uri": "https://arweave.net/Z2HH8X3kEyCZ7g3Fjh2gOB0bRA685F02e25_fHM7qRc",
            "type": "image/png"
          },
        ],
        "category": "image"
      }
    })

    console.log(`You've uploaded your metadata:\n\n${metadataUri}\n\nSave this URI so you can use it to mint an NFT!`)
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`)
  }
})()