import { getProfileDetails, registerProfile } from "../apis/firebase";
import { SmallCircle } from "components/Circle";
import { useEffect, useState } from "react";
import Layout from "components/Layout";
import { Redirect } from "react-router";
import Loader from "components/Loader";

const RegisterPage = () => {
  const [name, setname] = useState('')
  const [clg, setclg] = useState('')
  const [dept, setdept] = useState('')
  const [year, setyear] = useState('')
  const [phn, setphn] = useState('')
  const [registered, setRegistered] = useState(false)
  const [loading, setLoading] = useState(true)
  const register = () => {
    registerProfile(name, phn, clg, dept, year).then(r => setRegistered(true)).catch(e => console.log(e))
  }
  useEffect(() => {
    getProfileDetails().then(res => {
      if (res.name != null) {
        setRegistered(true)
      } else {
        setLoading(false)
      }
    }) 
  })
  if (registered) {
    return <Redirect to='/profile' />
  }
  return (
    <Layout>
      <SmallCircle style={{ height: "5rem", width: "5rem", right: "5vw", top:"7em",  }} />
      <SmallCircle style={{ height: "10rem", width: "10rem", left: "13vw", top:"10em" }} />
      <SmallCircle style={{ height: "3rem", width: "3rem", left: "5vw", bottom:"7em" }} />
      <SmallCircle style={{ height: "13rem", width: "13rem", right: "8vw", bottom:"3em",  }} />

      <Loader loading={loading}>
        <div className="mt-4 z-3 text-white mx-auto w-75">
          <div className="mx-auto">
            <h1 className="text-center text-white mb-5 heading text-uppercase">Register Profile</h1>
            <div className="mt-3 col-6 mx-auto">
              <h5 className="text-white heading text-uppercase">Name</h5>
              <input type="text" className="form-control" id="name" onChange={(e) => setname(e.target.value)}/>
            </div>
            <div className="mt-3 col-6 mx-auto">
              <h5 className="text-white heading text-uppercase">Phone</h5>
              <input type="tel" pattern="[1-9]{1}[0-9]{9}" className="form-control" id="email" onChange={(e) => setphn(e.target.value)}/>
            </div>
            <div className="mt-3 col-6 mx-auto">
              <h5 className="text-white heading text-uppercase">College Name</h5>
              <input type="text" className="form-control" id="clg" onChange={(e) => setclg(e.target.value)}/>
            </div>
              <div className="mt-3 col-6 mx-auto">
              <h5 className="text-white heading text-uppercase">Year of Study</h5>
              <input type="text" className="form-control" id="dept" onChange={(e) => setyear(e.target.value)}/>
              </div>
              <div className="mt-3 col-6 mx-auto">
                <h5 className="text-white heading text-uppercase">Department</h5>
                <input type="text" className="form-control" id="dept" onChange={(e) => setdept(e.target.value)}/>
              </div>
              <div className="d-grid mt-4 col-6 mx-auto mb-5">
              <button className="btn btn-outline-light" onClick={register} style={{paddingLeft: "3.5em", paddingRight:"3.5em"}} type="submit">Register Profile</button>
              </div>
          </div>
        </div>
      </Loader>      
    </Layout>
  )
}

export default RegisterPage

