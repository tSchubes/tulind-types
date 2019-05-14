# Summary  
TypeScript definitions for the NodeJS bindings of the outstanding[Tulip Indicators library](https://github.com/TulipCharts/tulipnode) by Lewis Van Winkle.  
Implemented as per the tulind documentation with support for both Promise based and callback based interfaces.

# Installation  
````
npm i tulind --save
npm i @types/tulind --save-dev
````

# Credits  
Original Tulip Indicators library by Lewis Van Winkle  
Type definitions by Tim Schubert

# Usage examples  

## Eval basic Indicator with single input and option

````typescript
import {indicators} from 'tulind';
  
interface RawCandle {
    open: number;
    close: number;
    high: number;
    low: number;
    volume: number;
    timestamp: string;
}
  
async function start() {
    
    // Raw candle dataset from exchange
    let rawCandles: RawCandle[] = [
        { open: 4, high: 9, low: 1, close: 4, volume: 123, timestamp: '2019-01-01T00:00:00.000Z' },
        { open: 5, high: 7, low: 2, close: 5, volume: 232, timestamp: '2019-01-01T01:00:00.000Z' },
        { open: 5, high: 8, low: 3, close: 6, volume: 212, timestamp: '2019-01-01T02:00:00.000Z' },
        { open: 5, high: 7, low: 3, close: 6, volume: 232, timestamp: '2019-01-01T03:00:00.000Z' },
        { open: 4, high: 8, low: 2, close: 6, volume: 111, timestamp: '2019-01-01T04:00:00.000Z' },
        { open: 4, high: 8, low: 1, close: 5, volume: 232, timestamp: '2019-01-01T05:00:00.000Z' },
        { open: 4, high: 7, low: 2, close: 5, volume: 212, timestamp: '2019-01-01T06:00:00.000Z' },
        { open: 6, high: 7, low: 2, close: 5, volume: 321, timestamp: '2019-01-01T07:00:00.000Z' },
        { open: 6, high: 8, low: 2, close: 6, volume: 232, timestamp: '2019-01-01T08:00:00.000Z' },
        { open: 6, high: 7, low: 3, close: 4, volume: 321, timestamp: '2019-01-01T19:00:00.000Z' }
    ];
    
    // Extract closing price values
    let close: number[] = rawCandles.map(candle => candle.close); // [4,5,6,6,6,5,5,5,6,4]
    
    // Eval SMA using Promise
    try {
        let results: number[][] = await indicators.sma.indicator([close], [14]);
        console.log('SMA results from Promise: ');
        console.log(JSON.stringify(results, null, 2));
    } catch (err) {
        throw new Error(`Failed to evaluate SMA indicator: ${err}`);
    }
    
    // Eval using callback
    indicators.sma.indicator([close], [14], (err, results: number[][]) => {
        if (err) {
            throw new Error(`Failed to evaluate SMA indicator: ${err}`);
        }
        console.log('SMA results from callback: ');
        console.log(JSON.stringify(results, null, 2));
    });
    
}
  
start();

````

## Transform exchange dataset and eval an indicator with multiple inputs and options

````typescript
import {indicators} from 'tulind';
  
interface RawCandle {
    open: number;
    close: number;
    high: number;
    low: number;
    volume: number;
    timestamp: string;
}
  
type CandleValues = {
    [P in keyof RawCandle]: RawCandle[P][];
}
  
/**
 * Split candles in to separate arrays for each property as required to eval tulind indicators
 */
function transformCandles(rawCandles: RawCandle[]): CandleValues {
    
    let candleValues: CandleValues = {
        open: [],
        close: [],
        high: [],
        low: [],
        volume: [],
        timestamp: []
    };
    
    for (let candle of rawCandles){
        for (let i in candle) {
            candleValues[i].push(candle[i]);
        }
    }
    
    return candleValues;
    
}
  
async function start() {
    
    // Raw candle dataset from exchange
    let rawCandles: RawCandle[] = [
        { open: 4, high: 9, low: 1, close: 4, volume: 123, timestamp: '2019-01-01T00:00:00.000Z' },
        { open: 5, high: 7, low: 2, close: 5, volume: 232, timestamp: '2019-01-01T01:00:00.000Z' },
        { open: 5, high: 8, low: 3, close: 6, volume: 212, timestamp: '2019-01-01T02:00:00.000Z' },
        { open: 5, high: 7, low: 3, close: 6, volume: 232, timestamp: '2019-01-01T03:00:00.000Z' },
        { open: 4, high: 8, low: 2, close: 6, volume: 111, timestamp: '2019-01-01T04:00:00.000Z' },
        { open: 4, high: 8, low: 1, close: 5, volume: 232, timestamp: '2019-01-01T05:00:00.000Z' },
        { open: 4, high: 7, low: 2, close: 5, volume: 212, timestamp: '2019-01-01T06:00:00.000Z' },
        { open: 6, high: 7, low: 2, close: 5, volume: 321, timestamp: '2019-01-01T07:00:00.000Z' },
        { open: 6, high: 8, low: 2, close: 6, volume: 232, timestamp: '2019-01-01T08:00:00.000Z' },
        { open: 6, high: 7, low: 3, close: 4, volume: 321, timestamp: '2019-01-01T19:00:00.000Z' }
    ];
    
    // Split the candles in to separate value arrays
    let candleValues: CandleValues = transformCandles(rawCandles);
    
    // Set options for stoch indicator
    let stochOptions: number[] = [5, 3, 3];
    
    // Eval using Promise
    try {
        let results: number[][] = await indicators.stoch.indicator([candleValues.high, candleValues.low, candleValues.close], stochOptions);
        console.log('Stoch results from Promise: ');
        console.log(JSON.stringify(results, null, 2));
    } catch (err) {
        throw new Error(`Failed to evaluate stoch indicator: ${err}`);
    }
    
    // Eval using callback
    indicators.stoch.indicator([candleValues.high, candleValues.low, candleValues.close], stochOptions, (err, results: number[][]) => {
        if (err) {
            throw new Error(`Failed to evaluate stoch indicator: ${err}`);
        }
        console.log('Stoch results from callback: ');
        console.log(JSON.stringify(results, null, 2));
    });
    
}
  
start();

````
