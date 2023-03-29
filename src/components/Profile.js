const Profile = ({ name = "", email ="", dept="", year='', clg='' }) => {
  return <div className="user-profile text-center">
    <h2 className="text-white text-uppercase">{name}</h2>
    <p className="text-white text-lowercase">{email}</p>
    <h6 className="text-white ">Department: {dept}, Year: {year}</h6>
    <h5 className="text-white ">{clg}</h5>
  </div>
}

export default Profile;
