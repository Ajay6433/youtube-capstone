// context/VideoContext.jsx
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../api/api";

const VideoContext = createContext();

export function VideoProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]); // ✅ New
  const [loading, setLoading] = useState(true);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/videos");
      setVideos(res.data.videos);
      setFilteredVideos(res.data.videos); // ✅ By default, show all
    } catch (error) {
      console.error("Error fetching videos:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <VideoContext.Provider
      value={{
        videos,
        filteredVideos, // ✅ now available
        setFilteredVideos, // ✅ allows SearchBar to update filtered results
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
