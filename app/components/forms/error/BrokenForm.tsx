'use client';

// This form intentionally contains errors for demonstration
export function BrokenForm() {
  // Missing form state management
  const handleSubmit = (e) => {
    e.preventDefault();
    // No form validation
    // No error handling
    console.log('Form submitted');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label>Name</label>
        {/* Missing form control and validation */}
        <input placeholder="John Doe" />
      </div>
      <div>
        <label>Email</label>
        <input placeholder="john@example.com" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}