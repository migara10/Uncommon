import { useDispatch, useSelector } from "react-redux";
import { Role } from "@/types";
import { updateUser, userSliceSelector } from "@/store/reducers/userSlice";

const HomeComponent = () => {
  const user = useSelector(userSliceSelector);
  const dispatch = useDispatch();



  const trigger = () => {
    dispatch(updateUser({
      firstName: "migara",
      lastName: "tennakoon",
      email: "migara@gmail123.com",
      password: "1234",
      userType: Role.ADMIN
    }));
    console.log('test trigger')
  }

  return (
    <div>
      <div>{user.user?.email}jjjj</div>
      <button onClick={() => trigger()}>Click</button>
    </div>
  );
};

export default HomeComponent;
