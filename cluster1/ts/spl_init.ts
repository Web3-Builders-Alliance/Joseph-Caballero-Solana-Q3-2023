import { createMint } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from '../../wba-wallet.json';

const payer = Keypair.fromSecretKey(new Uint8Array(wallet));
const mintAuthority = Keypair.fromSecretKey(new Uint8Array(wallet));
const freezeAuthority = Keypair.fromSecretKey(new Uint8Array(wallet));

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

(async () => {
  try {
    const mint = await createMint(connection, payer, mintAuthority.publicKey, freezeAuthority.publicKey, 6)
    
    console.log(mint.toBase58());
  } catch(e){
    console.log(e);
  }
})()