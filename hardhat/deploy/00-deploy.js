// deploy/00_deploy_my_contract.js

// const { ethers } = require("hardhat");

// const sleep = (ms) =>
//   new Promise((r) =>
//     setTimeout(() => {
//       console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
//       r();
//     }, ms)
//   );

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // await deploy("Greeter", {
  //   from: deployer,
  //   args: ["hello world"],
  //   log: true,
  // });

  await deploy("Ecertify", {
    from: deployer,
    log: true,
  });
  // await deploy("Marketplace", {
  //   from: deployer,
  //   log: true,
  // });
};

module.exports.tags = ["Greeter", "Storage", "SupportToken"];
