const getToken = async (event) => {
  event.preventDefault()

 $('.token').innerHTML('')
 const emailInput = $('#email-input').val();
 const nameInput = $('#name-input').val();
 const authorization = {
  email: emailInput,
  name: nameInput
 }

  if (emailInput.includes('@turing.io')) {
    const requestToken = await fetch ('api/v1/tokens', {
      method: 'POST',
      headers: {
        'CONTENT-TYPE': 'application/json'
      },
      body: JSON.stringify({email: emailInput, name: nameInput})
    })
    const token = await requestToken.json();
    $('.token').append(`<h2> Your token: </h2> <p>${token}</p>`)

  } else {
    $('.token').append(`<h3> Please use a valid Turing email </h3>`)
  }
}

$('#request-btn').on('click', getToken)