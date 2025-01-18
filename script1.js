
document.addEventListener('DOMContentLoaded', function() {
    const newFileBtn = document.getElementById('newFile');
    const saveFileBtn = document.getElementById('saveFile');
    const runCodeBtn = document.getElementById('runCode');
    const fileList = document.getElementById('fileList');
    const tabsContainer = document.getElementById('tabs');
    const codeEditor = document.getElementById('codeEditor');

    // Create a new file and add it to the sidebar
    newFileBtn.addEventListener('click', function() {
        const newFile = document.createElement('li');
        newFile.classList.add('file');
        newFile.textContent = 'newFile.js';
        fileList.appendChild(newFile);
    });

    // Add event listener for file selection
    fileList.addEventListener('click', function(e) {
        if (e.target.classList.contains('file')) {
            openTab(e.target.textContent);
        }
    });

    // Open a tab when a file is clicked
    function openTab(fileName) {
        // Check if the tab is already open
        const existingTab = document.getElementById(fileName);
        if (!existingTab) {
            const tab = document.createElement('button');
            tab.id = fileName;
            tab.textContent = fileName;
            tab.classList.add('tab');
            tab.addEventListener('click', function() {
                switchTab(fileName);
            });
            tabsContainer.appendChild(tab);
        }
    }

    // Switch to the selected tab
    function switchTab(fileName) {
        // Clear all tabs' active class
        const tabs = document.querySelectorAll('.tabs button');
        tabs.forEach(tab => tab.classList.remove('active'));

        // Set active class to the clicked tab
        const activeTab = document.getElementById(fileName);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Set editor content to the selected file (for now, just load the file name)
        codeEditor.value = `// Editing ${fileName}\n`;
    }

    // Save the file (for now, just log it)
    saveFileBtn.addEventListener('click', function() {
        console.log("File saved!");
        alert('File saved!');
    });

    // Run the code (for now, just log it)
    runCodeBtn.addEventListener('click', function() {
        console.log("Code running...");
        alert('Code running!');
    });
});















runCodeBtn.addEventListener('click', function() {
    try {
        eval(editor.getValue());  // Executes the code in the editor
    } catch (error) {
        console.error('Error:', error);
        alert('Code execution failed');
    }
});









document.getElementById('closeAllTabs').addEventListener('click', function() {
    const tabs = document.querySelectorAll('.tabs button');
    tabs.forEach(tab => tab.remove());
    editor.setValue("// All tabs closed");
});








const editor = CodeMirror(document.getElementById('codeEditorDiv'), {
    lineNumbers: true,
    mode: "javascript", // Set default mode to JavaScript (you can change this dynamically later)
    theme: "dracula", // Dark theme
tabSize: 2,
    indentUnit: 2,
    lineWrapping: true,

});

// Set initial content for the editor
editor.setValue("// Write your JavaScript code here...\n");














function openTab(fileName) {
    const existingTab = document.getElementById(fileName);
    if (!existingTab) {
        const tab = document.createElement('button');
        tab.id = fileName;
        tab.textContent = fileName;

        // Create a close button for the tab
        const closeButton = document.createElement('span');
        closeButton.textContent = ' X';
        closeButton.classList.add('close-btn');
        closeButton.addEventListener('click', function(event) {
            event.stopPropagation();
            closeTab(fileName);
        });

        tab.appendChild(closeButton);
        tab.classList.add('tab');
        tab.addEventListener('click', function() {
            switchTab(fileName);
        });
        tabsContainer.appendChild(tab);
    }
}

function closeTab(fileName) {
    const tab = document.getElementById(fileName);
    if (tab) {
        tab.remove();
    }
}











saveFileBtn.addEventListener('click', function() {
    const fileName = 'untitled.js';  // You could extract the filename dynamically
    const content = editor.getValue();
    fetch('/saveFile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName, content })
    })
    .then(response => response.text())
    .then(data => alert('File saved: ' + data))
    .catch(error => console.error('Error:', error));
});












function openTab(fileName) {
    const fileContent = localStorage.getItem(fileName);
    if (fileContent) {
        editor.setValue(fileContent);  // Load saved content into the editor
    } else {
        editor.setValue("// New file: " + fileName);
    }

    const fileExtension = fileName.split('.').pop().toLowerCase();
    let mode = "javascript";  // Default mode

    if (fileExtension === "html") {
        mode = "htmlmixed";
    } else if (fileExtension === "css") {
        mode = "css";
    }

    editor.setOption("mode", mode);
}











saveFileBtn.addEventListener('click', function() {
    const fileName = editor.getValue().split("\n")[0].split(' ')[2] || 'untitled';
    localStorage.setItem(fileName, editor.getValue());
    alert('File saved!');
});












function openTab(fileName) {
    const fileExtension = fileName.split('.').pop().toLowerCase();
    let mode = "javascript";  // Default mode

    if (fileExtension === "html") {
        mode = "htmlmixed";
    } else if (fileExtension === "css") {
        mode = "css";
    }

    editor.setOption("mode", mode); // Update mode dynamically

    // Check if the tab is already open
    const existingTab = document.getElementById(fileName);
    if (!existingTab) {
        const tab = document.createElement('button');
        tab.id = fileName;
        tab.textContent = fileName;
        tab.classList.add('tab');
        tab.addEventListener('click', function() {
            switchTab(fileName);
        });
        tabsContainer.appendChild(tab);
    }
}







