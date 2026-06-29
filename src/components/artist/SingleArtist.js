import React, { useEffect } from "react";
import { connect } from "react-redux";
import { initializeSingleUser } from "../../reducers/actionCreators/userActions";
import userActions from "../../reducers/actionCreators/userActions";
import { Link, useParams } from "react-router-dom";
//import url from "../../services/config";
//const baseUrl = url + "public/";

export const SingleArtist = ({ singleUser, initializeSingleUser }) => {
  const { id } = useParams();

  useEffect(() => {
    initializeSingleUser(id);
  }, [id]);

  return (
    <div className="singleUser">
      <div className="user">
        {!singleUser ? null : (
          <div>
            <div className="singleArtistHeader">
              <h3>{singleUser.name}</h3>{" "}
            </div>
            {singleUser.intro}

            <br />
            {singleUser.artworks &&
              singleUser.artworks.map((a) => (
                <ul key={a.id} className="ulList">
                  {/* <div className='singleUserPicture'> */}
                  <li>
                    <br />
                    <img
                      src={`${a.galleryImage}`}
                      //src={ BASE_URL+`${ a.galleryImage }`}
                      width="300"
                      height="auto"
                      className="singlepicture"
                      alt="img"
                    />{" "}
                  </li>
                  <li className="artwork">
                    {" "}
                    <Link to={`/artworks/${a.id}`}> {a.name} </Link> by {a.User}
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
  );
};

const mapStateToProps = (state) => {
  console.log("state.singlea.singlu", state);

  return {
    singleUser: state.singleUser.singleUser,
    //userToShow: state.users.users
  };
};

export default connect(mapStateToProps, {
  ...userActions,
  initializeSingleUser,
})(SingleArtist);
