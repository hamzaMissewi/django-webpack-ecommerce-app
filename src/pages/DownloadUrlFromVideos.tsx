import React, {FormEventHandler, useCallback, useState} from 'react';
import axios from "axios";
import {Stack} from "@mui/material";

DownloadUrlFromVideos.propTypes = {};

function DownloadUrlFromVideos() {
    const [urlState, setUrlState] = useState<string>('');

    const handleDownload = useCallback(async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/download', {url: urlState}, {responseType: 'blob'});
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'video.mp4'); // Set the file name
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading the video:', error);
        }
    }, [])

    return (
        <Stack>
            <h1>YouTube Video Downloader</h1>
            <form onSubmit={handleDownload}>
                <input
                    className={"w-full px-2"}
                    type="url"
                    placeholder="Enter YouTube video URL"
                    value={urlState}
                    onChange={(e) => setUrlState(e.target.value)}
                    required
                />
                <button type="submit">Download</button>
            </form>
        </Stack>
    );
}

export default DownloadUrlFromVideos;