import { useEffect, useState } from "react";

const useEditorHydrate = () => {
  const [hasHydrate, setHasHydrate] = useState(false);
  useEffect(() => {
    setHasHydrate(true);
  }, []);
  return hasHydrate;
};
export default useEditorHydrate;
