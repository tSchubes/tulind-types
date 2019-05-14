// Type definitions for tulind 0.8.15
// Project: https://github.com/TulipCharts/tulipnode
// Definitions by: Tim Schubert <https://github.com/tSchubes>

declare namespace tulind {

    export type IndicatorOutput = number[][]; // (number_of_outputs, output_length)
    export type IndicatorOptions = (string | number)[];
    export type IndicatorType = keyof Indicators;

    export interface Dictionary<T> {
        [index: string]: T;
    }

    export interface IndicatorCallback {
        (error: any, result: IndicatorOutput): void;
    }

    export interface Tulind {
        version: string;
        indicators: Indicators;
    }

    export interface Indicator {
        name: string;
        full_name: string;
        type: 'simple' | 'indicator' | 'overlay' | 'math';
        inputs: number;
        options: number;
        outputs: number;
        input_names: string[];
        option_names: string[];
        output_names: string[];
        indicator: IndicatorEvaluator;
        start: (options: IndicatorOptions) => number; // Corresponding input index for the first result in output (eg. tulind.indicators.sma.start([5]) == 4 as index 0 of the output corresponds with index 4 of the input)
    }
    
    export interface IndicatorEvaluator {
        (inputs: number[][], options?: IndicatorOptions): Promise<IndicatorOutput>;
        (inputs: number[][], options: IndicatorOptions, callback: IndicatorCallback): void;
    }

    export interface SmaIndicator extends Indicator {
        type: 'overlay';
        inputs: 1;
        options: 1;
        outputs: 1;
    }

    export interface EmaIndicator extends SmaIndicator {}

    export interface Indicators extends Dictionary<Indicator> {
        abs: Indicator;
        acos: Indicator;
        ad: Indicator;
        add: Indicator;
        adosc: Indicator;
        adx: Indicator;
        asxr: Indicator;
        ao: Indicator;
        apo: Indicator;
        aroon: Indicator;
        arronosc: Indicator;
        asin: Indicator;
        atan: Indicator;
        atr: Indicator;
        avgpice: Indicator;
        bbands: Indicator;
        bop: Indicator;
        cci: Indicator;
        ceil: Indicator;
        cmo: Indicator;
        cos: Indicator;
        cosh: Indicator;
        crossany: Indicator;
        crossover: Indicator;
        cvi: Indicator;
        decay: Indicator;
        dema: EmaIndicator;
        di: Indicator;
        div: Indicator;
        dm: Indicator;
        dpo: Indicator;
        dx: Indicator;
        edecay: Indicator;
        ema: EmaIndicator;
        emv: Indicator;
        exp: Indicator;
        fisher: Indicator;
        floor: Indicator;
        fosc: Indicator;
        hma: Indicator;
        hama: Indicator;
        kvo: Indicator;
        lag: Indicator;
        linreg: Indicator;
        linregintercept: Indicator;
        linregslope: Indicator;
        ln: Indicator;
        log10: Indicator;
        macd: Indicator;
        marketfi: Indicator;
        mass: Indicator;
        max: Indicator;
        md: Indicator;
        medprice: Indicator;
        mfi: Indicator;
        min: Indicator;
        mom: Indicator;
        msw: Indicator;
        mul: Indicator;
        natr: Indicator;
        nvi: Indicator;
        obv: Indicator;
        ppo: Indicator;
        psar: Indicator;
        pvi: Indicator;
        qstick: Indicator;
        roc: Indicator;
        rocr: Indicator;
        round: Indicator;
        rsi: Indicator;
        sin: Indicator;
        sinh: Indicator;
        sma: SmaIndicator;
        sqrt: Indicator;
        stddev: Indicator;
        stderr: Indicator;
        stoch: Indicator;
        stochrsi: Indicator;
        sub: Indicator;
        sum: Indicator;
        tan: Indicator;
        tanh: Indicator;
        tema: EmaIndicator;
        todeg: Indicator;
        torad: Indicator;
        tr: Indicator;
        trima: Indicator;
        trix: Indicator;
        trunc: Indicator;
        tsf: Indicator;
        typprice: Indicator;
        utlosc: Indicator;
        var: Indicator;
        vhf: Indicator;
        vidya: Indicator;
        volatility: Indicator;
        vosc: Indicator;
        vwma: Indicator;
        wad: Indicator;
        wcprice: Indicator;
        wilders: Indicator;
        willr: Indicator;
        wma: Indicator;
        zlema: Indicator;
    }

}

declare var tulind: tulind.Tulind;
export = tulind;
