
interface FooterProps {
  style: string
}

const Footer = ({style}: FooterProps) => {
  return (
    <footer className={`bg-blue-950 text-white py-8 mt-auto w-full ${style}`}>
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-2xl font-bold mb-4">Health Mate</p>
        <p className="text-lg text-center mb-4">Leading the Way in Medical Excellence, Trusted Care.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300">Appoinments</a>
          <a href="#" className="hover:text-gray-300">Patients</a>
          <a href="#" className="hover:text-gray-300">Profile</a>
        </div>
        <p className="mt-4">© 2024 Your Website. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;