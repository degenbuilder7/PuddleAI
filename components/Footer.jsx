import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

import {
  Box,
  Container,
  Flex,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";



const Footer = () => (

    <Box>
      <Text pt={6} fontSize={"sm"} textAlign={"center"} color="gray.600">
        © 2023 PuddleAI Team, Inc. All rights reserved
      </Text>
      <Text fontSize={"sm"} textAlign={"center"} color="green.600">
        Made with ❤ by &nbsp;
        <a href="https://www.linkedin.com/in/kamal-singh7">
          PuddleAI Team
        </a>
      </Text>
    </Box>

);

export default Footer;
