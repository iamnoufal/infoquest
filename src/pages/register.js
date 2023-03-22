import { registerProfile } from "../apis/firebase";
import { SmallCircle } from "components/Circle";

const { default: Layout } = require("components/Layout")
let name, email, clg, dept, year, phn;
const RegisterPage = () => {
  return (
    <Layout>
      <SmallCircle style={{ height: "5rem", width: "5rem", right: "5vw", top:"7em",  }} />
      <SmallCircle style={{ height: "10rem", width: "10rem", left: "13vw", top:"10em" }} />
      <SmallCircle style={{ height: "3rem", width: "3rem", left: "5vw", bottom:"7em" }} />
      <SmallCircle style={{ height: "13rem", width: "13rem", right: "8vw", bottom:"3em",  }} />

      <div class="mt-4 z-3 text-white mx-auto w-75">
        <div class="mx-auto">
          <h1 class="text-center text-white mb-5 heading text-uppercase">Register Profile</h1>
          <div class="mt-3 col-6 mx-auto">
            <h5 class="text-white heading text-uppercase">Name</h5>
            <input type="text" class="form-control" id="name" value={name}/>
          </div>
          <div class="mt-3 col-6 mx-auto">
            <h5 class="text-white heading text-uppercase">E-mail</h5>
            <input type="text" class="form-control" id="email" value={email}/>
          </div>
          <div class="mt-3 col-6 mx-auto">
            <h5 class="text-white heading text-uppercase">Phone</h5>
            <input type="tel" pattern="[1-9]{1}[0-9]{9}" class="form-control" id="email" value={phn}/>
          </div>
          <div class="mt-3 col-6 mx-auto">
            <h5 class="text-white heading text-uppercase">College Name</h5>
            <input type="text" class="form-control" id="clg" value={clg}/>
          </div>
            <div class="mt-3 col-6 mx-auto">
            <h5 class="text-white heading text-uppercase">Year of Study</h5>
            <input type="text" class="form-control" id="dept" value={year}/>
            </div>
            <div class="mt-3 col-6 mx-auto">
              <h5 class="text-white heading text-uppercase">Department</h5>
              <input type="text" class="form-control" id="dept" value={dept}/>
            </div>
            <div class="d-grid mt-4 col-6 mx-auto mb-5">
            <button class="btn btn-outline-light" onClick={ () => registerProfile(name, email, phn, clg, dept, year) } style={{paddingLeft: "3.5em", paddingRight:"3.5em"}} type="submit">Register Profile</button>
            </div>
        </div>
      </div>      
    </Layout>
  )
}

export default RegisterPage

