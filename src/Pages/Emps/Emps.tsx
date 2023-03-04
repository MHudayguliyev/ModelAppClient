import data from '../../jsonData'

import './Emps.css'

const Emps = () => {
    console.log(data)
    const BASE_URL = `http://localhost:8080/assets/`

  return (
    <>
       <section className='emp-section'>
            {data?.map((item: any, i:number) => (
                 <div className='emp_card' key={i}>
                    <div className='img_div'>
                        <img src={`${BASE_URL}${item.emp_image}`} alt='' className='avatar' />
                        <span className='img_div_span'>
                            <h4><b>{item.emp_name}</b></h4>
                            <p>{item.emp_task}</p>
                        </span>
                    </div>
        
                    {/* <div className='main-content-body'>
                        <h4><b>{item.emp_name}</b></h4>
                        <p>{item.emp_task}</p>
                    </div> */}
                    
             </div>
            ))}
       </section>
    </>
  )
}

export default Emps