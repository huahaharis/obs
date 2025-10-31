import '@testing-library/jest-dom';
import 'whatwg-fetch';


const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Accessing element.ref was removed in React 19")
    ) {
      return;
    }
    originalError(...args);
  };
});
