import { useState, useEffect } from "react";
import { BE_BASE_URL } from "../constants.ts";
import { useCollapse } from "react-collapsed";
import {CpuFilters, GpuFilters} from "./filters.tsx";

const SearchPage = () => {

    // CPU States
    const [cpuBrand, setCpuBrand] = useState({AMD: false, Intel: false });
    const [cpuCoreCount, setCpuCoreCount] = useState<number[]>([1, 16]);
    const handleCpuBrandUpdate = (updatedBrand) => {
        setCpuBrand(updatedBrand);
    };
    const handleCpuCoreCountUpdate = (updatedCoreCount) => {
        setCpuCoreCount(updatedCoreCount);
    }


    // GPU States
    const [gpuBrand, setGpuBrand] = useState({NVIDIA: false, AMD: false });
    const [gpuMemory, setGpuMemory] = useState<number[]>([0, 8]);
    const handleGpuBrandUpdate = (updatedBrand) => {
        setGpuBrand(updatedBrand);
    };

    const handleGpuMemoryUpdate = (updatedMemory) => {
        setGpuMemory(updatedMemory);
        
    };
    return (
        <div>
            <div style={{display:"flex", flexDirection:"column", rowGap:"1em" }}>
                <CpuFilters onUpdateBrand={handleCpuBrandUpdate} onUpdateCoreCount={handleCpuCoreCountUpdate} />
                <GpuFilters onUpdateBrand={handleGpuBrandUpdate} onUpdateMemory={handleGpuMemoryUpdate} />
            </div>
            <div style={{ marginTop: "1em" }}>
                <button onClick={() => console.log(cpuBrand, cpuCoreCount, gpuBrand, gpuMemory)}>Search</button>
            </div>
        </div>
    );
};

export default SearchPage;
