import { Video, VideoHide } from "../main";

export default function DataActiveExplain() {
  return (
    <Video
      src="https://4dy1hskjy7.ufs.sh/f/bTa5OaPXXZ6rXyXvdMAcqyLVgEBIzP6St18lu72QJabsMUxG"
      aspectRatio={16 / 9}
      controls
      className="max-w-xl rounded-xl"
    >
      <VideoHide className="absolute top-0 right-0 left-0 bg-black/50 p-4 text-white transition data-[active=true]:-translate-y-full">
        <h2 className="text-lg font-medium">Video</h2>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
          laudantium maxime.
        </p>
      </VideoHide>
    </Video>
  );
}
