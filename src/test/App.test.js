import React from 'react'
import { mount } from 'enzyme'
import store from './../reducers/store'
import App from './../App'
import { Provider } from 'react-redux'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'


configure({ adapter: new Adapter() })

describe('<App /> ', () => {
  let app
  beforeAll(() => {
    app = mount(<Provider store={store}><App /></Provider>)
  })

  afterAll(() => {
    app.unMount()
  })

  it('renders self without crushing', () => {
    expect(app.find('App').length).toBe(1)
  })
})
