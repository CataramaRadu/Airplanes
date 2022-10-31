import {Component} from "react";
import "../Styles/LeaderBoard.css"

class LeaderBoard extends Component {

    render() {
        return (
            <div className={"leaderboardPosition"}>
                <div>

                    <h3 className={"leaderboardTitle"}>Leaderboard</h3>
                    <hr/>
                    <table>
                        <thead>
                        <tr className={"leaderboardHeader"}>
                            <td className={"leaderboardCell"}>Strikes</td>
                            <td className={"leaderboardCell"}>Duration</td>
                            <td className={"leaderboardCell"}>Date</td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.plays.map((play,idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{play.strikes}</td>
                                    <td>{play.duration}</td>
                                    <td>{play.startTime}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default LeaderBoard;