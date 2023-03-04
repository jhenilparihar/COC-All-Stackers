// https://eth-goerli.g.alchemy.com/v2/cZvGmFGIQLUOhhhhQfrG_-QiQIa9rJmv

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.11",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/cZvGmFGIQLUOhhhhQfrG_-QiQIa9rJmv",
      accounts: [
        "afbed084c93d81d9e1ea025e6b665ef09163b8dfce380a5594bbffbb6988e53d",
      ],
    },
    polygon_mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/vrCzbuG6mHClGI8c5GACe1DT1dZnzf9K",
      accounts: [
        "ba98843d5d87d02dc2922e154510888926546bef628b641ccecbf4d3ab020ffe",
      ],
    },
  },
};
