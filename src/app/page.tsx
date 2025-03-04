export default function Home() {
  // DOOM-style terminal components
  const DoomBox = ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <div style={{ 
      fontFamily: "monospace", 
      marginBottom: "20px",
      border: "1px solid #555", 
      padding: "15px", 
      maxWidth: "100%",
      background: "#1a1a1a",
      color: "#ddd",
    }}>
      {title && <div style={{ 
        marginBottom: "10px", 
        fontWeight: "bold", 
        fontSize: "1.2em", 
        borderBottom: "1px solid #555",
        paddingBottom: "5px"
      }}>
        ══ {title} ══
      </div>}
      {children}
    </div>
  );

  const DoomNavItem = ({ label }: { label: string }) => (
    <span style={{ 
      margin: "0 15px", 
      cursor: "pointer",
      padding: "5px 10px",
      border: "1px solid #555",
      background: "#222",
      fontWeight: "bold"
    }}>
      {label}
    </span>
  );

  // DOOM Logo
  const DoomLogo = () => (
    <pre style={{ 
      color: "#FF0000",
      fontWeight: "bold",
      fontSize: "min(16px, 4vw)",
      lineHeight: "1", 
      textAlign: "center",
      margin: "30px auto",
      textShadow: "2px 2px 0px #500"
    }}>
{`
██████╗  ██████╗  ██████╗ ███╗   ███╗
██╔══██╗██╔═══██╗██╔═══██╗████╗ ████║
██║  ██║██║   ██║██║   ██║██╔████╔██║
██║  ██║██║   ██║██║   ██║██║╚██╔╝██║
██████╔╝╚██████╔╝╚██████╔╝██║ ╚═╝ ██║
╚═════╝  ╚═════╝  ╚═════╝ ╚═╝     ╚═╝
                                      
`}
    </pre>
  );

  // Health and Armor bars
  const StatBar = ({ label, value, max, color }: { label: string; value: number; max: number; color: string }) => (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
      <div style={{ width: "80px", marginRight: "10px", color: "#ddd" }}>{label}:</div>
      <div style={{ 
        height: "20px", 
        width: "100%", 
        border: "1px solid #555",
        background: "#333"
      }}>
        <div style={{ 
          height: "100%", 
          width: `${(value/max*100)}%`, 
          background: "#777" 
        }}></div>
      </div>
      <div style={{ marginLeft: "10px", color: "#ddd", width: "40px", textAlign: "right" }}>{value}%</div>
    </div>
  );

  return (
    <div style={{ 
      fontFamily: "monospace",
      margin: "0 auto",
      padding: "20px",
      maxWidth: "800px",
      width: "95%",
      background: "#111",
      color: "#ddd",
      minHeight: "100vh"
    }}>
      <header style={{ 
        padding: "10px", 
        marginBottom: "20px",
        textAlign: "center",
        background: "#1a1a1a",
        border: "1px solid #333"
      }}>
        <nav>
          <DoomNavItem label="ABOUT" />
          <DoomNavItem label="BLOG" />
          <DoomNavItem label="CONTACT" />
        </nav>
      </header>

      <DoomLogo />

      <div style={{ marginBottom: "30px" }}>
        <StatBar label="SKILLS" value={85} max={100} color="#00AAFF" />
        <StatBar label="HEALTH" value={100} max={100} color="#FF0000" />
        <StatBar label="ARMOR" value={75} max={100} color="#00FF00" />
      </div>

      <DoomBox title="MISSION">
        <p>Software Developer | Demon Slayer</p>
        <p>I build things for the web... and beyond.</p>
        <p>Currently fighting bugs in React, Next.js, TypeScript.</p>
      </DoomBox>

      <DoomBox title="ARSENAL">
        <div style={{ marginBottom: "15px" }}>
          <p>▶ E-commerce Platform</p>
          <p>   DAMAGE: React, Next.js, Stripe</p>
          <p>   LOCATION: github.com/yourusername/ecommerce</p>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <p>▶ Task Management App</p>
          <p>   DAMAGE: React, Redux, Firebase</p>
          <p>   LOCATION: github.com/yourusername/tasks</p>
        </div>
        <div>
          <p>▶ Weather Dashboard</p>
          <p>   DAMAGE: React, OpenWeather API</p>
          <p>   LOCATION: github.com/yourusername/weather</p>
        </div>
      </DoomBox>

      <DoomBox title="WEAPONS">
        <p>████████░░ JavaScript, TypeScript</p>
        <p>███████░░░ React, Next.js, Git</p>
        <p>█████░░░░░ Node.js, Docker, GraphQL</p>
      </DoomBox>

      <DoomBox title="COMMUNICATIONS">
        <p>► email@example.com</p>
        <p>► (123) 456-7890</p>
        <p>► github.com/yourusername</p>
        <p>► linkedin.com/in/yourusername</p>
      </DoomBox>
    </div>
  );
}
