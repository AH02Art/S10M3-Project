import { createSlice } from "@reduxjs/toolkit";

let id = 1
export const getNextId = () => id++
const initialState = {
  displayAllQuotes: true,
  highlightedQuote: null,
  quotes: [
    {
      id: getNextId(),
      quoteText: "Don't cry because it's over, smile because it happened.",
      authorName: "Dr. Seuss",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "So many books, so little time.",
      authorName: "Frank Zappa",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "Be yourself; everyone else is already taken.",
      authorName: "Oscar Wilde",
      apocryphal: false,
    },
  ],
}

export const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    toggleVisiblity(state) {
      state.displayAllQuotes = !state.displayAllQuotes;
    },
    deleteQuote(state, action) {
      state.quotes = state.quotes.filter((items) => items.id !== action.payload);
    },
    toggleAuthenticity(state, action) {
      const quoteEdit = state.quotes.find((items) => items.id === action.payload);
      quoteEdit.apocryphal = !quoteEdit.apocryphal;
    },
    highlightQuote(state, action) {
      if (state.highlightedQuote === action.payload) {
        state.highlightedQuote = null;
      } else {
        state.highlightedQuote = action.payload;
      };
    },
    createQuote: {
      prepare({ authorName, quoteText }) {
        return {
          payload: {
            authorName,
            quoteText,
            apocryphal: false,
            id: getNextId()
          }
        }
      },
      reducer(state, action) {
        state.quotes.push(action.payload);
      }
    }
  }
});

export const {
  toggleVisiblity,
  deleteQuote,
  toggleAuthenticity,
  highlightQuote,
  createQuote
} = quotesSlice.actions;

export default quotesSlice.reducer;