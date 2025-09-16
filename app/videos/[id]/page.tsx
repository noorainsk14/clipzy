"use client";

import React, { useEffect, useState, use } from "react";
import VideoFeed from "../../components/VideoFeed";
import { IVideo } from "@/models/Video";

export default function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  // ✅ Unwrap the async `params` using React.use()
  const { id } = use(params);

  const [video, setVideo] = useState<IVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // ✅ Check for valid MongoDB ObjectId length
    if (id.length !== 24) {
      setError(true);
      setLoading(false);
      return;
    }

    const fetchVideo = async () => {
      try {
        const response = await fetch(`/api/videos/${id}`);
        if (!response.ok) {
          setError(true);
          return;
        }

        const data = await response.json();
        setVideo(data);
      } catch (err) {
        console.error("Error fetching video:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error || !video) return <p>Video not found</p>;

  return (

<div className="flex justify-center items-center min-h-screen">
  <div className="card bg-base-100 w-[360px] shadow-sm">
    <figure>
      <VideoFeed videos={[video]} />
    </figure>
  </div>
</div>
  );
}
