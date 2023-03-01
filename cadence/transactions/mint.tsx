/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as fcl from "@onflow/fcl";


import { config } from "@onflow/fcl";

config({
    "accessNode.api": "https://rest-testnet.onflow.org",
    "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
    "app.detail.icon": "https://camo.githubusercontent.com/5b01555a0a265f26f5d42f9fe0bf339a4883777117f6ed4fa0fdf38a40c6cba6/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f313033333037393835343832363030303438342f313038303335303634353738373239353735342f707564646c6561692d6c6f772d7265736f6c7574696f6e2d6c6f676f2d626c61636b2d6f6e2d77686974652d6261636b67726f756e642e706e67",
    "app.detail.title": "Puddle AI"
})

fcl.authenticate();

// storefront initialised

async function minttopuddle(
    recipient: String,
    name: String,
    description: String,
    thumbnail: String,
    noToMint: Number,
) {
  const txId = await fcl.mutate({
    cadence: `
        import NonFungibleToken from 0x1d7e57aa55817448
        import PuddleV1 from 0x9496a99be6bceb8c
        import MetadataViews from 0x1d7e57aa55817448
        import FungibleToken from 0xf233dcee88fe0abe

        
        transaction(
            recipient: Address,
            name: String,
            description: String,
            thumbnail: String,
            noToMint: Int,
        ) {

            let minter: &PuddleV1.NFTMinter
        
            let recipientCollectionRef: &{NonFungibleToken.CollectionPublic}
        
            /// Previous NFT ID before the transaction executes
            let mintingIDBefore: UInt64
        
            prepare(signer: AuthAccount) {
                self.mintingIDBefore = PuddleV1.totalSupply
        
                // borrow a reference to the NFTMinter resource in storage
                self.minter = signer.borrow<&PuddleV1.NFTMinter>(from: PuddleV1.MinterStoragePath)
                    ?? panic("Account does not store an object at the specified path")
        
                // Borrow the recipient''s public NFT collection reference
                self.recipientCollectionRef = getAccount(recipient)
                    .getCapability(PuddleV1.CollectionPublicPath)
                    .borrow<&{NonFungibleToken.CollectionPublic}>()
                    ?? panic("Could not get receiver reference to the NFT Collection")
            }
        
            execute {
        
                var royalties: [MetadataViews.Royalty] = []
        
                // Mint the NFT and deposit it to the recipient''s collection
                var noMinted = 0
                while noMinted < noToMint {
                    self.minter.mintNFT(
                        recipient: self.recipientCollectionRef,
                        name: name,
                        description: description,
                        thumbnail: thumbnail,
                        royalties: royalties
                    )
                    noMinted = noMinted + 1
                }
            }
        
            post {
                self.recipientCollectionRef.getIDs().contains(self.mintingIDBefore): "The next NFT ID should have been minted and delivered"
                PuddleV1.totalSupply == self.mintingIDBefore + UInt64(noToMint): "The total supply should have been increased by value"
            }
        }
    `,
    args: (arg: any, t: any) => [
      arg(recipient, t.String),
      arg(name, t.String),
      arg(description, t.String),
      arg(thumbnail, t.String),
      arg(noToMint, t.Int),
    ],
    // proposer : fcl.proposer,
    // payer: fcl.currentUser,
    limit: 9999
  });

  const txn = await fcl.tx(txId).onceSealed();
  console.log(txn);
}

export default minttopuddle;
