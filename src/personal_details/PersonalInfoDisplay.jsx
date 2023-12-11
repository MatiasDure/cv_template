function PersonalInfoDisplay({personalInfo}) {
    return(
        <>
        <h1>{personalInfo.name}</h1>
        <ul>
            <HeaderPersonalItem value={personalInfo.email} iconClass="fa-envelope" />
            <HeaderPersonalItem value={personalInfo.phoneNumber} iconClass="fa-phone" />
            <HeaderPersonalItem value={personalInfo.location} iconClass="fa-location-dot" />
        </ul>
        </>
    )
}

function HeaderPersonalItem({value, iconClass}) {
    return(
      <li>
        <i className={`fa-solid ${iconClass}`}></i>
        <span>{value}</span>
      </li>
    );
  }

export default PersonalInfoDisplay;