import { Grid, Modal, Paper } from "@mui/material";
import { styled } from "@mui/system"
import React, { useCallback, useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil"

const textState = atom({
    key: "textState",
    default: ""
})
function useLocalStorage<T>(key: string, initialValue: T) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value: T) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };

    return [storedValue, setValue];
}
export const Wordle = () => {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    // const [enteredText, setEnteredText] = useLocalStorage<string>("text", "");
    const [enteredText, setEnteredText] = useState("")

    function handleKeyDown(this: Window, event: WindowEventMap["keyup"]) {
        if (alphabet.includes(event.key) && enteredText.length < 5) {
            setEnteredText(`${enteredText}${event.key}`)
        }
        else if (event.key === "Backspace") {
            setEnteredText(enteredText.slice(0, -1))
        }
    }
    useEffect(() => {
        window.addEventListener("keyup", handleKeyDown, false)
        return () => {
            window.removeEventListener("keyup", handleKeyDown)
        }
    }, [enteredText])


    return (<>
        <div >
            <h1>Wordle</h1>
            <Grid container columns={26} spacing={3}>
                {alphabet.map((letter) => (
                    <Grid item xs={3} sm={2} md={1} key={letter}>
                        <LetterPaper>{letter}</LetterPaper>
                    </Grid>
                ))
                }
            </Grid>
            <KeyInputBelt>{enteredText}</KeyInputBelt>
        </div>

    </>)
}


const LetterPaper = styled(Paper)({
    color: 'darkslategray',
    backgroundColor: 'aliceblue',
    textAlign: 'center',
    fontSize: '1rem'
})

const KeyInputBelt = styled('div')({
    position: 'fixed',
    top: '30%',
    left: '0',
    right: '0',
    height: '40%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    textAlign: 'center',
    color: "white",
    fontSize: "10rem"
})