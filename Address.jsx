import { addDoc, collection, doc, limit, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore';
import React, {Fragment, useEffect, useState} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db, } from './firebase';

export default function Address() {
    const [address, setAddress] = useState([]);
    const [user] = useAuthState(auth);
    useEffect(() =>{
        const articleRef = collection(db, "User_info");
        const q = query(articleRef,where('Uid', '==', user.uid));
        onSnapshot(q,(snapshot)=>{
            console.log(snapshot.docs);
            const address = snapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data(),
        }));
        setAddress(address);
        console.log(address); 
        })
    },[])
    const handleChange = e=> {
        const { name, value } = e.target;
    
        this.setState({
          [name]: value  
        });
        console.log(value);
      };

      const navigate = useNavigate();
      const navigatePayment = () => {
        // 👇️ navigate to /
        if(document.getElementById('Address').checked == true) {   
          const orderRef = collection(db, "order_details");
          const u = query(orderRef,orderBy('order_id', "desc"),limit(1));
          var a=u+1
          const selectedValue = document.getElementById('Address').value;

          navigate('/Payment')
          console.log(selectedValue)
          console.log(a)
          console.log(u)
 } else {  
              alert("Please choose your address");   
      };
      }
  return (
    <div>
        <h4 style={{textAlign:"center"}} >Shipping address</h4>
        {
        !user?
        <>
        <h2>
        <Link to='/signin'>Login to Add Address</Link> 
        </h2>
          Don't have an account? <Link to='register'>Register</Link>
        </>
        :<>
        {address.length === 0  ? (
                <p>No Address saved :(</p>
            ):(
                address.map(({Add_1,Add_2,Add_3,Add_4,Pincode,MobileNum,Uid}) => (
                  
                <div className='border mt-3 p-3 bg-light' key={Uid} >
                           <input
                           id='Address'
          
                          value={(Add_1,Add_2,Add_3,Add_4,Pincode,MobileNum)}
                          name="Address"
                          type="radio"
                          onChange={handleChange}/>
                          <p>{Add_1}</p>
                          <p>{Add_2}</p>
                          <p>{Add_3}</p>
                          <p>{Add_4}</p>
                          <p>{Pincode}</p>
                          <p>{MobileNum}</p>        
                    </div>
                ))   
           ) }</> }<div style={{textAlign:"center"}} ><Link  to='/AddAddress' >Add new address</Link> </div><br/>
            <button className='btn btn-primary' onClick={navigatePayment}>Proceed</button>
    </div>
  )
}
