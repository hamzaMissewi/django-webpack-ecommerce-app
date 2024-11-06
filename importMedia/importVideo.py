import os
import json
import logging
from datetime import datetime
from typing import Optional, Dict, Any
import uuid
import asyncio
from os import fstat
from yt_dlp import YoutubeDL
from django.conf import settings


# from nanoid import generate
# python -m pip install yt_dlp


# async def async_method(self, value):
#     print(f"Starting async method with value: {value}")
#     await asyncio.sleep(2)  # Simulate an asynchronous operation
#     print(f"Finished async method with value: {value}")
#     return value * 2
#

# return generate(alphabet="abcdefghijklmnopqrstuvwxyz0123456789", size=size)


def short_id():
    new_id = uuid.uuid4()
    print(f"Generated UUID: {new_id}")
    return new_id


def assert_file_exists(filePath):
    try:
        # await fstat(filePath)
        os.stat(filePath)
    except Exception as error:
        logging.debug(f"File does not exist, path: {filePath}, error: ${error}")
        raise RuntimeError(f"File does not exist, path: {filePath}, error: ${error}")


async def download_video_from_url(
        # self,
        folder_name: str,
        url: str,
        playlist_index: Optional[int] = None,
        format_geometry: Optional[Dict[str, Optional[int]]] = None,
        # format_geometry: Optional[{width int, height int}] = None,
) -> Dict[str, Any]:
    video_output_id = short_id()
    format_ytb_dl_geometry = "bv*+ba/b*"

    if format_geometry:
        if (
                format_geometry.get("width") is not None
                and format_geometry.get("height") is not None
        ):
            format_ytb_dl_geometry = f'bv*[height={format_geometry["height"]}][width={format_geometry["width"]}]+ba/b*'
        elif format_geometry.get("height") is not None:
            format_ytb_dl_geometry = f'bv*[height={format_geometry["height"]}]+ba/b*'
        elif format_geometry.get("width") is not None:
            format_ytb_dl_geometry = f'bv*[width={format_geometry["width"]}]+ba/b*'

    # Create a YoutubeDL object
    # with YoutubeDL() as ydl:
    # Download the video
    # ydl.download([video_url])
    try:
        ydl_opts = {
            "format": format_ytb_dl_geometry or "best",
            "playlist_items": (
                str(playlist_index) if playlist_index is not None else None
            ),
            # "outtmpl": "downloads/%(title)s.%(ext)s",  # Output template
            "outtmpl": f"{video_output_id}.%(ext)s",
            # "output": f"{video_output_id}.%(ext)s",
            "paths": {
                "home": folder_name,  # Ensure this is a dictionary
            },
            "path": folder_name,
            "write_info_json": True,
            "ffmpeg_location": "C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe",
            "merge_output_format": "mp4/webm/mkv/mov/avi",
        }

        # ytb_dl_response = await yt_dlp.YoutubeDL(
        #     ydl_opts,
        # ).download([url])

        with yt_dlp.YoutubeDL(ydl_opts) as ydlInstance:
            outputPath = ydlInstance.get_output_path()
            ytb_dl_response = ydlInstance.download([url])
            #     await asyncio.sleep(2)  # Simulate an asynchronous operation

        # logging.debug("youtube dl exec download video stdout: " + str(ytb_dl_response))
        print("youtube dl exec download video stdout: " + str(ytb_dl_response), f'output path {outputPath}')

        # ytb_dl_json_file_path = os.path.join(
        #     folder_name, f"{video_output_id}.info.json"
        # )

        ytb_dl_json_file_path = f"../{folder_name}/{video_output_id}.info.json"

        file_json_path = (
            ytb_dl_json_file_path
            if ytb_dl_json_file_path.endswith("info.json")
            else f"{ytb_dl_json_file_path}.info.json"
        )

        logging.debug(f"file path created: {file_json_path}")
        print(f"file path created: {file_json_path}")

        await assert_file_exists(file_json_path)

        with open(file_json_path, "r") as f:
            data = json.load(f)

        file_video_extension = None

        if data["_type"] == "video":
            file_video_extension = data.get("ext") or next(
                (
                    format["ext"]
                    for format in data.get("formats", [])
                    if format.get("ext")
                       and format.get("width")
                       and format.get("height")
                ),
                None,
            )
        elif data["_type"] == "playlist" and "entries" in data:
            for entry in data["entries"]:
                if entry.get("ext") and entry.get("width") and entry.get("height"):
                    file_video_extension = entry["ext"]
                    break

        video_path = (
                ytb_dl_json_file_path.replace(".info", "").rsplit(".", 1)[0]
                + f'.{file_video_extension or "mp4"}'
        )

        logging.debug(f"downloaded video path: {video_path}")
        await assert_file_exists(video_path)

        if data["_type"] == "playlist" and "entries" in data:
            entry = data["entries"][0]
            return {
                "videoPath": video_path,
                "title": entry.get("fulltitle")
                         or entry.get("title")
                         or f'VIDEO-{data["webpage_url_domain"]}-{datetime.now().strftime("%Y-%m-%d %H:%M:%S")}',
                "url": entry.get("url")
                       or entry.get("original_url")
                       or entry.get("webpage_url"),
                "extension": file_video_extension,
                "width": entry.get("width"),
                "height": entry.get("height"),
            }
        elif data["_type"] == "video":
            return {
                "videoPath": video_path,
                "title": data.get("fulltitle")
                         or data.get("title")
                         or f'VIDEO-{data["webpage_url_domain"]}-{datetime.now().strftime("%Y-%m-%d %H:%M:%S")}',
                "url": data.get("url")
                       or data.get("original_url")
                       or data.get("webpage_url"),
                "extension": file_video_extension,
                "width": data.get("width"),
                "height": data.get("height"),
            }
        else:
            raise ValueError(f'Ytb-dl data type {data["_type"]} is not supported')

    except Exception as error:
        logging.error(f"Failed to find videos for url: {url}, error: {str(error)}")
        raise RuntimeError(
            f"Cannot download video url with youtube dl, error: {str(error)}"
        )


# if __name__ == "__main__":
async def main():
    folder_name = "youtube_dl_downloads"  # Specify your desired folder path
    # video_url = "https://russmus.net/wp-content/uploads/2024/02/russian-porn-5.gif"
    # video_url = "https://russmus.net/wp-content/uploads/2024/02/russian-porn-9.gif"
    # video_url = "https://russmus.net/wp-content/uploads/2024/02/russian-porn-15.gif"
    # video_url = "https://russmus.net/wp-content/uploads/2024/02/russian-porn-24.gif"
    video_url = "https://russmus.net/wp-content/uploads/2024/02/russian-porn-28.gif"
    data = await download_video_from_url(folder_name, video_url)
    print(f"download video finished successfully with title {data.title}")


asyncio.run(main())

# folder_name = "youtube_dl_downloads"  # Specify your desired folder path
# video_url = "https://russmus.net/wp-content/uploads/2024/02/russian-porn-5.gif"
# download_video_from_url(folder_name, video_url)
