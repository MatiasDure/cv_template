import './App.css';
import "../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css";
import "../node_modules/@fortawesome/fontawesome-free/css/solid.css";
import { personalDetailsInput, experienceInput, educationInput } from './inputDetails';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useState } from 'react';
import PersonalInfoDisplay from "./personal_details/PersonalInfoDisplay";
import exampleData from './defaultData';

function InputField({title, type, value, handleChange, identifier}) {  

  const id = title.toString().replace(" ","_").toLowerCase();
  const placeholderText = "Enter " + title;

  return (
    <div className="input-group">
      <label htmlFor={id}><strong>{title}</strong></label>
      <input type={type} id={id} placeholder={placeholderText} value={value} onChange={handleChange} className="input_element" data-key={identifier}></input>
    </div>
  )
}

function App() {
  //personal details
  const [personalInfo, setPersonalInfo] = useState(exampleData.personalInfo);

  function HandleDetailsChange(e) { 
    const updatedvalue = {...personalInfo, [e.target.attributes["data-key"].value]: e.target.value};    
    setPersonalInfo({...updatedvalue}); 
  }

  const printDocument = () => {
    const input = document.getElementById("toExport");

    html2canvas(input, {scale: 3})
    .then((canvas) => {
      // const container = document.getElementsByClassName("resume-container")[0];
      const imgData = canvas.toDataURL("image/png");
      // let image = document.getElementById("preview");
      
      // if(!image)
      // {
      //   image = new Image();
      //   image.id = "preview";
      //   image.classList.add("cv");
      //   container.appendChild(image);
      // }

      // image.src = imgData;
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });
      pdf.addImage(imgData, "PNG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
          window.open(pdf.output('bloburl'));
      // pdf.save("cv.pdf");
    });
  };

  return (
    <div className='app'>
      <div className="edit-section">
        <section className='form_group'>
          <h2>Personal Details</h2>
          <form>
            <InputField 
              key={personalDetailsInput[0].id} 
              title={personalDetailsInput[0].title} 
              type={personalDetailsInput[0].type} 
              value={personalInfo.name} 
              handleChange={HandleDetailsChange} 
              identifier="name"
            />
            <InputField 
              key={personalDetailsInput[1].id} 
              title={personalDetailsInput[1].title} 
              type={personalDetailsInput[1].type} 
              value={personalInfo.email} 
              handleChange={HandleDetailsChange} 
              identifier="email"
            />
            <InputField 
              key={personalDetailsInput[2].id} 
              title={personalDetailsInput[2].title} 
              type={personalDetailsInput[2].type} 
              value={personalInfo.phoneNumber} 
              handleChange={HandleDetailsChange} 
              identifier="phoneNumber"
            />
            <InputField 
              key={personalDetailsInput[3].id} 
              title={personalDetailsInput[3].title} 
              type={personalDetailsInput[3].type} 
              value={personalInfo.location} 
              handleChange={HandleDetailsChange} 
              identifier="location"
            />
          </form>
        </section >
        <section className='form_group'>
        <h2>Education</h2>
        <form>
            <InputField 
              key={educationInput[0].id} 
              title={educationInput[0].title} 
              type={educationInput[0].type} 
              value={personalInfo.name} 
              handleChange={HandleDetailsChange} 
            />
            <InputField 
              key={educationInput[1].id} 
              title={educationInput[1].title} 
              type={educationInput[1].type} 
              value={personalInfo.email} 
              handleChange={HandleDetailsChange} 
            />
            <InputField 
              key={educationInput[2].id} 
              title={educationInput[2].title} 
              type={educationInput[2].type} 
              value={personalInfo.phoneNumber} 
              handleChange={HandleDetailsChange} 
            />
            <InputField 
              key={educationInput[3].id} 
              title={educationInput[3].title} 
              type={educationInput[3].type} 
              value={personalInfo.location} 
              handleChange={HandleDetailsChange} 
            />
            <InputField 
              key={educationInput[4].id} 
              title={educationInput[4].title} 
              type={educationInput[4].type} 
              value={personalInfo.location} 
              handleChange={HandleDetailsChange} 
            />
          </form>
        </section>
        <section className='form_group'>
          <h2>Experience</h2>
          <form>
            {/* <Section 
              input_list={experience}
              /> */}
            <div className='input-group'>
              <label htmlFor="description"><strong>Description</strong></label>
              <textarea className="input_element" id="description" placeholder='Enter Description'></textarea>
            </div>
          </form>
        </section>
      </div>
      <div className='resume-container'>
        <div id="toExport" className='cv'>
          <div className="header">
            <PersonalInfoDisplay 
              personalInfo={personalInfo}
              // name={personalInfo}
              // email={email}
              // phone={phone}
              // location={personalLocation}
            />
          </div>
          <div className="body">
            <section>
              <h3>Education</h3>
              <ul>
                <li>
                  <div>
                    <p className='date'>08/2020 - present</p>
                    <p>New York City, US</p>
                  </div>
                  <div>
                    <p>London City University</p>
                    <p>Bachelors in Economics</p>
                  </div>
                </li>
              </ul>
            </section>
            <section>
              <h3>Professional Experience</h3>
              <ul>
                <li>
                  <div>
                    <p className='date'>04/2018 - 02/2019</p>
                    <p>Berlin, Germany</p>
                  </div>
                  <div>
                    <p>Black Mesa Labs</p>
                    <p>Ux Resarch Assistant</p>
                    <p>
                    Supported senior researchers on accessibility standards for the open web. Created and usability tested wireframes and prototypes. Produced interactive documentation for quick onboarding of new researchers.
                    </p>
                  </div>
                </li>
                <li>
                  <div>
                    <p className='date'>04/2018 - 02/2019</p>
                    <p>Berlin, Germany</p>
                  </div>
                  <div>
                    <p>Black Mesa Labs</p>
                    <p>Ux Resarch Assistant</p>
                    <p>
                    Supported senior researchers on accessibility standards for the open web. Created and usability tested wireframes and prototypes. Produced interactive documentation for quick onboarding of new researchers.
                    </p>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </div>
        <button onClick={printDocument}>Preview Export</button>
      </div>
    </div>
  );
}

export default App;