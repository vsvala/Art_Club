import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {  initializeEvents,  deleteEvent } from '../../reducers/actionCreators/eventActions'
//import { Table } from 'react-bootstrap'
import { Table, Button } from 'react-bootstrap'
//import Event from './Event'
import url from '../../services/config'
const baseUrl = url + 'public/'
/* eslint-disable */
//const BASE_URL= process.env.PUBLIC_URL  //'http://localhost:3001/'
/* eslint-enable */

export const EventList = ({   initializeEvents, deleteEvent, events, loggedUser }) => {
  useEffect(() => {
    // if (events.length === 0) {
    console.log('initializeEventssss')
    initializeEvents()
    // }
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
      {console.log('events..hhh',events)}
      <Table >
        <tbody>
          { events&&events
            .map(e =>
            //   <Event  e={e}
            //     key={e.id}
            //     loggedUSer={loggedUser} removeEvent={removeEvent} />
            // )}
              <tr key={e.id}  className='eList'>
                <td>
                  <img
                    src={ baseUrl+`${ e.eventImage }`}
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
                {loggedUser && loggedUser.role==='admin'
                  ?    <td> <Button className="button buttonDelete" onClick={removeEvent(e.id)} variant="outline-secondary" type="submit" >Delete </Button></td>
                //  className="delete"><DeleteButton id={e.id} onClick={r} />
                  : <em></em>}
              </tr>
            )}
        </tbody>
      </Table>
    </div>
  )
}


const mapStateToProps = (state) => {
  console.log('state events', state.events.events)

  return {
    events: state.events.events,
    loggedUser: state.loggedUser.loggedUser
  }
}


export default connect(
  mapStateToProps,
  { initializeEvents, deleteEvent }
)(EventList)

