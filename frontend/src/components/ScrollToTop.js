// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - ScrollToTop.js
// February 19, 2022
// Last Edited (Initials, Date, Edits):

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * This function will be used to scroll the browser to the top after a route change
 * from a page with a lot of content. This is a well documented issue that happens with
 * react router, so much so that this code snippet actually comes directly from them!
 * https://v5.reactrouter.com/web/guides/scroll-restoration
 * 
 * @returns 
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
