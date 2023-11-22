import { Card } from "antd";

const UpgradeYourPlan = () => {
  return(
     <Card style={{width : "80%", margin : "auto"}}> 
         <div >    
             <div >      
                <div >            
                  <h1 >Upgrade Your Shopify Account</h1>   
               </div>             
             <div >                  
                  <p >The operation could not be completed because of the following restrictions in your current plan:</p>   
                  <p >Your plan does not allow Shopify App Store purchases. You can upgrade your plan to enable Shopify App Store purchases.</p>       
                   <p >As account holder you can change the plan at any time.</p>       
            </div>        
           </div>   
       </div>
     </Card>
  )
}

export default UpgradeYourPlan