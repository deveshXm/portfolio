'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { asciiChars } from '../utils/asciiChars';

export default function Home() {
  // Pixelated Demon Following Mouse
  const PixelatedDemon = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [frame, setFrame] = useState(0);
    const [movementDirection, setMovementDirection] = useState<'horizontal' | 'vertical'>('horizontal');
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const requestRef = useRef<number | undefined>(undefined);
    const pathPlannerRef = useRef<number | null>(null);
    const previousAnimTimeRef = useRef<number | undefined>(undefined);
    const speedRef = useRef(2.5); // Movement speed

    // Initialize position and set up event handlers
    useEffect(() => {
      // Check if device is touch-enabled
      const detectTouchDevice = () => {
        return (('ontouchstart' in window) ||
          (navigator.maxTouchPoints > 0) ||
          ((navigator as any).msMaxTouchPoints > 0));
      };

      setIsTouchDevice(detectTouchDevice());

      // If it's a touch device, don't initialize demon
      if (detectTouchDevice()) {
        return;
      }

      // Initialize demon position once
      const randomX = Math.floor(Math.random() * (window.innerWidth - 40));
      const randomY = Math.floor(Math.random() * (window.innerHeight - 40));
      setPosition({ x: randomX, y: randomY });

      // Mouse movement handler
      const handleMouseMove = (event: MouseEvent) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
      };

      // Add event listeners
      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);

    // Improved movement planning
    useEffect(() => {
      // Skip for touch devices
      if (isTouchDevice) return;

      // Clear any existing interval first
      if (pathPlannerRef.current) {
        window.clearInterval(pathPlannerRef.current);
        pathPlannerRef.current = null;
      }

      // Direct movement planning function
      const planPath = () => {
        // Get current position and target (mouse) position
        const distX = mousePosition.x - position.x;
        const distY = mousePosition.y - position.y;
        const distance = Math.sqrt(distX * distX + distY * distY);

        // If very far from target, use a smarter algorithm
        if (distance > 100) {
          // Favor direct path with slight randomness
          const directPath = Math.abs(distX) > Math.abs(distY);
          const randomFactor = Math.random() > 0.2; // 80% chance to choose direct path

          if (directPath && randomFactor) {
            setMovementDirection('horizontal');
          } else {
            setMovementDirection('vertical');
          }
        } else {
          // When closer, be more direct but with some randomness for natural movement
          const changeProb = Math.min(0.3, 30 / distance); // More likely to change when closer

          if (Math.random() < changeProb) {
            // Bias movement based on position relative to target
            const horizontalBias = Math.abs(distX) > Math.abs(distY) * 1.2; // 20% bias to horizontal
            setMovementDirection(horizontalBias ? 'horizontal' : 'vertical');
          }
          // Otherwise keep current direction (implicit)
        }
      };

      // Initial path planning
      planPath();

      // Set up interval for path planning - more frequent updates for smoother movement
      pathPlannerRef.current = window.setInterval(planPath, 150);

      return () => {
        if (pathPlannerRef.current) {
          window.clearInterval(pathPlannerRef.current);
          pathPlannerRef.current = null;
        }
      };
    }, [position.x, position.y, mousePosition.x, mousePosition.y]);

    // Optimized animation loop
    const animate = useCallback((time: number) => {
      if (previousAnimTimeRef.current === undefined) {
        previousAnimTimeRef.current = time;
      }

      const deltaTime = time - previousAnimTimeRef.current;

      // Movement logic - run on every frame
      // Calculate distance to target
      const distX = mousePosition.x - position.x;
      const distY = mousePosition.y - position.y;
      const distance = Math.sqrt(distX * distX + distY * distY);

      // Check if we're close enough to stop
      const isCloseToMouse = distance <= 10;

      // Always animate
      if (deltaTime > 150) {
        setFrame(prevFrame => (prevFrame + 1) % 4);
        previousAnimTimeRef.current = time;
      }

      // Only move if not close to target
      if (!isCloseToMouse) {
        // Execute movement with improved algorithm
        let moveX = 0;
        let moveY = 0;

        // Always move a little in both directions for smoother pursuit
        // but emphasize the primary direction
        const primaryFactor = 1.0;
        const secondaryFactor = 0.3; // 30% movement in secondary direction

        // Calculate base movement
        const baseX = Math.sign(distX) * Math.min(speedRef.current, Math.abs(distX));
        const baseY = Math.sign(distY) * Math.min(speedRef.current, Math.abs(distY));

        if (movementDirection === 'horizontal') {
          // Primary horizontal movement, secondary vertical
          moveX = baseX * primaryFactor;
          moveY = baseY * secondaryFactor;
        } else {
          // Primary vertical movement, secondary horizontal
          moveX = baseX * secondaryFactor;
          moveY = baseY * primaryFactor;
        }

        // Add small random movement for organic feel
        if (Math.random() > 0.7) {
          moveX += (Math.random() - 0.5) * 0.5;
          moveY += (Math.random() - 0.5) * 0.5;
        }

        // Update position
        if (moveX !== 0 || moveY !== 0) {
          setPosition(prevPos => ({
            x: prevPos.x + moveX,
            y: prevPos.y + moveY
          }));
        }
      }

      // Continue animation loop
      requestRef.current = requestAnimationFrame(animate);
    }, [mousePosition, position.x, position.y, movementDirection]);

    // Start animation loop
    useEffect(() => {
      // Skip for touch devices
      if (isTouchDevice) return;

      // Make sure we only have one animation frame request
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }

      requestRef.current = requestAnimationFrame(animate);

      return () => {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
          requestRef.current = undefined;
        }
      };
    }, [animate, isTouchDevice]);

    // Pre-rendered demon frames for better performance
    const demonFrames = useMemo(() => [
      // Frame 0 - Standing
      `▓▓▓▓
▓░░▓
▓▓▓▓`,
      // Frame 1 - Step 1
      `▓▓▓▓
▓░█▓
▓▀▓▓`,
      // Frame 2 - Step 2
      `▓▓▓▓
▓█░▓
▓▓▀▓`,
      // Frame 3 - Step 3
      `▓▓▓▓
▓░░▓
▓▀▀▓`
    ], []);

    // Calculate direction for flipping the character
    const facingDirection = mousePosition.x < position.x ? 'scaleX(-1)' : 'scaleX(1)';

    // Memoize style object to prevent unnecessary re-renders
    const demonStyle = useMemo(() => ({
      position: 'fixed' as const,
      left: position.x - 8,
      top: position.y - 8,
      fontSize: '6px',
      color: '#FF3300', // Brighter red for better visibility
      whiteSpace: 'pre' as const,
      lineHeight: '1',
      zIndex: 9999,
      pointerEvents: 'none' as const,
      fontFamily: 'monospace',
      transform: facingDirection, // Flip character based on cursor position
      letterSpacing: '0px',
      opacity: 0.95,
      textShadow: '0px 0px 2px #500' // Subtle glow effect
    }), [position.x, position.y, facingDirection]);

    // Don't render anything on touch devices
    if (isTouchDevice) {
      return null;
    }

    return (
      <div style={demonStyle}>
        {demonFrames[frame]}
      </div>
    );
  };

  // ASCII Art Title Generator
  const AsciiTitle = ({ title }: { title: string }) => {
    // Build the ASCII art for the title
    const titleRows = ['', '', '', '', '', ''];

    // Convert title to uppercase since our ASCII art is for uppercase letters
    const upperTitle = title.toUpperCase();

    // Build each row
    for (let char of upperTitle) {
      // If the character is in our map, add its ASCII art
      const asciiChar = asciiChars[char] || asciiChars[' '];
      for (let i = 0; i < 6; i++) {
        titleRows[i] += asciiChar[i];
      }
    }

    // Join the rows with line breaks
    const asciiTitle = titleRows.join('\n');

    return (
      <div style={{
        marginBottom: "10px",
        fontWeight: "bold",
        color: "#FF5500",
        fontSize: "clamp(4px, 1.5vw, 10px)",
        borderBottom: "1px solid #555",
        paddingBottom: "5px",
        display: "flex",
        justifyContent: "center",
        overflowX: "auto",
        width: "100%"
      }}>
        <pre style={{
          lineHeight: "1",
          textAlign: "center",
          whiteSpace: "pre",
          fontFamily: "monospace",
        }}>
          {asciiTitle}
        </pre>
      </div>
    );
  };

  // NavAsciiTitle for navigation items
  const NavAsciiTitle = ({ title, targetId }: { title: string; targetId?: string }) => {
    const [isHovered, setIsHovered] = useState(false);

    const titleRows = ['', '', '', '', '', ''];
    const upperTitle = title.toUpperCase();

    for (let char of upperTitle) {
      const asciiChar = asciiChars[char] || asciiChars[' '];
      for (let i = 0; i < 6; i++) {
        titleRows[i] += asciiChar[i];
      }
    }

    const asciiTitle = titleRows.join('\n');

    const handleClick = () => {
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    return (
      <div
        style={{
          fontWeight: "bold",
          color: isHovered ? "#FF8800" : "#FF0000",
          fontSize: "clamp(2.5px, 0.65vw, 5px)",
          textShadow: isHovered ? "0px 0px 10px #FF0000" : "1px 1px 2px #500",
          cursor: "pointer",
          padding: "3px",
          transition: "all 0.2s ease",
          display: "inline-block",
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          minWidth: "fit-content"
        }}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <pre style={{
          lineHeight: "1",
          textAlign: "center",
          whiteSpace: "pre",
          fontFamily: "monospace",
          margin: 0
        }}>
          {asciiTitle}
        </pre>
      </div>
    );
  };

  // Simple box with red border and retro font
  const DoomBox = ({ children, title, id }: { children: React.ReactNode; title?: string; id?: string }) => {
    return (
      <div
        id={id}
        style={{
          fontFamily: "var(--font-vt323), monospace",
          marginBottom: "30px",
          position: "relative",
          maxWidth: "100%",
          scrollMarginTop: "100px", // Adds margin when scrolling to this element
          color: "#ddd",
          border: "1px solid #FF0000",
          padding: "15px 20px",
          background: "#111111",
          fontSize: "18px",
          letterSpacing: "0.5px",
        }}
      >
        {/* Content */}
        <div>
          {title && <AsciiTitle title={title} />}
          {children}
        </div>
      </div>
    );
  };

  const DoomNavItem = ({ label }: { label: string }) => {

    return (
      <span style={{
        margin: "clamp(2px, 1vw, 8px)",
        cursor: "pointer",
        padding: "clamp(1px, 0.5vw, 3px)",
        display: "inline-block"
      }}>
        <div style={{
          color: "#FF0000",
          textShadow: "1px 1px 2px #500",
          fontSize: "clamp(14px, 2.5vw, 18px)",
          fontWeight: "bold",
          fontFamily: "monospace"
        }}>
          {label}
        </div>
      </span>
    );
  };


  // Responsive DOOM Logo with consistent style
  const DoomLogo = () => {
    return (
      <div style={{
        color: "#FF0000",
        fontWeight: "bold",
        textAlign: "center",
        margin: "30px auto",
        textShadow: "2px 2px 0px #500",
        fontSize: "2vw",
        overflowX: "auto",
        maxWidth: "100%",
        display: "flex",
        justifyContent: "center"
      }}>
        <div style={{
          whiteSpace: "pre",
          fontFamily: "monospace",
          fontSize: "clamp(6px, 2vw, 16px)",
          lineHeight: "1",
        }}>
          {`
 ██████╗  ██████╗ ██╗   ██╗ ██████╗ ███████╗██╗  ██╗
 ██╔══██╗██╔════╝ ██║   ██║██╔════╝ ██╔════╝██║  ██║
 ██║  ██║██████╗  ██║   ██║█████╗   ███████╗███████║
 ██║  ██║██╔═══╝  ╚██╗ ██╔╝██╔══╝   ╚════██║██╔══██║
 ██████╔╝███████╗  ╚████╔╝ ███████╗ ███████║██║  ██║
 ╚═════╝ ╚══════╝   ╚═══╝  ╚══════╝ ╚══════╝╚═╝  ╚═╝`}
        </div>
      </div>
    );
  };

  // Retro DOOM-style stats bars
  const StatBar = ({ label, value, max, color }: { label: string; value: number; max: number; color: string }) => {
    // Create pixelated effect for bar value display
    const pixelBar = () => {
      const totalSegments = 20;
      const filledSegments = Math.round((value / max) * totalSegments);

      return (
        <div style={{ display: "flex", width: "100%", height: "20px" }}>
          {Array(totalSegments).fill(0).map((_, i) => (
            <div
              key={i}
              style={{
                width: `${100 / totalSegments}%`,
                height: "100%",
                backgroundColor: i < filledSegments ? color : "transparent",
                borderRight: i < totalSegments - 1 ? "1px solid #222" : "none",
                boxSizing: "border-box"
              }}
            />
          ))}
        </div>
      );
    };

    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
        fontFamily: "var(--font-vt323), monospace",
        fontSize: "20px"
      }}>
        <div style={{
          width: "100px",
          marginRight: "10px",
          color: "#ddd",
          textTransform: "uppercase"
        }}>
          {label}:
        </div>
        <div style={{
          height: "20px",
          width: "100%",
          border: "1px solid #FF0000",
          background: "#000",
          padding: "0",
          overflow: "hidden"
        }}>
          {pixelBar()}
        </div>
        <div style={{
          marginLeft: "10px",
          color: color,
          width: "50px",
          textAlign: "right",
          fontWeight: "bold"
        }}>
          {value}%
        </div>
      </div>
    );
  };

  return (
    <div style={{
      fontFamily: "var(--font-vt323), monospace",
      margin: "0 auto",
      padding: "20px",
      maxWidth: "800px",
      width: "95%",
      background: "#111",
      color: "#ddd",
      minHeight: "100vh",
      position: "relative",
      fontSize: "18px",
      letterSpacing: "0.5px"
    }}>
      {/* Demon following cursor */}
      <PixelatedDemon />

      <header style={{
        padding: "clamp(8px, 1.5vw, 15px)",
        marginBottom: "35px",
        textAlign: "center",
        paddingBottom: "clamp(15px, 2vw, 20px)",
        position: "relative",
        borderBottom: "1px solid #FF0000"
      }}>
        <nav
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(10px, 3vw, 30px)",
            padding: "5px",
            marginTop: "5px",
            overflowX: "auto",
            msOverflowStyle: "none", /* IE and Edge */
            scrollbarWidth: "none", /* Firefox */
            WebkitOverflowScrolling: "touch"
          }}
          className="no-scrollbar" // Add this to target with CSS
        >
          <NavAsciiTitle title="MISSION" targetId="mission" />
          {/* Blog link commented out for now */}
          {/* <NavAsciiTitle title="BLOG" targetId="experience" /> */}
          <NavAsciiTitle title="INTEL" targetId="contact" />
        </nav>
      </header>

      <DoomLogo />

      <div style={{ marginBottom: "30px" }}>
        <StatBar label="AI/ML" value={95} max={100} color="#FF0000" />
        <StatBar label="FRONTEND" value={90} max={100} color="#00AAFF" />
        <StatBar label="BACKEND" value={85} max={100} color="#00FF00" />
      </div>

      <DoomBox title="MISSION" id="mission">
        <p>Software Engineer | Applied AI @Orca</p>
        <p>At Orca AI, my team and I have crafted a cutting-edge RAG system, harnessing the power of OpenAI and Anthropic LLMs.</p>
        <p>Currently slaying complexity with React, TypeScript, LangChain, and Vector DBs.</p>
      </DoomBox>

      <DoomBox title="QUESTS" id="experience">
        <div style={{ marginBottom: "15px" }}>
          <p>▶ Orca AI - AI Engineer, Founding Team</p>
          <p>   DURATION: Dec 2023 - Present (1y 4m)</p>
          <p>   DAMAGE: AI Systems, RAG, Prompt Engineering, Multi-Agent Systems</p>
          <p>   LOCATION: San Francisco, CA, United States</p>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <p>▶ HopStair® - Full-stack Developer</p>
          <p>   DURATION: Aug 2023 - Jan 2024 (6m)</p>
          <p>   DAMAGE: React Native, Firebase, GitHub Workflows</p>
          <p>   LOCATION: London, England, United Kingdom</p>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <p>▶ Fundwave - Full Stack Developer</p>
          <p>   DURATION: May 2023 - Jul 2023 (3m)</p>
          <p>   DAMAGE: TypeScript, Java, Node.js, Keycloak IAM</p>
          <p>   LOCATION: Gurugram, Haryana, India</p>
        </div>
      </DoomBox>

      <DoomBox title="ARSENAL">
        <div style={{ marginBottom: "15px" }}>
          <p>▶ RAG System Development</p>
          <p>   DAMAGE: OpenAI, Anthropic LLMs, Vector DBs</p>
          <p>   IMPACT: Enhanced user interaction, streamlined Q&A processes</p>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <p>▶ Multi-Agent AI Systems</p>
          <p>   DAMAGE: LangChain, LangGraph, HuggingFace</p>
          <p>   IMPACT: Complex reasoning, self-correction, optimal task execution</p>
        </div>
        <div>
          <p>▶ Secure Frontends</p>
          <p>   DAMAGE: React, TypeScript, AWS</p>
          <p>   IMPACT: Interactive UX, optimized performance</p>
        </div>
      </DoomBox>

      <DoomBox title="WEAPONS">
        <p>████████░░ Slack APIs, rrweb, Redux Thunk</p>
        <p>███████░░░ React, TypeScript, Vector DBs (Pinecone, Weaviate, MongoDB, Neo4j)</p>
        <p>█████████░ LLMs (OpenAI, Anthropic), Prompt Engineering, RAG Systems</p>
      </DoomBox>

      <DoomBox title="EDUCATION">
        <p>► NIT Jalandhar - BTech, Computer Science (Nov 2020 - May 2024)</p>
        <p>► Subodh Public School - High School Diploma (2018 - 2020)</p>
      </DoomBox>

      <DoomBox title="INTEL" id="contact">
        <div>
          <a href="mailto:nothefakedevesh@gmail.com" target="_blank" rel="noopener noreferrer">► nothefakedevesh@gmail.com</a>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/devxm" target="_blank" rel="noopener noreferrer">► linkedin.com/in/devxm</a>
        </div>
        <div>
          <a href="https://github.com/deveshXm" target="_blank" rel="noopener noreferrer">► github.com/deveshXm</a>
        </div>
      </DoomBox>
    </div>
  );
}