import React from 'react';
import { Form, Input, Button } from 'antd';
import '../styles/formStyles.scss';
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react';
import {Checkbox } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';


// onFinish function to handle form submission.
const onFinish = async (values: any,navigate: any) => {
  try {
        // Sending a POST request to the backend API for login.
      const response = await axios.post('https://localhost:7203/api/Users/login', {
          email: values.email,
          password: values.password 
      });

      if (response.data.success) { // If login is successful, navigate to home page.
          console.log('המשתמש קיים');
          navigate('/home');
        } 
        else {
          console.log('המשתמש לא קיים');
      }
  } catch (error: unknown) {
        // Handling errors during the API request.
      if (axios.isAxiosError(error)) {
          console.error("שגיאה בהרשמה:", error.response);
          console.error("סטטוס קוד:", error.response?.status);
          console.error("תוכן השגיאה:", error.response?.data);
      } else {
          console.error("שגיאה לא ידועה:", error);
      }
  }
};

// LoginForm component for rendering the login page.
const LoginForm =() => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  
  return (
          <div className="registration-container">
              <div className="form-side">
                  <img src="/logo.png" alt="לוגו" className="logo" />
                  <h2 style={{textAlign:'center', paddingBlock: 30}}>התחברות</h2>
                  <Form form={form} onFinish={(values) => onFinish(values, navigate)} layout="vertical" autoComplete="off" style={{padding:'100px', paddingBlock: 40}}>
                      <div className="form-row" >
                          <Form.Item name="email" label="אימייל" rules={[{ type: 'email' }]}>
                              <Input  />
                          </Form.Item>
                      </div>
                      <div className="form-row">
                          <Form.Item name="password" label="סיסמה"  rules={[{ min: 6 }]}  >
                              <Input.Password />
                          </Form.Item> 
                      </div>
  
                      <Form.Item name="term" valuePropName="checked" style={{ marginBottom: 0 }}>
                          <Checkbox>זכור אותי</Checkbox> 
                      </Form.Item>
                      <div className="form-row">
                      <Form.Item >
                      <Button type="default" block icon={<img src="/google-icon.png" alt="google" />}>
                          התחברות עם חשבון גוגל
                      </Button> 
                      </Form.Item>
                      <Form.Item >
                          <Button type="primary" htmlType="submit" block loading={loading} >
                              כניסה
                          </Button>
                      </Form.Item>
                      </div>
                      <p className="login-link">אין לך חשבון? <Link to="/">להרשמה</Link></p>
  
                      <div className="store-icons">
                          <img src="/Google Play Badge.png" alt="Google Play" />
                          <img src="/App Store Badge.png" alt="App Store" />
                      </div>
                  </Form>
              </div>
  
              <div className="visual-side">
                  <div className="abeezee-regular">
                      <h1>רישוי עסקים מהמשרד ומכל מקום<br />
                      אפליקציית שטח למפקח</h1>
                  </div>
                  <img src="/Imgs.png" alt="phones" className="phones-image" />
                  <img src="/Ellipse 2.png" className="ellipse-image" />            
                  </div>
          </div>
      );
  };
    
export default LoginForm;
