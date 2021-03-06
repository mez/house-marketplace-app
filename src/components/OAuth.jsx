import { useNavigate, useLocation } from "react-router-dom"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import googleIcon from '../assets/svg/googleIcon.svg'


export default function OAuth() {
  const navigate = useNavigate()
  const location = useLocation()


  const onGoogleClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const docRef = doc(db, 'users', user.uid)
      const docSnapshot = await getDoc(docRef)

      //check if user exists
      if (!docSnapshot.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        } )
      }

      navigate('/')

    } catch (error) {
      toast.error('Could not Auth with Google')
    }
  }
  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === '/sign-up' ? 'Up': 'In'} with</p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img className="socialIconImg" src={googleIcon} alt="google" />  
      </button>
      </div>
  )
}
