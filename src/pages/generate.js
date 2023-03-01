import { useState } from 'react';
import { Flex, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import minttopuddle from 'cadence/transactions/mint';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

const handleMint =()=>{
  // todo

  minttopuddle("0x9496a99be6bceb8c","First Nft","My First Nft","https://images.unsplash.com/photo-1603320045158-61d0dc0fbb33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YW55fGVufDB8fDB8fA%3D%3D&w=1000&q=80","1.0001");
  alert("Details filled Successfully");
}


// const handleMint = async () => {
//   try {
//     await minttopuddle(address, name, description, imageUrl, price);
//     onClose(); // close the modal after the minting is done
//   } catch (error) {
//     console.error(error);
//   }
// };


export default function ImageForm() {
  const [prompt, setPrompt] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };
  
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  

  const a= process.env.apiKey;
  console.log(a);
  const apiKey = "";
  console.log(apiKey);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.openai.com/v1/images/generations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          'model': 'image-alpha-001',
          'prompt': prompt,
          'num_images': 1,
          'size': '256x256',
          'response_format': 'url',
        }),
      });
      const data = await response.json();
      const imageUrl = data.data[0].url;
      const canvas = document.getElementById('imageCanvas');
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.src = imageUrl;
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
    } catch (error) {
      console.error(error);
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex direction="column" align="center" justify="center" minH="100vh">
      <canvas id="imageCanvas" width="256" height="256"></canvas>
      <FormControl id="prompt" mb={4}>
        <FormLabel>Enter a prompt:</FormLabel>
        <Input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      </FormControl>
      <Button colorScheme="blue" onClick={handleSubmit}>
        Submit
      </Button>
      <br />
      <Button colorScheme="green" onClick={handleMint}> 
        Mint to Puddle
      </Button>
      <br />
      <Button onClick={onOpen}>Submit Details</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Puddle AI</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="address" mb={4}>
              <FormLabel>Address:</FormLabel>
              <Input type="text" value={address} onChange={handleAddressChange} />
            </FormControl>
            <FormControl id="name" mb={4}>
              <FormLabel>Name:</FormLabel>
              <Input type="text" value={name} onChange={handleNameChange} />
            </FormControl>
            <FormControl id="description" mb={4}>
              <FormLabel>Description:</FormLabel>
              <Input type="text" value={description} onChange={handleDescriptionChange} />
            </FormControl>
            {/* <FormControl id="imageUrl" mb={4}>
              <FormLabel>Image URL:</FormLabel>
              <Input type="text" value={imageUrl} onChange={handleImageUrlChange} />
            </FormControl> */}
            <FormControl id="price" mb={4}>
              <FormLabel>Price:</FormLabel>
              <Input type="text" value={price} onChange={handlePriceChange} />
            </FormControl>
          </ModalBody>


          <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleMint}>
            Mint to Puddle
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>

        </ModalContent>
</Modal>
    </Flex>
  );
}
