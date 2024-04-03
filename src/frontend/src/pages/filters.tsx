import { useState, useEffect } from "react";
import { useCollapse } from "react-collapsed";
import Select from "react-select";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Slider from '@mui/material/Slider';

const CpuFilters = ({onUpdateBrand, onUpdateCoreCount} ) => {
    const [isExpanded, setExpanded] = useState(false);
    const {getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

    const [brand, setBrand] = useState({AMD: false, Intel: false });
    const [coreCount, setCoreCount] = useState<number[]>([1, 16]);

    const handleBrand = (event: { target: { name: any; checked: any; }; }) => {
        setBrand(prevState => ({
            ...prevState,
            [event.target.name]: event.target.checked
        }));
        onUpdateBrand({ ...brand, [event.target.name]: event.target.checked });
    };

    const handleCoreCount = (event: Event, newValue: number | number[]) => {
        setCoreCount(newValue as number[]);
        onUpdateCoreCount(newValue);
      };

    const brandFilter = (
        <Box sx={{ display: 'flex', ml: 3 }}>
          <FormControlLabel
            label="Intel"
            control={<Checkbox checked={brand.Intel} onChange={handleBrand} name="Intel" />}
          />
          <FormControlLabel
            label="AMD"
            control={<Checkbox checked={brand.AMD} onChange={handleBrand} name ="AMD"/>}
          />
        </Box>
      );

    const coreCountFilter = (
    <Box sx={{ width: 300}}>
    <Slider
        getAriaLabel={() => 'Temperature range'}
        value={coreCount}
        onChange={handleCoreCount}
        valueLabelDisplay="auto"
        max={16}
        min={0}
    />
    </Box>
    );
    
    return <div>
    <button
        {...getToggleProps({
        onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
    >
        Filter CPU
    </button>
    <section {...getCollapseProps()}>
        <Accordion>
            <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            >
            <Typography>Brand</Typography>
            </AccordionSummary>
            <AccordionDetails>
            {brandFilter}
            </AccordionDetails>
        </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography>Core Count</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {coreCountFilter}
                </AccordionDetails>
            </Accordion>
    </section>
</div>
};

const GpuFilters = ({ onUpdateBrand, onUpdateMemory }) => {
    const [isExpanded, setExpanded] = useState(false);
    const {getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

    const [brand, setBrand] = useState({NVIDIA: false, AMD: false });
    const [memory, setMemory] = useState<number[]>([0, 8]);

    const handleBrand = (event: { target: { name: any; checked: any; }; }) => {
        setBrand(prevState => ({
            ...prevState,
            [event.target.name]: event.target.checked
        }));
        onUpdateBrand({ ...brand, [event.target.name]: event.target.checked });
    };

    const handleMemory = (event: Event, newValue: number | number[]) => {
        setMemory(newValue as number[]);
        onUpdateMemory(newValue);
      };

    const brandFilter = (
        <Box sx={{ display: 'flex', ml: 3 }}>
          <FormControlLabel
            label="NVIDIA"
            control={<Checkbox checked={brand.NVIDIA} onChange={handleBrand} name="NVIDIA" />}
          />
          <FormControlLabel
            label="AMD"
            control={<Checkbox checked={brand.AMD} onChange={handleBrand} name ="AMD"/>}
          />
        </Box>
      );
    
    const memoryFilter = (
        <Box sx={{ width: 300}}>
        <Slider
            getAriaLabel={() => 'Temperature range'}
            value={memory}
            onChange={handleMemory}
            valueLabelDisplay="auto"
            max={16}
            min={0}
        />
        </Box>
    );

    

    return <div>
    <button
        {...getToggleProps({
        onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
    >
        Filter GPU
    </button>
    <section {...getCollapseProps()}>
        <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Brand</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {brandFilter}
        </AccordionDetails>
      </Accordion>
        <Accordion>
            <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
            >
                <Typography>Memory</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {memoryFilter}
            </AccordionDetails>
        </Accordion>
    </section>
</div>
};

export { CpuFilters, GpuFilters };
