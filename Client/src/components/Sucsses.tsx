import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';

const Sucsses = () => {
  useEffect(() => {
    Swal.fire({
      title: 'התחברת בהצלחה!',
      text: 'ברוך הבא!',
      icon: 'success',
      confirmButtonText: 'אישור'
    });

    const interval = setInterval(() => {
      confetti({
        particleCount: 100,
        angle: 90,
        spread: 70,
        origin: { x: 0.5, y: 0.5 },
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
    }, 4000);
  }, []);

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>התחברת בהצלחה!</h1>
    </div>
  );
};

const styles = {
    pageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f4f8',
      flexDirection: 'column' as 'column', 
      textAlign: 'center' as 'center',    
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#007aff',
    },
  };
  
export default Sucsses;
