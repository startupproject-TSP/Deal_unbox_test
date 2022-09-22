import { addDoc, collection, Timestamp } from 'firebase/firestore';
import React, {useState} from 'react';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {auth, db, storage} from './firebase';
import { toast } from "react-toastify";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';


export default function AddAddress() {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    Add_1: "",
    Add_2: "",
    Add_3: "",
    Add_4: "",
    MobileNum: '',
    Pincode: ''

  });
  const [progress, setProgress] = useState(0);
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  };

  // const handleImageChange=(e)=>{
  //   setFormData({...formData,image:e.target.files[0]})
  // };
  const navigate = useNavigate();
  const handlePublish = ()=> {
    if(!formData.Add_1 || !formData.Add_2 || !formData.Add_3 || !formData.MobileNum  || !formData.Pincode ){
      alert('Please fill all the fields');
      return;
    }
    else{
      setFormData({
        Add_1: "",
        Add_2: "",
        Add_3: "",
        Add_4: "",
        MobileNum: '',
        Pincode: ''
      })
      

        navigate('/Address');
      

      // getDownloadURL(uploadImage.snapshot.ref)
      // .then((url)=>{
        const articleRef = collection(db, "User_info");
        addDoc(articleRef, {
          Add_1: formData.Add_1,
          Add_2: formData.Add_2,
          Add_3: formData.Add_3,
          Add_4: formData.Add_4,
          MobileNum: formData.MobileNum,
          Pincode: formData.Pincode,
          // imageUrl: url,
          // createdAt: Timestamp.now().toDate(),
          // createdBy:user.displayName,
          Uid:user.uid,
          // likes:[],
          // comments:[]
        })
        .then(()=>{
          toast("Address added successfully", {type:"success"});
        
        })
        .catch((err)=>{
          toast('Error adding Address', {type:"error"});
        })
      }
    
    }
  return (
    <div className='border p-5 mt-3 bg-light' style={{alignContent:"center"}}>
      {
        !user?
        <>
        {/* <h2>
        <Link to='/signin'>Login to create article</Link> 
        </h2> */}
          Don't have an account? <Link to='register'>Signup</Link>
        </>
        :<>
                <h2>Add Address</h2>
        <label htmlFor=''>Address1</label>
            <input 
              type="text" 
              name='Add_1' 
              className='form-control'
              placeholder='Door No, Apartment Name'
              value={formData.Add_1}
              onChange={(e)=>handleChange(e)} />
        <label htmlFor=''>Address2</label>
            <input 
              type="text" 
              name='Add_2' 
              className='form-control'
              placeholder='Street Name, Area'
              value={formData.Add_2}
              onChange={(e)=>handleChange(e)} />
        <label htmlFor=''>Address3</label>
            <input 
              type="text" 
              name='Add_3' 
              className='form-control'
              placeholder='City'
              value={formData.Add_3}
              onChange={(e)=>handleChange(e)} />
        <label htmlFor=''>Address4</label>
            <input 
              type="text" 
              name='Add_4' 
              className='form-control'
              placeholder='Landmark(optional)'
              value={formData.Add_4}
              onChange={(e)=>handleChange(e)} />
         <label htmlFor=''>MobileNum</label>
              <input 
              type="tel"
              name='MobileNum'
              required="required" 
              maxLength="10"
              minLength="10"
              className='form-control'
              placeholder='MobileNumber'
              value={formData.MobileNum}
              onChange={(e)=>handleChange(e)} />
        <label htmlFor='pincode'>Pincode</label>
              <input 
               type="tel"
               required="required"
              maxLength="6"
              name='Pincode' 
              className='form-control'
              placeholder='Pincode'
              value={formData.Pincode}
              onChange={(e)=>handleChange(e)} />

        {/* description */}
        {/* <label htmlFor=''>Address2</label>
        <textarea  
          name='description' 
          className='form-control'
          value={formData.description}
          onChange={(e)=>handleChange(e)} />

        {/* image */}
        {/* <label htmlFor=''>Image</label>
        <input  
          type='file' 
          name='image' 
          accept="image/*" 
          className='form-control'
          value={formData.imageUrl}
          onChange={(e)=>handleImageChange(e)} /> */} 
{/* progress */}
{progress === 0 ? null : (
          <div className="progress">
            <div className="progress-bar progress-bar-striped mt-2" 
            style={{width: `${progress}%`}}>
                {`uploading image ${progress}%`}
            </div>
          </div>
  )}
          <button className='btn btn-primary mt-2' style={{alignItems:'center'}}
          onClick={handlePublish}>Add</button>
        </>
      }

    </div>
  )
    }
