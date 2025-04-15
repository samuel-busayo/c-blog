document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const readMoreBtn = document.getElementById('readMoreBtn');
  const fullContent = document.getElementById('fullContent');
  const editBtn = document.getElementById('editBtn');
  const deleteBtn = document.getElementById('deleteBtn');
  const editFormContainer = document.getElementById('editFormContainer');
  const cancelEdit = document.getElementById('cancelEdit');

  // Read More Toggle
  if (readMoreBtn && fullContent) {
    readMoreBtn.addEventListener('click', function() {
      const isExpanded = fullContent.style.display === 'block';
      
      fullContent.style.display = isExpanded ? 'none' : 'block';
      this.classList.toggle('active');
      this.querySelector('.btn-text').textContent = 
        isExpanded ? 'Read Full Story' : 'Show Less';
    });
  }
  
  // Edit Form Toggle
  if (editBtn && editFormContainer) {
    editBtn.addEventListener('click', function() {
      editFormContainer.style.display = 'block';
      window.scrollTo({
        top: editFormContainer.offsetTop - 20,
        behavior: 'smooth'
      });
    });
  }
  
  // Cancel Edit
  if (cancelEdit) {
    cancelEdit.addEventListener('click', function() {
      editFormContainer.style.display = 'none';
    });
  }
  
  // Delete Confirmation - Updated with new dialog
  if (deleteBtn) {
    deleteBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const postId = this.dataset.postId;
      showDeleteDialog(postId);
    });
  }

  // New Delete Dialog Function
  function showDeleteDialog(postId) {
    const dialog = document.createElement('div');
    dialog.className = 'delete-dialog';
    dialog.innerHTML = `
      <div class="dialog-overlay"></div>
      <div class="dialog-content">
        <h3><i class="fas fa-trash-can"></i> Delete Story</h3>
        <p>Are you sure you want to delete this story? This action cannot be undone.</p>
        <div class="dialog-actions">
          <button class="btn btn-cancel">Cancel</button>
          <button class="btn btn-confirm-delete">Delete</button>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);
    document.body.style.overflow = 'hidden';

    // Handle cancel
    dialog.querySelector('.btn-cancel').addEventListener('click', () => {
      dialog.remove();
      document.body.style.overflow = '';
    });

    // Handle confirm
    dialog.querySelector('.btn-confirm-delete').addEventListener('click', () => {
      deletePost(postId);
      dialog.remove();
      document.body.style.overflow = '';
    });
  }

  // New Delete Post Function
  function deletePost(postId) {
    fetch(`/posts/${postId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        showSuccessMessage('Story deleted successfully!');
        setTimeout(() => window.location.href = '/', 1500);
      } else {
        throw new Error('Failed to delete post');
      }
    })
    .catch(error => {
      showErrorMessage('Error deleting story. Please try again.');
      console.error('Error:', error);
    });
  }

  // New Success/Error Message Functions
  function showSuccessMessage(text) {
    showAlertMessage(text, 'success');
  }

  function showErrorMessage(text) {
    showAlertMessage(text, 'error');
  }

  function showAlertMessage(text, type) {
    const alert = document.createElement('div');
    alert.className = `alert-message ${type}`;
    alert.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${text}</span>
    `;
    
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 3000);
  }
});