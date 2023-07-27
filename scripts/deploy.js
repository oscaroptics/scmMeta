const hre = require('hardhat');

async function main() {
  const Number = await hre.ethers.getContractFactory("number");
  const number = await Number.deploy();

  await number.deployed();
  console.log(`A contract is deployed`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});