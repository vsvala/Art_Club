import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
import eventService from '../../services/events'
import { deleteEvent } from '../../reducers/actionCreators/eventActions'
import { Table, Button } from 'react-bootstrap'

export const EventList = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const loggedUser = useSelector((state) => state.loggedUser.loggedUser)

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: eventService.getAll,
  })

  const removeEvent = (id) => async () => {
    if (window.confirm('Do you want to delete this event')) {
      await dispatch(deleteEvent(id))
      queryClient.invalidateQueries(['events'])
    }
  }

  const isLoggedAsAdmin = loggedUser && loggedUser.role === 'admin'

  if (isLoading) return <p>Ladataan...</p>

  return (
    <div className="eventList">
      <h2>Events</h2>
      <br />
      <Table>
        <tbody>
          {events?.map((e) => (
            <tr key={e.id} className="eList">
              <td>
                <img
                  src={e.eventImage}
                  style={{ maxWidth: '100%' }}
                  height="auto"
                  className="eventPicture"
                  alt="img"
                />
              </td>
              <td className="event">
                <h4> {e.title}</h4>
                <p>Start: {e.start} </p>
                <p>End: {e.end} </p>
                <p>Place: {e.place}</p>
                <p>Description: {e.description}</p>
              </td>
              {isLoggedAsAdmin ? (
                <td>
                  <Button
                    className="button buttonDelete"
                    onClick={removeEvent(e.id)}
                    variant="outline-secondary"
                    type="submit"
                  >
                    Delete
                  </Button>
                </td>
              ) : (
                <em></em>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default EventList
