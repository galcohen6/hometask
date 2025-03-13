import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, DatePicker, Checkbox, Select } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/formStyles.scss';
import { getCities, getStreets } from '../api/addressService'; 

// Interfaces for City and Street to define their structure.
interface City {
    name: string;
  }
  
  interface Street {
    name: string;
  }

  
  
const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [streets, setStreets] = useState<Street[]>([]); 
  const [selectedCity, setSelectedCity] = useState<string>(''); 
  const navigate = useNavigate(); 
  
    // Function to handle failed form submission.
  const onFinishFailed = (errorInfo: any) => {
    const fields = form.getFieldsValue();
    const fieldNames = Object.keys(fields);
  
    form.setFields(
      fieldNames.map((key) => {        
        return {
          name:  (key!=='term') ?key : undefined ,
          errors: !fields[key] ? ['שדה חובה'] : [], 
        };
      })
    );
  };
  
    // Fetching the cities when the component is mounted.
  useEffect(() => {
    const fetchCities = async () => {
      const cities = await getCities();
      setCities(cities);
    };
    fetchCities();
  }, []);

    // Fetching the streets based on the selected city.
  useEffect(() => {
    const fetchStreets = async () => {
      if (selectedCity) {
        const streets = await getStreets(selectedCity);
        setStreets(streets);
      }
    };
    fetchStreets();
  }, [selectedCity]);

    // Handle form submission when the form is valid.
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
    Modal.success({ content: 'נרשמת בהצלחה' });
      const response = await axios.post('https://localhost:7203/api/Users/register', values);
      navigate('/login');

    } catch (error) {
      Modal.error({ content: 'שגיאה בהרשמה' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="form-side">
        <img src="/logo.png" alt="לוגו" className="logo" />
        <h2>צור חשבון</h2>
        <div className="form-header">
          <p className='poppins-regular'>לחברות או אדם פרטי</p>
          <p className="form-warning">*שים לב כל השדות הם שדות חובה</p>
        </div>

        <Form form={form} onFinish={onFinish}  onFinishFailed={onFinishFailed} layout="vertical" autoComplete="off">
          <div className="form-row">
            <Form.Item name="fullName" label="שם מלא" rules={[{ message: 'הזן שם מלא' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="idNumber" label="תעודת זהות" rules={[{ len: 9, message: '9 ספרות' }]}>
              <Input />
            </Form.Item>
          </div>
          <div className="form-row">
            <Form.Item name="birthDate" label=" תאריך לידה (MM/DD/YY)" >
              <DatePicker name='datePicker' format="MM/DD/YY" style={{ width: '100%', borderRadius: '3px', height: '40px' }} />
            </Form.Item>
            <Form.Item name="email" label="אימייל" rules={[{ type: 'email',message: 'הזן אימייל תקין'  }]}>
              <Input />
            </Form.Item>
          </div>
<div className="form-row" >
  <Form.Item name="city" label="עיר" style={{ width: '100%'}} rules={[{  message: 'בחר עיר' }]}>  
    <Select style={{ width: '100%'}} showSearch
      value={selectedCity}
      onChange={(value) => setSelectedCity(value)}
    >
      {cities.map((city) => (
        <Select.Option key={city.name} value={city.name}>
          {city.name}
        </Select.Option>
      ))}
    </Select>
  </Form.Item>
  <Form.Item name="street" label="רחוב" style={{ flex : 0.65 }} rules={[{  message: 'בחר רחוב' }]} >
    <Select showSearch>
      {streets.map((street) => (
        <Select.Option key={street.name} value={street.name}>
          {street.name}
        </Select.Option>
      ))}
    </Select>
  </Form.Item>
  <Form.Item name="houseNumber" label="מספר בית" style={{ flex: 0.28 }}  rules={[{ pattern: /^[0-9]*$/, message: 'הזן מספר בית תקין' }]} >
    <Input />
  </Form.Item>
</div>
          <div className="form-row">
            <Form.Item name="password" label="סיסמה" rules={[{ min: 6 ,message: 'הסיסמה חייבת להיות לפחות 6 תווים' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item name="confirmPassword" label="אימות סיסמה" 
               dependencies={['password']} 
               rules={[
                { message: 'עליך לאשר את הסיסמה' },
                ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                    }
                    return Promise.reject(new Error('הסיסמאות לא תואמות'));
                },
                }),
            ]}>
              <Input.Password />
            </Form.Item>
          </div>

          <Form.Item name="term" valuePropName="checked" style={{ marginBottom: 0 }}  >
            <Checkbox>זכור אותי</Checkbox>
          </Form.Item>
          <Form.Item name="terms" valuePropName="checked" rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('חובה לאשר תנאים') }]}>
            <Checkbox>אני מאשר/ת את <a href="#">תנאי השימוש</a></Checkbox>
          </Form.Item>
          <div className="form-row">
            <Form.Item>
              <Button type="default" block icon={<img src="/google-icon.png" alt="google" />}>
                התחברות עם חשבון גוגל
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading} >
                צור חשבון
              </Button>
            </Form.Item>
          </div>
          <p className="login-link">יש לך חשבון קיים? <Link to="/login">להתחברות</Link></p>

          <div className="store-icons">
            <img src="/Google Play Badge.png" alt="Google Play" />
            <img src="/App Store Badge.png" alt="App Store" />
          </div>
        </Form>
      </div>

      <div className="visual-side">
        <div className="abeezee-regular">
          <h1>רישוי עסקים מהמשרד ומכל מקום<br />אפליקציית שטח למפקח</h1>
        </div>
        <img src="/Imgs.png" alt="phones" className="phones-image" />
        <img src="/Ellipse 2.png" className="ellipse-image" />
      </div>
    </div>
  );
};

export default RegistrationForm;
