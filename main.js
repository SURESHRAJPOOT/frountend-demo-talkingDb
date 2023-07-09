document.addEventListener('DOMContentLoaded', function() {
  const processButton = document.querySelector('.process-button');
  const pdfNameInput = document.querySelector('#pdfName');
  const pdfFrame = document.getElementById('pdfFrame');

  processButton.addEventListener('click', function() {
    const files = document.querySelectorAll('.upload-input');
    const formData = new FormData();

    // Append the missing fields to the formData object
    formData.append('source_template', files[0].files[0]); // Assign pdf1 to source template
    formData.append('sink_template', files[1].files[0]); // Assign pdf2 to sink template
    formData.append('input_document', files[2].files[0]); // Assign pdf3 to input document
    formData.append('prompts_file', files[3].files[0]); // Assign prompts file to AI training
    formData.append('text', pdfNameInput.value); // Assign the value of the text input

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
