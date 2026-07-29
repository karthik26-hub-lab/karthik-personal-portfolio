"use client";

import React, { cloneElement, createContext, isValidElement, useCallback, useContext, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import './Carousel.css';

// A simple utility to merge classNames
const cx = (...classes) => classes.filter(Boolean).join(" ");

export const CarouselContext = createContext(null);

export const useCarousel = () => {
    const context = useContext(CarouselContext);

    if (!context) {
        throw new Error("The `useCarousel` hook must be used within a <Carousel />");
    }

    return context;
};

const CarouselRoot = ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }) => {
    const [carouselRef, api] = useEmblaCarousel(
        {
            ...opts,
            axis: orientation === "horizontal" ? "x" : "y",
        },
        plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    const onInit = useCallback((api) => {
        if (!api) return;
        setScrollSnaps(api.scrollSnapList());
    }, []);

    const onSelect = useCallback((api) => {
        if (!api) return;
        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
        setSelectedIndex(api.selectedScrollSnap());
    }, []);

    const scrollPrev = useCallback(() => {
        api?.scrollPrev();
    }, [api]);

    const scrollNext = useCallback(() => {
        api?.scrollNext();
    }, [api]);

    const handleKeyDown = useCallback(
        (event) => {
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                scrollPrev();
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                scrollNext();
            }
        },
        [scrollPrev, scrollNext],
    );

    useEffect(() => {
        if (!api || !setApi) return;
        setApi(api);
    }, [api, setApi]);

    useEffect(() => {
        if (!api) return;

        onInit(api);
        onSelect(api);

        api.on("reInit", onInit);
        api.on("reInit", onSelect);
        api.on("select", onSelect);

        return () => {
            api?.off("select", onSelect);
        };
    }, [api, onInit, onSelect]);

    return (
        <CarouselContext.Provider
            value={{
                carouselRef,
                api,
                opts,
                orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
                scrollPrev,
                scrollNext,
                canScrollPrev,
                canScrollNext,
                selectedIndex,
                scrollSnaps,
            }}
        >
            <div onKeyDownCapture={handleKeyDown} className={cx("embla-root", className)} role="region" aria-roledescription="carousel" {...props}>
                {children}
            </div>
        </CarouselContext.Provider>
    );
};

const CarouselContent = ({ className, overflowHidden = true, ...props }) => {
    const { carouselRef, orientation } = useCarousel();

    return (
        <div ref={carouselRef} className={cx("embla-viewport", overflowHidden ? "is-hidden" : "")}>
            <div className={cx("embla-container", orientation === "vertical" ? "is-vertical" : "", className)} {...props} />
        </div>
    );
};

const CarouselItem = ({ className, ...props }) => {
    return <div role="group" aria-roledescription="slide" className={cx("embla-slide", className)} {...props} />;
};

const Trigger = ({ className, children, asChild, direction, style, ...props }) => {
    const { scrollPrev, canScrollNext, scrollNext, canScrollPrev } = useCarousel();

    const isDisabled = direction === "prev" ? !canScrollPrev : !canScrollNext;

    const handleClick = () => {
        if (isDisabled) return;
        direction === "prev" ? scrollPrev() : scrollNext();
    };

    const computedClassName = typeof className === "function" ? className({ isDisabled }) : className;
    const defaultAriaLabel = direction === "prev" ? "Previous slide" : "Next slide";

    if (typeof children === "function") {
        return <>{children({ isDisabled, onClick: handleClick })}</>;
    }

    if (asChild && isValidElement(children)) {
        return cloneElement(children, {
            onClick: handleClick,
            disabled: isDisabled,
            "aria-label": defaultAriaLabel,
            style: { ...children.props.style, ...style },
            className: [computedClassName, children.props.className].filter(Boolean).join(" ") || undefined,
        });
    }

    return (
        <button aria-label={defaultAriaLabel} disabled={isDisabled} className={computedClassName} onClick={handleClick} {...props}>
            {children}
        </button>
    );
};

const CarouselPrevTrigger = (props) => <Trigger {...props} direction="prev" />;
const CarouselNextTrigger = (props) => <Trigger {...props} direction="next" />;

const CarouselIndicator = ({ index, isSelected = false, children, asChild, className, style }) => {
    const { api, selectedIndex } = useCarousel();

    isSelected = isSelected || selectedIndex === index;

    const handleClick = () => {
        api?.scrollTo(index);
    };
    const computedClassName = typeof className === "function" ? className({ isSelected }) : className;
    const defaultAriaLabel = "Go to slide " + (index + 1);

    if (typeof children === "function") {
        return <>{children({ isSelected, onClick: handleClick })}</>;
    }

    if (asChild && isValidElement(children)) {
        return cloneElement(children, {
            onClick: handleClick,
            "aria-label": defaultAriaLabel,
            "aria-current": isSelected ? "true" : undefined,
            style: { ...children.props.style, ...style },
            className: [computedClassName, children.props.className].filter(Boolean).join(" ") || undefined,
        });
    }

    return (
        <button aria-label={defaultAriaLabel} aria-current={isSelected ? "true" : undefined} className={computedClassName} onClick={handleClick}>
            {children}
        </button>
    );
};

const CarouselIndicatorGroup = ({ children, ...props }) => {
    const { scrollSnaps } = useCarousel();

    if (typeof children === "function") {
        return <nav {...props}>{scrollSnaps.map((_, index) => children({ index }))}</nav>;
    }

    return <nav {...props}>{children}</nav>;
};

export const Carousel = {
    Root: CarouselRoot,
    Content: CarouselContent,
    Item: CarouselItem,
    PrevTrigger: CarouselPrevTrigger,
    NextTrigger: CarouselNextTrigger,
    IndicatorGroup: CarouselIndicatorGroup,
    Indicator: CarouselIndicator,
};
