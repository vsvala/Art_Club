import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Artist from './Artist'
import { Table } from 'react-bootstrap'
import userService from '../../services/users'

export const ArtistList = () => {
  const { data: artists = [], isLoading } = useQuery({
    queryKey: ['artists'],
    queryFn: userService.getAllArtists,
  })

  if (isLoading) return <p>Ladataan...</p>

  return (
    <div className="artistList">
      <h2>Artists</h2>

      <Table hover size="sm" responsive>
        <thead>
          <tr>
            <th>name</th>
            <th>artworks</th>
          </tr>
        </thead>

        <tbody>
          {artists?.map((user) => (
            <Artist user={user} key={user.id} />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default ArtistList
