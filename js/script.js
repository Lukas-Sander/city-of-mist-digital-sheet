document.addEventListener('DOMContentLoaded', () => {
    
    const saveButton = document.getElementById("saveButton");
    const loadButton = document.getElementById("loadButton");
    const imageInputA = document.getElementById("imageInputA");
    const selectedImageA = document.getElementById("selectedImageA");
    const imageInputB = document.getElementById("imageInputB");
    const selectedImageB = document.getElementById("selectedImageB");
    
    function updateCardClasses() {
        document.querySelectorAll('.card [name="title"]').forEach((e) => {
            let card = e.closest('.card');
            
            if(e.value == 'Mythos') {
                card.classList.add('card-mythos');
                card.classList.remove('card-logos');
            }
            else if(e.value == 'Logos') {
                card.classList.add('card-logos');
                card.classList.remove('card-mythos');
            }
        });
    }
    
    // Function to save character data to a text file
    function saveCharacterData() {
        const characterData = JSON.stringify(JSON.parse(document.getElementById('characterData').textContent), null, 2);
        const blob = new Blob([characterData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'character_data.txt';
        a.click();
        saveButton.style.backgroundColor = '';
    }
    
    // Attach a click event listener to the "Save" button
    saveButton.addEventListener("click", saveCharacterData);
    
    // Function to load character data from a text file
    function loadCharacterData(fileInput) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const characterData = JSON.parse(event.target.result);
            document.getElementById('characterData').textContent = JSON.stringify(characterData, null, 2);
            
            // Populate the form with loaded data (assuming the field IDs match)
            for (var fieldId in characterData) {
                var element = document.getElementById(fieldId);
                
                if (element) {
                    if (element.type === "checkbox") {
                        element.checked = characterData[fieldId];
                    } else {
                        element.value = characterData[fieldId];
                    }
                }
                
                if(fieldId === 'characterImage') {
                    document.querySelector('#selectedImageA').src = characterData[fieldId];
                    document.querySelector('#selectedImageA').style.display = 'block';
                    if(characterData[fieldId] !== '') {
                        imageInputA.style.display = 'none';
                    }
                }
                
                if(fieldId === 'mythosImage') {
                    document.querySelector('#selectedImageB').src = characterData[fieldId];
                    document.querySelector('#selectedImageB').style.display = 'block';
                    if(characterData[fieldId] !== '') {
                        imageInputB.style.display = 'none';
                    }
                }
            }
            saveButton.style.backgroundColor = '';
            updateCardClasses();
        };
        
        reader.readAsText(file);
    }
    
    // Attach a change event listener to the file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'text/plain';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    
    loadButton.addEventListener("click", () => {
        fileInput.value = null; // Reset the file input
        fileInput.click();
    });
    
    fileInput.addEventListener('change', () => loadCharacterData(fileInput));
    
    
    // Attach event listeners to inputs, checkboxes, selects, and textareas
    var inputElements = document.querySelectorAll('input:not([type="file"]), select, textarea');
    
    inputElements.forEach(function (element) {
        element.addEventListener("input", function () {
            
            saveButton.style.backgroundColor = 'red';
            let characterData = document.querySelector('#characterData');
            let data = JSON.parse(characterData.innerHTML);
            var fieldId = element.id;
            var fieldValue = element.value;
            
            if (element.type === "checkbox") {
                fieldValue = element.checked;
            }
            
            data[fieldId] = fieldValue;
            characterData.innerHTML = JSON.stringify(data);
            
            updateCardClasses();
        });
    });
    
    // Function to load and display the selected image
    function displaySelectedImage(fileInput, imgElement, id, imageInput) {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                imgElement.src = event.target.result;
                imgElement.style.display = 'block';
                imageInput.style.display = 'none';
                
                
                let characterData = document.querySelector('#characterData');
                let data = JSON.parse(characterData.innerHTML);
                var fieldId = id;
                var fieldValue = imgElement.src;      
                data[fieldId] = fieldValue;
                characterData.innerHTML = JSON.stringify(data);
                
                
            };
            reader.readAsDataURL(file);
        } else {
            // If no file is selected, hide the image
            imgElement.style.display = 'none';
            imageInput.style.display = 'block';
            
            let characterData = document.querySelector('#characterData');
            let data = JSON.parse(characterData.innerHTML);
            var fieldId = id;
            data[fieldId] = '';
            characterData.innerHTML = JSON.stringify(data);
        }
        
        
    }
    
    
    imageInputA.addEventListener("change", function () {
        if(this.files[0].size > 2097152){
            alert("Maximal 2MB Bilder.");
            this.value = "";
            return;
        };
        
        displaySelectedImage(this, selectedImageA, 'characterImage', imageInputA);
        saveButton.style.backgroundColor = 'red';
    });
    
    imageInputB.addEventListener("change", function () {
        if(this.files[0].size > 2097152){
            alert("Maximal 2MB Bilder.");
            this.value = "";
            return;
        };
        
        displaySelectedImage(this, selectedImageB, 'mythosImage', imageInputB);
        saveButton.style.backgroundColor = 'red';
    });
    
    selectedImageA.addEventListener('click', () => {
        imageInputA.click();
    });
    
    selectedImageB.addEventListener('click', () => {
        imageInputB.click();
    });
    
    
    // Initialize the form and character data on page load
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('form').forEach((e) => {
            e.reset();
            
        });
        updateCardClasses();
    });
    
});