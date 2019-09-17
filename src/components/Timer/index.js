import React from 'react';


class Timer extends React.Component {

    componentWillMount() {
        this.initialiseValue();
    }

    initialiseValue = () => {
        this.setState({

            buttonLogic: {
                showButton: false
            },

            startTime: {
                startValue: null,
                startFlag: false,
                inputStartHour: null,
                inputStartMinute: null,
            },

            endTime: {
                endValue: null,
                endFlag: false,
                inputEndHour: null,
                inputEndMinute: null,
            },

            startButton: {
                startName: 'Start',
                startFlag: true,
                showStartFlag: true
            },

            stopButton: {
                stopName: 'Stop',
                stopFlag: true,
            },

            resumeButton: {
                resumeName: 'Resume',
                resumeFlag: false,
            },

            pauseButton: {
                pauseName: 'Pause',
                pauseFlag: true,
            },

            currentTimer: {
                currentValue: null,
                currentHour: 0,
                currentMinute: 0,
                currentSecond: 0,
                currentTimerFlag: false,
            },

            backgroundTimer: {
                backgroundValue: null,
                backgroundHour: 0,
                backgroundMinute: 0,
                backgroundSecond: 0,
                backgroundTimerFlag: false,
            }
        })
    }

    inputHandleChange = (e) => {

        const { startTime, endTime } = this.state
        let inputHTMLname = e.target.name
        let x, hh, mm, flag

        if (inputHTMLname === 'startValue') {
            x = startTime
            hh = 'inputStartHour'
            mm = 'inputStartMinute'
            flag = 'startFlag'
        } else {
            x = endTime
            hh = 'inputEndHour'
            mm = 'inputEndMinute'
            flag = 'endFlag'
        }

        let inputHTMLvalue = e.target.value

        x[inputHTMLname] = inputHTMLvalue
        x[hh] = parseInt(inputHTMLvalue.substr(0, 2))
        x[mm] = parseInt(inputHTMLvalue.substr(3, 2))
        x[flag] = true

        this.setState({
            startTime,
            endTime
        })

    }

    initialAssignmentTimer = () => {

        let { startTime, currentTimer, backgroundTimer, startButton, pauseButton, stopButton } = this.state
        let { currentHour, currentMinute, currentTimerFlag } = currentTimer
        let { backgroundHour, backgroundMinute, backgroundTimerFlag } = backgroundTimer
        const { inputStartHour, inputStartMinute } = startTime

        currentHour = inputStartHour;
        currentMinute = inputStartMinute;
        currentTimerFlag = true

        backgroundHour = inputStartHour
        backgroundMinute = inputStartMinute
        backgroundTimerFlag = true

        currentTimer = {
            ...currentTimer,
            currentHour,
            currentMinute,
            currentTimerFlag
        }

        backgroundTimer = {
            ...backgroundTimer,
            backgroundHour,
            backgroundMinute,
            backgroundTimerFlag
        }

        startButton = {
            ...startButton,
            startFlag: false,
            showStartFlag: false
        }

        stopButton = {
            ...stopButton,
            stopFlag: false
        }

        pauseButton = {
            ...pauseButton,
            resumeFlag: true
        }

        this.setState({
            currentTimer,
            backgroundTimer,
            startButton,
            pauseButton,
            stopButton
        })
    }

    incrementTimer = () => {
        const { endTime, currentTimer, backgroundTimer } = this.state
        let { currentHour, currentMinute, currentSecond, currentTimerFlag } = currentTimer
        let { backgroundHour, backgroundMinute, backgroundSecond, backgroundTimerFlag } = backgroundTimer
        const { inputEndHour, inputEndMinute } = endTime

        if ((inputEndHour > backgroundHour) || ((inputEndHour === backgroundHour) && (inputEndMinute > backgroundMinute))) {

            backgroundSecond += 1;

            if (backgroundSecond > 59) {
                backgroundSecond = 0;
                backgroundMinute += 1;
            }
            if (backgroundMinute > 59) {
                backgroundMinute = 0;
                backgroundHour += 1;
            }
            if (currentTimerFlag) {
                currentSecond = backgroundSecond
                currentMinute = backgroundMinute
                currentHour = backgroundHour
            }

            this.setState({
                currentTimer: {
                    ...currentTimer,
                    currentSecond,
                    currentMinute,
                    currentHour,
                    currentTimerFlag
                },
                backgroundTimer: {
                    ...backgroundTimer,
                    backgroundSecond,
                    backgroundMinute,
                    backgroundHour,
                    backgroundTimerFlag
                }
            })
        } else {
            currentTimerFlag = false
            currentTimer.currentHour = backgroundTimer.backgroundHour
            currentTimer.currentMinute = backgroundTimer.backgroundMinute
            currentTimer.currentSecond = backgroundTimer.backgroundSecond
            this.setState({
                currentTimer,
                buttonLogic: {
                    showButton: false
                },

                startTime: {
                    startValue: '',
                    startFlag: false,
                    inputStartHour: 0,
                    inputStartMinute: 0,
                },

                endTime: {
                    endValue: '',
                    endFlag: false,
                    inputEndHour: 0,
                    inputEndMinute: 0,
                },

                startButton: {
                    startName: 'Start',
                    startFlag: true,
                    showStartFlag: true
                },

                stopButton: {
                    stopName: 'Stop',
                    stopFlag: true,
                },

                resumeButton: {
                    resumeName: 'Resume',
                    resumeFlag: false,
                }
            })
        }
    }


