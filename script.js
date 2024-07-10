const form = document.getElementById('form')
const nameInput = document.getElementById('name-input')
const passInput = document.getElementById('password-input')
const errorMessage = document.getElementById('error-message')
const sentMessage = document.getElementById('sent-message')
const emailInput = document.getElementById('email-input')

form.addEventListener('submit', (event) => {
  // Name must be in this format:
  const regexForName = /^([A-Z'][a-z]*[ ]+)*([A-Z'][a-z]*)$/gm

  // Password must contain atleast 1 of these characters:
  const regexForPass = /[!@#$%^&*]+/gm

  // Email must be in this format:
  const regexForEmail =
    /^[A-Za-z0-9\-.]+(@[A-Za-z0-9]+((.com)|(.edu)|(.net)|(.org)))$/gm

  // Email must NOT have two or more of . (dot)   - (hyphen)
  const regexForEmail2 = /(\.(?=\.))|(\-(?=\-))/gm

  let message = []
  let isCorrectNameFormat = regexForName.test(nameInput.value.trim())
  let hasOneSpecialCharacter = regexForPass.test(passInput.value)

  let isCorrectEmailFormat = regexForEmail.test(emailInput.value.trim())

  let hasRepeatSpecialInEmail = regexForEmail2.test(emailInput.value.trim())

  if (!isCorrectNameFormat) {
    message.push(
      'Incorrect name format: please follow the name format with proper spacing, Proper Casing and NO special characters.'
    )
  }

  if (!isCorrectEmailFormat) {
    message.push(
      'Incorrect email format: please write following this example (youremail@email.com)'
    )
  }

  if (hasRepeatSpecialInEmail) {
    message.push(
      "You can't have 2 or more consecutive special characters like (.. or --) in your email address"
    )
  }

  if (!nameInput.value) {
    message.push('you need to type a name')
  }

  if (!passInput.value) {
    message.push("you didn't type any password")
  }

  if (passInput.value && passInput.value.length <= 6) {
    message.push('your password needs to be longer than 6 characters')
  }

  if (passInput.value.length > 20) {
    message.push('your password should not be longer than 20 characters')
  }

  if (passInput.value.toLowerCase().trim() === 'password') {
    message.push(`you should not use "password" as your password`)
  }

  if (!hasOneSpecialCharacter) {
    message.push(
      'Please include atleast 1 special character (!, @, #, $, %, ^, &, or *)'
    )
  }

  if (message.length > 0) {
    event.preventDefault()
    errorMessage.textContent = message.join(', ')
    errorMessage.style.color = 'red'
    errorMessage.style.margin = '10px 0px 0px 10px'
  }
})

// Note to self: when checking if an array is empty or not, check using the .length property. Don't use if (arrayName) or if (!arrayName), because they don't work since an empty array DOES NOT mean it is null, false, empty, etc...

// When you're validating a form when an event occurs (button submit) through addEventListener and you're validating using regex, put the regex variables inside the addEventListener's function scope.
