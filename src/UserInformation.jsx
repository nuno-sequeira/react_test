import React from 'react';

const UserInformation = props => (
  <div>
    {props.name !== undefined ?
    <div>
      Repo Name: {props.name}, Description: {props.description}
    </div> :
    <div>
      Display the user information here
    </div>}
  </div>
);

export default UserInformation;