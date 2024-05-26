import React, { useState, useEffect } from 'react';
import Navbar from '../../components/user/Navbar/navbar';
import Footer from '../../components/user/Footer/Footer';
import { useAppSelector } from '../../redux/store/Store';
import axios from 'axios';
import { USER_API } from '../../constants';
import axiosJWT from '../../utils/axiosService';

const WalletPage: React.FC = () => {
  const user = useAppSelector((state) => state.UserSlice);
  const [walletAmount, setWalletAmount] = useState<number>(0);

  useEffect(() => {
    
    const fetchWalletAmount = async () => {
      const response = await axiosJWT.get(`${USER_API}/fetchWallet/${user.id}`);
      setWalletAmount(response.data.getWallet.balance);
      
    };

    fetchWalletAmount();
  }, []);

  return (
        <><Navbar /><div className="flex flex-col items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-1/3 mt-32 mb-28">
              <h2 className="text-3xl font-bold text-center text-blue-900 mb-4">Wallet</h2>
              <div className="text-center text-2xl text-gray-700">
                  Your wallet amount is:
                  <span className="block text-4xl font-bold text-green-500 mt-2">
                      ${walletAmount}
                  </span>
              </div>
          </div>
      </div><Footer /></>
  );
};

export default WalletPage;
