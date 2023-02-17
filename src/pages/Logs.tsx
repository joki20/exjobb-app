import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import Calendar from 'react-calendar';
import Form from '../components/Form';
import './../styles/calendar.css';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';


export default function Logs({props}:any) {
    const data = props.data;
    const [message, setMessage] = useState<string>("");
    const [value, onChange] = useState(new Date());
    const [datesArray, setDatesArray] = useState<Array<string>>([]);
    const [clickedElement, setClickedElement] = useState("");

    const navigate = useNavigate();  

    const months:any = {
        januari: '01',
        februari: '02',
        mars: '03',
        april: '04',
        maj: '05',
        juni: '06',
        juli: '07',
        augusti: '08',
        september: '09',
        oktober: '10',
        november: '11',
        december: '12',
    };

    const prepareButtons = async() => {
        let year: string, month: string, day: string , date: string;

        // disable month click
        let monthButton = document.getElementsByClassName('react-calendar__navigation__label')[0] as HTMLElement;
        monthButton.style.pointerEvents = "none";
        monthButton.style.fontWeight = "bold";
        monthButton.style.userSelect = "none";

        // set dates as state 'buttonsHTMLCollection' (useEffect runs)
        let datesHTMLCollection = document.getElementsByClassName("react-calendar__month-view__days__day") as HTMLCollectionOf<HTMLElement>;

        // iterate HTML collection of buttons
        for (var i=0; i < datesHTMLCollection.length; i++) {
            let buttonElement = datesHTMLCollection[i];

            let unformatedDate:string | null = buttonElement.children[0].getAttribute('aria-label')
            // give each button id of YYYY-MM-DD
            if (unformatedDate) {
                day = parseInt(unformatedDate.split(" ")[0]) < 10 ? "0" + unformatedDate.split(" ")[0] : unformatedDate.split(" ")[0];
                year = unformatedDate.split(" ")[2];
                month = unformatedDate.split(" ")[1];
                date = year + "-" + months[month] + "-" + day;

                buttonElement.setAttribute('id', date);
                // check if entry with same date exists, and eventually color date green (8 hours) or red (under 8 hours)
                await colorDate(buttonElement, date);
                
                // prepare button to navigate to corresponding date
                buttonElement.addEventListener("click", () => {
                    let id = buttonElement.getAttribute('id')
                    navigate(`/logs/${id}`)
                })
            }
        }
    }

    const colorDate = async (btn:Element, date:string) => {
        let entries = data.users[0].entries;
        // calculate total hours for each entry
        await entries.forEach((entry:any) => {
            if (entry.date == date) {

                let total: number = 0
                let hoursWorked: number = 0;
                let away = entry.away;
                entry.duration.forEach((duration:any) => {
                    hoursWorked = parseInt(duration.split(" ")[0]);
                    total += hoursWorked;
                });
                // if equals 8 or more hours, set green background
                if (total >= 8 || away == true) {
                    btn.classList.add('green-background')
                    btn.setAttribute('disabled','true');
                }
            }
        });

        // if today not complete, show message
        let today = new Date();
        let currentDate: string = today.toISOString().split('T')[0];
        let todayButton = document.getElementById(currentDate)

        if (
            todayButton && // button for today exists
            !todayButton.classList.contains("green-background") && // no green background
            today.getDay() != 0 && // not sunday
            today.getDay() != 6 // not saturday
            ) {
            setMessage("Fyll i dagens timmar")
        }
    }

    // runs when page loads
    useEffect(() => {
        async function fetchData() {
            await prepareButtons();

            let prevButton = document.getElementsByClassName('react-calendar__navigation__prev-button')[0] as HTMLElement;
            let nextButton = document.getElementsByClassName('react-calendar__navigation__next-button')[0] as HTMLElement;

            if (!prevButton || !nextButton) {return}

            // delay so that when switching month the dates will be colored
            prevButton.addEventListener("click", function () {
                setTimeout(function() {
                    prepareButtons();
                }, 1)
            });

            nextButton.addEventListener("click", function () {
                setTimeout(function() {
                    prepareButtons();
                }, 1)
            });
        }
        fetchData();
    }, []);

  return (
    <div className="Base Logs">
        <h1>Loggar för {data?.users[0]?.username}</h1>
        <p className="message">{message}</p>
        <Calendar
            className={'calendar'}
            value={value}
            maxDate={new Date()} // max date available to select
            next2Label={null} // hide 'forward year button'
            prev2Label={null} // hide 'back year button'
            // showWeekNumbers={true}
            // onClickWeekNumber={(weekNumber:any, date:any, event:any) => alert(`Clicked week: ${weekNumber}, that starts on: ${date}`)}
        />
    </div>
    );
}