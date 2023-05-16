import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { Block } from './Block';
import './index.css';

function App() {
  const [fromCurrency, setFromCurrency] = useState('KZT');
  const [toCurrency, setToCurrency] = useState('USD');

  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  const [expanded, setExpanded] = useState(false);

  const rates = useRef({});

  const onChangeExpanded = () => {
    setExpanded((prevExpanded) => (!prevExpanded));
  }

  const onChangeToPrice = (value) => {
    if (value < 0) return;

    const result = (rates.current[fromCurrency] / rates.current[toCurrency]) * value;
    setFromPrice(parseFloat(result.toFixed(5)));
    setToPrice(parseFloat(parseFloat(value).toFixed(5)));
  }

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/usd')
    .then((data) => (data.json()))
    .then((data) => {
      rates.current = data.rates;
      // onChangeToPrice(1);
    })
    .catch((error) => {
      console.warn(error);
      console.log("Can't get data...");
    });
  });

  const onChangeFromPrice = (value) => {
    if (value < 0) return;

    const price = value / rates.current[fromCurrency];
    const result = price * rates.current[toCurrency];
    setToPrice(parseFloat(result.toFixed(5)));
    setFromPrice(parseFloat(parseFloat(value).toFixed(5)));
  }

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <Block value={fromPrice} expanded={expanded} onChangeExpanded={onChangeExpanded} currency={fromCurrency} onChangeValue={onChangeFromPrice} onChangeCurrency={setFromCurrency} />
      <Block value={toPrice} expanded={expanded}  currency={toCurrency} onChangeExpanded={onChangeExpanded} onChangeValue={onChangeToPrice} onChangeCurrency={setToCurrency}/>
    </div>
  );
}

export default App;
