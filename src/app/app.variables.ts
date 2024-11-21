export interface IGap {
    code: string;
    url: string | null;
    height: string;
    width: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
}

export const types = [
    {value: 'front', label: 'Front'},
    {value: 'back', label: 'Back'},
    {value: 'left', label: 'Left side'},
    {value: 'right', label: 'Right side'},
];

export const gapsCoordinatesTShirt: IGap[] = [
    {code: 'sdsd', url: null, height: '30', width: '30'},
];

export const gapsCoordinatesTCap: IGap[] = [
    {code: 'front', url: null, height: '50', width: '80', left: '10', top: '20'},
];
