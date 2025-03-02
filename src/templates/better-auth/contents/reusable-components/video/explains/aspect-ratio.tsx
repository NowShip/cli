import React from "react";
import { Video } from "../main";

type Props = {};

export default function AspectRatioExplain({}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <Video
          src="https://4dy1hskjy7.ufs.sh/f/bTa5OaPXXZ6rXyXvdMAcqyLVgEBIzP6St18lu72QJabsMUxG"
          aspectRatio={16 / 9}
          controls
          className="max-w-sm rounded-xl"
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
          culpa accusantium sapiente veniam consequatur eaque, molestiae dolorem
          earum et eius esse ea suscipit est mollitia cupiditate quia deleniti
          magni saepe!
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <video
          src="https://4dy1hskjy7.ufs.sh/f/bTa5OaPXXZ6rXyXvdMAcqyLVgEBIzP6St18lu72QJabsMUxG"
          controls
          className="max-w-sm rounded-xl"
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
          culpa accusantium sapiente veniam consequatur eaque, molestiae dolorem
          earum et eius esse ea suscipit est mollitia cupiditate quia deleniti
          magni saepe!
        </p>
      </div>
    </div>
  );
}
