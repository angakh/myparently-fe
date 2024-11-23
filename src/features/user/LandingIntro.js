import TemplatePointers from "./components/TemplatePointers"



function LandingIntro(){

    return(
        <div className="hero min-h-full rounded-l-xl bg-primary-200">
            <div className="hero-content py-12">
              <div className="max-w-md">

              <img src="/myParently-logo.jpg" className="inline-block" alt="myParently-logo" />

                <div className="text-center mt-12"><img src="./intro.png" alt="Dashwind Admin Template" className="w-48 inline-block"></img></div>
              
              {/* Importing pointers component */}
              <TemplatePointers />
              
              </div>

            </div>
          </div>
    )
      
  }
  
  export default LandingIntro