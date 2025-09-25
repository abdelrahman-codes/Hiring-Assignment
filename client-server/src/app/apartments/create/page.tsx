"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./CreateApartment.module.css";

// Define the type for the formData
interface FormData {
  name: string;
  unit_number: string;
  project_name: string;
  description: string;
  price: number;
  location: string;
  map_location: string;
  images: File[];
}

const CreateApartment = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    unit_number: "",
    project_name: "",
    description: "",
    price: 0,
    location: "",
    map_location: "",
    images: [],
  });
  const [error, setError] = useState<string | null>(null); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple client-side validation
    if (
      !formData.name ||
      !formData.unit_number ||
      !formData.project_name ||
      !formData.price ||
      !formData.location ||
      !formData.description
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true); // Set loading to true when submission starts
    // Create a new FormData object
    const formDataToSend = new FormData();

    // Append the non-file fields
    formDataToSend.append("name", formData.name);
    formDataToSend.append("unit_number", formData.unit_number);
    formDataToSend.append("project_name", formData.project_name);
    formDataToSend.append("price", formData.price.toString());
    formDataToSend.append("location", formData.location);
    formDataToSend.append("map_location", formData.map_location);
    formDataToSend.append("description", formData.description);

    // Append the images if they exist
    if (formData.images && formData.images.length > 0) {
      formData.images.forEach((image, index) => {
        formDataToSend.append("files", image); 
      });
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/apartments`,
      {
        method: "POST",
        body: formDataToSend,
      }
    );

    if (res.ok) {
      setLoading(false); // Set loading to false when submission ends
      router.push("/apartments");
    } else {
      setLoading(false); // Set loading to false when submission ends
      setError("Failed to create apartment. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create New Apartment</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name" className={styles.label}>
              Apartment Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter the apartment name"
              className={styles.input}
              required
            />
          </div>

          <div>
            <label htmlFor="unit_number" className={styles.label}>
              Unit Number <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="unit_number"
              value={formData.unit_number}
              onChange={handleChange}
              placeholder="Enter unit number"
              className={styles.input}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className={styles.label}>
            Description <span className={styles.required}>*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the apartment"
            className={styles.textarea}
            required
          />
        </div>

        <div className={styles.grid}>
          <div>
            <label htmlFor="project_name" className={styles.label}>
              Project Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="project_name"
              value={formData.project_name}
              onChange={handleChange}
              placeholder="Enter the project name"
              className={styles.input}
              required
            />
          </div>

          <div>
            <label htmlFor="price" className={styles.label}>
              Price <span className={styles.required}>*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter the price"
              className={styles.input}
              required
            />
          </div>
        </div>

        <div className={styles.grid}>
          <div>
            <label htmlFor="location" className={styles.label}>
              Location Details <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter the location"
              className={styles.input}
              required
            />
          </div>
          <div>
            <label htmlFor="map_location" className={styles.label}>
              Location On Map
            </label>
            <input
              type="text"
              name="map_location"
              value={formData.map_location}
              onChange={handleChange}
              placeholder="Enter map location"
              className={styles.input}
            />
          </div>
        </div>

        <div>
          <label htmlFor="images" className={styles.label}>
            Upload Images
          </label>
          <input
            type="file"
            name="images"
            multiple
            onChange={(e) =>
              setFormData({
                ...formData,
                images: Array.from(e.target.files || []),
              })
            }
            className={styles.input}
          />
        </div>

        {formData.images.length > 0 && (
          <div className={styles.imagePreview}>
            {formData.images.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Image Preview ${index}`}
              />
            ))}
          </div>
        )}
        {error && <p className={styles.required}>{error}</p>}
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Creating..." : "Create Apartment"}
        </button>
      </form>
    </div>
  );
};

export default CreateApartment;
