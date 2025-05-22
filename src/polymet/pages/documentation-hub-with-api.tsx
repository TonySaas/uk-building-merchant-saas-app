import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import DocumentationHubAPIIntegration from "@/polymet/components/documentation-hub-api-integration";

export default function DocumentationHubWithAPI() {
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <DocumentationHubAPIIntegration />;
}
