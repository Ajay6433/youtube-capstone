import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../api/api";

const VideoContext = createContext();

export function VideoProvider({ children }) {
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchVideos = useCallback(async () => {
		setLoading(true);
		try {
			const res = await api.get("/videos");
			setVideos(res.data.videos);
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
		<VideoContext.Provider value={{ videos, loading, refetch: fetchVideos }}>
			{children}
		</VideoContext.Provider>
	);
}

export function useVideos() {
	return useContext(VideoContext);
}
