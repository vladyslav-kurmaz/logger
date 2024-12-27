'use client';

export function BrokenForm() {

  const handleSubmit = (e) => {
    e.preventDefault();
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