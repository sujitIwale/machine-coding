import { useRef, useState } from 'react';
import './Clock.css';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const intervalRef = useRef(undefined);

  const handleSecChange = () => {
    setTime(new Date());
  };

  const start = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(handleSecChange, 1000);
  };

  const pause = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div className="clock-container">
      <div className="clock">
        <span className="dot" />
        <div
          style={{
            transform: `rotate(${time.getSeconds() * 6}deg)`,
          }}
          className="hand second"
        ></div>
        <div
          className="hand minute"
          style={{
            transform: `rotate(${time.getMinutes() * 6}deg)`,
          }}
        ></div>
        <div
          className="hand hour"
          style={{
            transform: `rotate(${time.getHours() * 30}deg)`,
          }}
        ></div>

        {/* {Array.from({ length: 60 }).map(() => (
        ))} */}
        <span className="mark twelve"></span>
        <span className="mark three"></span>
        <span className="mark six"></span>
        <span className="mark nine"></span>
      </div>

      <div className="buttons">
        <button onClick={start}>start</button>
        <button onClick={pause}>pause</button>
      </div>
    </div>
  );
};

export default Clock;
