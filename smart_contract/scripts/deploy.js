const main = async () => {
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  const MyNFT = await hre.ethers.getContractFactory("MyNFT");
  const mynft = await MyNFT.deploy();

  await mynft.deployed();

  console.log("Transactions deploy to: ", transactions.address);
  console.log("MyNFT deploy to: ", mynft.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
