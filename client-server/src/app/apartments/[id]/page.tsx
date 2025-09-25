"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./ApartmentDetails.module.css";

// Define the data structure for an apartment
interface Apartment {
  _id: string;
  name: string;
  unit_number: string;
  project_name: string;
  description: string;
  price: number;
  location: string;
  map_location: string;
  images: string[];
}

// --- SKELETON LOADER COMPONENT ---
const SkeletonLoader = () => (
  <div className={styles.container}>
    {/* Skeleton Title */}
    <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>

    <div className={styles.grid}>
      {/* Left Column: Image Gallery Skeleton */}
      <div className={styles.imageGallery}>
        {/* Main Image Skeleton */}
        <div className={`${styles.skeleton} ${styles.skeletonMainImage}`}></div>

        {/* Thumbnail Gallery Skeleton */}
        <div
          className={`${styles.thumbnailGallery} ${styles.skeletonGalleryContainer}`}
        >
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`${styles.skeleton} ${styles.skeletonThumbnail}`}
            ></div>
          ))}
        </div>
      </div>

      {/* Right Column: Details Section Skeleton */}
      <div className={styles.detailsSection}>
        {/* Details Header Skeleton */}
        <div
          className={`${styles.skeleton} ${styles.skeletonDetailsHeader}`}
        ></div>

        {/* Description Skeleton Lines */}
        <div
          className={`${styles.skeleton} ${styles.skeletonDescriptionLine}`}
        ></div>
        <div
          className={`${styles.skeleton} ${styles.skeletonDescriptionLine} ${styles.w90}`}
        ></div>
        <div
          className={`${styles.skeleton} ${styles.skeletonDescriptionLine} ${styles.w60}`}
        ></div>

        {/* Detail List Skeletons */}
        <dl className={styles.detailList}>
          {[...Array(4)].map((_, index) => (
            <div key={index} className={styles.detailItem}>
              <dt
                className={`${styles.skeleton} ${styles.skeletonDetailLabel}`}
              ></dt>
              <dd
                className={`${styles.skeleton} ${styles.skeletonDetailValue}`}
              ></dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </div>
);
// ---------------------------------

const ApartmentDetails = () => {
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const pathname = usePathname();

  const id = pathname?.split("/").pop();

  useEffect(() => {
    if (!id) {
      setError("Apartment ID not found in URL.");
      setLoading(false);
      return;
    }

    const fetchApartment = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
          throw new Error(
            "API URL is not configured in environment variables."
          );
        }

        const res = await fetch(`${apiUrl}/api/apartments/${id}`);

        if (!res.ok) {
          throw new Error(
            `Failed to fetch apartment details: ${res.status} ${res.statusText}`
          );
        }

        const data = await res.json();
        if (!data.data) {
          throw new Error("Invalid data structure received from API.");
        }
        setApartment(data.data);
      } catch (e) {
        console.error("Fetch Error:", e);
        setError(`Failed to load details. ${(e as Error).message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchApartment();
  }, [id]);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const currentApartment = apartment;
  const mapUrl = currentApartment?.map_location
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        currentApartment.map_location
      )}`
    : null;

  if (loading) {
    // Display the Skeleton Loader
    return <SkeletonLoader />;
  }

  if (error) {
    return <div className={styles.errorState}>Error: {error}</div>;
  }

  if (!currentApartment) {
    return <div className={styles.errorState}>Apartment data is missing.</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{currentApartment.name}</h1>{" "}
      <div className={styles.grid}>
        {/* Image Gallery Section */}{" "}
        <div className={styles.imageGallery}>
          {" "}
          {currentApartment.images.length === 0 ? (
            <div className={styles.placeholderImage}>
              <span>No Image Available</span>{" "}
            </div>
          ) : (
            <div className={styles.imageWrapper}>
              {" "}
              <img
                src={
                  currentApartment.images[currentImageIndex] ||
                  currentApartment.images[0]
                }
                alt={`Main view of ${currentApartment.name}`}
                className={styles.mainImage}
              />{" "}
            </div>
          )}
          {/* All Images in One Scrollable Row */}{" "}
          {currentApartment.images.length > 0 && (
            <div className={styles.thumbnailGallery} role="tablist">
              {" "}
              {currentApartment.images.map((image, index) => (
                <button
                  key={index}
                  role="tab"
                  aria-selected={index === currentImageIndex}
                  aria-controls={`main-image-${index}`}
                  className={`${styles.thumbnail} ${
                    index === currentImageIndex ? styles.activeThumbnail : ""
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  {" "}
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    loading="lazy"
                  />{" "}
                </button>
              ))}{" "}
            </div>
          )}{" "}
        </div>
        {/* Details Section */}{" "}
        <div className={styles.detailsSection}>
          <h2 className={styles.details}>Apartment Details</h2>
          <p className={styles.description}>
            {currentApartment.description}
          </p>{" "}
          <dl className={styles.detailList}>
            {" "}
            {currentApartment?.location && (
              <div className={styles.detailItem}>
                <dt>Location:</dt> <dd>{currentApartment.location}</dd>{" "}
              </div>
            )}{" "}
            <div className={styles.detailItem}>
              <dt>Project Name:</dt> <dd>{currentApartment.project_name}</dd>{" "}
            </div>{" "}
            <div className={styles.detailItem}>
              <dt>Unit Number:</dt> <dd>{currentApartment.unit_number}</dd>{" "}
            </div>{" "}
            <div className={styles.detailItem}>
              <dt>Price:</dt>{" "}
              <dd className={styles.price}>
                {currentApartment.price.toLocaleString()} EGP{" "}
              </dd>{" "}
            </div>{" "}
          </dl>
          {/* Google Maps Link Section */}{" "}
          {mapUrl && (
            <div className={styles.mapLinkContainer}>
              {" "}
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                View Location in Google Maps 🗺️{" "}
              </a>{" "}
            </div>
          )}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default ApartmentDetails;
