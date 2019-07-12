import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeEvents,  deleteEvent } from '../../reducers/actionCreators/artworkActions'
import { initLoggedUser } from '../../reducers/actionCreators/loginActions'
import { Link } from 'react-router-dom'
import DeleteButton from '../common/DeleteButton'
import url from '../../services/config'

const baseUrl = url + 'public/'

/* eslint-disable */
//const BASE_URL= process.env.PUBLIC_URL  //'http://localhost:3001/'
/* eslint-enable */

//import Artwork from './Artwork'

export const EventList = ({ deleteEvent, initializeEvents, events, loggedUser,  initLoggedUser }) => { // => {
  useEffect(() => {
    // if (events.length === 0) {
    console.log('initialiList')
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
      <h2>Gallery</h2>
      <br/>
      {console.log('events..hhh',events)}
      <div>
        { events
          .map(e =>
            <ul key={e.id}  className='elList'>
              <li><img
                src={ baseUrl+`${ e.eventImage }`}
                // width='300'
                // height='auto'
                className='eventPicture'
                alt='img'
              /></li>
              <li className="event"> <Link to={`/events/${e.id}`}> {e.title} </Link>  </li>
              {/* </Link>/ by { a.artist }, { a.year }, { a.size }, { a.medium } */}

              {loggedUser && loggedUser.role==='admin'
                ? <li className="delete"><DeleteButton id={e.id} onClick={removeEvent} /></li>
                : <em></em>}
            </ul>
          )}
      </div>
    </div>   )
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
//     </div>



const mapStateToProps = (state) => {
  console.log('state', state.events.events)

  return {
    events: state.evenst.events,
    loggedUser: state.loggedUser.loggedUser
  }
}


export default connect(
  mapStateToProps,
  { initializeEvents, deleteEvent, initLoggedUser }
)(EventList)

