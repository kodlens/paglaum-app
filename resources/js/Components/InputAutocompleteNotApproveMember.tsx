import { AutoComplete, AutoCompleteProps } from 'antd'
import axios from 'axios';
import React from 'react'

export default function InputAutocompleteNotApproveMember( {handleSelect, onKeyDown}: { handleSelect:any, onKeyDown:any }) {

  const [options, setOptions] = React.useState<AutoCompleteProps['options']>([]);
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (value: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      axios.get('/get-not-approve-members-autocomplete?key=' + value).then(res => {
        setOptions(() => res.data.map((item: any) => ({
          value: item.lname,
          label: item.lname
        })));
      })
    }, 1000);
  }

  return (
    <AutoComplete
      className='w-full'
      onKeyDown={onKeyDown}
      onSearch={handleSearch}
      onSelect={handleSelect}
      options={options}
    />
  )
}
