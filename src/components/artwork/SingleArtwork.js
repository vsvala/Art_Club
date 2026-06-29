import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { initializeSingleArtwork } from "../../reducers/actionCreators/singleArtworkActions";

export const SingleArtwork = ({
  artwork,
  initializeSingleArtwork,
}) => {
  const { id } = useParams();
  useEffect(() => {
    initializeSingleArtwork(id);
  }, [id]);

  // const artwork=artworks.find(a => a.id===artworkId)

  return (
    <div className="singleArtwork">
      {!artwork ? null : (
        <div>
          <img
            src={artwork.galleryImage}
            width="700"
            height="auto" //'550'
            className="singlePicture"
            alt="img"
          />
          <p>
            {artwork.name} by {artwork.artist}, year: {artwork.year}, size:
            {artwork.size}, medium:{artwork.medium}{" "}
          </p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    artwork: state.singleArtwork.singleArtwork,
    //artworks:state.artworks.artworks
  };
};

export default connect(mapStateToProps, {
  //...singleArtworkActions,
  initializeSingleArtwork,
})(SingleArtwork);
