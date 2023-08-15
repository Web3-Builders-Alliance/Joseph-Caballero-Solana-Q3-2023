import { getAccount, getMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import wallet from '../../wba-wallet.json';
import { Connection, clusterApiUrl, PublicKey, Keypair } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const mint = new PublicKey('6wBhGAZBrZksYKd5XBDiDv83dTYrgY4L522782dDhF8E');

// payer & mint authority
const payer = Keypair.fromSecretKey(new Uint8Array(wallet));



(async () => {
  try {
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      payer.publicKey
    );

    console.log("Token Account Address", tokenAccount.address.toBase58());

    const tokenAccountInfo = await getAccount(connection, tokenAccount.address)

    console.log("tokenAccountInfo.amount pre-mint", tokenAccountInfo.amount);

    await mintTo(
      connection,
      payer,
      mint,
      tokenAccount.address,
      payer,
      100000000
    )

    const mintInfo = await getMint(connection, mint);
    console.log("token supply", mintInfo.supply);

    const updatedAccInfo = await getAccount(connection, tokenAccount.address);
    console.log("tokenAccountInfo.amount post-mint", updatedAccInfo.amount);

  } catch(e){
    console.log(e);
  }
})()