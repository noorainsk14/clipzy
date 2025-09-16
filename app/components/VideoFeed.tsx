import { IVideo } from "@/models/Video";
import VideoComponent from "./VideoComponent";
import Link from "next/link";

interface VideoFeedProps {
  videos: IVideo[] | IVideo;
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  const videosArray = Array.isArray(videos) ? videos : [videos];

  const containerClass = videosArray.length === 1
    ? "flex justify-center"
    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";


  return (
    <div className={containerClass}>
      {videosArray.map((video) => (
        <Link key={video._id?.toString()} href={`/videos/${video._id}`}>
          <VideoComponent video={video} />
        </Link>
      ))}

      {videosArray.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-base-content/70">No videos found</p>
        </div>
      )}
    </div>
  );
}
