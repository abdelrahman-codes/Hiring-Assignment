"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <Image
            src={logo}
            alt="Logo"
            width={40}
            height={40}
            onClick={() => {
              window.location.href = "/";
            }}
          />
        </div>
        <div className={styles.navLinks}>
          <Link href="/apartments" className={styles.navLink}>
            List
          </Link>
          <Link href="/apartments/create" className={styles.navLink}>
            Create
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
