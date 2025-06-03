const hre = require("hardhat");

async function main() {
  const Ijazah = await hre.ethers.getContractFactory("Ijazah");
  const ijazahContract = await Ijazah.deploy();
  await ijazahContract.waitForDeployment();

  console.log("Ijazah contract deployed to:", await ijazahContract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
