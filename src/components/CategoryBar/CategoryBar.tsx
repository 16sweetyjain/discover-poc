"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import ChevronRight from "@spectrum-icons/workflow/ChevronRight";
import ChevronLeft from "@spectrum-icons/workflow/ChevronLeft";
import classNames from "classnames";
import { Button } from "@adobe/react-spectrum";
import Link from "next/link";
import style from "./categoryBar.module.scss";

const CategoryBar = ({ data }) => {
  const listRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(true);
  const [showRightButton, setShowRightButton] = useState(true);
  const [activeButton, setActiveButton] = useState("all");
  const [query, setQuery] = useState("");
  const modifiedData = [{ id: "all", name: "All" }, ...data];

  const router = useRouter();
  const params = useParams();

  const handleScroll = () => {
    const lastCategory = document.getElementById("travel");
    const firstCategory = document.getElementById("animals");
    const rightHandleObserver = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShowRightButton(false);
        } else {
          setShowRightButton(true);
        }
      });
    };

    const leftHandleObserver = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShowLeftButton(false);
        } else {
          setShowLeftButton(true);
        }
      });
    };

    const lastObserver = new IntersectionObserver(rightHandleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    });

    const firstObserver = new IntersectionObserver(leftHandleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    });

    firstObserver.observe(firstCategory);
    lastObserver.observe(lastCategory);
  };

  useEffect(() => {
    handleScroll();
  }, []);

  useEffect(() => {
    setActiveButton(params.allcategories as string);
  }, []);

  const scrollLeft = () => {
    if (showLeftButton) {
      const list = listRef.current;
      const scrollAmount = -200;
      list.scrollTo({
        left: list.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    const list = listRef.current;
    const scrollAmount = 200;
    list.scrollTo({
      left: list.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  const handleButtonClick = (button: any) => {
    setActiveButton(button);
    
  };

  const handleCategoryClick = (event) => {
    const category = event.target.textContent.toLowerCase();
    setQuery(event.target.textContent);
    setActiveButton(category);
  };

  return (
    <div className={style.categoryBar}>
      <Button
        variant="primary"
        onPress={scrollLeft}
        id={style.arrowIcon}
        isHidden={!showLeftButton}
      >
        <ChevronLeft />
      </Button>
      <div className={style.scrollContainer} ref={listRef}>
        <div id="scroll-container" className={style.scrollDiv}>
          {modifiedData.map((category, index) => (
            <Link
              key={category.id}
              href={
                category.id === "all"
                  ? "/en/discover/category/all"
                  : `/en/discover/category/${category.id}`
              }
              passHref
            >
              <div
                key={category.id}
                id={classNames({
                  animals: index === 0,
                  travel: index === data.length - 1,
                })}
                onClick={(e) => {
                  handleButtonClick(category.id);
                  handleCategoryClick(e);
                }}
                className={`${style.categoryBtn} ${
                  activeButton === category.id ? style.selected : ""
                }`}
              >
                {category.name}
              </div>
            </Link>
          ))}
        </div>
        {/* <imageGrid { query }/> */}
      </div>
      <Button
        variant="secondary"
        onPress={scrollRight}
        id={style.arrowIcon}
        isHidden={!showRightButton}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default CategoryBar;
