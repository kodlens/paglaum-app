import { AutoComplete, AutoCompleteProps } from 'antd'
import axios from 'axios';
import React from 'react'


type Props ={
  onKeyDown?: (event:React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: any;
}
export default function InputAutocompleteMember( { onKeyDown, onChange }: Props ) {

  const [options, setOptions] = React.useState<AutoCompleteProps['options']>([]);
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (value: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      axios.get('/get-members-autocomplete?key=' + value).then(res => {
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
      onChange={onChange}
      options={options}
    />
  )
}
