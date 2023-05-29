
import { useState, useEffect } from 'react';
import './bar.css'
const Bars=({index,length,colorKey,changeArray})=>{

  const[len,setLen]= useState(length);

  const colors = ['#3d5af1', '#ff304f', '#83e85a'];

  

  console.log(length);
    useEffect(()=>{
        setLen(length);
    },[length])


        let barStyle={
            background:colors[colorKey],
            height:length,
            marginTop:200-length,

        }



        let textStyle={
            width:length,
            position:'relative',
            top:Math.floor(length/2)-10,
            left:-Math.floor(length/2)+11,

        };


        let quantityBtnstyle={
            top:length-10
        }

  const handleChange =(e)=>{
        var val = e.target.value
        if (val==''){
            setLen(0);
            changeArray(index,0)
        }else{
            val = parseInt(val)
            if (val>200) {
                setLen(200);
                changeArray(index,200)
            }
            else{
                setLen(val);
                changeArray(index,val);
            }
        }
    // setLen(parseInt(e.target.value));
  };

  const increment =()=>{
    setLen(len+1);
    changeArray(index,len+1)
  }
  const decrement =()=>{
    setLen(len-1);
    changeArray(index,len-1)
}
  

    return(
        <div className='bar' style={barStyle}>
            <input type='number' className="text" style={textStyle} value={len} onChange={handleChange}/>
            <div className="quatityNav">
                <div className="quantity-btn qunatity-up" style={quantityBtnstyle} onClick={increment}>
                    +
                </div>
                <div className="quantity-btn qunatity-down" style={quantityBtnstyle} onClick={decrement}>
                    -
                </div>
            </div>
        
        
        </div>
        
    )
}

export default Bars;