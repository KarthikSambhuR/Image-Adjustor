
# Image Processing App

A simple web-based image processing application that allows users to upload an image, resize it, apply compression, and then download the processed image. The app supports features like resizing, compression (by quality or size), and adjusting image fill options.

## Features

- **Image Upload**: Upload an image from your local device.
- **Resize Options**: Resize the image by specifying width and height or use fill/stretch options.
- **Compression Options**: Compress the image by quality or file size, or skip compression entirely.
- **Download Processed Image**: Download the processed image with the same name as the original image, appended with "_processed".
- **Responsive UI**: The app is designed to work seamlessly on both desktop and mobile devices.

## Getting Started

These instructions will help you set up and run the image processing app locally.

### Prerequisites

You need a modern web browser (Chrome, Firefox, Safari, etc.) and basic knowledge of HTML and JavaScript.

### Installation

1. Clone the repository or download the source code:

   ```bash
   git clone https://github.com/your-username/image-processing-app.git
   cd image-processing-app
   ```

2. Open `index.html` in your browser. The app doesn't require any server-side setup as it runs entirely in the browser.

   Alternatively, you can host the files on any static web hosting service.

### Usage

1. **Upload Image**: Click on the file input field and select an image from your device. The image name will be displayed once uploaded.
   
2. **Resize Image**: You can manually adjust the width and height of the image. Choose the resize option:
   - **None**: No resizing, keep the original image size.
   - **Fill**: Resize the image to fit within the specified width and height, while maintaining its aspect ratio.
   - **Stretch**: Stretch the image to the exact width and height you specified.

3. **Compression Options**:
   - **None**: No compression is applied.
   - **Quality**: Reduce image quality to decrease the file size.
   - **Size**: Adjust the image quality to meet the desired file size (in KB).
   
4. **Download Image**: After processing, the app generates a download link. Click it to download the processed image. The file will be named based on the original image name with `_new` appended to it.
