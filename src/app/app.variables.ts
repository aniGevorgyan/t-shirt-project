export interface IGap {
    id: number;
    url: string | null;
    height: string;
    width: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
}

export const types = [
    {value: 't-shirt', label: 'T shirt'},
    {value: 'cap', label: 'Cap'},
];

export const gapsCoordinatesTShirt: IGap[] = [
    {id: 1, url: null, height: '30', width: '30'},
    {id: 2, url: null, height: '30', width: '40', right: '0'},
    {id: 3, url: null, height: '50', width: '60', bottom: '0', left: '20'},
];

export const gapsCoordinatesTCap: IGap[] = [
    {id: 1, url: null, height: '50', width: '80', left: '10', top: '20'},
];
