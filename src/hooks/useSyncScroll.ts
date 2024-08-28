import { useEffect, useState } from "react"

/**
 * useSyncScroll hook
 * 
 * This hook synchronizes the scroll position of two HTMLDivElements.
 * It allows for horizontal, vertical, or both directions of synchronization.
 * 
 * @param {React.RefObject<HTMLDivElement>} refOne - Reference to the first div element
 * @param {React.RefObject<HTMLDivElement>} refTwo - Reference to the second div element
 * @param {"horizontal" | "vertical" | "both"} syncMode - The direction of synchronization
 * 
 * @returns {Object} - An object containing the scrollLeft and scrollTop values
 * 
 */
export const useSyncScroll = (
  refOne: React.RefObject<HTMLDivElement>,
  refTwo: React.RefObject<HTMLDivElement>,
  syncMode: "horizontal" | "vertical" | "both"
) => {
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const syncScroll = (refOne: React.RefObject<HTMLDivElement>, refTwo: React.RefObject<HTMLDivElement>) => {
    if (!refOne.current || !refTwo.current) return;

    if (syncMode === "horizontal") {
      refTwo.current.scrollLeft = refOne.current.scrollLeft;
      setScrollLeft(refOne.current.scrollLeft);
    }

    if (syncMode === "vertical") {
      refTwo.current.scrollTop = refOne.current.scrollTop;
      setScrollTop(refOne.current.scrollTop);
    }

    if (syncMode === "both") {
      refTwo.current.scrollLeft = refOne.current.scrollLeft;
      refTwo.current.scrollTop = refOne.current.scrollTop;
      setScrollLeft(refOne.current.scrollLeft);
      setScrollTop(refOne.current.scrollTop);
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      syncScroll(refOne, refTwo);
    }
    refOne.current?.addEventListener("scroll", handleScroll);
    return () => {
      refOne.current?.removeEventListener("scroll", handleScroll);
    };
  }, [refOne, refTwo, syncMode]);

  useEffect(() => {
    const handleScroll = () => {
      syncScroll(refTwo, refOne);
    }
    refTwo.current?.addEventListener("scroll", handleScroll);
    return () => {
      refTwo.current?.removeEventListener("scroll", handleScroll);
    };
  }, [refOne, refTwo, syncMode]);

  return { scrollLeft, scrollTop };
}
