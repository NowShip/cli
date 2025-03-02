"use client";
import React from "react";
import Content from "@/components/ui/content";
import { Video } from "@/contents/reusable-components/video/main";
export default function TestingPage() {
    const [url, setUrl] = React.useState("https://4dy1hskjy7.ufs.sh/f/bTa5OaPXXZ6rXyXvdMAcqyLVgEBIzP6St18lu72QJabsMUxG");
    return (<Content className="flex flex-col items-center gap-4">
      <input type="file" accept="video/*" onChange={(e) => {
            var _a;
            const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
            if (file) {
                setUrl(URL.createObjectURL(file));
            }
        }}/>
      <Video src={url} 
    // poster="https://4dy1hskjy7.ufs.sh/f/bTa5OaPXXZ6r34915XyCeDAQ8Y9zBGK2pSyVL7gfNWacEhMJ"
    aspectRatio={16 / 9} className="rounded-xl" controls loop playsInline autoPlay="force">
        {/* <VideoHide className="bg-contrast-high/70 absolute top-0 right-0 left-0 p-4 text-white transition-transform data-[active=true]:-translate-y-full">
          <h1 className="mb-2 font-bold">Video Title Goes Here</h1>
          <div className="mb-2 flex items-center gap-4 text-xs">
            <div className="bg-contrast-low h-10 w-10 rounded-full"></div>
            <div>
              <p className="font-medium">Channel Name</p>
              <p>1.2K views • 2 days ago</p>
            </div>
          </div>
          <p className="text-xs">
            This is the video description. You can add multiple paragraphs of
            text here to describe your video content. Include relevant
            information, links, and timestamps if needed.
          </p>
        </VideoHide> */}
      </Video>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
        debitis impedit corrupti modi exercitationem aut, blanditiis aliquid
        saepe veritatis iste, odit nihil. Distinctio ducimus consectetur porro.
        Delectus facilis id odio.
      </p>
      {/* <video
          src="https://4dy1hskjy7.ufs.sh/f/bTa5OaPXXZ6ryKvK8ZdrZKflgJ2B8MdjO1N6qynpsukwUQcx"
          className="max-w-sm rounded-xl"
          controls
          playsInline
        ></video> */}
      {/* <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          porro, quasi, sed, rerum soluta ut voluptas consequatur cupiditate
          doloribus quos maxime. Ut nihil similique a maiores quaerat id autem
          ipsam?
        </p> */}
    </Content>);
}
