import { useEffect, useState } from "react";

// TODO: issue, on minimizing the screen the sidebar doesn't collapse, it needs refreshing
const isMobileSize = window.innerWidth <= 768;
const useWindowResize = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isMobileSize);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarCollapsed(isMobileSize);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isSidebarCollapsed;
};

export default useWindowResize;
