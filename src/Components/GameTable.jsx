import {Component} from "react";
import "../Styles/GameTable.css"
import airplane from "../Images/airplane.png"
import {getRandomIntInclusive} from "../Utils/generateRandomNumber";
import {getGameDurationFromDate} from "../Utils/getDurationFromDates";

class GameTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            strikes: 0,
            isGameFinished: false,
            airplaneLocation: getRandomIntInclusive(1, this.props.numberOfCells * this.props.numberOfCells),
            clickedCells: [],
            startTime: new Date(),
            endTime: null
        }
        this.onCellClick = this.onCellClick.bind(this);
        this.refreshGame = this.refreshGame.bind(this);
    }

    generateCells() {
        let groupedArr = []
        let arr = []

        for (let i = 1; i <= this.props.numberOfCells * this.props.numberOfCells; i++) {
            arr.push(this.state.airplaneLocation === i ?
                <td id={i} className={this.isClicked(i) ? "gameTableCell targetHit" : "gameTableCell"}
                    onClick={this.onCellClick}>
                    {this.state.isGameFinished ?
                        <div>
                            Target HIT!
                            <img alt={"airplane"} src={airplane} width={"60px"} height={"60px"}/>
                        </div> : ""
                    }
                </td>
                :
                <td id={i}
                    className={this.isClicked(i) ? "gameTableCell clickedCell" : "gameTableCell"}
                    onClick={this.onCellClick}>
                    {this.isClicked(i) ? "Miss" : ""}
                </td>
            )
        }
        while (arr.length > 0) {
            groupedArr.push(arr.splice(0, this.props.numberOfCells))
        }
        console.log("AVION: " + this.state.airplaneLocation)
        return groupedArr;
    }

    onCellClick(e) {
        if (this.state.isGameFinished) return

        const cellId = Math.floor(e.currentTarget.id)
        console.log(cellId)
        if (!this.state.clickedCells.includes(cellId)) {
            if (this.isAirplane(cellId)) {
                this.setState({
                        strikes: this.state.strikes + 1,
                        clickedCells: this.state.clickedCells.concat(cellId),
                        isGameFinished: true,
                        endTime: new Date()
                    }, () => this.props.onGameEnd({
                        strikes: this.state.strikes,
                        duration: getGameDurationFromDate(this.state.startTime, this.state.endTime),
                        startTime: this.state.startTime
                    })
                )
            } else {
                this.setState({
                    strikes: this.state.strikes + 1,
                    clickedCells: this.state.clickedCells.concat(cellId)
                })
            }
        }
    }

    refreshGame() {
        const airplane = getRandomIntInclusive(1, this.props.numberOfCells * this.props.numberOfCells)
        this.setState({
            strikes: 0,
            isGameFinished: false,
            airplaneLocation: airplane,
            clickedCells: [],
            startTime: new Date()
        })
    }

    isClicked(cellId) {
        return this.state.clickedCells.includes(cellId)
    }

    isAirplane(cellId) {
        return this.state.airplaneLocation === cellId
    }

    renderTable() {
        const cellList = this.generateCells();
        return (
            <table className={"tablePosition"}>
                <tbody>
                {cellList.map((cellGroup, idx) => {
                    return (
                        <tr key={idx}>
                            {cellGroup.map(cell => cell)}
                        </tr>
                    )
                })}
                </tbody>

            </table>
        )
    }

    renderEndScreen() {
        return (
            <div>
                <div className={"endScreenText"}>Congratulations! It took
                    you {this.state.strikes} {this.state.strikes === 1 ? "strike" : "strikes"} to take down the
                    airplane!
                </div>
                <button onClick={this.refreshGame}>Play Again!</button>
            </div>
        )
    }

    render() {
        return (
            <div className={"sectionSpacer"}>
                <span>Hit a square to drop a bomb!</span>
                {this.renderTable()}
                {this.state.isGameFinished && this.renderEndScreen()}
            </div>
        )
    }
}

export default GameTable;