import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeSingleUser } from '../../reducers/actionCreators/userActions'
import userActions from '../../reducers/actionCreators/userActions'
import { Link, useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { notify } from '../../reducers/actionCreators/notificationActions'
import { deleteArtwork } from '../../reducers/actionCreators/artworkActions'
import ArtworkDelete from '../artwork/ArtworkDelete'

export const SingleUser = ({
  singleUser,
  userId,
  initializeSingleUser,
  loggedUser,
}) => {
  const { id: paramId } = useParams()
  const resolvedId = userId || paramId

  useEffect(() => {
    initializeSingleUser(resolvedId)
  }, [resolvedId])

  return (
    <div className="singleUser">
      <div className="user">
        {!singleUser ? null : (
          <div>
            <h2>{singleUser.name}</h2>

            {loggedUser &&
            (loggedUser.role === 'member' || loggedUser.role === 'admin') ? (
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
                      <td>{singleUser.name}</td>
                      <td>{singleUser.username}</td>
                      <td>{singleUser.email}</td>
                      <td>{singleUser.role}</td>
                      <td>
                        {singleUser.artworks && singleUser.artworks.length}/10
                        <Link to="/users/addArtwork" className="member">
                          {' '}
                          Add
                        </Link>
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
            {singleUser.artworks <= 0 && singleUser.artworks <= 0 ? (
              <p>No images uploaded yet</p>
            ) : null}
          </div>
        )}

        <div className="addedArtworks">
          {singleUser &&
            singleUser.artworks &&
            singleUser.artworks.map((a) => (
              <ArtworkDelete key={a.id} artwork={a} />
            ))}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    singleUser: state.singleUser.singleUser,
    loggedUser: state.loggedUser.loggedUser,
  }
}

export default connect(mapStateToProps, {
  notify,
  ...userActions,
  initializeSingleUser,
  deleteArtwork,
})(SingleUser)
