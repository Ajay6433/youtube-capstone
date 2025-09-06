import { useState, useEffect } from "react";
import api from "../../api/api";
import { BiLike, BiDislike } from "react-icons/bi";
import { toast } from "react-hot-toast";


const Comments = (videoId) => {
    const user = localStorage.getItem("user");
    const [activeComment, setActiveComment] = useState(null); // for tracking which comment's menu is open
    const parsedUser = user ? JSON.parse(user) : null;
    const [comments, setComments] = useState([]);
    const [input, setInput] = useState("");
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingComment, setEditingComment] = useState(null);
    const [editText, setEditText] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await api.get(`/comments/${videoId.videoId}`);
                setComments(res.data.comments);
            } catch (err) {
                console.error("Failed to load comments.");
            }
        };
        if (videoId) fetchComments();
    }, [videoId]);


    // Add comment
    const handleAdd = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        console.log(input);
        try {
            const token = parsedUser?.token; // or localStorage.getItem("token")
            const res = await api.post(
                `/comments/${videoId.videoId}`,
                { text: input.trim() },
                {

                    headers: {
                        Authorization: `JWT ${token}`,
                    },
                }
            );
            toast.success(res.data.message);
            setComments([res.data.comment, ...comments]);
            setInput("");
        } catch (err) {
            console.error("Failed to add comment.");
        }
    };

    // Delete comment
    const handleDelete = async (commentId) => {
        try {
            const isOwner = comments.find((c) => c._id === commentId)?.user?._id === parsedUser?.user?.id;
            if (!isOwner) {
                toast.error("You can only delete your own comments");
                return;
            }
            const token = parsedUser?.token;
            await api.delete(`/comments/${commentId}`, {
                headers: {
                    Authorization: `JWT ${token}`,
                },
            });
            setComments(comments.filter((c) => c._id !== commentId));
            toast.success("Comment deleted");
        } catch (err) {
            console.error("Failed to delete comment");
            toast.error("Failed to delete comment");
        }
    };

    // Edit comment
    const handleEdit = async (commentId, newText) => {
        const isOwner = comments.find((c) => c._id === commentId)?.user?._id === parsedUser?.user?.id;
        if (!isOwner) {
            toast.error("You can only edit your own comments");
            return;
        }
        try {
            const token = parsedUser?.token;
            const res = await api.put(
                `/comments/${commentId}`,   // ✅ just use commentId
                { text: newText },
                {
                    headers: {
                        Authorization: `JWT ${token}`,
                    },
                }
            );

            setComments(
                comments.map((c) =>
                    c._id === commentId ? { ...c, text: res.data.text } : c
                )
            );
            toast.success("Comment updated");
        } catch (err) {
            console.error("Failed to update comment");
            toast.error("Failed to update comment");
        }
    };

    const openEditModal = (comment) => {
        setEditingComment(comment);
        setEditText(comment.text);
        setIsEditOpen(true);
    };

    // console.log(comments);
    // console.log(parsedUser);

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{comments.length} Comments</h3>
                <div className="flex items-center gap-2 text-gray-600">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
                    <span>Sort by</span>
                </div>
            </div>
            {parsedUser && (
                <form onSubmit={handleAdd} className="flex items-center gap-2 mb-6">
                    <img src={parsedUser.user.avatar || "/default-avatar.png"} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
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

            {isEditOpen && editingComment && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Edit Comment</h2>
                        <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
                            rows="4"
                        />
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setIsEditOpen(false)}
                                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    await handleEdit(editingComment._id, editText);
                                    setIsEditOpen(false);
                                }}
                                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-6">
                {comments.map((comment) => (
                    <div key={comment._id} className="flex items-start gap-4 group relative">
                        <img src={comment.user.avatar || "/default-avatar.png"} alt={comment.user?.name || comment.user?.username || "User"} className="w-10 h-10 rounded-full object-cover" />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm">@{comment.user?.name || comment.user?.username || "User"}</span>
                                <span className="text-xs text-gray-500">{comment.date || comment.createdAt?.slice(0, 10)}</span>
                            </div>
                            <div className="mt-1 text-[15px] whitespace-pre-line">
                                {comment.text}
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-gray-600 text-sm">
                                <button
                                    className={`flex items-center gap-1 hover:text-blue-600 ${comment.liked ? "text-blue-600" : ""}`}
                                    onClick={() => { }}
                                >
                                    <BiLike className="w-4 h-4 mr-1" />
                                    {comment.likes || 0}
                                </button>
                                <button className="flex items-center gap-1 hover:text-blue-600">
                                    <BiDislike className="w-4 h-4 mr-1" />
                                </button>
                                <button className="hover:underline">Reply</button>
                                <div className="relative ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                    {/* 3-dot button */}
                                    <button
                                        onClick={() => setActiveComment(comment._id)} // set which comment's menu is open
                                        className="flex items-center p-1 rounded-full hover:bg-gray-100 transition"
                                    >
                                        <svg
                                            className="w-5 h-5 text-gray-600"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <circle cx="10" cy="4" r="2" />
                                            <circle cx="10" cy="10" r="2" />
                                            <circle cx="10" cy="16" r="2" />
                                        </svg>
                                    </button>

                                    {/* Dropdown tooltip */}
                                    {activeComment === comment._id && (
                                        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                            <button
                                                onClick={() => openEditModal(comment)} // ✅ open modal
                                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                                            >
                                                ✏️ Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(comment._id)}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
}
export default Comments;