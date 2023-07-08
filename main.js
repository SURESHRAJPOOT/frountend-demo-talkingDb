document.addEventListener('DOMContentLoaded', function() {
  const processButton = document.querySelector('.process-button');
  const pdfNameInput = document.querySelector('#pdfName');
  const pdfFrame = document.getElementById('pdfFrame');

  processButton.addEventListener('click', function() {
    const files = document.querySelectorAll('.upload-input');
    const formData = new FormData();

    // Append the selected files to the formData object
    files.forEach(function(file, index) {
      const filePaths = [
        '/home/suresh/Desktop/Files/frountend-demo/1ICF template Copy.docx',
        '/home/suresh/Desktop/Files/frountend-demo/2protocol_document_input.docx',
        '/home/suresh/Desktop/Files/frountend-demo/3Protocol_template_alternate.docx',
        '/home/suresh/Desktop/Files/frountend-demo/4prompt_templates.csv'
      ];

      const fieldName = index === 3 ? 'prompts_file' : 'pdf' + (index + 1);
      const fileBlob = new Blob([file.files[0]], { type: 'application/pdf' });
      formData.append(fieldName, fileBlob, filePaths[index]);
    });

    // Append the missing fields to the formData object
    formData.append('text', pdfNameInput.value);
    formData.append('source_template', files[0].files[0]);
    formData.append('sink_template', files[1].files[0]);
    formData.append('input_document', files[2].files[0]);
    formData.append('prompts_file', files[3].files[0]);

    // Send the POST request with the updated formData object
    fetch('https://dpai-core.smarter.codes/icf/main?output_filename=res', {
      method: 'POST',
      body: formData
    })
    .then(function(response) {
      return response.blob();
    })
    .then(function(blob) {
      const url = URL.createObjectURL(blob);
      pdfFrame.src = url;
    })
    .catch(function(error) {
      console.error(error);
    });
  });
});
