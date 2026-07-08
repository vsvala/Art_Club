import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeSingleUser } from '../../reducers/actionCreators/userActions'
import userActions from '../../reducers/actionCreators/userActions'
import { Link, useParams } from 'react-router-dom'
import cloudinaryOptimize from '../../utils/cloudinary-optimize'

export const SingleArtist = ({ singleUser, initializeSingleUser }) => {
  const { id } = useParams()

  useEffect(() => {
    initializeSingleUser(id)
  }, [id])

  return (
    <div className="singleUser">
      <div className="user">
        {!singleUser ? null : (
          <div>
            <div className="singleArtistHeader">
              <h3>{singleUser.name}</h3>
            </div>
            {singleUser.intro}

            <br />
            {singleUser.artworks?.map((a) => (
              <ul key={a.id} className="ulList">
                <li>
                  <br />
                  <img
                    src={cloudinaryOptimize(a.galleryImage, 800)}
                    width="100%"
                    height="auto"
                    className="singlepicture"
                    alt="img"
                  />
                </li>
                <li className="artwork">
                  <Link to={`/artworks/${a.id}`}> {a.name} </Link> by {a.artist}
                </li>
                <li>
                  {a.year}, {a.size}, {a.medium}
                </li>
              </ul>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    singleUser: state.singleUser.singleUser,
  }
}

export default connect(mapStateToProps, {
  ...userActions,
  initializeSingleUser,
})(SingleArtist)
