import React, { useState } from 'react';
import { db, collection, addDoc } from '../firebase'; // Import Firebase functions

export default function ResourceForm() {
  const [resourceName, setResourceName] = useState('');
  const [resourceDescription, setResourceDescription] = useState('');
  const [resourceLink, setResourceLink] = useState('');
  const [category, setCategory] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page refresh

    const newResource = {
      name: resourceName,
      description: resourceDescription,
      link: resourceLink,
      category: category,
    };

    try {
      // Add the new resource to the Firestore collection
      const docRef = await addDoc(collection(db, "resources"), newResource);
      console.log("Document written with ID: ", docRef.id);

      // Reset the form after submission
      setResourceName('');
      setResourceDescription('');
      setResourceLink('');
      setCategory('');
      setSubmitted(true);
      setError('');
    } catch (e) {
      console.error("Error adding document: ", e);
      setError('Error submitting the resource.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Submit a New Resource</h2>

      {submitted && <p className="text-center text-green-500">Resource submitted successfully!</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="resourceName" className="block text-sm font-medium">Resource Name</label>
          <input
            type="text"
            id="resourceName"
            value={resourceName}
            onChange={(e) => setResourceName(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="resourceDescription" className="block text-sm font-medium">Resource Description</label>
          <textarea
            id="resourceDescription"
            value={resourceDescription}
            onChange={(e) => setResourceDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="resourceLink" className="block text-sm font-medium">Resource Link</label>
          <input
            type="url"
            id="resourceLink"
            value={resourceLink}
            onChange={(e) => setResourceLink(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select Category</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Food">Food</option>
            <option value="Shelter">Shelter</option>
            <option value="Employment">Employment</option>
          </select>
        </div>

        <div className="mb-4">
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Submit Resource
          </button>
        </div>
      </form>
    </div>
  );
}
