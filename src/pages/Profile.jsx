import {getAuth} from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import {updateDoc, doc} from 'firebase/firestore'
import {updateProfile, updateEmail} from 'firebase/auth'
import {db} from '../firebase.config'
import { toast } from 'react-toastify'

function Profile() {
  const navigate = useNavigate()
  const auth = getAuth()

  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
    nameChanged: false,
    emailChange: false
  })

  const {name, email} = formData

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async () => {

    try {

      let updateFireStore = false

      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name
        })
        updateFireStore = true
      }

      if (auth.currentUser.email !== email) {
        await updateEmail(auth.currentUser, email)
        updateFireStore = true
      }

      //update in firestore
      if (updateFireStore) {
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {name:name, email:email})
      }
    } catch (error) {
      console.log(error);
      toast.error('Error updating Personal Details')
    }
  }

  const onChange = (e) => {
    setFormData( (prevState) => ({
      ...prevState,
      [e.target.id]:e.target.value
    }))
  }

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button 
          type='button' 
          className="logOut"
          onClick={onLogout}
          >Logout</button>  
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p className="changePersonalDetails" onClick={ () => {
            changeDetails && onSubmit()
            setChangeDetails( (prevState) => (!prevState))
          }}>
            {changeDetails ? 'Done' : 'Update My Profile'}  
          </p>
        </div>

        <div className="profileCard">
          <input 
            type="text" 
            id='name' 
            className={!changeDetails ? 'profileName':'profileNameActive'} 
            disabled={!changeDetails}
            value={name}
            onChange={onChange}
            />

          <input 
            type="text" 
            id='email' 
            className={!changeDetails ? 'profileEmail':'profileEmailActive'} 
            disabled={!changeDetails}
            value={email}
            onChange={onChange}
            />

        </div>  
      </main>  
    </div>
  )
}

export default Profile