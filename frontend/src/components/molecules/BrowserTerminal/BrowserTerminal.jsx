import React, { useEffect, useRef } from 'react'
import { Terminal } from '@xterm/xterm'
import '@xterm/xterm/css/xterm.css'
import { FitAddon } from '@xterm/addon-fit'
import { useParams } from 'react-router-dom'
import { AttachAddon } from '@xterm/addon-attach'

const BrowserTerminal = () => {
  const terminalRef = useRef(null)
  const socket = useRef(null)
  const { projectId: projectIdFromUrl } = useParams()

  useEffect(() => {
    if (!projectIdFromUrl || projectIdFromUrl === "undefined") return;

    const term = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Ubuntu Mono, monospace',
      disableStdin: false,
      convertEol: true,
      theme: {
        background: '#282a37',
        foreground: '#f8f8f3',
        cursor: '#f8f8f3',
        cursorAccent: '#282a37',
        red: '#ff5544',
        green: "#50fa7c",
        yellow: '#f1fa8c',
        cyan: '#8be9fd',
      },
    });

    term.open(terminalRef.current)
    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)
    fitAddon.fit()

    // socket.current = io(`${import.meta.env.VITE_BACKEND_URL}/terminal`, {
    //   query: {
    //     projectId: projectIdFromUrl
    //   }
    // })

    socket.current = new WebSocket(`ws://localhost:3000/terminal?projectId=` + projectIdFromUrl)

    socket.current.onopen = () => {
      const attachAddon = new AttachAddon(socket.current)
      term.loadAddon(attachAddon);
    }

    return () => {
      term.dispose();
    };
  }, []);

  return (
    <div
      ref={terminalRef}
      style={{ width: '100%', height: '25vh', overflow: 'auto' }}
      className='terminal'
      id='terminal-container'
    />
  );
}

export default BrowserTerminal;
