# Ex.No: 06 — JAVASCRIPT: TIMER FUNCTIONS AND ARRAYS

**Course**: 23CS2049 - Web Technology Lab  
**Student Register No**: URK24CS1210  
**Date of Exercise**: 21 August 2026  

---

## Objective
To create interactive web pages using various JavaScript timing functions (`setTimeout`, `setInterval`, `clearInterval`, `clearTimeout`), event handlers, Date object methods, and JavaScript class objects with array manipulation.

---

## Key Theoretical Concepts Covered

### 1. Timing Events
The `window` object permits code execution at specified time intervals called timing events.
- **`setTimeout(function, milliseconds)`**: Executes a function after waiting a specified delay in milliseconds.
- **`setInterval(function, milliseconds)`**: Continuously repeats execution of a function every given interval.
- **`clearInterval(timerVariable)`**: Cancels/stops continuous execution initialized by `setInterval()`.
- **`clearTimeout(timeoutVariable)`**: Cancels pending execution set by `setTimeout()`.

### 2. JavaScript Date Object
The `Date` object provides comprehensive methods to access and manipulate calendar dates and time components:
- `getDate()`: Returns day of the month (1–31)
- `getDay()`: Returns day of the week (0–6, Sunday = 0)
- `getFullYear()`: Returns 4-digit year
- `getHours()`: Returns hour (0–23)
- `getMinutes()`: Returns minutes (0–59)
- `getSeconds()`: Returns seconds (0–59)
- `getTime()`: Returns milliseconds elapsed since Jan 1, 1970 UTC

### 3. JavaScript Class & Object
A JavaScript `class` defines object blueprints, initialized with `class ClassName` and property assignments inside a `constructor()` method.

```javascript
class Car {
    constructor(brand) {
        this.carname = brand;
    }
    present() {
        return "I have a " + this.carname;
    }
}
mycar = new Car("Ford");
document.getElementById("demo").innerHTML = mycar.present();
```

---

## Lab Exercises & Solutions

| Question No. | Problem Description | Key Technical Concept | Solution File |
| :--- | :--- | :--- | :--- |
| **Question 1** | Digital Clock display updating every second | `setInterval()`, `Date.getHours()`, `getMinutes()`, `getSeconds()` | [`question1.html`](./question1.html) |
| **Question 2** | Dynamic body background color changer | `setInterval()`, `clearInterval()`, `Math.random()`, `rgb()` | [`question2.html`](./question2.html) |
| **Question 3** | Paragraph font size zoomer on mouse hover | `onmouseover`, `onmouseout`, inline DOM style manipulation | [`question3.html`](./question3.html) |
| **Question 4** | Moving car animation with start/stop buttons | `setTimeout()`, `clearTimeout()`, `element.style.left` | [`question4.html`](./question4.html) |
| **Question 5** | Student Object Array & DOB categorization filter | `class Student`, Array of Objects, `for` loop, `if/else` | [`question5.html`](./question5.html) |

---

## Central Interactive Hub
All exercises can be tested and interactively previewed from the central hub interface:
- **Hub Link**: [`index.html`](./index.html)
