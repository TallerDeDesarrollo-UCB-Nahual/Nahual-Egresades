import _ from 'lodash'
import React from 'react'
import { Search, Label } from 'semantic-ui-react'


const source = getEgresades();
console.log("++++++"+source);

function getEgresades(){
  fetch(`http://fathomless-falls-62194.herokuapp.com/api/egresades`)
    .then(res => {
      return res.json()
    })
    .then(res => {
      let dat = res;
        return dat.response
    })
}

const initialState = {
  loading: false,
  results: [],
  value: ''
}

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query }
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results }
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection }

    default:
      throw new Error()
  }
}

const resultRenderer = ({ nombreCompleto }) => <Label content={nombreCompleto} />

function SearchExampleStandardCustom({ listaEgresades }) {
  const [state, dispatch] = React.useReducer(exampleReducer, initialState)
  const { loading, results, value } = state


  const timeoutRef = React.useRef()
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'START_SEARCH', query: data.value })

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' })
        return
      }

      const re = new RegExp(_.escapeRegExp(data.value))
      const isMatch = (result) => {
        re.test(result.nombreCompleto)
        console.log(result)
      }

      dispatch({
        type: 'FINISH_SEARCH',
        results: _.filter(source, isMatch)
      })
    }, 300)
  }, [])
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  console.log({ loading, results, value })
  console.log(source)
  return (
    <div>
      <Search
        loading={loading}
        onResultSelect={(e, data) =>
          dispatch({ type: 'UPDATE_SELECTION', selection: data.result.nombreCompleto })
        }
        onSearchChange={handleSearchChange}
        resultRenderer={resultRenderer}
        results={results}
        value={value}
      >
      </Search>
      {/* {console.log("SOURCE" + source)} */}

    </div>
  )
}

export default SearchExampleStandardCustom