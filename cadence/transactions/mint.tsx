/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as fcl from "@onflow/fcl";


import { config } from "@onflow/fcl";

config({
    "accessNode.api": "https://rest-testnet.onflow.org",
    "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "app.detail.icon": "https://placekitten.com/g/200/200",
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
        import NonFungibleToken from 0x631e88ae7f1d7c20
        import PuddleV1 from 0x9496a99be6bceb8c
        import MetadataViews from 0x631e88ae7f1d7c20
        import FungibleToken from 9a0766d93b6608b7

        
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
