import React from 'react'

const AppContext = React.createContext({
  searchInput: '',
  showSearch: false,
  clearSearchData: () => {},
  changeSearchInput: () => {},
})

export default AppContext
