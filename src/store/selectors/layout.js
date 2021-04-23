import { createSelector } from 'reselect';

export const getDisplayLayout = createSelector(
  state => state.layout,
  ({ header, footer, navLeft }) => ({
    header,
    footer,
    navLeft,
  }),
);
