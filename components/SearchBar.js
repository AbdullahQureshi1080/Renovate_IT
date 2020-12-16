// Native Imports
import * as React from 'react';
import {Searchbar } from 'react-native-paper';

// Styles Imports
import ComponentsStyle from '../styles/ComponentsStyle';
const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const iconColor = "#1b262c";
  
  return (
    <Searchbar
      placeholder={props.placeholder}
      onChangeText={onChangeSearch}
      value={searchQuery}
      iconColor = {iconColor}
      style = {ComponentsStyle.searchBarStyle}
      inputStyle = {{
        fontSize:14,
      }}
    />
  );
};

export default SearchBar;
