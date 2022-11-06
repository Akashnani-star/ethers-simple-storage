const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  const provider = await new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL
  );
  // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const key = fs.readFileSync("./.encryptedKey.json");
  let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    key,
    process.env.PRIVATE_KEY_PASSWORD
  );
  wallet = wallet.connect(provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const bin = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf-8");
  const contractFactory = new ethers.ContractFactory(abi, bin, wallet);
  console.log("Deploying contract...");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);
  console.log(`contract address: ${contract.address}`);
  let trans = await contract.addUserFavoriteNumber("akash", "3");
  await trans.wait(1);
  console.log((await contract.getUserFavoriteNumber("akash")).toString());
  trans = await contract.addUserFavoriteNumber("akash", "10");
  await trans.wait(1);
  console.log((await contract.getUserFavoriteNumber("akash")).toString());
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
