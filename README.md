# Staking Contract with BoredApe

This is a staking contract where a user stakes a required token (platform token) and they get 10% interest after 30days but users can also withdraw their stake at anytime, and the platform should give them the calculated rewards. This implies that, the minimum interest is calculated in seconds.

Only users that owns a Bored Ape NFT can stake on this platform.

#### Steps to building this:
1. I created a token which I called platform token.
2. I got Bored Ape NFT address on ethereum mainnet.
3. I forked mainnet on my localhost using: 
```
npx hardhat node --fork https://eth-mainnet.alchemyapi.io/v2/<key>
```

#### Testing this project:
(deployToken.ts)
1. Get a Bored Ape NFT holder on mainnet
2. Impersonate the Bored Ape holder
3. Deploy the token contract and send some token to the Impersonated Bored Ape holder
4. Check the token balance of the bored ape holder to ascertain that the token was successfully transferred.

(deployStaking.ts)
5. Deploy the staking contract and pass in the contract address of the deployed token and that of the bored ape nft respectively

(interaction.ts)
* Send some token the contract address of the staking contract, this is what the contract will use to pay for interest.
6. Connect to the token contract and the staking contract using ethers.getContractAt()
7. Impersonated the bored ape holder again, the same holder you transferred token to
8. Use the bored ape holder to approve the staking contract address to spend some token
9. Call the stake function in the staking contract and get the staking contract balance to ensure the that the staking transaction works.
10 Comment out the transaction 1 and uncomment the transaction 2 which will withdraw the token + calculated interest back to the address of the impersonated signer.
11. Check the impersonated signer's token balance, you should see your balance with some extra token

The following are commands to run to deploy and test:
Run them respectively

```shell
npx hardhat run scripts/deployToken.ts --network localhost
npx hardhat run scripts/deployStaking.ts --network localhost
npx hardhat run scripts/interaction.ts --network localhost
```
