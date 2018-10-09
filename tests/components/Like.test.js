import React from "react";
import Like from "../../src/components/Like";
import { shallow } from "enzyme";

describe("Like", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Like />);
  });

  test("initial likes state should be 0", () => {
    const likeState = wrapper.state("likes");
    expect(likeState).toEqual(0);
  });

  test("initial render to return 0 likes", () => {
    const sentence = wrapper.find("span").text();
    expect(sentence).toEqual("Movie has 0 likes");
  });

  test("likes state is updated to 1 after one click", () => {
    wrapper.find("button").simulate("click");
    const likeState = wrapper.state("likes");
    expect(likeState).toEqual(1);
  });

  test("after 1 click to update the rendering response", () => {
    wrapper.find("button").simulate("click");
    const sentence = wrapper.find("span").text();
    expect(sentence).toEqual("Movie has 1 likes");
  });
});
