import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Product from './Product'
import Banner from './Banner'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../FirebaseConfigs/firebaseconfig'

const Home = () => {
  function GetCurrentUser () {
    const [user, setUser] = useState('');
    const usersCollectionRef = collection(db, 'users');

    useEffect(() => {
      auth.onAuthStateChanged(userlogged => {
        if (userlogged) {
          const getusers = async () => {
            const q = query(
              collection(db, 'users'),
              where('uid', '==', userlogged.uid)
            )

            console.log(q);
            const data = await getDocs(q)
            setUser(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
          }
          getusers()
        } else {
          setUser(null)
        }
      })
    }, [])
    return user
  }
  const user = GetCurrentUser()

  return (
    <div>
      <Navbar />
      <Banner />
      <Product />
    </div>
  )
}

export default Home
