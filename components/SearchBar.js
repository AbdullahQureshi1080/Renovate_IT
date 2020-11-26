import * as React from 'react';
import { Button, Searchbar } from 'react-native-paper';
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
