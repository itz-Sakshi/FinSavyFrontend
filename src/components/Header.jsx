import Container from "./Container"
import Logo from "./Logo"
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  

  // Define navItems within Header, using authStatus to set `active` values
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    
    {
      name: "Play Game",
      slug: "/play-game",
      active: true,
    },

  ];

  return (
    <header className="position-fixed w-full py-3 shadow bg-[#2D7D64] top-0 border-b-2 z-10">
      <Container>
        <nav className="flex justify-center">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full hover:text-[#041121]"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;