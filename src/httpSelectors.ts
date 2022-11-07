import { createSelector } from "@reduxjs/toolkit";
// import { selectRoot } from "./counter";

const selectRoot = (x) => x;

export const selectView = createSelector<any, (string) => string>([selectRoot], (root) => {
  return (body) => `<html><head>
  <style>
    body {
      background-color: grey;
    }
  </style>
  </head><body>
    ${JSON.stringify(selectRoot(root))}
    ${body}
  </body></html>`;
});

export const selectViewIndex = createSelector([selectView], (rootView) => {
  return (contents: string) => rootView(`<article>${contents}</article>`);
});