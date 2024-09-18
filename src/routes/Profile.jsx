import React from 'react'
import { useSelector } from 'react-redux';
function Profile() {
      const { token, fullName, role } = useSelector((state) => state.auth);
  console.log( token ,fullName ,role );
  return (
    <div>Profile</div>
  )
}

export default Profile