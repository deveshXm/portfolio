import loadBgTop from "../../assets/load-bg-top.png";

function Header() {
  return (
    <div className="relative w-full h-[50vh] bg-[#ab4228]">
      <img src={loadBgTop} alt="Background" className="absolute inset-0 w-full object-contain mt-auto" />
    </div>
  );
}

export default Header;
