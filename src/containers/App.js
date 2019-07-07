import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";

import {connect} from "react-redux";
import {setSearchField, requestRobots} from "../actions";

class App extends Component {
  componentDidMount() {
    this.props.onRequestRobots();
  }

  filteredRobots = () => {
    let {searchField="", robots=[]} = this.props;
    return robots.filter(robot =>
      robot.name.toLocaleLowerCase().includes(searchField)
    );
  };

  render() {
    const filteredRobots = this.filteredRobots();
    const {onSearchChange, isPending} = this.props;

    if (isPending) {
      return <h1 className="tc">Loading...</h1>;
    }
    
    return (
      <div className="tc">
        <h1 className="f2">RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToPropss  = (dispatch) => {
  return {
    onSearchChange: (event) => {
      dispatch(setSearchField(event.target.value))
    },
    onRequestRobots: () => {
      dispatch(requestRobots())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToPropss
)(App);
