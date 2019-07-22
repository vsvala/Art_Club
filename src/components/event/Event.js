import React from 'react'
//const BASE_URL= 'http://localhost:3001/'
import url from '../../services/config'
const baseUrl = url + 'public/'
import { Button } from 'react-bootstrap'
//const baseurl=process.env.PUBLIC_URL

const Event = ({ e, loggedUser, removeEvent }) => {


  return (

    <div className="event">
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
        : <em></em>}
    </div>
  )
}

export default Event
