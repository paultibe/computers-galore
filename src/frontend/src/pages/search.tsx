import { useState, useEffect } from "react";
import { BE_BASE_URL } from "../constants.ts";
import { useCollapse } from "react-collapsed";
import {CpuFilters, GpuFilters} from "./filters.tsx";
import { useNavigate } from 'react-router-dom';

interface GpuBrand {
    [key: string]: boolean;
}
interface CpuBrand {
    [key: string]: boolean;
}

const SearchPage = () => {

    // CPU States
    const [cpuBrand, setCpuBrand] = useState<CpuBrand>({AMD: false, Intel: true });
    const [cpuCoreCount, setCpuCoreCount] = useState<number[]>([1, 16]);
    const handleCpuBrandUpdate = (updatedBrand) => {
        setCpuBrand(updatedBrand);
    };
    const handleCpuCoreCountUpdate = (updatedCoreCount) => {
        setCpuCoreCount(updatedCoreCount);
    }


    // GPU States
    const [gpuBrand, setGpuBrand] = useState<GpuBrand>({NVIDIA: true, AMD: false });
    const [gpuMemory, setGpuMemory] = useState<number[]>([0, 8]);
    const handleGpuBrandUpdate = (updatedBrand) => {
        setGpuBrand(updatedBrand);
    };

    const handleGpuMemoryUpdate = (updatedMemory) => {
        setGpuMemory(updatedMemory);
        
    };

    const navigate = useNavigate();

    const buildUrl = () => {
        let url = BE_BASE_URL+`/filterComputers`;

        // CPU Filters
        const selectedCpuBrands = Object.keys(cpuBrand).filter(key => cpuBrand[key]);
        let cpuUrl = `${selectedCpuBrands.join('1')}/${cpuCoreCount[0]}/${cpuCoreCount[1]}`;

        // GPU Filters
        const selectedGpuBrands = Object.keys(gpuBrand).filter(key => gpuBrand[key]);
        let gpuUrl = `${selectedGpuBrands.join('1')}/${gpuMemory[0]}/${gpuMemory[1]}`;

        return `${url}/${cpuUrl}/${gpuUrl}`;

    }

    const fetchComputers = async () => {
        try {

            const url = buildUrl();
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching computers:', error);
        }
    };
    

    const handleSearch = () => {
        console.log(buildUrl())

        const computers = fetchComputers();
        console.log(computers);
        
        const data = [{ id: 1, brand: "Intel", model: "CoffeeLake" }, 
        { id: 2, brand: "AMD", model: "RYZEN" }, 
        { id: 3, brand: "AMD", model: "Zen" },
        { id: 4, brand: "AMD", model: "RYZEN" },
        { id: 5, brand: "AMD", model: "RYZEN" },
        { id: 6, brand: "AMD", model: "RYZEN" },
        { id: 7, brand: "AMD", model: "RYZEN" },
        { id: 8, brand: "AMD", model: "RYZEN" },
        { id: 9, brand: "AMD", model: "RYZEN" },
        { id: 10, brand: "AMD", model: "RYZEN" },
        { id: 11, brand: "AMD", model: "RYZEN" },
        { id: 12, brand: "AMD", model: "RYZEN" },
        { id: 13, brand: "AMD", model: "RYZEN" },
        { id: 14, brand: "AMD", model: "RYZEN" },
        { id: 15, brand: "AMD", model: "RYZEN" },
        { id: 16, brand: "AMD", model: "RYZEN" },
        { id: 17, brand: "AMD", model: "RYZEN" },
        { id: 18, brand: "AMD", model: "RYZEN" },];
        navigate('/results', {state: {data}});
      };

    return (
        <div>
            <div style={{display:"flex", flexDirection:"column", rowGap:"1em" }}>
                <CpuFilters onUpdateBrand={handleCpuBrandUpdate} onUpdateCoreCount={handleCpuCoreCountUpdate} />
                <GpuFilters onUpdateBrand={handleGpuBrandUpdate} onUpdateMemory={handleGpuMemoryUpdate} />
            </div>
            <div style={{ marginTop: "1em" }}>
                <button onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
};

export default SearchPage;
