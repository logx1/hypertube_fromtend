import { Link } from "react-router";

export default function Profile() {
  return (
    <div>
      <h1>Profile page</h1>
      <Link to={"/profileSettings"}>Edit profile</Link>
      {/* <NavBar /> */}
      {/* <h1>hi</h1> */}
    </div>
  );
}
