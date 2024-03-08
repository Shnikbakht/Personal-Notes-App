import React, { useState } from 'react'
import { MdSearch } from 'react-icons/md'

const Search = ({ handleSearchNote }) => {
	const [searchKey, setSearchKey] = useState('')

	return (
		<div className='search'>
			<div className='search-box'>
				<MdSearch className='search-icons' size='1.3em' />
				<input
					onChange={e => setSearchKey(e.target.value)}
					type='text'
					placeholder='Search...'
				/>
			</div>
			<button
				className='search-btn'
				onClick={() => handleSearchNote(searchKey)}>
				Search
			</button>
		</div>
	)
}

export default Search
