import { useState } from "react";

export default function AboutMe({ firstname, lastname, role, about}) {
    const [myRole, setMyRole] = useState({
        value: role,
        editable: false,
    });
    const [myAbout, setMyAbout] = useState({
        value: about,
        editable: false,
    });
    return (
      <div>
        <div>
          <h3>{firstname}</h3></div>
        <div>
          {
            myRole.editable ?
            (
              <input value={myRole.value} />
            )
            : 
            (
              <h4>{role}</h4>
            )
          }
        </div>
        <div>
        {
          myAbout.editable ?
          (
            <textarea value={myAbout.value} />
          )
          : 
          (
            <p>{about}</p>
          )
        }
        </div>
      </div>
    );
}