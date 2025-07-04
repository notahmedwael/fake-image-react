import { useEffect, useState } from "react";
import LoadingCircleSpinner from "./Loader";

interface PageReadyProviderProps {
children: React.ReactNode;
}

export default function PageReadyProvider({ children }: PageReadyProviderProps) {
const [ready, setReady] = useState(false);

useEffect(() => {
    const waitUntilReady = async () => {
    await document.fonts.ready;
    await new Promise((resolve) => setTimeout(resolve, 300)); // optional
    setReady(true);
    };

    waitUntilReady();
}, []);

if (!ready) return <LoadingCircleSpinner />;
return <>{children}</>;
}