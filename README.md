# PDF Reorder v0.1.4 (Beta)

[![Version](https://img.shields.io/badge/version-v0.1.4--Beta-blue)](https://github.com/kuancheen/pdf-reorder/releases)
[![Status](https://img.shields.io/badge/status-active-success)](#)
[![Live Demo](https://img.shields.io/badge/demo-live-orange)](https://kuancheen.github.io/pdf-reorder/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Semantic Versioning](https://img.shields.io/badge/semver-2.0.0-blue)](https://semver.org/spec/v2.0.0.html)
![Views](https://hits.sh/kuancheen.github.io/pdf-reorder.svg?view=today-total&style=flat&label=Views&extraCount=0&color=6366f1)

A premium, client-side web application to reorder pages of a PDF file.

## Features
- **Secure & Private**: All processing happens in your browser. Files are never uploaded to a server.
- **Flexible Ordering**: Use comma-separated lists (e.g., `1, 3, 2`) or ranges (e.g., `1-5, 10, 8-6`).
- **Upload Progress**: Visual progress bar provides feedback during PDF processing.
- **Smart Filename**: Reordered files use the `_reordered` suffix (e.g., `document_reordered.pdf`).
- **Premium UI**: Modern design with glassmorphism, smooth animations, and gradient branding.
- **Header Icon**: Integrated app icon for enhanced branding and visual identity.
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
