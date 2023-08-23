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
    const { nft } = await metaplex
      .nfts()
      .create({
        name: "It's a Rug",
        uri: "https://arweave.net/-ZMvMm8SUcgJxni_YBXv5DdjNQp7o1g7804dHe6_MiQ",
        sellerFeeBasisPoints: 0,
        symbol: "RUG",
        creators: [{
          address: keypair.publicKey,
          share: 100
        }],
        isMutable: true,
      })

      console.log(`Success! Check out your NFT here:\nhttps://explorer.solana.com/address/${nft.address.toBase58()}?cluster=devnet`);
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`)
  }
})()