import React, { useState } from 'react';
import useStore from '../store/store.js';
import useAutocomplete from '../hooks/useAutocomplete';
import './style.css';

const FormulaInput = () => {
  const { formula, setFormula, tags, addTag, removeTag } = useStore();
  const [query, setQuery] = useState('');
  const { data: suggestions, isLoading } = useAutocomplete(query);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFormula(value);

    // Check if the last character is an operand
    const lastChar = value[value.length - 1];
    if (/[+\-*\/()^]/.test(lastChar)) {
      addTag(value.slice(0, -1));
      setFormula(lastChar);
    } else {
      setQuery(value);
    }
  };

  const handleTagClick = (index) => {
    removeTag(index);
  };

  const handleSuggestionClick = (suggestion) => {
    setFormula(suggestion);
    setQuery('');
  };

  return (
    <div>
      <div className="formula-input">
        {tags.map((tag, index) => (
          <span key={index} className="tag" onClick={() => handleTagClick(index)}>
            {tag} <span>&times;</span>
          </span>
        ))}
        <input type="text" value={formula} onChange={handleInputChange} />
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className="suggestions">
          {suggestions?.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion.name)}>
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormulaInput;
