import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Welcome to the Nawy Apartments Task</h1>
        <p>
          This task is focused on implementing the functionality for creating
          and viewing apartments for the Nawy company.
        </p>

        <h2>Task Overview:</h2>
        <ul>
          <li>Implement an API to create new apartments.</li>
          <li>Implement an API to fetch apartment details.</li>
          <li>Ensure a clean and user-friendly UI for managing apartments.</li>
        </ul>

        <h2>Key Features:</h2>
        <ul>
          <li>Create and manage apartments with all necessary details.</li>
          <li>
            View apartment details with images and all relevant information.
          </li>
          <li>Responsive design for both mobile and desktop views.</li>
        </ul>

        <div className={styles.ctas}>
          <Link className={styles.primary} href="/apartments/create">
            Create Apartment
          </Link>
          <Link href="/apartments" className={styles.secondary}>
            Available Apartments
          </Link>
        </div>
      </main>
    </div>
  );
}
