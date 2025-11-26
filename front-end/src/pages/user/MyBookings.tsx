import React from 'react';
import Navbar from '../../components/NavBar/Navbar';
import Footer from '../../components/footer/Footer';
import Modal from '../../components/Modal/Modal';


const MyBookings: React.FC = () => {
  return (
    <div>
      <Navbar />
     <Modal
           isOpen={true}
           onClose={() => {}}
           message="This is a modal message."
         />
      <Footer />
    </div>
  );
};

export default MyBookings;
