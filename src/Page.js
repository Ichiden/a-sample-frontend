import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Cookies from 'universal-cookie';
// import jwt from 'jsonwebtoken'

const Container = styled.div`
  width:500px;
  margin-left: 50%;
  transform: translateX(-50%);
  box-shadow: 1px 1px 8px black;
  padding:20px;
  box-sizing: border-box;
  margin-top: 50px;
`

const Input = styled.input`
  width:100%;
  padding:10px;
  box-sizing: border-box;
  margin-bottom: 10px;
`

const Button = styled.button`
  width:100%;
  padding:10px;
  background-color: blue;
  border:none;
  color:white;
  font-size: 16px;
  box-sizing: border-box;
  border-radius: 2px;
  cursor: pointer;

  &:hover{
    opacity: .5;
  }
`

const Page = () => {
    const [name, setName] = useState('');

    const [refresher, setRefresher] = useState(false)

    const cookies = new Cookies(null, { path: '/' });

    const addFunction = async() => {
      const res = await axios({
        method:'POST',
        url:'/create',
        data:{},
        include:{withCredentials:true}
      })



      console.log(res.data)
      cookies.set('myCat',res.data ,{
        secure:true,
        sameSite:'None'
      }
        );
    }

    // const getToken = async() => {
    //   const res = await axios({
    //     method:'post',
    //     url:'/get-token',
    //     data:{},
    //     withCredentials:true
    //   })
    // }

    const getToken = async() => {
      const res = await axios.post('/get-token',{},{withCredentials:true})
    }

    const [errorHandler, setErrorHandler] = useState('')
    const getIt = async() => {
      // const res = await axios({
      //   method:'get',
      //   url:'/get',
      //   include:{withCredentials:true}
      // })



      const res = await axios.get('/get',{withCredentials:true})

      console.log(res.data)
    }


    const getCookie = async() => {
      const cookie = cookies.get('myCat');

      try{
        const res = await axios({
          method:'get',
          url:`/get?cookie=${cookie}`,
          withCredentials:true
        })
        setErrorHandler(res.data)
        console.log(res)
      }catch(err){
        setErrorHandler(err.response.data)
      }
    }

  return (
    <>
    <Container>
        <Input placeholder='Enter your name here' onChange={e => setName(e.target.value)} />
        <Button onClick={addFunction}>SUBMIT</Button>
    </Container>

    <button onClick={getToken}>TOKEN</button>

    <button onClick={getIt}>GET</button>

    <button onClick={getCookie}>GET COOKIE</button>


    <p>{errorHandler}</p>
    </>
  )
}

export default Page
