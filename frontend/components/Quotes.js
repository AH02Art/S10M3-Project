import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { toggleVisiblity, deleteQuote, highlightQuote, toggleAuthenticity } from "../state/quotesSlice.js";

export default function Quotes() {
  const quotes = useSelector((items) => items.quotesState.quotes);
  const displayAllQuotes = useSelector((items) => items.quotesState.displayAllQuotes);
  const highlightedQuote = useSelector((items) => items.quotesState.highlightedQuote);
  const dispatch = useDispatch();

  return (
    <div id="quotes">
      <h3>Quotes</h3>
      <div>
        {
          quotes
            ?.filter(qt => {
              return displayAllQuotes || !qt.apocryphal
            })
            .map(qt => (
              <div
                key={qt.id}
                className={`quote${qt.apocryphal ? " fake" : ''}${highlightedQuote === qt.id ? " highlight" : ''}`}
              >
                <div>{qt.quoteText}</div>
                <div>{qt.authorName}</div>
                <div className="quote-buttons">
                  <button onClick={() => {
                    const actionToDispatch = deleteQuote(qt.id);
                    dispatch(actionToDispatch);
                  }}>DELETE</button>
                  <button onClick={() => {
                    dispatch(highlightQuote(qt.id))
                  }}>HIGHLIGHT</button>
                  <button onClick={() => {
                    dispatch(toggleAuthenticity(qt.id)) 
                  }}>FAKE</button>
                </div>
              </div>
            ))
        }
        {
          !quotes?.length && "No quotes here! Go write some."
        }
      </div>
      {!!quotes?.length && <button onClick={() => dispatch(toggleVisiblity())}>
        {displayAllQuotes ? 'HIDE' : 'SHOW'} FAKE QUOTES
      </button>}
    </div>
  )
}
