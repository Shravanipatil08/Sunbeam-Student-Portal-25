import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/userAuth";
import { getMyCoursesWithVideos } from "../../Services/studentServices";

function ViewVideo() {
    const { auth } = useAuth();
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        if (auth?.user?.email && auth.token) {
            loadVideos();
        }
    }, [auth.token]);

    const loadVideos = async () => {
        const response = await getMyCoursesWithVideos(
            auth.user.email,
            auth.token
        );

        if (response.status === "success") {
            setVideos(response.data);
        }
    };

    if (selectedVideo) {
        return (
            <div className="container mt-4">
                <button
                    type="button"
                    className="btn btn-secondary mb-3"
                    onClick={() => setSelectedVideo(null)}
                >
                    ← Back
                </button>

                <h3>{selectedVideo.title}</h3>
                <p className="text-muted">
                    Course: <strong>{selectedVideo.course_name}</strong>
                </p>

                <div style={{ maxWidth: "900px" }}>
                    <iframe
                        src={selectedVideo.youtube_url}
                        width="100%"
                        height="500"
                        allowFullScreen
                        title="video"
                        style={{
                            border: "none",
                            borderRadius: "8px",
                            background: "#000"
                        }}
                    />
                </div>

                <p className="text-muted mt-2">
                    Added:{" "}
                    {new Date(selectedVideo.added_at).toLocaleString()}
                </p>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2>My Courses & Videos</h2>

            {videos.length === 0 ? (
                <p className="text-muted">No videos available</p>
            ) : (
                videos.map((v) => (
                    <div
                        className="border p-3 mt-3 rounded"
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedVideo(v)}
                    >
                        <strong className="text-primary">
                            {v.course_name}
                        </strong>
                        <br />
                        <span>{v.title}</span>
                        <br />
                        <small className="text-muted">
                            Added:{" "}
                            {new Date(v.added_at).toLocaleString()}
                        </small>
                    </div>
                ))
            )}
        </div>
    );
}

export default ViewVideo;
