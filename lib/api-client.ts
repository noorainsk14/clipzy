import { IVideo } from "@/models/Video";

export type VideoFormData = Omit<IVideo, "_id">;

type FetchOptions<T = unknown> = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: T;
  headers?: Record<string, string>;
};

class ApiClient {

  private async fetch<T>(
    endPoint: string,
    options: FetchOptions = {}
  ):Promise <T>{
    const {method = "GET", body, headers = {}} = options;

    const defayltHeaders = {
      "Content-Type" : "Application/json",
      ...headers,
    };

    const response = await fetch(`api/${endPoint}`, {
      method,
      headers: defayltHeaders,
      body: body ? JSON.stringify(body): undefined
    });

    if(!response.ok) {
      throw new Error(await response.text())
    }
    return response.json();
  }

  async getVideos(){
    return this.fetch<IVideo[]>("/videos")
  }

  async getVideo(id: string){
    return this.fetch<IVideo>(`/videos/${id}`)
  }

  async createVideo(videoData: VideoFormData){
    return this.fetch<IVideo>("/videos",{
      method: "POST",
      body: videoData
    })
  }

}

export const apiClient = new ApiClient();