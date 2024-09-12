import { MouseEvent } from "react";
import styles from "./Paginator.module.css";
import { clsx } from "clsx";

interface IPaginatorProps {
  currentPage: number;
  handlePageClick: (e: MouseEvent<HTMLButtonElement>) => void;
  pageCount: number;
}

export default function Paginator({
  currentPage,
  handlePageClick,
  pageCount,
}: IPaginatorProps) {
  const divList = [...Array(pageCount).keys()].map((i) => {
    const isSelected = currentPage === i;
    return (
      <>
        <button
          key={i}
          id={(i).toString()}
          className={clsx(styles.button, isSelected ? styles.selected : "")}
          onClick={handlePageClick}
        >
          {i + 1}
        </button>
      </>
    );
  });

  return (
    <>
      <button
        className={styles.button}
        onClick={handlePageClick}
        key={"<"}
        id="prev"
      >
        {"<"}
      </button>
      {divList}
      <button
        className={styles.button}
        onClick={handlePageClick}
        key={">"}
        id="next"
      >
        {">"}
      </button>
    </>
  );
}
