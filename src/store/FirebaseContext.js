import {createContext, useState} from 'react'
import {firestore} from '../firebase/Config'


export const FirebaseContext = createContext(null)

function Firebase({children}) {
    return (
        <FirebaseContext.Provider value={firestore} >
            {children}
        </FirebaseContext.Provider>
    )
}

export {Firebase}



export const AuthContext = createContext(null)


function Context({children}) {
    const [user, setUser] = useState(null)

    return (
        <AuthContext.Provider value={{user,setUser}} >
            {children}
        </AuthContext.Provider>
    )
}

export {Context}