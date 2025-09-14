import mongoose, { Schema, models, model } from "mongoose";

export const VIDEO_DIMENSIONS = {
  height: 1080,
  width: 1920,
} as const;

export interface IVideo {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  createdAt: Date;
  UpdatedAt: Date;
  controls?: boolean;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
}
const videoSchema = new Schema<IVideo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  thumbnail: { type: String, required: true },
  controls: { type: Boolean, default: true },
  transformation: {
    height: { type: Number, default: VIDEO_DIMENSIONS.height },
    width: { type: Number, default: VIDEO_DIMENSIONS.width },
    quality: { type: Number, min: 1, max: 100 },
  },
},
{ timestamps: true}

);


const Video = models?.Video || model("Video", videoSchema);

export default Video