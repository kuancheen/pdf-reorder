const { PDFDocument } = PDFLib;

// DOM Elements
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const fileInfo = document.getElementById('file-info');
const filenameDisplay = document.getElementById('filename-display');
const pageCountDisplay = document.getElementById('page-count-display');
const controlsSection = document.getElementById('controls-section');
const orderInput = document.getElementById('order-input');
const reorderBtn = document.getElementById('reorder-btn');
const btnText = document.getElementById('btn-text');
const btnLoader = document.getElementById('btn-loader');
const statusMsg = document.getElementById('status-msg');
const progressContainer = document.getElementById('upload-progress-container');
const progressBar = document.getElementById('progress-bar');
const progressPercent = document.getElementById('progress-percent');

let currentFile = null;
let totalPages = 0;
let originalPdfDoc = null;

// Event Listeners
dropZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => handleFileSelect(e.target.files[0]));

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files.length > 0) {
        handleFileSelect(e.dataTransfer.files[0]);
    }
});

reorderBtn.addEventListener('click', handleReorder);

// Handlers
async function handleFileSelect(file) {
    if (!file || file.type !== 'application/pdf') {
        showStatus('Please select a valid PDF file.', 'error');
        return;
    }

    currentFile = file;
    filenameDisplay.textContent = file.name;

    // Show progress container
    progressContainer.style.display = 'block';
    fileInfo.classList.remove('visible');
    controlsSection.classList.remove('visible');
    updateProgress(0);

    try {
        // Simulate progress since arrayBuffer() is fast locally but gives feedback
        updateProgress(30);
        const arrayBuffer = await file.arrayBuffer();
        updateProgress(60);

        originalPdfDoc = await PDFDocument.load(arrayBuffer);
        totalPages = originalPdfDoc.getPageCount();

        updateProgress(100);
        setTimeout(() => {
            progressContainer.style.display = 'none';
            pageCountDisplay.textContent = `${totalPages} Pages`;
            fileInfo.classList.add('visible');
            controlsSection.classList.add('visible');
        }, 500);

        showStatus('', ''); // Clear errors
    } catch (err) {
        console.error(err);
        progressContainer.style.display = 'none';
        showStatus('Error reading PDF file. It might be password protected or corrupted.', 'error');
    }
}

async function handleReorder() {
    const orderStr = orderInput.value.trim();
    if (!orderStr) {
        showStatus('Please enter the new page order.', 'error');
        return;
    }

    const pageIndices = parseOrderString(orderStr, totalPages);
    if (pageIndices.length === 0) {
        showStatus('Invalid page order format or out of range indices.', 'error');
        return;
    }

    setLoading(true);
    try {
        const newPdfDoc = await PDFDocument.create();

        // Copy pages one by one based on indices
        // pdf-lib's copyPages works with an array of indices
        const copiedPages = await newPdfDoc.copyPages(originalPdfDoc, pageIndices);
        copiedPages.forEach((page) => newPdfDoc.addPage(page));

        const pdfBytes = await newPdfDoc.save();

        // Generate filename with suffix
        const nameParts = currentFile.name.split('.');
        const ext = nameParts.pop();
        const baseName = nameParts.join('.');
        const newFileName = `${baseName}_reordered.${ext}`;

        downloadBlob(pdfBytes, newFileName, 'application/pdf');

        showStatus('Success! Your reordered PDF has been downloaded.', 'success');
    } catch (err) {
        console.error(err);
        showStatus('An error occurred while reordering the PDF.', 'error');
    } finally {
        setLoading(false);
    }
}

// Utils
function parseOrderString(str, total) {
    const indices = [];
    const parts = str.split(',').map(p => p.trim());

    for (const part of parts) {
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(n => parseInt(n.trim(), 10));
            if (isNaN(start) || isNaN(end) || start < 1 || end < 1 || start > total || end > total) {
                return []; // Invalid range
            }
            if (start <= end) {
                for (let i = start; i <= end; i++) indices.push(i - 1);
            } else {
                for (let i = start; i >= end; i--) indices.push(i - 1);
            }
        } else {
            const num = parseInt(part, 10);
            if (isNaN(num) || num < 1 || num > total) {
                return []; // Invalid number
            }
            indices.push(num - 1);
        }
    }
    return indices;
}

function showStatus(msg, type) {
    statusMsg.textContent = msg;
    statusMsg.className = 'status-message';
    if (type) {
        statusMsg.classList.add(type);
    }
}

function updateProgress(percent) {
    progressBar.style.width = `${percent}%`;
    progressPercent.textContent = `${percent}%`;
}

function setLoading(isLoading) {
    reorderBtn.disabled = isLoading;
    if (isLoading) {
        btnText.style.display = 'none';
        btnLoader.style.display = 'block';
    } else {
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
    }
}

function downloadBlob(data, fileName, mimeType) {
    const blob = new Blob([data], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    window.URL.revokeObjectURL(url);
}
