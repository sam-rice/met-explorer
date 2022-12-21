import React from "react"

import "./_Collections.scss"
import chair from "../../assets/flw-chair.png"

function Collections() {
  return (
    <section>
      <h3>5 collections</h3>
      <ul>
        <li>
          <div>
            <img src={chair}/>
          </div>
        </li>
      </ul>
    </section>
  )
}

export default Collections