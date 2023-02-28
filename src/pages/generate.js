import { useState } from 'react';
import { Flex, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import minttopuddle from 'cadence/transactions/mint';

const handleMint =()=>{
  // todo
}
export default function ImageForm() {
  const [prompt, setPrompt] = useState('');

  const apiKey = ""
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
    </Flex>
  );
}
