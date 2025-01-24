import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "@/hook/usePagination";
import "../styles/Pagination.css";
interface PaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number; // Optional with default value
  currentPage: number;
  pageSize: number;
  className?: string; // Optional
}
const Pagination = (props: PaginationProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (
    currentPage === 0 ||
    (paginationRange as (string | number)[]).length < 2
  ) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = (paginationRange as (string | number)[])[
    (paginationRange as (string | number)[]).length - 1
  ];
  return (
    <ul
      key={currentPage}
      className={classnames("pagination-container", {
        [className as string]: className,
      })}
    >
      {/* Left navigation arrow */}
      <li
        key={"arrow-left"}
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {(paginationRange as (string | number)[]).map(
        (pageNumber, key: number) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <li key={key} className="pagination-item dots">
                &#8230;
              </li>
            );
          }

          // Render our Page Pills
          return (
            <li
              key={key}
              className={classnames("pagination-item", {
                selected: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber as number)}
            >
              {pageNumber}
            </li>
          );
        }
      )}
      {/*  Right Navigation arrow */}
      <li
        key={"arrow-right"}
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
