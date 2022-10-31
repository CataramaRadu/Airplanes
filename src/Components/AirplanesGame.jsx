import {Component} from "react";
import GameTable from "./GameTable";
import LeaderBoard from "./LeaderBoard";

class AirplanesGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            numberOfCells: 5,
            plays: []
        }
        this.handleGameStart = this.handleGameStart.bind(this)
        this.handleGameEnd = this.handleGameEnd.bind(this)
    }

    handleGameStart() {
        this.setState({
            isPlaying: true,
        })
    }

    handleGameEnd(stats) {
        const play = {
            strikes: stats.strikes,
            duration: stats.duration,
            startTime: stats.startTime.toLocaleString()
        }
        const sortedPlays = this.state.plays.concat(play).sort(
            (a, b) => a.strikes - b.strikes || a.duration - b.duration)

        this.setState({
            plays: sortedPlays
        })
    }

    render() {
        return (
            <>
                {this.state.isPlaying ?
                    <div>
                        <GameTable numberOfCells={this.state.numberOfCells} onGameEnd={this.handleGameEnd}/>
                        <LeaderBoard plays={this.state.plays}/>
                    </div>
                    :
                    <form>
                        <p>Generate a square of size <i>NxN</i></p>
                        <label>N = </label>
                        <input type="text" value={this.state.numberOfCells}
                               onChange={e => this.setState({numberOfCells: e.target.value})}/>
                        <div style={{marginTop: "1rem"}}>
                            <button onClick={this.handleGameStart} disabled={this.state.numberOfCells < 5}>
                                Start game
                            </button>
                        </div>
                    </form>
                }
            </>
        )
    }
}

export default AirplanesGame;