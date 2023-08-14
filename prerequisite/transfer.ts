import { Transaction, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey} from "@solana/web3.js";
import wallet from './dev-wallet.json'
import 'dotenv/config';

const devNetAddress = process.env.SolanaDev;

const from = Keypair.fromSecretKey(new Uint8Array(wallet));

const to = new PublicKey(devNetAddress as String);

const connection = new Connection('https://api.devnet.solana.com');


// fxn to send 0.1 lamports from devwallet to WBA wallet on devnet
// (async() => {
//   try {
//     const transaction = new Transaction().add(
//       SystemProgram.transfer({
//         fromPubkey: from.publicKey,
//         toPubkey: to,
//         lamports: LAMPORTS_PER_SOL/100,
//       })
//     );
//     transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
//     transaction.feePayer = from.publicKey;

//     const signature = await sendAndConfirmTransaction(connection, transaction, [from]);

//     console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
//   } catch(e){
//     console.error(`Oops, something went wrong: ${e}`);
//   }
// })()

/* 
fxn to get exact balance, 
calculate fees, 
calculate exact # of lamports we can send whilst statisfying fee rate,
send balance to devnet
*/

(async() => {
  try {
    const balance = await connection.getBalance(from.publicKey);
    
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: balance,
      })
    );
    transaction.recentBlockhash = ((await connection.getLatestBlockhash('confirmed')).blockhash);
    transaction.feePayer = from.publicKey;

    const fee = (await connection.getFeeForMessage(transaction.compileMessage(),'confirmed')).value || 0;

    transaction.instructions.pop();

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: balance - fee,
      })
    );

    const signature = await sendAndConfirmTransaction(connection, transaction, [from]);
    
    console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`)
  } catch(e){
    console.error(`Oops, something went wrong: ${e}`);
  }    
})();
