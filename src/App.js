import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

import coronaImage from './images/image.png';

class App extends React.Component{
    state = {
        data : {}, //empty object samapi di populated di componentdidmount
        country : '',
    }

    async componentDidMount() { //awit harus di wrap oleh func async juga
        const fetchedData = await fetchData(); //pakai await karena return dari async func

        this.setState({ data : fetchedData })
    }

    //methode that is going to change the state of country
    handleCountryChange = async (country) => { //parameternya country
        const fetchedData = await fetchData(country);
        //fetch the data
        //set the state

        this.setState({ data : fetchedData, country: country })
    }

    render(){

        const { data, country } = this.state;
        return (
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19"/>
                {/* pass data as props in components*/}
                <Cards data= { data }/> 
                <CountryPicker handleCountryChange={this.handleCountryChange}/> /{/**pass the handleCountryChange method as a prop to the CountryPicker */}
                <Chart data= { data } country= { country } />
            </div>
        );
    }
}
export default App;