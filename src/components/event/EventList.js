import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {  initializeEvents,  deleteEvent } from '../../reducers/actionCreators/eventActions'
import { initLoggedUser } from '../../reducers/actionCreators/loginActions'
import { Link } from 'react-router-dom'
import DeleteButton from '../common/DeleteButton'
import url from '../../services/config'
import { Table } from 'react-bootstrap'


const baseUrl = url + 'public/'

/* eslint-disable */
//const BASE_URL= process.env.PUBLIC_URL  //'http://localhost:3001/'
/* eslint-enable */

//import Artwork from './Artwork'
//
export const EventList = ({   initializeEvents, initLoggedUser, deleteEvent,  events, loggedUser }) => { // => {
  useEffect(() => {
    // if (events.length === 0) {
    console.log('initializeEventssss')
    initializeEvents() &&
    initLoggedUser()
    // }
  }, [])


  //TODO search by artist or by artwork...order alphabetically by ainting and artist
  //event handler for deleting specific course application, tells studentactions to deleteApliedCourse
  const removeEvent = (id) => {
    return () => {
      if (window.confirm('Do you want to delete this event')) {
        deleteEvent(id)//, loggedUser.user.user_id
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
          { events
            .map(e =>
              <div key={e.id}  className='eList'>
                {/* <li className="event"> <Link to={`/events/${e.id}`}> {e.title} </Link>  </li> */}

                <tr>
                  <td>
                    <img
                      src={ baseUrl+`${ e.eventImage }`}
                      height='200'
                      width='200'
                      className='eventPicture'
                      alt='img'
                    /> </td>
                  <br/>
                  <td className="event">
                    <h4><Link to={`/events/${e.id}`}> {e.title} </Link></h4>
                    <p>  Start day: { e.startDate }, End day: { e.endDate }</p>
                    <p>   Place:  { e.place }</p>
                    <p>   Description: { e.description }</p>
                  </td>
                  {loggedUser && loggedUser.role==='admin'
                    ?  <td className="delete"><DeleteButton id={e.id} onClick={removeEvent} /></td>
                    : <em></em>}   </tr>

              </div>
            )}

        </tbody>
      </Table>

    </div>
  )
}

//  {console.log('events..hhh',eventList)}
//       {eventList
//         .map(artwork =>
//           <Artwork
//             artwork={artwork}
//             key={artwork.id}//artwork_id
//             onClick={removeArtwork}
//           />
//         )}

// </div>)}



const mapStateToProps = (state) => {
  console.log('state', state.events.events)

  return {
    events: state.events.events,
    loggedUser: state.loggedUser.loggedUser
  }
}


export default connect(
  mapStateToProps,
  { initializeEvents, deleteEvent, initLoggedUser }
)(EventList)

