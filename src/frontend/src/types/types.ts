type Computer = {
    id: number;
    brand: string;
    model: string;
    processor: string;
    ramSizeGB: number;
    storageType: string;
    storageSizeGB: number;
    priceUSD: number;
};

type CompactComputer = {
    id: number;
    brand: string;
    model: string;
};