import logoImage from "@assets/Modern ConnectPlay Logo Design (2)_1760376273034.png";

export default function ConnectPlayLogo({ size = 40 }: { size?: number }) {
  return (
    <img 
      src={logoImage} 
      alt="ConnectPlay Logo" 
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  );
}
