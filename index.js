// Chama as IDs do html
const dropArea = document.getElementById('drop-area');
const fileList = document.getElementById('file-list');
const fileInput = document.getElementById('file-input');
const fileSelect = document.getElementById('file-select');

dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add('highlight');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('highlight');
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.classList.remove('highlight');

    // Obtém os arquivos que foram soltos no drop
    const files = event.dataTransfer.files;
        handleFiles(files);
});

fileSelect.addEventListener('click', (event) => {
    event.preventDefault();
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    handleFiles(files);
});

// Função para determinar o tipo de arquivo com base na extensão
// do nome do arquivo
function getFileType(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
        return 'image';
    } else if (['doc', 'docx', 'pdf', 'txt'].includes(extension)) {
        return 'document';
    } else if (['mp4', 'avi', 'mkv', 'mov'].includes(extension)) {
        return 'video';
    } else {
        return 'other';
    }
}

function handleFiles(files) {
    for (const file of files) {
        // Cria elementos html para exibir as informações do arquivo 
        const listItem = document.createElement('li');
        const fileType = getFileType(file.name);
        const fileItem = document.createElement('div'); 
        fileItem.classList.add('file-item');
        const fileIcon = document.createElement('img');
        fileIcon.classList.add('file-icon');
        fileIcon.src = getFileIconPath(fileType);
        const fileDetails = document.createElement('div');
        fileDetails.classList.add('file-details');
        const fileNameElement = document.createElement('span');
        fileNameElement.textContent = file.name;
        const removeButton = document.createElement('button');
        removeButton.classList.add('button');
        removeButton.textContent = 'Excluir';
        removeButton.addEventListener('click', () => {
            listItem.remove();
        });
        fileDetails.appendChild(fileNameElement);
        fileDetails.appendChild(removeButton);
        fileItem.appendChild(fileIcon);
        fileItem.appendChild(fileDetails);
        listItem.appendChild(fileItem); 
        
        // Adiciona a barra de progresso para o arquivo
        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        const progressBarInner = document.createElement('div');
        progressBarInner.classList.add('progress-bar-inner');
        progressBar.appendChild(progressBarInner);
        listItem.appendChild(progressBar);
        fileList.appendChild(listItem);
        uploadFile(file, progressBarInner);
        }
}

function uploadFile(file, progressBarInner) {
    let progress = 0;
    const progressInterval = setInterval(() => {
        if (progress < 50) {
            progressBarInner.style.width = progress + '%';
            progressBarInner.style.backgroundColor = '#f00'; 
        } else if (progress < 100) {
            progressBarInner.style.width = progress + '%';
            progressBarInner.style.backgroundColor = '#ff0'; 
        } else {
            progressBarInner.style.width = '100%';
            progressBarInner.style.backgroundColor = '#0f0';
            clearInterval(progressInterval);
        }

    progress += 10; }, 200);
        setTimeout(() => {
            clearInterval(progressInterval);
            progressBarInner.style.backgroundColor = '#0f0';
        }, 3000);
}


// Função para retornar o caminho do ícone com base no nome do arquivo    
function getFileIconPath(fileType) {
    switch (fileType) {
        case 'image':
            return 'imagem.png'; 
        case 'document':
            return 'documento.png'; 
        case 'video':
            return 'video.png'; 
            default:
            return 'generico.png'; 
        }
}