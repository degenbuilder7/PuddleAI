import { useState } from "react";
import { Flex, Button, Input, ButtonGroup, Textarea } from "@chakra-ui/react";

const samplePrompts = [
  "portrait photograph of Madison Beer as Pocahontas, young beautiful native american woman, perfect symmetrical face, indigenes feather jewelry, traditional handmade dress, armed female hunter warrior, (((wild west))) environment, Utah landscape, ultra realistic, concept art, elegant, ((intricate)), ((highly detailed)), depth of field, ((professionally color graded)), soft ambient lighting, dusk, 8k, art by artgerm and greg rutkowski and alphonse mucha",
  "Luminescent flower blooming at twilight, cgsociety, r /art, trending on artstation, artstationHD, octane render, highly detailed, vray, volumetric lighting, unreal engine",
  "walking in a futuristic city, minimal, fog and mist, photorealistic blade runner 2049 aesthetic",
  "highly detailed portrait man and woman cyberpunk with implants, by atey ghailan, by greg rutkowski, by greg tocchini, by james gilleard, by joe fenton, by kaethe butcher, gradient light blue, brown, blonde cream and white color scheme, grunge aesthetic",
  "marble sculpture cyberpunk squid on a postument, soft sunlight from the top, intricate detail, in a big round room, multicolor tiles on the floor and walls",
  "sci fi anime soldier. Anime is 1980's low resolution",
  "highly detailed wide portrait young woman anime, by atey ghailan, by greg rutkowski, by greg tocchini, by james gilleard, by joe fenton, by kaethe butcher, gradient light blue, brown, blonde cream and white color scheme, grunge aesthetic, 8 k, optimistic",
  "aerial view of a giant fish tank shaped like a tower in the middle of new york city, 8k octane render, photorealistic",
  "hyperrealism photography hyperrealism concept art of highly detailed farm and traditional ghibli house with highly detailed futuristic ( cyberpunk ) windmills towers aircrafts by wes anderson and hasui kawase and scott listfield sci - fi style hyperrealism rendered in blender and octane render volumetric natural light",
];

import sample from "lodash/sample";

export default function PromptForm(props) {
  const [prompt] = useState(sample(samplePrompts));
  const [image, setImage] = useState(null);

  return (
    <form onSubmit={props.onSubmit}>
      <Flex flexDir={"column"} gap={"11px"}>
        <Flex
          spacing={"1"}
          width={{ base: "328px", lg: "428px" }}
          flexDir={"column"}
          gap={"8px"}
        >
          <Textarea
            name="prompt"
            color={"black"}
            type="text"
            defaultValue={prompt}
            onSubmit={props.onSubmit}
            height={"88px"}
            width={{ base: "328px", lg: "428px" }}
            focusBorderColor={"none"}
            borderRadius={"4px"}
            borderColor={"black"}
            border={"1px solid black"}
            borderStyle={"dashed"}
            _hover={{ background: "" }}
            fontSize={"14px"}
            resize={"none"}
          />

          <Flex direction={"row"} gap={"8px"}>
            <Button
              type={"submit"}
              background={"rgba(0, 0, 0, 0.05)"}
              height={"38px"}
              width={{ base: "328px", lg: "428px" }}
              borderRadius={"4px"}
              border={"1px solid black"}
              borderStyle={"dashed"}
              _hover={{ background: "rgba(0, 0, 0, 0.1)" }}
              _active={{ background: "" }}
            >
              Generate
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
}
