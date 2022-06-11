import React, {useState} from 'react';

var Search = (props) => {
  const [filterTerm, setFilterTerm] = useState('');

  function handleChange(e) {
    setFilterTerm(e.target.value)
    props.setFilter(e.target.value);
  }
  return (
    <div id="QAsearch">
      <input type="text" placeholder="Have a question? Search for answers…" value={filterTerm} onChange={handleChange} />
      <i className="fa fa-search"></i>
    </div>
  )
}

export default Search;