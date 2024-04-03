import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CompactComputer } from "../types/types";

interface ResultsPageProps {
    result: CompactComputer[] | null;
}

const ResultsPage = ({ result }: ResultsPageProps) => {
    if (result === null) {
        return (
            <div>
                <h2>Results Page</h2>
                <p>No results found</p>
            </div>
        );
    }

    

    return (
        <div>
            <h2>Results Page</h2>
            {/* Display search results here */}
        </div>
    );
};

export default ResultsPage;