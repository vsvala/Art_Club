import React from 'react'
import { useQuery } from '@tanstack/react-query'
import ArtistCard from './ArtistCard'
import { Table } from 'react-bootstrap'
import userService from '../../services/users'

export const ArtistList = () => {
  const { data: artists = [], isLoading } = useQuery({
    queryKey: ['artists'],
    queryFn: userService.getAllArtists,
  })

  if (isLoading) return <p>Ladataan...</p>

  if (!Array.isArray(artists)) {
    return (
      <div className="artistList">
        <h2>Artists</h2>
        <div className="error">
          {artists?.error || 'Could not load artists'}
        </div>
      </div>
    )
  }

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
          {artists.map((user) => (
            <ArtistCard user={user} key={user.id} />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default ArtistList
