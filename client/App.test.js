import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import fetchMock from 'jest-fetch-mock';
//import { findByText } from '@testing-library/dom';
import '@testing-library/jest-dom';

import App from './App';

describe('App component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  })
  it('should render default opportunity list', async () => {
    fetchMock.mockResponse(JSON.stringify([
      {
          key: "SVA",
          name: "STA-volunteer App",
          type: "Team-managed software",
          client: "STA - internal",
          role: "Lead developer",
          description: "The lead tester is a coordination and management role, so an understanding of and experience in a number of testing disciplines, rather than depth in any specific one.",
          skills: ["React Native", "Node.js"],
          hours: "5-10 hours per week",
          required: "One person",
          buddying: true
      }])
      );

      
        const { getByText, toJSON } = render(<App />);
        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
        //expect(fetchMock).toHaveBeenCalledWith("http://localhost:5000/projects");
        expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/projects'));

        expect(getByText('STA-volunteer App')).toBeDefined();
        expect(getByText('STA - internal')).toBeDefined();
        expect(getByText('Lead developer')).toBeDefined();
        expect(getByText('5-10 hours per week')).toBeDefined();
        expect(getByText('One person required')).toBeDefined();
        expect(getByText('Suitable for buddying')).toBeDefined();
        // TODO test interaction
        expect(toJSON()).toMatchSnapshot();
      });
});
