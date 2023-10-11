import { useEffect, useState } from "react";

const useWindowResize = () => {
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
