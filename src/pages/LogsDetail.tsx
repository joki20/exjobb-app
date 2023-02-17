import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import './../styles/base.css';
import Entries from './../interfaces/data';
// inside useEffect when state updates
import { useNavigate } from 'react-router-dom';
import Data from "./../interfaces/data";



export default function LogsDetail({props}: any) {
    const data = props.data;
    const [message, setMessage] = useState<string>("Totalt: ")
    const [disabledSubmit, setDisabledSubmit] = useState<boolean>();
    const [totalHours, setTotalHours] = useState<number>(0);
    const [currentInput, setCurrentInput] = useState<Partial<Entries>>({away: 0})
    let currentRoute = useLocation().pathname; // mandatory: <App> surrounded by <BrowserRouter> inside index.tsx
    let path = currentRoute.split("/")[2]
    let projects: string[] = data.users[0].projects;
    let objectInputs: {[key: string]: number} = {};

    const navigate = useNavigate();

    function prepareMessageAndSubmitButton() {
        let inputMessage = document.getElementById("inputMessage") as HTMLElement

        setMessage(`Totalt: 0 timmar`);
        inputMessage.style.color = "black";

        if (
            currentInput["away"] &&
            currentInput["away"] > 0 &&
            totalHours > 8
        ) {
            console.log("fusk")
            setMessage(`Max 8h totalt vid frånvaro`);
            inputMessage.style.color = "red";
            setDisabledSubmit(true)
        }
        else if (
            currentInput["away"] &&
            currentInput["away"] > 0 &&
            totalHours - currentInput["away"] > 8
            ) {
                setMessage(`Sjukdom/ledighet kan totalt vara max 8h`);
                inputMessage.style.color = "red";
                setDisabledSubmit(true)
            }
        else if (
            totalHours > 12
        ) {
            setMessage(`Du kan inte ha över 12 timmar`);
            inputMessage.style.color = "red";
            setDisabledSubmit(true)
        }
        else if (
            totalHours > 8
        ) {
            setMessage(`Totalt: ${totalHours} timmar (+${totalHours-8} övertid)`);
            inputMessage.style.color = "black";
            setDisabledSubmit(false)
        }
        else if (
            totalHours == 8
        ) {
            setMessage(`Totalt: ${totalHours} timmar`);
            inputMessage.style.color = "black";
            setDisabledSubmit(false)
        }
        else if (
            totalHours < 8
        ) {
            setMessage(`Totalt: ${totalHours} timmar`);
            inputMessage.style.color = "black";
            setDisabledSubmit(true)
        }
    }



    function removeZeroValues(zeroValuesObject:any) {
        // except away which is set as 0
        if (isNaN(zeroValuesObject["away"])) {
            zeroValuesObject["away"] = 0;
        }

        for (const [key, value] of Object.entries(zeroValuesObject)) {
            // skip away: x and remove keys with value == 0
            if (!(key == 'away') && (value == 0)) {
                delete zeroValuesObject[key]
            }
          }
        return zeroValuesObject;
    }

    function sortKeys(unSortedObject:any) {
        let sortedObject = Object.keys(unSortedObject) // extract the keys into a list with Object.keys
        .sort() // sort the keys
        .reduce((currentObject, key) => ({ // reduce list back down to an object to get desired result
            ...currentObject, [key]: unSortedObject[key]
        }), {})

        return sortedObject

    }

    function sumInputValues( obj:any ): void {
        var sum = 0;
        for( var el in obj ) {
          if( obj.hasOwnProperty( el )) {
            sum += parseFloat( obj[el] );
          }
        }

        setTotalHours(sum);
    }
    
    
      useEffect(() => {
        async function fetchData() {
            let logsDetailForm = document.getElementById("logsDetailForm") as HTMLFormElement;
            let projects = document.querySelectorAll<HTMLFormElement>(".projectInput")
            let awayInput = document.getElementById("away") as HTMLFormElement;

            prepareMessageAndSubmitButton();

            // reset form if away equals 8
            if (currentInput["away"] == 8) {
                logsDetailForm.reset()
                awayInput.value = 8;
                // lock all other fields
                for (var i = 0; i < projects.length; i++) {
                    console.log(projects[i])
                    projects[i].style.backgroundColor = "#ccc";
                    projects[i].style.pointerEvents = "none";
                    projects[i].setAttribute("tabindex", "-1");
                }
            }

            if (currentInput["away"] == undefined || currentInput["away"] < 8) {
                // unlock all other fields
                for (var i = 0; i < projects.length; i++) {
                    projects[i].style.backgroundColor = "";
                    projects[i].style.pointerEvents = "";
                    projects[i].removeAttribute("tabindex");
                }
            }
        }
        fetchData();
      }, [currentInput]); // whenever currentInput is updated elsewhere, useEffect reloads


    const onInput = async (e:any) => {
        // if the change was because of input
        let inputField:string = e.target.getAttribute("id");
        let inputValue:number = parseFloat(e.target.value);
        let inputValueLength:number = inputValue.toString().length;
        let secondLastChar:string = inputValue.toString().slice(-2,inputValueLength-1);
        let lastTwoChar:string = inputValue.toString().slice(-2);
        let lastChar:string = inputValue.toString().slice(-1);

        // if away was erased, set away back to 0
        if (inputField === "away" && !inputValue) {
            inputValue = 0;
        }

        // if input is NaN, set to 0
        inputValue = isNaN(inputValue) ? 0 : inputValue;
        // if input is negative, or ending with i.e. .2, .3 but not .5
        if (
            inputValue.toString().startsWith("-") ||
            secondLastChar === "." && (lastTwoChar !== ".5" && lastTwoChar !== ".0")
            ) {
            e.target.value = '';
            e.target.blur();
            return
        }

        let projects = document.querySelectorAll<HTMLElement>('.projectInput');

        // copy currentInput and add values
        let objectInputs = {...currentInput, [inputField]: inputValue}

        // remove zero values, then sort keys for object
        let objectWithoutZeroValues = removeZeroValues(objectInputs);
        let sortedObject = sortKeys(objectWithoutZeroValues);

        if (
            inputValue.toString().endsWith(".5") ||
            inputValue.toString().endsWith(".0") ||
            inputValue >= 12
            ) {
            e.target.blur();
        }

        // if away == 8, empty input and set away as 8
        if (inputField === "away" && inputValue == 8) {
            sortedObject = {away: 8}
        }
        
        // update totalHours state
        sumInputValues(sortedObject)

        // update currentInput state
        setCurrentInput(sortedObject)

    }

        

    
    const confirmSubmit = (e: any) => {
        e.preventDefault();

        let inputData: any = "";
            for (const [key, value] of Object.entries(currentInput)) {
                // skriv ut away sist
                if (key != "away")
                inputData += `${key}: ${value}\n`;
            }
            if (currentInput["away"] && currentInput["away"] == 8) {
                inputData += '\nJag har varit ledig eller sjuk hela dagen.\n';
            }
            else if (currentInput["away"] && currentInput["away"] > 0 && currentInput["away"] < 8) {
                inputData += `\nJag har varit ledig eller sjuk i ${currentInput["away"]} timmar.\n`;
                inputData += `\nTotal arbetstid: ${totalHours}-${currentInput["away"]} timmar\n`;
            }
            else if (currentInput["away"] && currentInput["away"] == 0) {
                inputData += `\nTotal arbetstid: ${totalHours} timmar\n`;
            }

    
    
        // If OK pressed, insert entry
        if (window.confirm(inputData)) {


            let duration:string[] = [];

            for (const [key, value] of Object.entries(currentInput)) {
                // skriv ut away sist
                if (key != "away")
                    duration.push(`${value} ${key}`)
            }


            let obj: any = {
                date: path,
                duration: duration,
                away: currentInput.away,
            }

            data.users[0].entries.push(obj);
            navigate('/logs');
        }
    }
    

  return (
    <div className="Base LogsDetail" >
        <h1><Link to="/logs" className="back">←</Link>{path}</h1>
        {/* This trick solves multiple JSX children problem */}
        <form id="logsDetailForm" onSubmit={confirmSubmit}>
        {projects.map((project, i) => {
            return (
                  <div key={project+"a"} className="project">
                    <label key={project+"b"}>{project}</label>
                    <input
                        key={project+"c"}
                        type="number"
                        className="projectInput"
                        step="0.5" 
                        id={project}
                        // value={currentInput[project]} // state value
                        onChange={onInput}
                        onClick={(e) => {e.currentTarget.select()}} // allows selection of all, no need to erase before change
                    />
                    </div>
            )


        })}

        <div>
        <label>Frånvarande (heldag = 8h):</label>
        <input
            type="number"
            step="0.5"
            id="away"
            onChange={onInput} />
        </div>
        
        <p id="inputMessage">{message}</p>

        <input
            type="submit"
            value="Rapportera timmar"
            id="submit"
            disabled={disabledSubmit}
            

                />
        </form>

    </div>
    );
}