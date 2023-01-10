import React from "react"

import "./_ErrorPage.scss"

function ErrorPage() {

  return (
    <h1 
      className="error-page" 
      data-cy="error-page"
    >
      Sorry, something broke on our end. Please try again later.
    </h1>
  )
}

export default ErrorPage