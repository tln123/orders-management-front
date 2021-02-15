import React from 'react';
import DropDownButton from '../DropDownButton/DropDownButton';
import './SearchBox.scss'

type SearchBoxProps = {
    searchMethod: string;
    fulfillmentFilter: string;
    paymentFilter: string;
    onSearchMethodChange: (searchMethod: string) => void;
    onFulfillmentFilterChange: (filter: string) => void;
    onPaymentFilterChange: (filter: string) => void;
    onInputChange: (value: string) => void;
    onSearchClick: () => void;
    onEnterKeyStroke: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBox = (
    {
        searchMethod,
        fulfillmentFilter,
        paymentFilter,
        onSearchMethodChange,
        onFulfillmentFilterChange,
        onPaymentFilterChange,
        onInputChange,
        onSearchClick,
        onEnterKeyStroke,
    }
        : SearchBoxProps) => {
    return (
        <div className="search-box">
            <div className="search-box-top">

                {/* Search method */}
                <div className='search-box-dropdown'>
                    <h4>Search for: </h4>
                    <DropDownButton
                        onChange={onSearchMethodChange}
                        buttons={['Name', 'Order ID', 'Item Name']}
                        handlerString={searchMethod}
                    />
                </div>

                {/* Fulfillment filter */}
                <div className='search-box-dropdown'>
                    <h4>Fulfillment Status Filter: </h4>
                    <DropDownButton
                        onChange={onFulfillmentFilterChange}
                        buttons={['No-Filter', 'Fulfilled', 'Not Fulfilled', 'Canceled']}
                        handlerString={fulfillmentFilter}
                    />
                </div>

                {/* Payment Filter */}
                <div className='search-box-dropdown'>
                    <h4>Deliver Status Filter: </h4>
                    <DropDownButton
                        onChange={onPaymentFilterChange}
                        buttons={['No Filter', 'Paid', 'Not-Paid', 'Refunded']}
                        handlerString={paymentFilter}
                    />
                </div>

            </div>

            <div className="search-box-bottom">

                <input
                    className="search-input"
                    type="search"
                    placeholder={`Search ${searchMethod}`}
                    onChange={(e) => onInputChange(e.target.value)}
                    onKeyPress={onEnterKeyStroke}
                />

                <input
                    type="button"
                    value="Search"
                    className="search-button"
                    onClick={onSearchClick}    
                />

            </div>
        </div>
    );
};

export default SearchBox;