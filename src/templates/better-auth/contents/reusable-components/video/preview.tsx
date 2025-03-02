import React from "react";
import { Video, VideoShadow } from "./main";

export default function VideoPreview() {
  return (
    <VideoShadow>
      <Video
        src="https://4dy1hskjy7.ufs.sh/f/bTa5OaPXXZ6rXyXvdMAcqyLVgEBIzP6St18lu72QJabsMUxG"
        aspectRatio={16 / 9}
        controls
        className="rounded-xl"
      />
    </VideoShadow>
  );
}
