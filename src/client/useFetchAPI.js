import { useState, useEffect } from "react";

export default function useFetchAPI(url, dependOn) {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("/api" + url)
            .then(response => response.json())
            .then(data => {
                setData(data)
                setIsLoading(false);
            });

    }, [dependOn]);

    return { data, isLoading };
}