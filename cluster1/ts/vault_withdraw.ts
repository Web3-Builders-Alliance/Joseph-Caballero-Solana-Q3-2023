import { Connection, Keypair, SystemProgram, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider, Address, BN } from "@project-serum/anchor";
import { wba_vault, IDL } from "../../programs/wba_vault"
import wallet from '../../wba-wallet.json'

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));


const connection = new Connection('https://api.devnet.solana.com');

const provider = new AnchorProvider(connection, new Wallet(keypair), { commitment: 'confirmed'});

const program = new Program<wba_vault>(IDL, "D51uEDHLbWAxNfodfQDv7qkp8WZtxrhi3uganGbNos7o" as Address, provider);

const vaultState = new PublicKey("HoFrrvU2SPxds6SYZxBprdiBiP5H8tYkG4mu1VUbDtEH");

console.log("vaultState", vaultState);

const vaultAuth = PublicKey.findProgramAddressSync([Buffer.from('auth'), vaultState.toBuffer()], program.programId)[0];

const vault = PublicKey.findProgramAddressSync([Buffer.from('vault'), vaultAuth.toBuffer()], program.programId)[0];

const amount = LAMPORTS_PER_SOL;
(async () => {
  try {
    const txhash = await program.methods
    .withdraw(new BN(amount))
    .accounts({
      owner: keypair.publicKey,
      vaultState: vaultState,
      vaultAuth: vaultAuth,
      vault: vault,
      systemProgram: SystemProgram.programId,
    })
    .signers([keypair]).rpc();

    console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch(e){
    console.error(`Oops, something went wrong: ${e}`)
  }
})();