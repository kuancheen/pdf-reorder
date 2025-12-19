# PDF Reorder v0.1.0 (Beta)

A premium, client-side web application to reorder pages of a PDF file.

## Features
- **Secure & Private**: All processing happens in your browser. Files are never uploaded to a server.
- **Flexible Ordering**: Use comma-separated lists (e.g., `1, 3, 2`) or ranges (e.g., `1-5, 10, 8-6`).
- **Premium UI**: Modern design with glassmorphism and smooth animations.
- **Fast**: Leverages `pdf-lib` for efficient PDF manipulation.

## How to Use
1.  **Upload**: Click the upload area or drag and drop a PDF file.
2.  **Verify**: The app will display the total number of pages in the uploaded file.
3.  **Command**: Enter your desired page order in the text input.
    - Example: `1-3, 5, 4` results in pages 1, 2, 3, 5, and then 4.
4.  **Download**: Click "Reorder & Download" to save your new PDF.

## Technologies
- HTML5 / CSS3 (Vanilla)
- JavaScript (ES6+)
- [pdf-lib](https://pdf-lib.js.org/)
- Google Fonts (Outfit & Inter)

## License
MIT

Copyright (c) 2025 kuancheen
