// Instagram Ctrl+Enter Submit Handler

function handleKeyDown(event) {
  // Check if Enter key is pressed
  if (event.key === 'Enter') {
    // Check if the target is a textarea or contenteditable element (Instagram comment fields)
    const isCommentField = event.target.matches('textarea[aria-label*="コメント"], textarea[aria-label*="Comment"], [contenteditable="true"][role="textbox"]');

    if (isCommentField) {
      // If Ctrl+Enter is pressed, allow submission
      if (event.ctrlKey || event.metaKey) {
        // Allow default behavior (submit)
        return;
      }

      // If only Enter is pressed (without Ctrl), prevent submission
      event.stopPropagation();
      event.stopImmediatePropagation();

      // Insert a line break instead
      if (event.target.tagName === 'TEXTAREA') {
        const textarea = event.target;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;

        textarea.value = value.substring(0, start) + '\n' + value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 1;

        // Trigger input event to update React state
        const inputEvent = new Event('input', { bubbles: true });
        textarea.dispatchEvent(inputEvent);
      } else {
        // For contenteditable elements
        document.execCommand('insertLineBreak');
      }

      event.preventDefault();
    }
  }
}

// Add event listener with capture phase to intercept before Instagram's handlers
document.addEventListener('keydown', handleKeyDown, true);

// Re-attach listener when navigating (Instagram is a SPA)
const observer = new MutationObserver(() => {
  document.removeEventListener('keydown', handleKeyDown, true);
  document.addEventListener('keydown', handleKeyDown, true);
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});