import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import ComponentsStyle from '../styles/ComponentsStyle';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const iconColor = "#1b262c";
  
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      iconColor = {iconColor}
      style = {ComponentsStyle.searchBarStyle}
    />
  );
};

export default SearchBar;
