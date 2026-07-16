import eventReducer from '../../reducers/eventReducer'

const event1 = { id: '1', title: 'Näyttely' }
const event2 = { id: '2', title: 'Työpaja' }

describe('eventReducer — initial state', () => {
  test('returns initial state when called with undefined', () => {
    const state = eventReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual({ events: [] })
  })
})

describe('eventReducer — CREATE_EVENT', () => {
  test('resets events list to empty array', () => {
    const state = eventReducer(
      { events: [event1, event2] },
      { type: 'CREATE_EVENT' },
    )
    expect(state.events).toEqual([])
  })
})

describe('eventReducer — DELETE_EVENT', () => {
  test('removes the correct event', () => {
    const state = eventReducer(
      { events: [event1, event2] },
      { type: 'DELETE_EVENT', data: { id: '1' } },
    )
    expect(state.events).toHaveLength(1)
    expect(state.events[0].id).toBe('2')
  })

  test('leaves other events untouched', () => {
    const state = eventReducer(
      { events: [event1, event2] },
      { type: 'DELETE_EVENT', data: { id: '1' } },
    )
    expect(state.events[0]).toEqual(event2)
  })

  test('does not remove anything if id does not match', () => {
    const state = eventReducer(
      { events: [event1, event2] },
      { type: 'DELETE_EVENT', data: { id: '999' } },
    )
    expect(state.events).toHaveLength(2)
  })
})