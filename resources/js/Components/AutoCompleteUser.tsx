import { AutoComplete, AutoCompleteProps } from 'antd'
import axios from 'axios';
import React from 'react'

type Props = {
  onChange?: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function AutoCompleteUser( {onChange, onKeyDown}: Props ) {

  const [options, setOptions] = React.useState<AutoCompleteProps['options']>([]);
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (value: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      axios.get('/get-savings-autocomplete?key=' + value).then(res => {
        setOptions(() => res.data.map((item: any) => ({
          value: item.lname,
          label: item.lname
        })));
      })
    }, 600);
  }

  return (
    <AutoComplete
      className='w-full'
      onKeyDown={onKeyDown}
      onSearch={handleSearch}
      onChange={onChange}
      options={options}
    />
  )
}
