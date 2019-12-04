export interface IBarcodeLine {
    x: number,
    y: number,
}

export interface IBarcodeResultCodeDecoded {
    code: number,
    start: number,
    end: number,
    error?: number,
}

export interface IBarcodeResultCode {
    code: string,
    codeset: string,
    decodedCodes: IBarcodeResultCodeDecoded[],
    direction: number,
    end: number,
    format: string,
    start: number,
    startInfo: IBarcodeResultCodeDecoded,
}

export interface IBarcodeResult {
    angle: number,
    box: number[][],
    boxes: number[][][],
    codeResult: IBarcodeResultCode,
    line: IBarcodeLine[],
    pattern: 0 | 1,
}
