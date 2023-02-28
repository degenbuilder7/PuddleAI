/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as fcl from "@onflow/fcl";

fcl.authenticate();

// storefront initialised

async function minttopuddle(
  collectionIdentifier: string,
  saleItemID: number,
  saleItemPrice: number,
  customID: string | undefined,
  buyer: string | undefined,
  expiry: number
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
        
            /// Reference to the receiver''s collection
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
                PuddleV1.totalSupply == self.mintingIDBefore + UInt64(noToMint): "The total supply should have been increased by  value"
            }
        }
    `,
    args: (arg: any, t: any) => [
      arg(collectionIdentifier, t.String),
      arg(saleItemID, t.UInt64),
      arg(saleItemPrice, t.UFix64),
      arg(customID, t.Optional(t.String)),
      arg(buyer, t.Optional(t.Address)),
      arg(expiry, t.UInt64),
    ],
    // proposer : fcl.proposer,
    // payer: fcl.currentUser,
    limit: 999
  });

  const txn = await fcl.tx(txId).onceSealed();
  console.log(txn);
}

export default minttopuddle;
