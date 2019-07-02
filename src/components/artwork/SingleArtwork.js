import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import singleArtworkActions from '../../reducers/actionCreators/singleArtworkActions'
import { initializeSingleArtwork }  from '../../reducers/actionCreators/singleArtworkActions'

//import { Table, Button } from 'react-bootstrap'

export const SingleArtwork = ({
  artwork,
  initializeSingleArtwork,
  artworkId
}) => {

  useEffect(() => {
    initializeSingleArtwork(artworkId)
  }, [])

  return (
    <div>
        TODO DELETE button
      <div className="courseHeader">
        {!artwork ?
          null
          :
          <div>
            <h2>{artwork.name} {artwork.artist}</h2>
            <table className="courseHeaderData">
              <colgroup>
                <col width="100" />
                <col width="80" />
              </colgroup>
              <tbody>
                <tr>
                  <td>Year</td>
                  <td>{artwork.year}</td>
                </tr>
                <tr>
                  <td>Periods</td>
                  <td>{artwork.medium}</td>
                </tr>
              </tbody>
            </table>
          </div>
        }

        {/*       <div className='emailHidden'>Save changes to send email</div>
        }
        <Button className='button float-right' style={{ float: 'right', margin: 5 }} id='saveApplied' onClick={handleAcceptedSubmit}>Save</Button>

      </div> */}

        {/*  <Table bordered hover>
          <tbody>
            {artworks.map(art =>
              <tr className='Artwork' key={art._id}>

                <td>{art.name}</td>
                <td>{art.medium}</td>
                <td>
                  {/* <img
                    src={require('../../Images/finnishFlag.png')}
                    width='30'
                    height='20'
                    alt="Finnish Flag"
                    />
                }
                </td>

              </tr>
            )}
             <tr>
            <td style={{ visibility: 'hidden', borderLeftStyle: 'hidden', borderBottomStyle: 'hidden' }} colSpan='7'></td>
            <td className='centerColumn' ><Button className='button' id='selectAccepted' variant="outline-secondary" onClick={checkAllAcceptedBoxes}>Check all</Button></td>
            <td className='centerColumn' ><Button className='button' id='selectEmails' style={{ width: '110px' }} variant="outline-secondary" onClick={checkAllEmailBoxes}>Check accepted</Button></td>
          </tr>
          <tr>
            <td style={{ visibility: 'hidden', borderLeftStyle: 'hidden', borderBottomStyle: 'hidden' }} colSpan='8'></td>
            <td className='centerColumn' ><Button id='selectEmailsUnaccepted' style={{ width: '110px' }} variant="outline-secondary" onClick={checkNotAcceptedEmailBoxes}>Check not accepted</Button></td>
          </tr>
          </tbody>
        </Table>*/}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    artwork: state.singleArtwork.singleArtwork
  }
}

export default connect(
  mapStateToProps,
  { ...singleArtworkActions, initializeSingleArtwork }
)(SingleArtwork)