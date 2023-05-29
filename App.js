import React, { Component } from "react";
//components

import Bar from "./components/bar";
//algo
import BubbleSort from "./algorithms/BubbleSort";

import "./App.css";

class App extends Component {
  state = {
    array: [],
    steps: [],
    colorKey: [],
    colors: [],
    timeouts: [],
    currentSteps: 0,
    count: 10,
    delay: 100,
    algorithm: "",
  };

  componentDidMount() {
    this.genrateElements();
  }
  handleStart = () => {
    let steps = this.state.steps;
    let colors = this.state.colors;

    this.clearTimeouts();
    let timeouts = [];

    let i = 0;
    while (i < steps.length - this.state.currentStep) {
      let timeout = setTimeout(() => {
        let currentStep = this.state.currentStep;
        this.setState({
          array: steps[currentStep],
          colorKey: colors[currentStep],
          currentStep: currentStep + 1,
        });
        timeouts.push(timeout);
      }, this.state.delay * i);
      i++;
    }

    this.setState({
      timeouts: timeouts,
    });
  };

  genrateSteps = () => {
    let array = this.state.array.slice();
    let steps = this.state.steps.slice();
    let colors = this.state.colors.slice();

    BubbleSort(array, 0, steps, colors);
    this.setState({
      steps: steps,
      colors: colors,
    });
  };

  genrateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  clearTimeouts = () => {
    this.state.timeouts.forEach((timeout) => this.clearTimeout(timeout));
    this.setState({ timeouts: [] });
  };

  clearColorKey = () => {
    let blank = new Array(this.state.count).fill(0);
    this.setState({ colorKey: blank, colors: [blank] });
  };

  genrateElements = () => {
    this.clearTimeouts();
    this.clearColorKey()

    let count = this.state.count;
    let arr = [];

    for (let i = 0; i < count; i++) {
      arr.push(this.genrateRandomNumber(50, 200));
    }

    this.setState(
      {
        array: arr,
        steps: [arr],
        count: count,
        currentStep: 0,
      },
      () => this.genrateSteps()
    );
    console.log(arr);
  };

  changeArray = (index, value) => {
    let array = this.state.array;
    array[index] = value;
    this.setState(
      {
        array: array,
        steps: [array],
        currentStep: 0,
      },
      () => this.genrateSteps()
    );
  };

  render() {
    const bars = this.state.array.map((value, index) => {
      return (
        <Bar
          key={index}
          index={index}
          length={value}
          colorKey={this.state.colorKey[index]}
          changeArray={this.changeArray}
        />
      );
    });

    return (
      <div className="app">
        <div className="frame">
          <div className="card container">{bars}</div>
        </div>
        <button id="btn" onClick={this.handleStart}>Start</button>
      </div>
    );
  }
}

export default App;
