'use client';

export function BrokenNewsletterForm() {
  // Intentionally broken form with no validation or proper state management
  return (
    <form className="space-y-4" onSubmit={(e) => {
      e.preventDefault();
      // No validation or error handling
      console.log('Form submitted');
    }}>
      <div>
        <label>Email</label>
        <input 
          type="email" 
          className="w-full border p-2"
          // Missing form control and validation
        />
      </div>
      <div>
        <label>Preferences</label>
        {["News", "Updates", "Events"].map((item) => (
          <div key={item}>
            <input type="checkbox" value={item} />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <button 
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Subscribe
      </button>
    </form>
  );
}