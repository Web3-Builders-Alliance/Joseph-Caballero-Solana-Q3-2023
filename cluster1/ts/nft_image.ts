import { Metaplex,bundlrStorage, keypairIdentity, toMetaplexFile } from "@metaplex-foundation/js";
import { Commitment, Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import wallet from "../../wba-wallet.json";
import { readFile } from "fs/promises";

const commitment: Commitment = 'confirmed';
const connection = new Connection(clusterApiUrl("devnet"), commitment);
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(keypair))
  .use(bundlrStorage({
    address: "https://devnet.bundlr.network",
    providerUrl: "https://api.devnet.solana.com",
    timeout: 60000,
  }));

(async () => {
  try{
    const img = await readFile('./images/generug.png');
    const metaplexing = toMetaplexFile(img, 'generug.png');
    const imgUri = await metaplex.storage().upload(metaplexing);

    console.log(`You've uploaded your image:\n\n${imgUri}\n\nSave this URI so you can use it to mint an NFT!`);
  } catch(e){
    console.error(`Oops, something went wrong: ${e}`);
  }
})()
