import React from "react"
import { Link } from "react-router-dom"

import "./_ArtworkDetail.scss"

function ArtworkDetail() {

  return (
    <div>
      <span>
        <Link to="/search/deptQuery" >The American Wing</Link>
        {" / "}
        <Link to="/search/artistQuery" >Frank Lloyd Wright</Link>
      </span>
      <section>
        test
      </section>
    </div>
  )
}

export default ArtworkDetail