import React from "react";

function ImageClip(props: { source: string }) {
  return (
    <video className="w-full aspect-auto" autoPlay loop>
      <source src={props.source} /*type="video/mp4"*/ />
    </video>
  );
}

export default ImageClip;
