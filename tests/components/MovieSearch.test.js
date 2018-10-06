import React from 'react';
import MovieSearch from '../../src/components/MovieSearch';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

describe('movie search', ()=> {

  test ('function output matches the snapshot',()=> {
    const tree = renderer.create(<MovieSearch movieString="snapshot test"/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  let wrapper;
  const mockHandleChange = jest.fn();
  const mockSubmitSearch = jest.fn();
  //shallow() renders a component for testing
  beforeEach(() => {wrapper = shallow(
                  <MovieSearch
                    handleChange={mockHandleChange}
                    submitSearch={mockSubmitSearch}
                    movieString="hello"
                  />
                  )
              }
            )



  test ('function handleChange calls with the change input', () => {
    // const wrapper = shallow (
    //               <MovieSearch
    //                 handleChange={mockHandleChange}
    //               />)

                 //shallow() renders a component for testing

    const event ={
      target: {
        value: "you"
      }
    }

    wrapper.find('input').simulate('change',event);
    wrapper.find('input').simulate('change',event);
    expect(mockHandleChange.mock.calls).toEqual([["you"],["you"]])
  })

  test ('function handleSubmit is called with the movieString', () => {

    const event={
      preventDefault: jest.fn()
    }

    // const wrapper = shallow(
    //               <MovieSearch
    //                 submitSearch={mockSubmitSearch}
    //                 movieString="hello"
    //               />)

    wrapper.find('form').simulate('submit',event);

    expect(mockSubmitSearch.mock.calls).toEqual([["hello"]])
    expect(event.preventDefault.mock.calls).toEqual([[]])
  })


})
