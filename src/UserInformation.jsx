import React from 'react';

const UserInformation = props => (
  <div>
    {props.name !== undefined ?
    <div className="text-left">
      <h5><b>{props.name}</b></h5>
      <p>{props.description}</p>
      <hr/>
    </div> :
    <div>
      Display the user information here
    </div>}
  </div>
);

export default UserInformation;