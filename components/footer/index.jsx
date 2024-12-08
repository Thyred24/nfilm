import React from 'react';
import styles from "@/components/footer/styles.module.css";
import Link from 'next/link';

function Footer() {
  return (
    <footer className={styles.footer}>
        Made by&nbsp;
        <Link href="https://twitter.com/thyred_" target='_blank'>
            Thyred
        </Link>
    </footer>
  )
}

export default Footer