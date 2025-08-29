

import { useState, useEffect } from "react";
import api from "../../api/api";


// videoId should be passed as a prop from VideoPlayer
export default function Comments({ videoId }) {
	const user = localStorage.getItem("user");
	const [comments, setComments] = useState([]);
	const [input, setInput] = useState("");
	const [editingId, setEditingId] = useState(null);
	const [editText, setEditText] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	// Fetch comments on mount or when videoId changes
	useEffect(() => {
		const fetchComments = async () => {
			setLoading(true);
			try {
				const res = await api.get(`/comments/${videoId}`);
				setComments(res.data.comments || []);
			} catch (err) {
				setError("Failed to load comments.");
			} finally {
				setLoading(false);
			}
		};
		if (videoId) fetchComments();
	}, [videoId]);

	// Add comment
	const handleAdd = async (e) => {
		e.preventDefault();
		if (!input.trim()) return;
		try {
			const res = await api.post(`/comments/${videoId}`, { text: input.trim() });
			setComments([res.data.comment, ...comments]);
			setInput("");
		} catch (err) {
			setError("Failed to add comment.");
		}
	};

	// Edit comment
	const handleEdit = (id, text) => {
		setEditingId(id);
		setEditText(text);
	};

	const handleEditSave = async (id) => {
		try {
			const res = await api.put(`/comments/${id}`, { text: editText });
			setComments(comments.map(c => c._id === id ? { ...c, text: res.data.comment.text } : c));
			setEditingId(null);
			setEditText("");
		} catch (err) {
			setError("Failed to update comment.");
		}
	};

	// Delete comment
	const handleDelete = async (id) => {
		try {
			await api.delete(`/comments/${id}`);
			setComments(comments.filter(c => c._id !== id));
		} catch (err) {
			setError("Failed to delete comment.");
		}
	};

	// Like/dislike (local only, backend can be added)
	const handleLike = (id) => {
		setComments(comments.map(c =>
			c._id === id
				? { ...c, likes: c.liked ? c.likes - 1 : c.likes + 1, liked: !c.liked }
				: c
		));
	};


	if (loading) return <div className="mt-6">Loading comments...</div>;
	if (error) return <div className="mt-6 text-red-600">{error}</div>;

	return (
		<div className="mt-6">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-xl font-bold">{comments.length} Comments</h3>
				<div className="flex items-center gap-2 text-gray-600">
					<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
					<span>Sort by</span>
				</div>
			</div>
			{user && (
				<form onSubmit={handleAdd} className="flex items-center gap-2 mb-6">
					<img src={user.avatar || "/default-avatar.png"} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
					<input
						type="text"
						className="flex-1 border-b border-gray-300 px-3 py-2 focus:outline-none focus:border-black bg-transparent"
						placeholder="Add a comment..."
						value={input}
						onChange={e => setInput(e.target.value)}
					/>
					<button type="submit" className="text-blue-600 font-semibold px-3 py-1 rounded-lg hover:bg-blue-50 transition">
						Comment
					</button>
				</form>
			)}
			<div className="space-y-6">
				{comments.map((c) => (
					<div key={c._id} className="flex items-start gap-4 group">
						<img src={c.avatar || "/default-avatar.png"} alt={c.user?.name || c.user?.username || "User"} className="w-10 h-10 rounded-full object-cover" />
						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2">
								<span className="font-semibold text-sm">@{c.user?.name || c.user?.username || "User"}</span>
								<span className="text-xs text-gray-500">{c.date || c.createdAt?.slice(0,10)}</span>
							</div>
							{editingId === c._id ? (
								<div className="flex gap-2 mt-1">
									<input
										className="border rounded px-2 py-1 flex-1"
										value={editText}
										onChange={e => setEditText(e.target.value)}
									/>
									<button onClick={() => handleEditSave(c._id)} className="text-green-600 font-semibold">Save</button>
									<button onClick={() => setEditingId(null)} className="text-gray-500">Cancel</button>
								</div>
							) : (
								<div className="mt-1 text-[15px] whitespace-pre-line">
									{c.text && c.text.length > 200 ? (
										<>
											{c.text.slice(0, 200)}... <span className="text-blue-600 cursor-pointer">Read more</span>
										</>
									) : (
										c.text
									)}
								</div>
							)}
							<div className="flex items-center gap-4 mt-2 text-gray-600 text-sm">
								<button
									className={`flex items-center gap-1 hover:text-blue-600 ${c.liked ? "text-blue-600" : ""}`}
									onClick={() => handleLike(c._id)}
								>
									<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 14V7a2 2 0 012-2h5.28a2 2 0 011.95 2.42l-.7 3.16a1 1 0 00.2.88l2.1 2.53a1 1 0 01-.76 1.63H7.21a1 1 0 01-.98-1.2z" /></svg>
									{c.likes || 0}
								</button>
								<button className="flex items-center gap-1 hover:text-blue-600">
									<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 10v7a2 2 0 01-2 2h-5.28a2 2 0 01-1.95-2.42l.7-3.16a1 1 0 00-.2-.88l-2.1-2.53A1 1 0 017.21 9h9.03a1 1 0 01.98 1.2z" /></svg>
								</button>
								<button className="hover:underline">Reply</button>
								{user && c.user && (c.user._id === user._id) && (
									<>
										<button onClick={() => handleEdit(c._id, c.text)} className="text-blue-600 text-xs font-semibold">Edit</button>
										<button onClick={() => handleDelete(c._id)} className="text-red-600 text-xs font-semibold">Delete</button>
									</>
								)}
							</div>
						</div>
						<button className="opacity-0 group-hover:opacity-100 transition text-gray-500 p-2">
							<svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="4" r="2"/><circle cx="10" cy="10" r="2"/><circle cx="10" cy="16" r="2"/></svg>
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
