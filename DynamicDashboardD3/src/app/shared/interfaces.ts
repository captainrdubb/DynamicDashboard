export interface INavItem {
    id: number;
    name: string;
    path: string;
}

export interface IWidgetComponent {
    columnWidth: number;
    data: string[][];
    chartType: string;
}

export interface IPackerySizes {
    singleWidth: number;
    doubleWidth: number;
    fullWidth: number;
}

export interface Message {
    fromId: number;
    from: string;
    to: string;
    timeStamp: string;
    message: string;
}