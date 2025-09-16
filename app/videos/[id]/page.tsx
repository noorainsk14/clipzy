"use client"
import React, { useEffect, useState } from "react";
import VideoFeed from "../../components/VideoFeed";
import { IVideo } from "@/models/Video";
import { apiClient } from "@/lib/api-client";

export default function VideoPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [video, setVideo] = useState<IVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Validate ID length inside effect
  useEffect(() => {
    if (id.length !== 24) {
      setError(true);
      return;
    }

    const fetchVideo = async () => {
      try {
        const data = await apiClient.getVideo(id);
        if (!data) {
          setError(true);
        } else {
          setVideo(data);
        }
      } catch (error) {
        console.error("Error fetching video:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{video?.title}</h1>
      {/* Assuming video.videoUrl is a string; adjust if it's an array */}
      <VideoFeed videos={video ? [video] : []} />

    </div>
  );
}
