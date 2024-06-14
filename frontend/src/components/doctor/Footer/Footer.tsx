interface FooterProps {
  style: string;
}

const Footer = ({ style }: FooterProps) => {
  return (
    <footer className={`bg-blue-950 text-white mt-auto w-full ${style}`}>
      <div className="container mx-auto flex flex-col items-center text-center sm:text-left sm:flex-row sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <p className="text-2xl font-bold mb-4">Health Mate</p>
          <p className="text-lg">Leading the Way in Medical Excellence, Trusted Care.</p>
        </div>
        <div className="flex flex-col items-center sm:flex-row sm:space-x-4 mt-4 sm:mt-0">
          <a href="#" className="hover:text-gray-300 mb-2 sm:mb-0 sm:mr-4">Appointments</a>
          <a href="#" className="hover:text-gray-300 mb-2 sm:mb-0 sm:mr-4">Patients</a>
          <a href="#" className="hover:text-gray-300">Profile</a>
        </div>
      </div>
      <p className="mt-4 text-center sm:text-left ml-24">© 2024 Your Website. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
