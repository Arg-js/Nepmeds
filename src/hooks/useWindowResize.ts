import { useEffect, useState } from "react";

const useWindowResize = () => {
  // When the screen size is decreased,
  // the width decreases but rerendering doesn't occur,
  // so defining a constant for `window.innerWidth <= 768`
  // will prevent recalculation of width
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    window.innerWidth <= 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarCollapsed(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isSidebarCollapsed;
};

export default useWindowResize;