    currentTimeRunner = () => {
        const { buttonLogic } = this.state
        let { showButton } = buttonLogic

        setInterval(() => {
            this.incrementTimer();
        }, 1000)

        this.setState({
            buttonLogic: {
                showButton: !showButton
            }
        })
    }

    startTimeHandler = () => {
        const { initialAssignmentTimer, currentTimeRunner } = this
        initialAssignmentTimer();
        currentTimeRunner();
    }

    validateButtonHandler = () => {
        let { startTime, endTime, startButton } = this.state
        const { startFlag } = startTime
        const { endFlag } = endTime

        if (startFlag && endFlag) {
            startButton = {
                ...startButton,
                startFlag: false
            }
        }

        this.setState({
            startButton
        })
    }

    pauseTimeHandler = () => {
        const { currentTimer, pauseButton, resumeButton } = this.state
        let { currentTimerFlag } = currentTimer

        currentTimerFlag = false

        this.setState({
            currentTimer: {
                ...currentTimer,
                currentTimerFlag
            },

            pauseButton: {
                ...pauseButton,
                pauseFlag: false
            },

            resumeButton: {
                ...resumeButton,
                resumeFlag: true
            }
        })
    }

    resumeTimeHandler = () => {
        const { currentTimer, pauseButton, resumeButton } = this.state
        let { currentTimerFlag } = currentTimer
        currentTimerFlag = true

        this.setState({
            currentTimer: {
                ...currentTimer,
                currentTimerFlag
            },

            pauseButton: {
                ...pauseButton,
                pauseFlag: true
            },

            resumeButton: {
                ...resumeButton,
                resumeFlag: false
            }
        })
    }

    stopTimerHandler = () => {
        this.initialiseValue();
        window.location.reload();
    }

    render() {
        const { inputHandleChange, startTimeHandler, pauseTimeHandler, resumeTimeHandler, stopTimerHandler, validateButtonHandler } = this
        const { startTime, endTime, currentTimer, backgroundTimer, buttonLogic, startButton, pauseButton, resumeButton, stopButton } = this.state
        const { startValue } = startTime
        const { endValue } = endTime
        const { showButton } = buttonLogic
        const { startName, startFlag, showStartFlag, } = startButton
        const { stopName, stopFlag } = stopButton
        const { pauseName, pauseFlag } = pauseButton
        const { resumeName, resumeFlag } = resumeButton

        let { currentHour, currentMinute, currentSecond, currentValue } = currentTimer

        currentValue = `${currentHour}:${currentMinute}:${currentSecond}`
        console.log(startTime, endTime)
        console.log(currentTimer)

        return (
            <div>
                <div>
                    <h2>Timer:</h2>
                    Start Time:<input type='time' name='startValue' value={startValue} onChange={(e) => { inputHandleChange(e); validateButtonHandler(); }} /><br /><br />
                    End Time:<input type='time' name='endValue' value={endValue} onChange={(e) => { inputHandleChange(e); validateButtonHandler(); }} />
                </div>
                <div>Current: {currentValue}</div>
                <div>
                    {(!showButton && showStartFlag) ? <button type='button' value={startName} onClick={startTimeHandler} disabled={startFlag} >Start</button> : null}

                    {(showButton && pauseFlag) && <button type='button' value={pauseName} onClick={pauseTimeHandler} >Pause</button>}

                    {(showButton && resumeFlag) && <button type='button' value={resumeName} onClick={resumeTimeHandler} >Resume</button>  }
                   <br/> <button type='button' value={stopName} onClick= {stopTimerHandler} disabled={stopFlag} >Stop</button>
                </div>
            </div>
        )
    }
}

export default Timer;