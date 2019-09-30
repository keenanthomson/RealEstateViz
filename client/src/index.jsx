import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Chart} from 'react-google-charts';
import axios from 'axios';
import 'react-dropdown/style.css'

export const App = () => {
  const [region, setRegion] = useState('US-MA'); // change this using a selector dropdown
  const [priceData, setPriceData] = useState(undefined)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    updateRegionData();
    // setLoading(false);
  }, []);

  const updateRegionData = (newRegion=region) => {
    setLoading(true);
    axios
    .get(`http://localhost:3001/${newRegion}/city`)
    .then(response => {
      console.log(response.data)
      setPriceData(response.data)
      setRegion(newRegion)
    })
    .then(setLoading(false))
    .catch(error => console.log(`Error --> `, error))
  }

  // const selectRegion = (e) => {
  //   updateRegionData(e);
  // }

  const loadingDivStyling = {
    margin: '300px 500px'
  }

  const options = ['US-AL','US-AK','US-AZ','US-AR','US-CA','US-CO','US-CT','US-DE','US-DC','US-FL','US-GA','US-HI','US-ID','US-IL','US-IN','US-IA','US-KS','US-KY','US-LA','US-ME','US-MT','US-NE','US-NV','US-NH','US-NJ','US-NM','US-NY','US-NC','US-ND','US-OH','US-OK','US-OR','US-MD','US-MA','US-MI','US-MN','US-MS','US-MO','US-PA','US-RI','US-SC','US-SD','US-TN','US-TX','US-UT','US-VT','US-VA','US-WA','US-WV','US-WI','US-WY'];

  if (!loading) {
    return(
       <div> 
        <Chart
          height={'600px'}
          width={'1000px'}
          chartType="GeoChart"
          data={priceData}
          options={{
            region: region,
            displayMode: 'markers',
            resolution: 'provinces',
            colorAxis: {colors: ['#c8d8b9','#cfa79b','#3e070a']}
          }}
          mapsApiKey="AIzaSyB0CkhQh8kVsw3goTeNsbDNlCrNOuo90Wg"
          rootProps={{ 'data-testid': '1' }}
        />
        <select onChange={updateRegionData}>
          {options.map((elem, index) => {
            return <option value={elem} key={index}>{elem}</option>
          })}
        </select>
      </div>
    )
  } else {
    return <div style={loadingDivStyling}>LOADING...</div>
  }
}

ReactDOM.render(<App/>, document.getElementById('regions_div'));