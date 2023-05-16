import React from 'react';

const defaultCurrencies = ['KZT', 'RUB', 'EUR', 'USD'];
const extraCurrencies = ['CAD', 'GBP', 'CNY', 'JPY', 'INR'];

export const Block = ({ value, currency, onChangeValue, onChangeCurrency, expanded, onChangeExpanded }) => (
  <div className="block">
    <ul className='currencies flex'>
      {defaultCurrencies.map((cur) => (
        <li
          onClick={() => onChangeCurrency(cur)}
          className={currency === cur ? 'active' : ''}
          key={cur}>
          {cur}
        </li>
      ))}
      <li onClick={onChangeExpanded}>
        { !expanded ?
        <svg height="50px" viewBox="0 0 50 50" width="50px">
          <rect fill="none" height="50" width="50" />
          <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
        </svg>
        :
        <svg width="50px" height="50px" viewBox="0 -4.5 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -6683.000000)" fill="#000000">
            <g id="icons" transform="translate(56.000000, 160.000000)">
                <path d="M84,6532.61035 L85.4053672,6534 L94.0131154,6525.73862 L94.9311945,6526.61986 L94.9261501,6526.61502 L102.573446,6533.95545 L104,6532.58614 C101.8864,6530.55736 95.9854722,6524.89321 94.0131154,6523 C92.5472155,6524.40611 93.9757869,6523.03486 84,6532.61035" id="arrow_up-[#340]">
                </path></g></g></g>
        </svg>
        }
      </li>
    </ul>
    {
      expanded ? <ul className='currencies flex'>
      {
        extraCurrencies.map((cur) =>
          <li
            onClick={() => onChangeCurrency(cur)}
            className={currency === cur ? 'active' : ''}
            key={cur}>
            {cur}
          </li>
        )
      }
    </ul> : <></>
    }
    <input
      onChange={(e) => onChangeValue(e.target.value)}
      value={value}
      type='number'
      placeholder={0}
    />
  </div>
);
