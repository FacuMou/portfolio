import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

export default function Contact() {
  return (
    <StyleComponent />
  );
}


const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/facundo-mourelle-283a17245',
    icon: <FaLinkedin className="w-6 h-6" />
  },
  {
    name: 'GitHub',
    url: 'https://github.com/FacuMou',
    icon: <FaGithub className="w-6 h-6" />
  },
  {
    name: 'Email',
    url: 'mailto:facundomourelle9@gmail.com',
    icon: <SiGmail className="w-6 h-6" />
  },
];


function StyleComponent() {
  return (socialLinks.map((link) => (
    <a
      key={link.name}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
    >
      {link.icon}
      <span className="font-medium"> {link.name} </span>
    </a>
  )))
};
