from black.handle_ipynb_magics import MagicFinder
import magic  # python-magic library
import os
import subprocess
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
LOG = logging.getLogger('FileUtils')


class FileUtils:
    #   # private static magic = new Magic(MAGIC_MIME_TYPE | MAGIC_CHECK);
    #   magic = new MagicFinder(MAGIC_MIME_TYPE | MAGIC_CHECK)

    @classmethod
    def detect_mime_type(file_path):
        # Create a Magic object
        mime = magic.Magic(mime=True)

        # Get the MIME type of the file
        mime_type = mime.from_file(file_path)

        return mime_type

    @staticmethod
    def get_content_type(input):
        try:
            # Initialize the magic instance
            mime = magic.Magic(mime=True)

            # Determine if input is a string (file path) or bytes
            #       if (typeof input === 'string') {
            if isinstance(input, str):
                result = mime.from_file(input)
            elif isinstance(input, bytes):
                result = mime.from_buffer(input)
            else:
                raise ValueError("Input must be a string (file path) or bytes.")

            # If the result is 'application/octet-stream', use an alternative method
            if result == 'application/octet-stream':
                return FileUtils.get_content_type_from_file_command(input)
            #       return await FileUtils.getContentTypeFromFileCommand(input)

            return result
        except Exception as e:
            LOG.error(f"Error determining content type: {e}")
            raise

    @staticmethod
    def get_content_type_from_file_command(input):
        # Implement logic to determine content type using a command (e.g., `file` command)
        try:
            if isinstance(input, str):
                command = ['file', '--mime-type', '-b', input]
                result = subprocess.run(command, capture_output=True, text=True, check=True)
                return result.stdout.strip()
            else:
                raise ValueError("Input must be a string (file path) for this method.")
        except Exception as e:
            LOG.error(f"Error determining content type from command: {e}")
            raise


# Example usage
if __name__ == "__main__":
    try:
        file_path = 'path/to/your/file.txt'
        content_type = FileUtils.get_content_type(file_path)
        print(f'The content type is: {content_type}')

        # TEST
        mime_type = FileUtils.detect_mime_type(file_path)
        print(f'The MIME type of the file is: {mime_type}')
    except Exception as e:
        print(f'Error: {e}')

# Install Additional Dependencies (if necessary):
# On some systems, you may need to install additional dependencies for python-magic to work properly. For example, on Ubuntu, you can install the libmagic package:
# sudo apt-get install libmagic1
