import React, { useEffect } from 'react'
import { initializeSingleUser } from '../../reducers/actionCreators/userActions'
import { Link, useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import ArtworkDelete from '../artwork/ArtworkDelete'
import { useSelector, useDispatch } from 'react-redux'

export const SingleUser = ({ userId }) => {
  const { id: paramId } = useParams()
  const resolvedId = userId || paramId
  const normalizeId = (value) =>
    value !== undefined && value !== null ? String(value) : ''
  const loggedUser = useSelector((state) => state.loggedUser.loggedUser)
  const singleUser = useSelector((state) => state.singleUser.singleUser)
  const dispatch = useDispatch()
  const isOwner =
    loggedUser && resolvedId
      ? normalizeId(loggedUser.id) === normalizeId(resolvedId)
      : false
  const canViewAccountInfo = Boolean(
    loggedUser && (isOwner || loggedUser.role === 'admin'),
  )
  const accountInfoUser = isOwner
    ? {
        ...singleUser,
        username: singleUser?.username || loggedUser?.username,
        email: singleUser?.email || loggedUser?.email,
        role: singleUser?.role || loggedUser?.role,
      }
    : singleUser

  const artworkCount = singleUser?.artworks?.length ?? 0
  const canAddArtwork = artworkCount < 10

  useEffect(() => {
    dispatch(initializeSingleUser(resolvedId))
  }, [resolvedId, dispatch])

  return (
    <div className="singleUser">
      <div className="user">
        {!singleUser ? null : (
          <div>
            <h2>{singleUser.name}</h2>

            {canViewAccountInfo ? (
              <div>
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>username</th>
                      <th>email</th>
                      <th>status</th>
                      <th>artworks</th>
                      <th>update</th>
                      <th>Write inroduction</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{accountInfoUser.name}</td>
                      <td>{accountInfoUser.username}</td>
                      <td>{accountInfoUser.email}</td>
                      <td>{accountInfoUser.role}</td>
                      <td>
                        {artworkCount}/10
                        {canAddArtwork === true ? (
                          <Link to="/users/addArtwork" className="member">
                            {' '}
                            Add
                          </Link>
                        ) : null}
                      </td>
                      <td>
                        <Link to="/users/update" className="member">
                          Update information
                        </Link>
                      </td>
                      <td>
                        <Link to="/users/intro" className="member">
                          Write introduction
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <br />
                {singleUser.intro ? <h4>Introduction text</h4> : null}
              </div>
            ) : (
              <em></em>
            )}

            {singleUser.intro && singleUser.intro}
            <br />
            <br />
            <h4>Artworks</h4>
            {artworkCount === 0 ? <p>No images uploaded yet</p> : null}
          </div>
        )}

        <div className="addedArtworks">
          {singleUser?.artworks?.map((a) => (
            <ArtworkDelete key={a.id} artwork={a} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SingleUser
