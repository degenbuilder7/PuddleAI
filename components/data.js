import { Box, Flex, Image, Text } from "@chakra-ui/react";

const nfts = [
  {
    id: 1,
    name: "Tulip #1",
    image: "https://i.seadn.io/gae/RngL3uusqN3ze5NEr9333sEX2V96m81MrErl9FlLuOztAEeLR-OHAmW1BkbeUr9-ifZbmooZPPelCE6mjr7si8UJ9u6ZK828tJ5waiE?auto=format&w=256",
    price: "0.05 ETH",
    category: "Photography",
  },
  {
    id: 2,
    name: "Tulip #2",
    image: "https://i.seadn.io/gae/RngL3uusqN3ze5NEr9333sEX2V96m81MrErl9FlLuOztAEeLR-OHAmW1BkbeUr9-ifZbmooZPPelCE6mjr7si8UJ9u6ZK828tJ5waiE?auto=format&w=256",
    price: "0.1 ETH",
    category: "Photography",
  },
  {
    id: 3,
    name: "Tulip #3",
    image: "https://i.seadn.io/gae/RngL3uusqN3ze5NEr9333sEX2V96m81MrErl9FlLuOztAEeLR-OHAmW1BkbeUr9-ifZbmooZPPelCE6mjr7si8UJ9u6ZK828tJ5waiE?auto=format&w=256",
    price: "0.15 ETH",
    category: "Photography",
  },
  {
    id: 4,
    name: "Tulip #4",
    image: "https://i.seadn.io/gae/RngL3uusqN3ze5NEr9333sEX2V96m81MrErl9FlLuOztAEeLR-OHAmW1BkbeUr9-ifZbmooZPPelCE6mjr7si8UJ9u6ZK828tJ5waiE?auto=format&w=256",
    price: "0.15 ETH",
    category: "Photography",
  },
  {
    id: 5,
    name: "Tulip #5",
    image: "https://i.seadn.io/gae/RngL3uusqN3ze5NEr9333sEX2V96m81MrErl9FlLuOztAEeLR-OHAmW1BkbeUr9-ifZbmooZPPelCE6mjr7si8UJ9u6ZK828tJ5waiE?auto=format&w=256",
    price: "0.15 ETH",
    category: "Photography",
  },
];

function NFTCard({ nft }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m="2">
      <Image src={nft.image} alt={nft.name} />
      <Box p="6">
        <Flex align="baseline">
          <Text fontSize="xl" fontWeight="semibold" mr="2">
            {nft.name}
          </Text>
          <Text fontSize="md" color="gray.500">
            {nft.category}
          </Text>
        </Flex>
        <Text mt="2" fontSize="lg" fontWeight="medium">
          {nft.price}
        </Text>
      </Box>
    </Box>
  );
}

function NFTGallery() {
  return (
    <Flex flexWrap="wrap" justifyContent="center">
      {nfts.map((nft) => (
        <NFTCard key={nft.id} nft={nft} />
      ))}
    </Flex>
  );
}

export default function Nft() {
  return (
    <Box p="4">
      <Text fontSize="4xl" fontWeight="bold" mb="4">
        Some NFT minted using our platform
      </Text>
      <NFTGallery />
    </Box>
  );
}
