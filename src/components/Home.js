"use strict"

import React from 'react';
import {Bar} from 'react-chartjs-2';

<<<<<<< Updated upstream
const state = {
    labels: ['January', 'February', 'March',
             'April', 'May'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]
      }
    ]
  }
=======
/*export default class Home extends Component{
    constructor(props) {
        super(props);

        this.state = {
            labels: ["1", "2", "3", "4", "5"],
            datasets: [
                {
                    label: "Videos",
                    backgroundColor: "rgba(255, 0, 255, 0.75)",
                    data: [4,5,1,10,32,2,12]
                },
                {
                    label: "Subscriptions",
                    backgroundColor: "rgba(0,255,0,0.75)",
                    data: [14,15,21,0,12,4,2]

                }
            ]
        }
    }
    
} */
>>>>>>> Stashed changes


const Home = () => {
        return(
            <div className="mr-xl-n2">
            
            <h1>This where charts and stuff will go </h1>
<<<<<<< Updated upstream
            <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
          
=======

            <div style={{position: "relative", width: 600, height: 550}}>
            <Bar>
                options={{
                    responsive: true
                }}
                
            </Bar>
            
            </div>
            
>>>>>>> Stashed changes
        </div>
      

        
        );
}

export default Home;