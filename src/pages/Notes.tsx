import React, { useState, useEffect } from 'react';

export default function Notes({props}:any) {
    const [leftNotes, setLeftNotes] = useState([]);
    const [rightNotes, setRightNotes] = useState([]);
    const [leftHeader, setLeftHeader] = useState<string>();
    const [rightHeader, setRightHeader] = useState<string>();


    const onLeftInput = (e:any) => {
        let myLeftNotes = e.target.value
        localStorage.setItem('leftNotes', JSON.stringify(myLeftNotes))  

        setLeftNotes(myLeftNotes)
    }

    const onRightInput = (e:any) => {
        let myRightNotes = e.target.value
        localStorage.setItem('rightNotes', JSON.stringify(myRightNotes))  

        setRightNotes(myRightNotes)
    }

    const changeHeader = async (e:any) => {
        let headerPosition:string = '';
        // let oldHeader = e.target.innerText;
        let newHeader:string | null = '';

        if (e.target.id === "leftHeader") {headerPosition = "vänster"}
        if (e.target.id === "rightHeader") {headerPosition = "höger"}

        if (!headerPosition) {
            return
        }
        
        while (newHeader === null || newHeader.length < 4) {
            newHeader = window.prompt(`Byt ${headerPosition} rubrik (minst 4 tecken)`);

            // if esc or empty inbox, quit prompt
            if (newHeader === null || newHeader.length === 0) {

                return
            }
        }

        // save in localStorage and run useEffect
        if (headerPosition === "vänster") {
            localStorage.setItem('leftHeader', JSON.stringify(newHeader));

            setLeftHeader(newHeader);

        } else if (headerPosition === "höger") {
            localStorage.setItem('rightHeader', JSON.stringify(newHeader));

            setRightHeader(newHeader);


        }
        
        return

    }

    useEffect(() => {  

      }, [leftNotes, rightNotes, leftHeader, rightHeader]);

  return (
    <div className="Base Notes">
        <h1>Anteckningar</h1>
        <div onClick={changeHeader}><h3 id="leftHeader">{JSON.parse(localStorage.getItem("leftHeader") || "")}</h3>
        <textarea
            className="notesInput"
            onChange={onLeftInput}
            // getItem returns either a string or null
            value={JSON.parse(localStorage.getItem("leftNotes") || "")}
        />
        </div>

        <div onClick={changeHeader}><h3 id="rightHeader">{JSON.parse(localStorage.getItem("rightHeader") || "")}</h3>
        <textarea
            className="notesInput"
            onChange={onRightInput}
            // getItem returns either a string or null
            value={JSON.parse(localStorage.getItem("rightNotes") || "")}
        />
        </div>

    </div>

    
    );
}