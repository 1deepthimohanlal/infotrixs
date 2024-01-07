import React, { useState, useEffect } from 'react';
import './App.css';

function Home() {
  const [quote, setQuote] = useState({ quote: '', author: '' });
  const [searchAuthor, setSearchAuthor] = useState('');
  const [searchedQuotes, setSearchedQuotes] = useState([]);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/quote');
      const data = await response.json();
      setQuote({ quote: data.quote, author: data.author });
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const searchByAuthor = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/quotesByAuthor?author=${searchAuthor}`);
      const data = await response.json();
      setSearchedQuotes(data);
    } catch (error) {
      console.error('Error searching by author:', error);
    }
  };

  return (
    <div className="home">
    <h1>Random Quote Generator</h1>
      <header>
      <div className='container'>
        
          <p className='quote-style'>{quote.quote}</p>
          <p className='author-style'>{quote.author}</p>
        
        <button onClick={fetchQuote} className='btn1'>Get Another Quote</button>
        </div>
        <h2>Search Quotes by Author</h2>
        <div className='section2'>
          <div className='form'>
          <input
            type="text"
            placeholder="Enter author name"
            value={searchAuthor}
            onChange={(e) => setSearchAuthor(e.target.value)}
          />
          <button onClick={searchByAuthor} className='btn2'>Search</button>
          </div>
          <ul>
            {searchedQuotes.map((quote, index) => (
              <li key={index} className='lists'>
                  <p className='quote-style'>{quote.quote}</p>
                  <p className='author-style'>{quote.author}</p>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Home;
