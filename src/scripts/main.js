import '../styles/style.css'
const profileTime = document.querySelectorAll('.profile-time li')


let timeframe;

// Get the json file
async function loadData() {

  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data/data.json`)
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

    const data = await response.json()
    console.log('Data loaded', data)

    return data
  } catch (error) {
    console.error('Failed to load JSON: ', error)
  }
}

// Create the product-activity cards
function renderCards(title, value) {
  
  let color = ''
  let url = title.toLowerCase().replace(' ', '-')

  // Change the css color based on the title in the json file
  const activityStyles = {
    Work: 'bg-orange-work',
    Play: 'bg-blue-play',
    Study: 'bg-pink-study',
    Exercise: 'bg-green-exercise',
    Social: 'bg-purple-social',
    'Self Care': 'bg-yellow-self-care'
  }

  const bgClass = activityStyles[title]


  const profileActivity = document.querySelector('.profile-activity')
  const profileActivityCard = document.createElement("div")
  profileActivityCard.style.backgroundImage = `url(${import.meta.env.BASE_URL}images/icon-${url}.svg)`


  profileActivityCard.className = `
    profile-activity-card grid min-h-36 h-fit ${bgClass} items-end rounded-xl bg-no-repeat bg-[right_10px_top_-10px] gap-4 hover:scale-105 transition-transform duration-200
  `
  
  
  profileActivityCard.innerHTML = `
    <div class="profile-activity-breakdown grid grid-cols-2 grid-rows-2 justify-between items-center bg-navy-900 rounded-xl h-fit p-6 lg:grid-rows-3 lg:h-4/5 lg:gap-4">
        <p class="profile-activity-type font-semibold">${title}</p>
        <img src="/src/images/icon-ellipsis.svg" width="20" alt="three dots icon" class="justify-self-end">
        <p class="profile-activity-time text-2xl">${value.timeframes[timeframe].current}hrs</p>
        <p class=" profile-activity-previous-time text-navy-200 text-right lg:row-start-3 col-span-2 lg:text-left">Last week - ${value.timeframes[timeframe].previous}hrs</p>
      
      </div>
  `

  profileActivity.appendChild(profileActivityCard)
}


// Set a click listener for each of the time options
//
profileTime.forEach((time, index) => {
  time.addEventListener('click', () => {
    profileTime.forEach((time) => {
      time.classList.add('text-navy-200')
      time.classList.remove('text-white')


    })
    time.classList.add('text-white')
    timeframe = time.innerText.toLowerCase()
  

    const profileActivity = document.querySelector('.profile-activity')
    profileActivity.innerHTML = ``

    loadData().then(data => {
      data.forEach(value => renderCards(value.title, value))
    })
    
  })
})

document.addEventListener('DOMContentLoaded', () => {
  timeframe = 'weekly'

  loadData().then(data => {
      data.forEach(value => renderCards(value.title, value))
})
})
