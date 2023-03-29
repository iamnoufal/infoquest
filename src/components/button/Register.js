const { registerEvent } = require("apis/firebase")

function RegisterButton({eventName, profile}) {
  const handleRegistration = () => {
    registerEvent(profile.email, eventName).then(() => alert("You've registered for "+eventName)).catch(err => alert(err))
  }
  return (
    <div>
      <button onClick={handleRegistration} className="mx-1 btn mt-3 mb-3 register-button rounded-pill bg-color-aquagreen">Register</button>
    </div>
  )
}

export default RegisterButton