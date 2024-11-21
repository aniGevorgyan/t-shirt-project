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

export const gapsCoordinatesTShirt: IGap[] = [
    {code: 'front', url: null, height: '150', width: '150', top: '140', left: '175'},
    {code: 'back', url: null, height: '170', width: '170', top: '80', left: '160'},
    {code: 'right', url: null, height: '50', width: '50', top: '130', left: '200'},
    {code: 'left', url: null, height: '50', width: '50', top: '130', left: '250'},
];
