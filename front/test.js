function handleEditProfileForm(event) {
    event.preventDefault();
    console.log("Form submitted");
  
    // Access the form elements
    const form = event.target;
    const inputs = form.querySelectorAll('input');
  
    // Retrieve form data
    const formData = {};
    inputs.forEach(input => {
      formData[input.name] = input.type === 'checkbox' ? input.checked : input.value;
    });
    console.log("Collected Form Data:", formData);
  
    // Send form data to the server
    fetch('/update-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) throw new Error('Failed to update profile');
      return response.json();
    })
    .then(data => {
      console.log("Profile updated successfully:", data);
      alert("Profile updated successfully!");
    })
    .catch(error => {
      console.error("Error updating profile:", error);
      alert("There was an error updating your profile. Please try again.");
    });
  }
  
  function handleAvatarUpload(event) {
    console.log("Avatar upload changed");
  
    const fileInput = event.target;
    const file = fileInput.files[0];
  
    if (!file) {
      console.log("No file selected");
      return;
    }
  
    // Preview the uploaded image (optional)
    const previewImage = document.getElementById('avatar-preview');
    if (previewImage) {
      previewImage.src = URL.createObjectURL(file);
    }
  
    // Prepare FormData to send the image to the server
    const formData = new FormData();
    formData.append('avatar', file);
  
    // Send avatar image to the server
    fetch('/upload-avatar', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) throw new Error('Fail
  