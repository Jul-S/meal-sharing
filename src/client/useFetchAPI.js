import React, { useState, useEffect } from "react";

export default function useFetchAPI(url, dependOn) {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({});

    useEffect(() => {
        fetch("/api" + url)
            .then(async (response) => {
                if (!response.ok) {
                    const error = new Error('An error occurred while fetching the data.');
                    // Attach extra info to the error object.
                    error.info = await response.json();
                    error.status = response.status;
                    throw error;
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setIsLoading(false);
            })
            .catch(err => setError(err));
    }, [dependOn]);

    return { data, isLoading };
}

// export default function Fetcher(props) {
//     const [data, setData] = useState();
//     const [error, setError] = useState(false);

//     useEffect(() => {
//         fetch("/api" + url)
//             .then(response => response.json())
//             .then(data => {
//                 setData(data)
//                 setIsLoading(false);
//             })
//             .catch(err => setError(true));

//     }, [url, dependOn]);

//     if (error) return <div>failed to load </div>
//     if (!data) return <div>loading...</div>

//     return React.cloneElement(props.children, data);
// }