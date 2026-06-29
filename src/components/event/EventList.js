import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeEvents, deleteEvent } from '../../reducers/actionCreators/eventActions'
import { Table, Button } from 'react-bootstrap'

export const EventList = ({ initializeEvents, deleteEvent, events, loggedUser }) => {
  useEffect(() => {
    initializeEvents()
  }, [])

  const removeEvent = (id) => {
    return () => {
      if (window.confirm('Do you want to delete this event')) {
        deleteEvent(id)
      }
    }
  }

  return (
    <div className="eventList">
      <h2>Events</h2>
      <br/>
      <Table>
        <tbody>
          { events && events.map(e =>
            <tr key={e.id} className='eList'>
              <td>
                <img
                  src={e.eventImage}
                  height='200'
                  width='300'
                  className='eventPicture'
                  alt='img'
                />
              </td>
              <td className="event">
                <h4> {e.title}</h4>
                <p>Start: { e.start } </p>
                <p>End: { e.end }  </p>
                <p>Place: { e.place }</p>
                <p>Description: { e.description }</p>
              </td>
              {loggedUser && loggedUser.role === 'admin'
                ? <td><Button className="button buttonDelete" onClick={removeEvent(e.id)} variant="outline-secondary" type="submit">Delete</Button></td>
                : <em></em>}
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    events: state.events.events,
    loggedUser: state.loggedUser.loggedUser
  }
}

export default connect(
  mapStateToProps,
  { initializeEvents, deleteEvent }
)(EventList)
