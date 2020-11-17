/* eslint-disable import/no-extraneous-dependencies */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-toastify');

jest.mock('react-redux', () => {
  return {
    useDispatch: jest.fn().mockReturnValue(jest.fn()),
    useSelector: jest.fn().mockReturnValue(() => {
      return {
        profile: 'professor',
      };
    }),
  };
});

jest.mock('polished', () => {
  return {
    lighten: jest.fn(),
    darken: jest.fn(),
  };
});

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});
