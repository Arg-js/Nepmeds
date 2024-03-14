import { useEffect } from "react";
export const importScript = ({
  resourceUrl,
  shouldRunCleanUp,
  scriptId,
}: {
  resourceUrl: string;
  shouldRunCleanUp?: boolean;
  scriptId: string;
}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = resourceUrl;
    script.id = scriptId;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (shouldRunCleanUp) document.body.removeChild(script);
    };
  }, [resourceUrl]);
};
