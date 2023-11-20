import React, { useEffect } from "react";
import {Form, Input,  message} from "antd";
import Button from "../../components/Button";
import {Link, useNavigate} from "react-router-dom"
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import backgroundImg from "./room-interior-design.jpg";



function Login() {
  const navigate=useNavigate();
  const dispatch =useDispatch();
  const onFinish = async (values) => {
    try{
      dispatch(ShowLoading());
      const response= await LoginUser(values);
      dispatch(HideLoading());
      if(response.success){
        message.success(response.message);
        localStorage.setItem("token",response.data);
        window.location.href="/";
      }else{
        message.error(response.message);
      }
    }catch(error){
      dispatch(HideLoading());
      message.error(error.message);
    }

  };
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
      navigate("/");
    }
  },[]);

  return (
    <div className="h-screen bg-primary flex items-center justify-center bg-c" style={{
      backgroundImage: `url(${backgroundImg})`,
      }}>

      <div className=" authentication-form bg-white p-3 rounded col-6">
        <h1 className="text-secondary text-2xl font-bold mb-1">Vit-Ap Library Login</h1> 
        <hr />
        <Form layout="vertical" onFinish={onFinish} >  
          <Form.Item label="Email" name="email"
          rules={[
            {
              required:true,
              message:"Please input your email!",
            },
          ]}>
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password"
          rules={[
            {
              required:true,
              message:"Please input your Password!",
            },
          ]}>
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <div className="text-center mt-2 flex flex-col gap-1">
            <Button title="Login" type="submit"  /> 
            <Link to="/register" className="text-primary underline text-sm">Don't have an account? Click here to register</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default Login;

