import React from 'react';

class Clock extends React.Component {
    constructor() {
        super();
        this.state = {
            hour: 0, 
            minute: 0,
            items: []
        };
        this.update = this.update.bind(this);
        this.getHours = this.getHours.bind(this);
    }

    update(event){

        fetch("http://localhost:3000/hour", { method: "POST" })
            .then(response => {
                return response.json()
            }).then( (result) => {
                this.setState( state => ({
                    hour: ((result.hour / 12) * 360) + 90, 
                    minute: ((result.minute  / 60) * 360) + 90,
                    items: state.items.concat(result)
                }));
            }).catch( (error) => {
                this.setState({
                    hour: 90, 
                    minute: 90
                });
            })
    }

    getHours(){
        fetch("http://localhost:3000/hours")
            .then(response => {
                return response.json()
            }).then( (result) => {
                this.setState({
                    items: result
                });
            }).catch( (error) => {
                this.setState({
                    items: []
                });
            })
        
    }

    componentWillMount(){
        this.getHours();
        this.update();
    }

    render(){
        return (
                <div>                    
                    <div className="clock">                 
                      <div className="clock-face">
                        <Hand type="hour" time={this.state.hour}/>
                        <Hand type="min" time={this.state.minute}/>
                      </div>
                    </div>
                    <button onClick={this.update}>Get hour</button>
                    <HourList items={this.state.items} />
                </div>
            );
    };
};

class Hand extends React.Component{
    render(){
        const divStyle = {transform: `rotate(${this.props.time}deg)`};
        const nomClass = `hand hour-${this.props.type}`;        
        return <div className={nomClass} style={divStyle}></div>;
    };
};

class HourList extends React.Component {
    render() {
      return (
        <ul>
          {this.props.items.map(item => (
            <li>{item.hour}:{item.minute}</li>
          ))}
        </ul>
      );
    }
  }

export default Clock;