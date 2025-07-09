import { useState, useEffect } from "react";
import './Timer.css';

function Timer() {
    const [mitutes, setMinutes] = useState(0);
    const [time, setTime] = useState(null);
    const [isActive, setActive] = useState(false);
    useEffect(() => {
        if (isActive) {
            const timerId = setInterval(() => {
                setTime(t => t?.tickDown());
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [isActive]);

    if (isActive && !time) {
        setActive(false);
        alert("Время вышло!");
    }

    const startTimer = event => {
        event.preventDefault();
        setActive(true);
        setTime(new Time(Number(mitutes), 0));
    };
    
    let display;
    if (isActive) {
        display = <h1>{time?.toString()}</h1>
    } else {
        display = <form onSubmit={startTimer}>
            <input
                value={mitutes}
                onChange={event => setMinutes(event.target.value)}
                pattern="\d+"
            />
            <button type="submit">Запустить</button>
        </form>
    }
    return <div className="Timer">
        <h2>Таймер:</h2>
        {display}
    </div>
}
export default Timer;
const NUMBER_OF_SECONDS_IN_MINUTE = 60;
class Time {
    minutes;
    seconds;
    constructor(minutes, seconds) {
        this.minutes = minutes;
        this.seconds = seconds;
    }
    tickDown() {
        if (this.seconds === 0) {
            if (this.minutes === 0) {
                return null;
            } else {
                return new Time(this.minutes - 1, NUMBER_OF_SECONDS_IN_MINUTE - 1);
            }
        } else {
            return new Time(this.minutes, this.seconds - 1);
        }
    }
    toString() {
        const toTimerNumber = (number) => String(number).padStart(2, "0");
        return [this.minutes, this.seconds].map(toTimerNumber).join(":");
    }
}