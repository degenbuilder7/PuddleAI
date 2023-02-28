import { Box, Heading, Text, Grid, GridItem } from "@chakra-ui/react";
import { FiCamera, FiGlobe, FiPenTool } from "react-icons/fi";
import {tooltipTheme} from "components/Tooltip"
import Link from "next/link";
import { Button } from "@chakra-ui/react";


const LandingPage = () => {
  return (
    <>
    <Box p={8} >
      <Heading as="h1" size="3xl">
        Welcome to Our Platform
        <Link class="-inset-0"href="/generate">
          <Button >Generate</Button>
        </Link>
      </Heading>
      <Grid templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={8}>
        <GridItem>
          <Box boxShadow="md" borderRadius="md" p={6} height="full">
            <FiCamera size={32} />
            <Heading as="h2" size="lg" my={4}>
              Generate Image with AI
            </Heading>
            <Text fontSize="lg">
              Our platform can generate high-quality images with the help of advanced AI algorithms.
            </Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box boxShadow="md" borderRadius="md" p={6} height="full">
            <FiGlobe size={32} />
            <Heading as="h2" size="lg" my={4}>
              Mint on Flow Blockchain
            </Heading>
            <Text fontSize="lg">
              You can mint your unique digital assets on the Flow blockchain using our platform.
            </Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box boxShadow="md" borderRadius="md" p={6} height="full">
            <FiPenTool size={32} />
            <Heading as="h2" size="lg" my={4}>
              Help with Image Generation from text
            </Heading>
            <Text fontSize="lg">
              Our platform will help you generate high-quality image from text content.
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </Box>
    </>
  );
};

export default LandingPage;
