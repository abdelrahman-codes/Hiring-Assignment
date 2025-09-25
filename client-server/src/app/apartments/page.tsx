"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./ApartmentList.module.css"; 

interface Apartment {
  _id: string;
  name: string;
  unit_number: string;
  project_name: string;
  price: number;
  images: string[];
}

const ApartmentList = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [filters, setFilters] = useState({
    searchTerm: "",
    currentPage: 1,
    perPage: 6,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // For skeleton loading state

  const fetchApartments = async () => {
    const { searchTerm,  currentPage, perPage } = filters;

    // Send pagination and filters data to the backend
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/apartments?page=${currentPage}&size=${perPage}&searchTerm=${searchTerm}`
    );
    const { data } = await res.json();
    setApartments(data.apartments);
    setTotalPages(data.totalPages);
    setLoading(false); // Stop loading once the data is fetched
  };

  useEffect(() => {
    fetchApartments();
  }, [filters]); // Re-fetch when filters change

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, searchTerm: e.target.value, currentPage: 1 });
  };

  const handlePageChange = (newPage: number) => {
    setFilters({ ...filters, currentPage: newPage });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Apartments</h1>

      {/* Search  */}
      <div className={styles.filterContainer}>
        <input
          type="text"
          placeholder="Search apartments"
          value={filters.searchTerm}
          onChange={handleSearchChange}
          className={styles.input}
        />
      </div>

      {/* Cards Layout */}
      {loading ? (
        // Display skeleton loading cards
        <div className={styles.cardContainer}>
          {[...Array(filters.perPage)].map((_, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.skeleton}></div>
              <div className={styles.skeleton}></div>
              <div className={styles.skeleton}></div>
              <div className={styles.skeleton}></div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.cardContainer}>
          {apartments.map((apartment) => (
            <Link
              href={`/apartments/${apartment._id}`}
              key={apartment._id}
              className={styles.card}
            >
              <h3 className={styles.cardHeader}>{apartment.name}</h3>
              <p className={styles.cardInfo}>Unit: {apartment.unit_number}</p>
              <p className={styles.cardInfo}>
                Project: {apartment.project_name}
              </p>
              <p className={styles.cardPrice}>{apartment.price} EGP</p>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(filters.currentPage - 1)}
          disabled={filters.currentPage === 1}
          className={styles.paginationButton}
        >
          Previous
        </button>
        <span className={styles.pageNumber}>
          Page {filters.currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(filters.currentPage + 1)}
          disabled={filters.currentPage >= totalPages}
          className={styles.paginationButton}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ApartmentList;
