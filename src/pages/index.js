import { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import Canvas from "components/canvas";
import PromptForm from "components/prompt-form";
import { useRef } from "react";
import Marquee from "react-fast-marquee";

import {
  Flex,
  Text,
  Button,
  Spinner,
  Divider,
  Image,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import BannerToast from "components/banner"

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const btnRef = useRef();
  const btnRef2 = useRef();

  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [genipfs, setGenipfs] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [desc, setDesc] = useState("");
  const [error, setError] = useState(null);
  const [maskImage, setMaskImage] = useState(null);
  const [userUploadedImage, setUserUploadedImage] = useState(null);
  const flag = false;
  const [auth, setAuth] = useState();
  const [ipdisplay, setIpdisplay] = useState();
  var ipfs;
  const [txn, setTxn] = useState();
  const [arr, setArr] = useState();
  const resp = [];
  const [history, sethistory] = useState(false);

  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView();
  const handleSubmit = async (e) => {
    setDesc(e.target.prompt.value);
    e.preventDefault();

    const prevPrediction = predictions[predictions.length - 1];
    const prevPredictionOutput = prevPrediction?.output
      ? prevPrediction.output[prevPrediction.output.length - 1]
      : null;

    const body = {
      prompt: `mdjrny-v4 style ${e.target.prompt.value}`,
      init_image: userUploadedImage
        ? await readAsDataURL(userUploadedImage)
        : // only use previous prediction as init image if there's a mask
        maskImage
        ? prevPredictionOutput
        : null,
      mask: maskImage,
    };

    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const prediction = await response.json();

    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPredictions(predictions.concat([prediction]));

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      setPredictions(predictions.concat([prediction]));

      if (prediction.status === "succeeded") {
        setUserUploadedImage(null);
      }
    }

    setGenerated(true);
  };
  return (
    <>
      <Flex
        fontFamily={"IBM Plex Mono, monospace"}
        width="100%"
        height={{ base: "1573px", lg: "1612px" }}
        background={"white"}
        align={"center"}
        flexDir={"column"}
      >
        <Flex bg={"black"} color={"white"} width={"100%"} userSelect="none">
          <Flex paddingTop={"10px"} paddingBottom={"10px"}>
            <Marquee gradientColor={"[0, 0, 0]"}>
              <Text>
                AI * Puddle
              </Text>
            </Marquee>
          </Flex>
        </Flex>
        <Flex gap={{ base: "184px", md: "776px" }} marginTop={"30px"}>
          <Flex gap={"12px"} align={"center"} height={"26px"}>
            
            <Text fontSize={{ base: "20px", lg: "20px" }}>AI Mint Puddle</Text>
          </Flex>
          <Flex gap={"32px"} display={{ base: "none", lg: "flex" }}>
            <div
              className="hover-underline-animation"
              ref={btnRef2}
              onClick={onOpen2}
            >
              <Text
                fontSize={{ base: "11px", lg: "20px" }}
                cursor={"pointer"}
                // onClick={test}
              >
                History
              </Text>
            </div>
            <div className="hover-underline-animation">
              <Text fontSize={{ base: "11px", lg: "20px" }} cursor={"pointer"}>
                <a
                  href=""
                  target={"_blank"}
                  rel="noreferrer"
                >
                  Twitter
                </a>
              </Text>
            </div>
            
            <div className="hover-underline-animation">
              <Text
                fontSize={{ base: "11px", lg: "20px" }}
                onClick={executeScroll}
                cursor={"pointer"}
              >
                About
              </Text>
            </div>
          </Flex>
          <Flex
            display={{ base: "flex", lg: "none" }}
            ref={btnRef}
            onClick={onOpen}
          >
            <Image src={"menu.svg"} height={"24px"} width={"24px"} alt="menu" />
          </Flex>
        </Flex>

        <Flex
          flexDir={"column"}
          width={{ base: "360px", lg: "584px" }}
          marginTop={"16px"}
          align={"center"}
        >
          <Flex
            flexDir={"column"}
            width={{ base: "328px", lg: "428px" }}
            gap={"7px"}
            marginTop={"27px"}
          >
            <Text fontSize={{ base: "18px", lg: "26px" }} fontWeight={"500"}>
              <u>AI Mint Puddle</u> — imagining to minting made possible on Puddle
            </Text>

            <Text fontSize={"12px"} fontStyle={"italic"}>
              by kamal & aarav
              
            </Text>
          </Flex>

          <Flex flexDir={"column"} marginTop={"21px"} gap={"16px"}>
            <Flex
              height={{ base: "328px", lg: "428px" }}
              width={{ base: "328px", lg: "428px" }}
              borderRadius={"4px"}
              border={"1px solid black"}
              borderStyle={"dashed"}
            >
            </Flex>
            <Flex gap={"8px"}>
              <h1>Connect Btn</h1>
              {!(generated) ? (
                <Button
                  cursor={"not-allowed"}
                  opacity={"60%"}
                  background={"rgba(0, 0, 0, 0.05)"}
                  height={"38px"}
                  width={{ base: "160px", lg: "210px" }}
                  borderRadius={"4px"}
                  border={"1px solid black"}
                  borderStyle={"dashed"}
                  _hover={{ background: "rgba(0, 0, 0, 0.1)" }}
                  _active={{ background: "" }}
                >
                  Mint this NFT
                </Button>
              ) : (
                <Button
                  type={"submit"}
                  background={"rgba(0, 0, 0, 0.05)"}
                  height={"38px"}
                  width={{ base: "160px", lg: "210px" }}
                  borderRadius={"4px"}
                  border={"1px solid black"}
                  borderStyle={"dashed"}
                  _hover={{ background: "rgba(0, 0, 0, 0.1)" }}
                  _active={{ background: "" }}
                >
                  {!minting ? <Text> Mint this NFT </Text> : <Spinner />}
                </Button>
              )}
            </Flex>
            <PromptForm onSubmit={handleSubmit}/>
            <Flex flexDir={"column"}>
              {minted ? (
                <Flex gap={"16px"} align={"center"} marginTop={"16px"}>
                  <Text
                    fontStyle={"italic"}
                    fontSize={"14px"}
                    fontWeight={"bold"}
                    _hover={{ textDecor: "underline" }}
                  >
                    <a href={ipdisplay} target={"_blank"} rel="noreferrer">
                      IPFS ↗
                    </a>
                  </Text>
                  <Text
                    fontStyle={"italic"}
                    fontSize={"14px"}
                    fontWeight={"bold"}
                    _hover={{ textDecor: "underline" }}
                  >
                    <a href={txn} target={"_blank"} rel="noreferrer">
                      Transaction ↗
                    </a>
                  </Text>
                </Flex>
              ) : (
                <>
                  <Text width={{ base: "328px", lg: "428px" }}>
                    you need to have some funds on flow on your wallet for
                    this to work,{" "}
                    <i>
                      grab some from{" "}
                      <a
                        href=""
                        style={{ textDecoration: "underline" }}
                      >
                        here
                      </a>
                    </i>
                  </Text>
                </>
              )}
            </Flex>
          </Flex>

          <Flex width={{ base: "360px", md: "360px", lg: "584px" }}>
            <Divider
              marginTop={"92px"}
              width={{ base: "360px", md: "360px", lg: "584px" }}
              borderColor={"black"}
            />
          </Flex>

          <Flex
            flexDir={"column"}
            gap={"49px"}
            width={{ base: "300px", lg: "360px" }}
            marginTop={"92px"}
            ref={myRef}
          >
            <Flex flexDir={"column"} gap={"22px"}>
              <Text
                fontWeight={"500"}
                fontSize={"20px"}
                textDecor={"underline"}
              >
                About
              </Text>
              <Text fontStyle={"italic"} fontSize={"14px"}>
                Explore, create and launch with your new favorite NFT minter              
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"xs"}
        fontFamily={"IBM Plex Mono, monospace"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton _active={{}} />

          <DrawerBody marginTop={"40px"}>
            <Flex
              gap={"20px"}
              flexDirection={"column"}
              fontFamily={"IBM Plex Mono, monospace"}
            >
              <div ref={btnRef2} onClick={onOpen2}>
                <Text fontSize="20px" cursor={"pointer"}>
                  History
                </Text>
              </div>

              <Text fontSize="20px" cursor={"pointer"}>
                <a
                  href="https://twitter.com/0xkamal7"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  Twitter
                </a>
              </Text>

              <Text fontSize="20px" onClick={executeScroll} cursor={"pointer"}>
                About
              </Text>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Drawer
        isOpen={isOpen2}
        placement="right"
        onClose={onClose2}
        finalFocusRef={btnRef2}
        size={"xl"}
        fontFamily={"IBM Plex Mono, monospace"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton _active={{}} />

          <DrawerBody marginTop={"40px"}>
            <Flex
              fontFamily={"IBM Plex Mono, monospace"}
              justify={"center"}
              flexWrap={"wrap"}
              gap={"17px"}
            >
              {history ? (
                <>
                  {arr.map((item) => {
                    return (
                      <div key={item.TokenID}>
                        <Flex
                          w={{ base: "300px", lg: "400px" }}
                          flexDir={"column"}
                          gap={"7px"}
                        >
                          <Image
                            src={item.Image}
                            alt={item.TokenID}
                            rounded={"7px"}
                          />
                          <Text fontWeight={"bold"} fontSize={"18px"}>
                            Token ID : {item.TokenID}
                          </Text>
                          <Text fontSize={"14px"}>{item.Description}</Text>
                        </Flex>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <h1>Connect your wallet</h1>
                </>
              )}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
