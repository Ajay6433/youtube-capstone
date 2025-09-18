import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../api/api";

const VideoContext = createContext();

export function VideoProvider({ children }) {
  // State to hold all videos 
  const [videos, setVideos] = useState([]);
  // State for filtered videos 
  const [filteredVideos, setFilteredVideos] = useState([]);
  // Loading state
  const [loading, setLoading] = useState(true);

  // Fetch videos from backend
  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/videos");
      setVideos(res.data.videos);
      setFilteredVideos(res.data.videos); // By default, shows all
    } catch (error) {
      console.error("Error fetching videos:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch videos on mount 
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <VideoContext.Provider
      value={{
        videos,
        filteredVideos, 
        setFilteredVideos,
        loading,
        refetch: fetchVideos,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export function useVideos() {
  return useContext(VideoContext);
}
