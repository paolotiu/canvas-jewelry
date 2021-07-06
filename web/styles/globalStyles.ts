import { css } from '@emotion/react';

export const globalStyles = css`
  /*! modern-normalize v1.0.0 | MIT License | https://github.com/sindresorhus/modern-normalize */

  /*
Document
========
*/

  /**
Use a better box model (opinionated).
*/
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&display=swap');

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /**
Use a more readable tab size (opinionated).
*/

  :root {
    -moz-tab-size: 4;
    tab-size: 4;
  }

  /**
1. Correct the line height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
*/

  html {
    line-height: 1.15; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
    height: 100%;
  }

  /*
Sections
========
*/

  /**
Remove the margin in all browsers.
*/

  body {
    margin: 0;
    height: 100%;
  }

  /**
Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)
*/

  body {
    font-family: 'Lato', sans-serif;
  }

  /*
Grouping content
================
*/

  /**
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
*/

  hr {
    height: 0; /* 1 */
    color: inherit; /* 2 */
  }

  /*
Text-level semantics
====================
*/

  /**
Add the correct text decoration in Chrome, Edge, and Safari.
*/

  abbr[title] {
    text-decoration: underline dotted;
  }

  /**
Add the correct font weight in Edge and Safari.
*/

  b,
  strong {
    font-weight: bolder;
  }

  /**
1. Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)
2. Correct the odd 'em' font sizing in all browsers.
*/

  code,
  kbd,
  samp,
  pre {
    font-family: ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  /**
Add the correct font size in all browsers.
*/

  small {
    font-size: 80%;
  }

  /**
Prevent 'sub' and 'sup' elements from affecting the line height in all browsers.
*/

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  /*
Tabular data
============
*/

  /**
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
*/

  table {
    text-indent: 0; /* 1 */
    border-color: inherit; /* 2 */

    border-collapse: collapse;
  }

  /*
Forms
=====
*/

  /**
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
*/

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
  }

  button {
    background: none;
    border: none;
    color: inherit;
  }

  /**
Remove the inheritance of text transform in Edge and Firefox.
1. Remove the inheritance of text transform in Firefox.
*/

  button,
  select {
    /* 1 */
    text-transform: none;
  }

  /**
Correct the inability to style clickable types in iOS and Safari.
*/

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
  }

  /**
Remove the inner border and padding in Firefox.
*/

  ::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  /**
Restore the focus styles unset by the previous rule.
*/

  :-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  /**
Remove the additional ':invalid' styles in Firefox.
See: https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737
*/

  :-moz-ui-invalid {
    box-shadow: none;
  }

  /**
Remove the padding so developers are not caught out when they zero out 'fieldset' elements in all browsers.
*/

  legend {
    padding: 0;
  }

  /**
Add the correct vertical alignment in Chrome and Firefox.
*/

  progress {
    vertical-align: baseline;
  }

  /**
Correct the cursor style of increment and decrement buttons in Safari.
*/

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    height: auto;
  }

  /**
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

  [type='search'] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
  }

  /**
Remove the inner padding in Chrome and Safari on macOS.
*/

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  /**
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to 'inherit' in Safari.
*/

  ::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
  }

  /*
Interactive
===========
*/

  /*
Add the correct display in Chrome and Safari.
*/

  summary {
    display: list-item;
  }

  html,
  body {
    height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  /* body {
    height: fit-content;
  } */

  * {
    margin: 0;
    padding: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }

  .ReactModal__Overlay {
    background-color: rgba(0, 0, 0, 0);
    transition: all 300ms ease-in-out;
  }

  .ReactModal__Overlay--after-open {
    background-color: rgba(0, 0, 0, 0.16);
  }

  .react-modal {
    opacity: 0.5;
    transition: all 200ms ease-in-out;
  }
  .react-modal-after-open {
    opacity: 1;
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;
  }

  // Nprogress
  #nprogress {
    pointer-events: none;
  }
  #nprogress .bar {
    height: 1px;
    background-color: black;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100vw;
  }

  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    opacity: 1;
    -webkit-transform: rotate(3deg) translate(0px, -4px);
    -ms-transform: rotate(3deg) translate(0px, -4px);
    transform: rotate(3deg) translate(0px, -4px);
  }
  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }
  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    border: solid 2px transparent;
    border-radius: 50%;
    -webkit-animation: nprogresss-spinner 400ms linear infinite;
    animation: nprogress-spinner 400ms linear infinite;
  }
  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }
  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }

  // Icon spin
  .icon-spin {
    -webkit-animation: icon-spin 2s infinite linear;
    animation: icon-spin 2s infinite linear;
  }

  @-webkit-keyframes icon-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }

  @keyframes icon-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }
`;
