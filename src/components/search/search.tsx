import { useState } from "react";

import { fetchCities } from "../../utilities/api.services";
import { AsyncPaginate } from "react-select-async-paginate";

type City = {
  latitude: string;
  longitude: string;
  name: string;
  countryCode: string;
};

const Search = ({ onSearchChange }: any) => {
  const [searchValue, setSearchValue] = useState(null);

  const loadOptions = async (inputValue: string) => {
    console.log(inputValue);

    const citiesList: any = await fetchCities(inputValue);

    return {
      options: citiesList.data.map((city: City) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      }),
    };
  };
  const onChangeHandler = (enteredData: any) => {
    console.warn(enteredData);
    setSearchValue(enteredData);
    onSearchChange(enteredData);
  };
  return (
    <AsyncPaginate
      placeholder="Search for cities"
      debounceTimeout={600}
      value={searchValue}
      onChange={onChangeHandler}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
