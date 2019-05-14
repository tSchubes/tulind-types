# Summary  
TypeScript definitions for the NodeJS bindings of the outstanding[Tulip Indicators library](https://github.com/TulipCharts/tulipnode) by Lewis Van Winkle.  
Implemented as per the tulind documentation.

# Installation  
````
npm i tulind --save
npm i @types/tulind --save-dev
````

# Credits  
Original Tulip Indicators library by Lewis Van Winkle  
Type definitions by Tim Schubert

# Basic usage  
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
    }
    
    for (let candle of rawCandles){
        for (let i in candle) {
            candleValues[i].push(candle[i]);
        }
    }
    
    return candleValues;
    
}
  
async function start() {
    
    // Raw candle dataset from exchange
    let rawCandles: RawCandle[] = [];
    
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
