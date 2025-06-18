import React from "react";
import Wrapper from "@/app/wrapper";
import FrameSection from "../shared/FrameSetcion";
import data from "../../Data/mainPage/frameSection/frame.json";

function Frame() {
  return (
    <Wrapper>
      <FrameSection product={data.products[0]} isImageFirst={false} />
      <FrameSection product={data.products[1]} isImageFirst={true} />
      <FrameSection product={data.products[2]} isImageFirst={false} />
      <FrameSection product={data.products[3]} isImageFirst={true} />
    </Wrapper>
  );
}

export default Frame;
