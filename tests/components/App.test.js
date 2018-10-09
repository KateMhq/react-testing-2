import React from "react";
import { shallow } from "enzyme";
import App from "../../src/components/App";

global.fetch = require("jest-fetch-mock");

describe("App", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  const Today = {
    date: "DD-MM-YY",
    weather: "sunny"
  };

  test("update the state with results", () => {
    fetch.mockResponseOnce(JSON.stringify({ Search: [Today] }));

    const wrapper = shallow(<App />);

    const instance = wrapper.instance();

    return instance.submitSearch("Today").then(() => {
      expect(fetch).toHaveBeenCalledWith(
        `http://www.omdbapi.com/?s=Today&apikey=2cda7206`
      );
      const moviesState = wrapper.state("movies");
      expect(moviesState).toEqual([Today]);
    });
  });

  test("research results are undefined", () => {
    fetch.mockResponseOnce(
      JSON.stringify({ Response: "False", Error: "Movie not found!" })
    );

    const wrapper = shallow(<App />);
    const instance = wrapper.instance();

    return instance.submitSearch("djlkdjfls").then(() => {
      const moviesState = wrapper.state("movies");

      expect(moviesState).toEqual([]);
    });
  });
});
