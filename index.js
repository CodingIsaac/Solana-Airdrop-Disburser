const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

const wallet = new Keypair();
const publicKey = new PublicKey(wallet._keypair.publicKey);
const secretKey = wallet._keypair.secretKey;

const getWalletBalance = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const walletBalance = await connection.getBalance(publicKey)
        console.log(`The Wallet balance is ${walletBalance}`)
        
    } catch (err) {
        console.error(err)
    }
}
const airdropSolanaToken = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const fromAirdropSignature = await connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL)
        const lastBlockHash = await connection.getLatestBlockhash();
        await connection.confirmTransaction({
            blockhash: lastBlockHash.blockhash,
            lastValidBlockHeight: lastBlockHash.lastValidBlockHeight,
            signature: fromAirdropSignature
        });
       
             
        
    } catch (err) {
        console.log(err)
        
    }
}

const main = async() => {
    await getWalletBalance();
    await airdropSolanaToken();
    await getWalletBalance();
}
main()