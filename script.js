const allElements = document.querySelectorAll('.element');
const view = document.querySelector('.view');
const gridIcon = document.querySelector('.grid-icon')
const listIcon = document.querySelector('.list-icon')
const mode = document.querySelector('.mode')
const searchInput = document.querySelector('.search-input')
const searchClose = document.querySelector('.search-close')
const searchIcon = document.querySelector('.search-icon')
const navCenter = document.querySelector('.nav-center')
const searchIcon2 = document.querySelector('.search-icon-2')
const searchBack = document.querySelector('.search-back')
const appName = document.querySelector('.app-name')
const logo = document.querySelector('.nav-left img')
const sideBar = document.querySelector('.side-bar')
const allIcons = document.querySelectorAll('.side-bar .icon')
const allBars = document.querySelectorAll('.side-bar .bar')
const sideBarSpan = document.querySelectorAll('.side-bar span')
const menu = document.querySelector('.nav-left .element')
const body = document.body
const container = document.querySelector('.container')
const disableBgEl = document.querySelector('.disable-bg')
const newCardContainer = document.querySelector('.new-card-container');
let myBar;
let label;


document.addEventListener('DOMContentLoaded', () => {
    applyDarkMode()
    renderNotes()
    renderView()
    const event = new Event("mouseleave");
    isSideBarOpen = true
    sideBar.dispatchEvent(event)

    if (myBar.classList.contains('archive-bar')) renderArchive()
    if (myBar.classList.contains('bin-bar')) renderDeleted()
    if (myBar.classList.contains('reminders-bar')) showAllReminders()
})

let isListViewActive = JSON.parse(localStorage.getItem('localView')) || false

function renderView() {
    if (!isListViewActive) {
        listIcon.classList.add('show')
        gridIcon.classList.add('hide')
    } else {
        listIcon.classList.add('hide')
        gridIcon.classList.add('show')
        container.classList.add('flex-view')
    }
}

view.addEventListener('click', () => {
    if (!isListViewActive) {
        listIcon.classList.toggle('hide')
        gridIcon.classList.toggle('show')
        container.classList.toggle('flex-view')
        isListViewActive = true
        localStorage.setItem('localView', JSON.stringify(isListViewActive))
    } else {
        listIcon.classList.toggle('hide')
        gridIcon.classList.toggle('show')
        container.classList.toggle('flex-view')
        isListViewActive = false
        localStorage.setItem('localView', JSON.stringify(isListViewActive))
    }
})

// *************************************

allElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.classList.add('bg-circle')
    })
    element.addEventListener('mouseleave', () => {
        element.classList.remove('bg-circle')
    })
})

let darkMode = JSON.parse(localStorage.getItem('darkMode')) || false

mode.addEventListener('click', () => {
    body.classList.toggle('dark-mode')
    body.classList.contains('dark-mode') ? darkMode = true : darkMode = false
    localStorage.setItem('darkMode', darkMode)
    changeCorrespondColor()
})


function applyDarkMode() {
    if (darkMode == false) {
        body.classList.remove('dark-mode')
    } else if (darkMode == true) {
        body.classList.add('dark-mode')
    }
    changeCorrespondColor()
}


let isSideBarOpen = false;
const toggleSidebar = () => {

    sideBar.style.boxShadow = isSideBarOpen ? 'none' : '10px 0px 12px -12px rgba(0, 0, 0, 0.5)'

    if (window.innerWidth < 664) {
        if (!isSideBarOpen) {
            sideBar.style.left = '0%'
        } else {
            sideBar.style.left = '-20%'
        }
    }

    allBars.forEach(el => {
        Object.assign(el.style, {
            display: isSideBarOpen ? 'block' : 'flex',
            alignItems: 'center',
            gap: isSideBarOpen ? '0' : '16px',
            cursor: 'pointer',
            borderTopRightRadius: isSideBarOpen ? '0' : '24px',
            borderBottomRightRadius: isSideBarOpen ? '0' : '24px',
            paddingRight: isSideBarOpen ? '0' : '100px',
        });
    })
    sideBarSpan.forEach(el => {
        el.style.display = isSideBarOpen ? 'none' : 'block'
    })
}

menu.addEventListener('click', (e) => {
    isSideBarOpen ? removeSideBarBg() : applySideBarBg()
    e.stopPropagation()
    toggleSidebar()
    isSideBarOpen = !isSideBarOpen
})

sideBar.addEventListener('mouseenter', () => {
    remindCardOptions?.classList.remove('show')
    remindCard.classList.remove('active')
    bgCard.classList.remove('active')
    if (!isSideBarOpen) toggleSidebar()
    isSideBarOpen = true
    applySideBarBg()
})

sideBar.addEventListener('mouseleave', () => {
    toggleSidebar()
    isSideBarOpen = false
    removeSideBarBg()
})

function applySideBarBg() {
    allIcons.forEach(icon => {
        if (icon.classList.contains('active-bar')) {
            icon.parentElement.classList.add('active-bar')
            icon.classList.remove('active-bar')
        }
    })
}

function removeSideBarBg() {
    allBars.forEach(bar => {
        if (bar.classList.contains('active-bar')) {
            bar.children[0].classList.add('active-bar')
        }
    })
    removeBarBg()
}

sideBar.addEventListener('click', (e) => {
    e.stopPropagation()
})

document.addEventListener('click', () => {
    if (isSideBarOpen) toggleSidebar()
    isSideBarOpen = false
    removeSideBarBg()
})



// ************************************************************************

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function renderNotes() {

    container.innerHTML = '';
    for (let index = notes.length - 1; index >= 0; index--) {
        const noteCard = document.createElement('div');
        noteCard.classList.add('note-card')

        if (!notes[index].audioUrl && !notes[index].content) { notes[index].content = ' ' }
        noteCard.innerHTML = `
        <div>
            <div class="main-content">
                <img hidden class="bg-img" src="" onclick="viewCard(${index}, 'notes')" >
                <textarea onclick="viewCard(${index}, 'notes')" contenteditable=true maxlength="110" class="title">${notes[index].title || 'Untitled'}</textarea>
                <p onclick="viewCard(${index}, 'notes')" class="content" contenteditable='true' >${notes[index].content || `<audio class="audio" controls="true" src=data:audio/wav;base64,${notes[index].audioUrl}></audio>`}</p>
            </div>
            <p class="date-tag"><i class="bi bi-clock clock"></i> ${notes[index].remDetails?.date} ${notes[index].remDetails?.month} ${notes[index].remDetails?.year}, ${notes[index].remDetails?.hour}:${notes[index].remDetails?.minute} <i class="bi bi-x cancel"></i></p>
            <button class="completed">Done</button>
            <p class="options">
                <i data-label="Remind me" class="bi bi-bell bell" onclick="remind(${index}, 'notes', event)"></i>                
                <i data-label="Archive" class="bi bi-file-arrow-down archive" onclick="archive(${index}, 'notes')"></i>
                <i data-label="Delete note" class="bi bi-trash3 bin" onclick="deleteCard(${index}, 'notes')"></i>
                <i data-label="Background options" class="bi bi-palette palette" onclick="backGround(${index}, 'notes', event)"></i>
                <label for="fileInput" data-label="Add image" onclick="getInfo(${index}, 'notes')">
                    <i class="bi bi-file-image file-input"></i>
                </label>        
                <input hidden id="fileInput" type="file" accept="image/*" onchange="addImage(event)">
            </p>
        </div>
        `;
        container.appendChild(noteCard)
        checkReminders(index, 'notes')
        applyBgColor(noteCard, notes[index].color)
        applyBgImg(noteCard, notes[index].imageUrl)
    }
    renderOptions()
}

function renderArchive() {
    container.innerHTML = '';
    for (let index = archived.length - 1; index >= 0; index--) {
        const archiveCard = document.createElement('div');
        archiveCard.classList.add('archive-card')

        if (!archived[index].audioUrl && !archived[index].content) { archived[index].content = ' ' }
        archiveCard.innerHTML = `
        <div>
            <div class="main-content">
                <img hidden class="bg-img" src="" onclick="viewCard(${index}, 'archive')" >
                <textarea onclick="viewCard(${index} ,'archived')" contenteditable=true maxlength="110" class="title">${archived[index].title || 'Untitled'}</textarea>
                <p onclick="viewCard(${index} ,'archived')" class="content" contenteditable='true' >${archived[index].content || `<audio class="audio" controls="true" src=data:audio/wav;base64,${archived[index].audioUrl}></audio>`}</p>
            </div>
            <p class="date-tag"><i class="bi bi-clock clock"></i> ${archived[index].remDetails?.date} ${archived[index].remDetails?.month} ${archived[index].remDetails?.year}, ${archived[index].remDetails?.hour}:${archived[index].remDetails?.minute} <i class="bi bi-x cancel"></i></p>
            <button class="completed">Done</button>
            <p class="options">
                <i data-label="Remind me" class="bi bi-bell bell" onclick="remind(${index}, 'archived', event)"></i>
                <i data-label="Unarchive" class="bi bi-file-arrow-up archive" onclick="unArchive(${index})"></i>                
                <i data-label="Delete note" class="bi bi-trash3 bin" onclick="deleteCard(${index}, 'archived')"></i>
                <i data-label="Background options" class="bi bi-palette palette" onclick="backGround(${index}, 'archived', event)"></i>
                <label for="fileInput" data-label="Add image" onclick="getInfo(${index}, 'archive')">
                    <i class="bi bi-file-image file-input"></i>
                </label>        
                <input hidden id="fileInput" type="file" accept="image/*" onchange="addImage(event)">
            </p>
        </div>
        `;
        container.appendChild(archiveCard);
        checkReminders(index, 'archive')
        applyBgColor(archiveCard, archived[index].color)
        applyBgImg(archiveCard, archived[index].imageUrl)
    }
    renderOptions()
}


function showAllReminders() {
    container.innerHTML = '';
    for (let index = reminders.length - 1; index >= 0; index--) {
        const reminderCard = document.createElement('div');
        reminderCard.classList.add('reminder-card')

        if (!reminders[index].audioUrl && !reminders[index].content) { reminders[index].content = ' ' }
        reminderCard.innerHTML = `
        <div>
            <div class="main-content">
                <img hidden class="bg-img" src="" onclick="viewCard(${index}, 'reminders')" >
                <textarea onclick="viewCard(${index} ,'reminders')" contenteditable=true maxlength="110" class="title">${reminders[index].title || 'Untitled'}</textarea>
                <p onclick="viewCard(${index} ,'reminders')" class="content" contenteditable='true' >${reminders[index].content || `<audio class="audio" controls="true" src=data:audio/wav;base64,${reminders[index].audioUrl}></audio>`}</p>
            </div>
            <p class="date-tag"><i class="bi bi-clock clock"></i> ${reminders[index].remDetails?.date} ${reminders[index].remDetails?.month} ${reminders[index].remDetails?.year}, ${reminders[index].remDetails?.hour}:${reminders[index].remDetails?.minute} <i class="bi bi-x cancel"></i></p>
            <button class="completed">Done</button>
            <p class="options">
                <i data-label="Remind me" class="bi bi-bell bell" onclick="remind(${index}, 'reminders', event)"></i>
                <i data-label="Delete note" class="bi bi-trash3 bin" onclick="deleteCard(${index}, 'reminders')"></i>
                <i data-label="Background options" class="bi bi-palette palette" onclick="backGround(${index}, 'reminders', event)"></i>
                <label for="fileInput" data-label="Add image" onclick="getInfo(${index}, 'reminders')">
                    <i class="bi bi-file-image file-input"></i>
                </label>        
                <input hidden id="fileInput" type="file" accept="image/*" onchange="addImage(event)">
            </p>
        </div>
        `;
        container.appendChild(reminderCard);
        checkReminders(index, 'reminders')
        applyBgColor(reminderCard, reminders[index].color)
        applyBgImg(reminderCard, reminders[index].imageUrl)
    }
    renderOptions()
}


function renderDeleted() {
    container.innerHTML = '';
    for (let index = deleted.length - 1; index >= 0; index--) {
        const deletedCard = document.createElement('div');
        deletedCard.classList.add('deleted-card')

        if (!deleted[index].audioUrl && !deleted[index].content) { deleted[index].content = ' ' }
        deletedCard.innerHTML = `
        <div>
            <img hidden class="bg-img" src="" onclick="viewCard(${index}, 'deleted')" >
            <textarea class="title">${deleted[index].title || 'Untitled'}</textarea>
            <p class="content">${deleted[index].content || `<audio class="audio" controls="true" src=data:audio/wav;base64,${deleted[index].audioUrl}></audio>`}</p>
            <button class="completed">Done</button>
            <p class="options">
                <i data-label="Delete forever" class="bi bi-x-circle" onclick="deletePermanent(${index})"></i>
                <i data-label="Restore" class="bi bi-arrow-counterclockwise" onclick="restore(${index})"></i>
            </p>
        </div>
        `;
        container.appendChild(deletedCard);
        applyBgColor(deletedCard, deleted[index].color)
        applyBgImg(deletedCard, deleted[index].imageUrl)
    }
    renderOptions()
}


function addNewCard() {
    const newCard = document.createElement("div");
    newCard.classList.add('new-card')
    newCard.innerHTML = `
    <div>
        <textarea class='new-title' hidden maxlength="110" placeholder="Untitled"></textarea>
        <div class="button-box">
            <button class='txt-btn btn'>Text Note</button>
            <button class='audio-btn btn'>Audio Note</i></button>
        </div>
        <div>
            <textarea type=""text class="new-textarea" placeholder="Take a note..."></textarea>
            <div class="recording-controls">
                <button class="start-recording btn">Start Recording</button>
                <button class='close-2 btn'>Close</button>
                <button class="stop-recording btn">Stop Recording</button>
            </div>
            <div class="choice-btns">
                <button class='done btn'>Done</button>
                <button class='close btn'>Close</button>
            </div>
        </div>
    </div>
    `
    newCardContainer.appendChild(newCard);
    setupNoteCard()
}
addNewCard()


function setupNoteCard() {
    const textBtn = document.querySelector('.txt-btn')
    const audioBtn = document.querySelector('.audio-btn')
    const buttonBox = document.querySelector('.button-box')
    const doneBtn = document.querySelector('.done')
    const closeBtn = document.querySelector('.close')
    const closeBtn2 = document.querySelector('.close-2')
    const contentBox = document.querySelector('.new-card .new-textarea')
    const title = document.querySelector('.new-title')
    const startRecording = document.querySelector('.start-recording')
    const stopRecording = document.querySelector('.stop-recording')
    let mediaRecorder;
    let audioChunks = [];
    let myTitle;
    let myContent;

    let newCardCopy = newCardContainer.querySelector("div");
    textBtn.addEventListener('click', (e) => {
        remindCardOptions?.classList.remove('show')
        remindCard.classList.remove('active')
        bgCard.classList.remove('active')
        e.stopPropagation()
        toggleNoteInput(true, true, true, false, false)
    })

    audioBtn.addEventListener('click', (e) => {
        remindCardOptions?.classList.remove('show')
        remindCard.classList.remove('active')
        bgCard.classList.remove('active')
        e.stopPropagation()
        toggleNoteInput(false, false, false, true, true)
    })

    function toggleNoteInput(openContentBox, openDoneBtn, openClosebtn, openRcrdBtn, openClosebtn2) {
        buttonBox.style.display = 'none'
        title.style.display = 'block'
        newCardCopy.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.2)'
        contentBox.style.display = openContentBox ? 'block' : 'none'
        doneBtn.style.display = openDoneBtn ? 'block' : 'none'
        closeBtn.style.display = openClosebtn ? 'block' : 'none'
        startRecording.style.display = openRcrdBtn ? 'block' : 'none'
        closeBtn2.style.display = openClosebtn2 ? 'block' : 'none'
    }

    document.addEventListener('input', (e) => {
        if (e.target.classList.contains('new-textarea')) {
            e.target.height = 'auto'
            e.target.style.height = e.target.scrollHeight + 'px'
        }
    })

    doneBtn.addEventListener('click', () => {
        myTitle = title.value
        myContent = contentBox.value
        textBtn.style.display = 'block'
        buttonBox.style.display = 'flex'
        contentBox.style.display = 'none'
        doneBtn.style.display = 'none'
        closeBtn.style.display = 'none'
        newCardCopy.style.boxShadow = 'none'
        title.style.display = 'none'
        if (myTitle == '' && myContent == '') return
        notes.push({ 'title': myTitle, 'content': myContent, 'id': Date.now() })
        localStorage.setItem('notes', JSON.stringify(notes))
        renderNotes()
        title.value = ''
        contentBox.value = ''
        contentBox.style.height = '48px'
    })

    closeBtn.addEventListener('click', () => resetNewCard())

    closeBtn2.addEventListener('click', () => resetNewCard())

    document.onclick = () => {
        resetNewCard()
    }

    newCardCopy.onclick = (e) => {
        e.stopPropagation()
        if (isSideBarOpen) toggleSidebar()
        isSideBarOpen = false
        removeSideBarBg()
    }


    function resetNewCard() {
        textBtn.style.display = 'block'
        buttonBox.style.display = 'flex'
        newCardCopy.style.boxShadow = 'none'
        title.style.display = 'none'
        contentBox.value = ''
        title.value = ''
        startRecording.style.display = 'none'
        contentBox.style.display = 'none'
        doneBtn.style.display = 'none'
        closeBtn.style.display = 'none'
        contentBox.style.height = '48px'
        closeBtn2.style.display = 'none'
        stopRecording.style.display = 'none'
    }

    startRecording.addEventListener('click', () => {
        startRecording.style.display = 'none'
        stopRecording.style.display = 'block'
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            mediaRecorder.start();
            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data)
            }
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = () => {
                    const audioBase64 = reader.result.split(',')[1];
                    notes.push({ 'title': myTitle, 'audioUrl': audioBase64 });
                    localStorage.setItem('notes', JSON.stringify(notes));
                    renderNotes()
                }
                title.style.display = 'none'
                title.value = ''
            }
        })
    })

    stopRecording.addEventListener('click', () => {
        mediaRecorder.stop()
        startRecording.style.display = 'none'
        stopRecording.style.display = 'none'
        myTitle = title.value
        buttonBox.style.display = 'flex'
        textBtn.style.display = 'block'
        closeBtn2.style.display = 'none'
        newCardCopy.style.boxShadow = 'none'
    })
}


// **********************
let deleted = JSON.parse(localStorage.getItem('deleted')) || []

function deleteCard(index, cardType) {

    let list;
    cardType == 'notes' ? list = notes : cardType == 'reminders' ? list = reminders : list = archived
    let card = list[index]
    deleted.push(card)
    list.splice(index, 1)
    if (cardType == 'reminders') deleteCorrespondingCard(card)
    localStorage.setItem('notes', JSON.stringify(notes))
    localStorage.setItem('reminders', JSON.stringify(reminders))
    localStorage.setItem('archive', JSON.stringify(archived))
    localStorage.setItem('deleted', JSON.stringify(deleted))
    cardType == 'notes' ? renderNotes() : cardType == 'reminders' ? showAllReminders() : renderArchive()
    label.remove()
    updateReminders()
    disableBgEl.classList.remove('active')
    body.style.overflowY = 'scroll'
}
// **********************

function deleteCorrespondingCard(deletedCard) {

    notes.forEach((noteCard, index) => {
        if (noteCard.id == deletedCard.id)
            notes.splice(index, 1)
        localStorage.setItem('notes', JSON.stringify(notes))
    })

    archived.forEach((archiveCard, index) => {
        if (archiveCard.id == deletedCard.id)
            archived.splice(index, 1)
        localStorage.setItem('archive', JSON.stringify(archived))
    })
}


// **********************
const renderOptions = () => {
    const allOptions = document.querySelectorAll('.options > *')

    allOptions.forEach(option => {
        option.addEventListener('mouseenter', function () {
            label = document.createElement('div')
            label.className = 'option-label'
            label.innerText = option.getAttribute('data-label')
            body.appendChild(label)

            let rect = option.getBoundingClientRect()
            label.style.left = `${rect.left + window.scrollX}px`
            label.style.top = `${rect.top + window.scrollY + 32}px`
            option.label = label
        })

        option.addEventListener('mouseleave', function () {
            if (option.label) {
                option.label.remove()
                option.label = null
            }
        })

        option.addEventListener('click', () => {
            if (option.label) {
                option.label.remove()
                option.label = null
            }
        })
    })
}
// **********************



// **********************
const notesBar = document.querySelector('.notes-bar')
const remindersBar = document.querySelector('.reminders-bar')
const archiveBar = document.querySelector('.archive-bar')
const binBar = document.querySelector('.bin-bar')

let archived = JSON.parse(localStorage.getItem('archive')) || []
let lastClickedBarClass = JSON.parse(localStorage.getItem('lastClickedBarClass')) || '.notes-bar'

const archive = (index, cardType) => {
    let list;
    cardType == 'notes' ? list = notes : list = reminders
    let card = list[index]
    archived.push(card)
    list.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notes))
    localStorage.setItem('reminders', JSON.stringify(reminders))
    localStorage.setItem('archive', JSON.stringify(archived))
    cardType == 'notes' ? renderNotes() : showAllReminders()
    label.remove()
    disableBgEl.classList.remove('active')
    body.style.overflowY = 'scroll'
}

const updateReminders = () => {
    let noteRems = notes.filter(note => note.remDetails)
    let archiveRems = archived.filter(archive => archive.remDetails)
    reminders = noteRems.concat(archiveRems)
    localStorage.setItem('reminders', JSON.stringify(reminders))
}

const unArchive = (index) => {
    let card = archived[index]
    notes.push(card)
    archived.splice(index, 1)
    localStorage.setItem('archive', JSON.stringify(archived))
    localStorage.setItem('notes', JSON.stringify(notes))
    renderArchive()
    label.remove()
    disableBgEl.classList.remove('active')
    body.style.overflowY = 'scroll'
}

const deletePermanent = (index) => {
    deleted.splice(index, 1)
    localStorage.setItem('deleted', JSON.stringify(deleted))
    renderDeleted()
    label.remove()
}

// ********************

const bgCard = document.createElement('div')
bgCard.className = 'bg-card'
let currentCardOptions;

const backGround = (index, cardType, event) => {
    event.stopPropagation()
    cardType == 'notes' ? list = notes : cardType == 'reminders' ? list = reminders : list = archived

    const currentCard = container.children[list.length - index - 1]
    currentCardOptions = container.children[list.length - index - 1].querySelector('.options')
    currentCardOptions.classList.add('show')

    bgCard.innerHTML = `
    <p class="color default" data-color="default"><i class="bi bi-droplet"></i></p>
    <p class="color chalk" data-color="chalk"></p>
    <p class="color clay" data-color="clay"></p>
    <p class="color blossom" data-color="Blossom"></p>
    <p class="color dusk" data-color="Dusk"></p>
    <p class="color storm" data-color="Storm"></p>
    <p class="color fog" data-color="Fog"></p>
    <p class="color sage" data-color="Sage"></p>
    <p class="color mint" data-color="Mint"></p>
    <p class="color sand" data-color="Sand"></p>
    <p class="color peach" data-color="Peach"></p>
    <p class="color coral" data-color="Coral"></p>
    `

    let rect = currentCard.getBoundingClientRect()
    let leftPosition = rect.left + window.scrollX - 90
    let topPosition = rect.bottom + window.scrollY

    if (currentCard.classList.contains('selected-card')) topPosition = topPosition - 45

    let screenWidth = window.innerWidth
    let bgCardWidth = 440

    if (leftPosition + bgCardWidth > screenWidth) {
        leftPosition = rect.right - bgCardWidth;
    }

    if (leftPosition < 100) {
        leftPosition = rect.left - 2;
    }

    if (screenWidth < 450) {
        leftPosition = 2
        bgCardWidth = screenWidth - 4;
    }

    bgCard.style.width = `${bgCardWidth}px`
    bgCard.style.left = `${leftPosition}px`;
    bgCard.style.top = `${topPosition}px`;

    bgCard.classList.toggle('active')
    remindCard.classList.remove('active')
    if (bgCard.classList.contains('active')) body.appendChild(bgCard)

    const allColors = bgCard.querySelectorAll('.color')

    allColors.forEach(color => {
        color.addEventListener('mouseenter', () => {
            const colorLabel = document.createElement('p')
            colorLabel.className = 'color-label'
            let colorRect = color.getBoundingClientRect()
            colorLabel.innerText = color.getAttribute('data-color')
            body.appendChild(colorLabel)
            body.colorLabel = colorLabel
            colorLabel.style.left = `${colorRect.left + window.scrollX}px`
            colorLabel.style.top = `${colorRect.top + window.scrollY + 32}px`
        })

        color.addEventListener('mouseleave', () => {
            body.removeChild(body.colorLabel)
        })

        color.onclick = () => {
            let appliedColor = window.getComputedStyle(color).backgroundColor
            list[index].color = appliedColor

            localStorage.setItem('notes', JSON.stringify(notes))
            localStorage.setItem('archive', JSON.stringify(archived))
            localStorage.setItem('reminders', JSON.stringify(reminders))

            cardType == 'notes' ? renderNotes() : cardType == 'reminders' ? showAllReminders() : renderArchive()

        }
    })
}
// **********************

function applyBgColor(card, color) {
    card.style.backgroundColor = color
    disableBgEl.classList.remove('active')
    body.style.overflowY = 'scroll'
}

function changeCorrespondColor() {
    let list;
    let allBars = [notes, reminders, archived, deleted]

    lastClickedBarClass == '.notes-bar' ? list = notes : lastClickedBarClass == '.reminders-bar' ? list = reminders : lastClickedBarClass == '.archive-bar' ? list = archived : list = deleted

    const colorPairs = [
        ['rgb(255, 255, 255)', 'rgb(32, 33, 36)'],
        ['rgb(239, 239, 241)', 'rgb(35, 36, 39)'],
        ['rgb(233, 227, 212)', 'rgb(75, 68, 58)'],
        ['rgb(246, 226, 221)', 'rgb(108, 57, 79)'],
        ['rgb(211, 191, 219)', 'rgb(71, 46, 91)'],
        ['rgb(174, 204, 220)', 'rgb(40, 66, 85)'],
        ['rgb(212, 228, 237)', 'rgb(37, 99, 119)'],
        ['rgb(180, 221, 211)', 'rgb(12, 98, 93)'],
        ['rgb(226, 246, 211)', 'rgb(38, 77, 59)'],
        ['rgb(255, 248, 184)', 'rgb(124, 74, 3)'],
        ['rgb(243, 159, 118)', 'rgb(105, 43, 23)'],
        ['rgb(250, 175, 168)', 'rgb(119, 23, 46)'],
    ]

    allBars.forEach(bar => {
        bar.forEach(card => {
            for (let [light, dark] of colorPairs) {
                if (card.color == light && darkMode == true) {
                    card.color = dark
                } else if (card.color == dark && darkMode == false) {
                    card.color = light
                }
            }
        })
    })


    if (lastClickedBarClass == '.notes-bar') {
        localStorage.setItem('notes', JSON.stringify(list))
        renderNotes()
    } else if (lastClickedBarClass == '.reminders-bar') {
        localStorage.setItem('reminders', JSON.stringify(list))
        showAllReminders()
    } else if (lastClickedBarClass == '.archive-bar') {
        localStorage.setItem('archive', JSON.stringify(list))
        renderArchive()
    } else if (lastClickedBarClass == '.bin-bar') {
        localStorage.setItem('deleted', JSON.stringify(list))
        renderDeleted()
    }
}



// **********************
const remindCard = document.createElement('div')
remindCard.className = 'remind-card'
let remindCardOptions;
let reminders = JSON.parse(localStorage.getItem('reminders')) || []

const remind = (cardIndex, cardType, event) => {

    event.stopPropagation()

    let list;
    cardType == 'notes' ? list = notes : cardType == 'reminders' ? list = reminders : list = archived

    let remindIcon = container.children[list.length - cardIndex - 1].querySelector('.bell')
    remindCardOptions = container.children[list.length - cardIndex - 1].querySelector('.options')

    remindCardOptions.classList.toggle('show')

    remindCard.innerHTML = `
    <p>Remind me later</p>
    <label id="title" for="date-input">
    <i class="bi bi-clock clock"></i>
    Select date and time
    </label>
    <input type="datetime-local" class="date-input" id="date-input"></input>
    <p class="save-reminder">Save</p>
    `

    remindCard.classList.toggle('active')
    bgCard.classList.remove('active')
    if (remindCard.classList.contains('active')) body.appendChild(remindCard)
    body.remindCard = remindCard

    let rect = remindIcon.getBoundingClientRect()
    let leftPosition = rect.left + window.scrollX
    let topPosition = rect.bottom + window.scrollY

    if (window.innerHeight - rect.bottom < 180) {
        topPosition = topPosition - 180
    }

    remindCard.style.left = `${leftPosition}px`
    remindCard.style.top = `${topPosition}px`

    remindCard.onclick = (e) => {
        e.stopPropagation()
    }

    const dateInputEl = remindCard.querySelector('.date-input')
    const saveBtn = remindCard.querySelector('.save-reminder')

    const setMinDate = () => {
        let now = new Date()
        let today = now.toISOString().slice(0, 16)
        dateInputEl.min = today
    }
    setMinDate()

    dateInputEl.addEventListener('input', (e) => {
        let value = e.target.value
        let myDate = new Date(value)
        let date = myDate.getDate()
        let month = myDate.toLocaleString('en-IN', { month: 'short' })
        let year = myDate.getFullYear()
        let hour = myDate.getHours().toString().padStart(2, '0')
        let minute = myDate.getMinutes().toString().padStart(2, '0')

        saveBtn.onclick = () => {
            remindCard.classList.remove('active')
            remindCardOptions.classList.remove('show')

            list[cardIndex].remDetails = { 'cardType': cardType, 'cardIndex': cardIndex, 'date': date, 'month': month, 'year': year, 'hour': hour, 'minute': minute }

            localStorage.setItem('notes', JSON.stringify(notes))
            localStorage.setItem('archive', JSON.stringify(archived))
            localStorage.setItem('reminders', JSON.stringify(reminders))
            updateReminders()
            cardType == 'notes' ? renderNotes() : cardType == 'reminders' ? showAllReminders() : renderArchive()

            disableBgEl.classList.remove('active')
            body.style.overflowY = 'scroll'
        }
    })
}


function showNotification() {
    let intervalId = setInterval(() => {
        let now = new Date()
        let currentDate = now.getDate()
        let currentMonth = now.toLocaleString('en-IN', { month: 'short' })
        let currentYear = now.getFullYear()
        let currentHour = now.getHours()
        let currentMinute = now.getMinutes()

        reminders.forEach(card => {
            if (card.remDetails.date == currentDate && 
                card.remDetails.month == currentMonth && 
                card.remDetails.year == currentYear && 
                card.remDetails.hour == currentHour && 
                card.remDetails.minute == currentMinute) {         
                    alert(`${card.title} \n ${card.audioUrl? '' : card.content}`)
                    clearInterval(intervalId)
                    nextNotification()
            }   
        })
    }, 1000)
}
 
showNotification()

function nextNotification() {
    let now = new Date()
    let remainingSeconds = 60 - now.getSeconds()

    setTimeout(() => {
        showNotification()
    }, remainingSeconds * 1000);
}


body.addEventListener('click', () => {
    currentCardOptions?.classList.remove('show')
    remindCardOptions?.classList.remove('show')
    remindCard.classList.remove('active')
    bgCard.classList.remove('active')
})



function checkReminders(index, cardType) {
    let list
    cardType == 'notes' ? list = notes : cardType == 'reminders' ? list = reminders : list = archived

    const dateTag = container.children[list.length - index - 1].querySelector('.date-tag')

    if (list[index].remDetails !== undefined) {
        dateTag.style.display = 'block'
    } else {
        dateTag.style.display = 'none'
    }

    const cancelReminder = dateTag.querySelector('.cancel')
    cancelReminder.onclick = () => {

        delete list[index].remDetails
        localStorage.setItem('notes', JSON.stringify(notes))
        localStorage.setItem('archive', JSON.stringify(archived))
        updateReminders()
        cardType == 'notes' ? renderNotes() : cardType == 'reminders' ? showAllReminders() : renderArchive()
    }
}

// ************************************

let addImgIndex;
let addImgCardType;
let myCardType

function getInfo(index, cardType) {
    cardType == 'notes' ? addImgCardType = notes : cardType == 'reminders' ? addImgCardType = reminders : addImgCardType = archived
    addImgIndex = index
    myCardType = cardType
}


function addImage(event) {
    let file = event.target.files[0]

    let reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
        let imageUrl = reader.result
        addImgCardType[addImgIndex].imageUrl = imageUrl
        if (myCardType == 'notes') applyBgImgToRem(addImgIndex, imageUrl)
        if (myCardType == 'reminders') applyCorrepondBgImg(addImgIndex, imageUrl)
        if (myCardType == 'archive') applyBgImgToRem(addImgIndex, imageUrl)

        localStorage.setItem('notes', JSON.stringify(notes))
        localStorage.setItem('archive', JSON.stringify(archived))
        localStorage.setItem('reminders', JSON.stringify(reminders))

        myCardType == 'notes' ? renderNotes() : myCardType == 'reminders' ? showAllReminders() : renderArchive()
    }
}


function applyBgImg(card, imageUrl) {
    const bgImage = card.querySelector('.bg-img')
    bgImage.src = imageUrl
    if (imageUrl) bgImage.style.display = 'block'
}

function applyCorrepondBgImg(index, imageUrl) {
    notes.forEach((noteCard) => {
        if (noteCard.id == reminders[index].id) {
            noteCard.imageUrl = imageUrl
        }
    })
    archived.forEach((archiveCard) => {
        if (archiveCard.id == reminders[index].id) {
            archiveCard.imageUrl = imageUrl
        }
    })
}

function applyBgImgToRem(index, imageUrl) {
    reminders.forEach(remCard => {
        if (remCard.id == notes[index]?.id || remCard.id == archived[index]?.id) {
            remCard.imageUrl = imageUrl
        }
    })
}



// ************************************
const restore = (index) => {
    let card = deleted[index]
    notes.push(card)
    deleted.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notes))
    localStorage.setItem('deleted', JSON.stringify(deleted))
    renderDeleted()
    label.remove()
    updateReminders()
}

const removeBarBg = () => {
    allBars.forEach(bar => {
        bar.classList.remove('active-bar')
    })
}
// *************

function slideSideBarIn() {
    allIcons.forEach(icon => {
        if (icon.classList.contains('active-bar')) {
            icon.classList.remove('active-bar')
        }
    })
    toggleSidebar()
    removeSideBarBg()
}

notesBar.onclick = () => {
    removeBarBg()
    notesBar.classList.add('active-bar')
    newCardContainer.style.display = 'block'
    renderNotes()
    lastClickedBarClass = '.notes-bar'
    localStorage.setItem('lastClickedBarClass', JSON.stringify(lastClickedBarClass))
    if (window.innerWidth < 543) {
        slideSideBarIn()
    }
}

remindersBar.onclick = () => {
    removeBarBg()
    remindersBar.classList.add('active-bar')
    newCardContainer.style.display = 'none'
    lastClickedBarClass = '.reminders-bar'
    localStorage.setItem('lastClickedBarClass', JSON.stringify(lastClickedBarClass))
    showAllReminders()
    if (window.innerWidth < 543) {
        slideSideBarIn()
    }
}

archiveBar.onclick = () => {
    removeBarBg()
    newCardContainer.style.display = 'none'
    archiveBar.classList.add('active-bar')
    renderArchive()
    lastClickedBarClass = '.archive-bar'
    localStorage.setItem('lastClickedBarClass', JSON.stringify(lastClickedBarClass))
    if (window.innerWidth < 543) {
        slideSideBarIn()
    }
}

binBar.onclick = () => {
    removeBarBg()
    newCardContainer.style.display = 'none'
    binBar.classList.add('active-bar')
    renderDeleted()
    lastClickedBarClass = '.bin-bar'
    localStorage.setItem('lastClickedBarClass', JSON.stringify(lastClickedBarClass))
    if (window.innerWidth < 543) {
        slideSideBarIn()
    }
}
// *************

const activateBar = (barClass) => {
    myBar = document.querySelector(barClass)
    myBar.click()
}

activateBar(lastClickedBarClass);



// ********************************************


let searchCard;
searchClose.addEventListener('click', () => {
    searchInput.value = ''
    searchClose.classList.remove('show');
    searchCard();
})

searchInput.addEventListener('input', (e) => {
    searchCard = () => {

        let inputValue = e.target.value
        searchClose.classList.toggle('show', inputValue);

        //check for type of cards currently present in container
        let currentCards;

        container.children[0].className == 'note-card' ? currentCards = notes : container.children[0].className == 'archive-card' ? currentCards = archived : container.children[0].className == 'reminder-card' ? currentCards = reminders : currentCards = deleted

        currentCards.forEach((card, index) => {
            if (card.content || card.title) {
                let match = (card.content.toLowerCase()).includes(inputValue.toLowerCase()) || (card.title.toLowerCase()).includes(inputValue.toLowerCase())
                if (match) {
                    container.children[currentCards.length - index - 1].style.display = 'block'
                } else {
                    container.children[currentCards.length - index - 1].style.display = 'none'
                }
            }
        })
    }
    searchCard()
})

searchIcon.onclick = () => {
    searchCard()
}

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchInput.blur();
    }
})


searchIcon2.addEventListener('click', () => {
    navCenter.style.display = 'flex'
    navCenter.style.width = '75%'
    searchIcon.style.display = 'none'
    searchBack.style.display = 'flex'
    searchIcon2.style.display = 'none'
    appName.style.display = 'none'
    logo.style.display = 'none'
})

searchBack.addEventListener('click', () => {
    navCenter.style.display = 'none'
    navCenter.style.width = '47%'
    searchIcon.style.display = 'flex'
    searchBack.style.display = 'none'
    searchIcon2.style.display = 'flex'
    appName.style.display = 'block'
    logo.style.display = 'block'
    searchInput.value = ''
    searchCard()
})


window.addEventListener('resize', () => {
    if (window.innerWidth > 664) {
        navCenter.style.display = 'flex'
        navCenter.style.width = '47%'
        searchBack.style.display = 'none'
        searchIcon2.style.display = 'none'

    } else if (window.innerWidth < 664) {
        navCenter.style.display = 'none'
        navCenter.style.width = '75%'
        searchIcon.style.display = 'flex'
        searchIcon2.style.display = 'flex'
        appName.style.display = 'block'
        logo.style.display = 'block'
    }

    if (window.innerWidth > 664) {
        sideBar.style.left = '0%'
    } else {
        sideBar.style.left = '-20%'
        if (isSideBarOpen) sideBar.style.left = '0%'
    }
})


// **********************

function viewCard(index, cardType) {
    let currentCards;

    cardType == 'notes' ? currentCards = notes : cardType == 'reminders' ? currentCards = reminders : currentCards = archived

    const selectedCard = container.children[currentCards.length - index - 1]
    selectedCard.classList.add('selected-card')

    const completed = selectedCard.querySelector('.completed')
    completed.style.display = 'block'

    let newTitle = selectedCard.querySelector('.title')
    let newContent = selectedCard.querySelector('.content')

    disableBgEl.classList.add('active')
    body.style.overflow = 'hidden'


    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)

    completed.addEventListener('click', (e) => {
        e.stopPropagation();
        remindCardOptions?.classList.remove('show')
        remindCard.classList.remove('active')
        bgCard.classList.remove('active')
        disableBgEl.classList.remove('active')
        body.style.overflowY = 'scroll'

        completed.style.display = 'none'
        selectedCard.classList.remove('selected-card')
        currentCards[index].title = newTitle.value
        currentCards[index].content = newContent.innerText

        if (cardType == 'notes') {
            localStorage.setItem('notes', JSON.stringify(currentCards))
            updateReminders()
            renderNotes()
        } else if (cardType == 'reminders') {
            updateCorrespondingCard(currentCards[index]);
            localStorage.setItem('reminders', JSON.stringify(currentCards))
            showAllReminders()
        } else {
            localStorage.setItem('archive', JSON.stringify(currentCards))
            updateReminders()
            renderArchive()
        }
    })
}


function updateCorrespondingCard(updatedCard) {
    let noteIndex = notes.findIndex(card => card.id === updatedCard.id);
    if (noteIndex !== -1) {
        notes[noteIndex].title = updatedCard.title;
        notes[noteIndex].content = updatedCard.content;
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
        return;
    }

    let archiveIndex = archived.findIndex(card => card.id === updatedCard.id);
    if (archiveIndex !== -1) {
        archived[archiveIndex].title = updatedCard.title;
        archived[archiveIndex].content = updatedCard.content;
        localStorage.setItem('archive', JSON.stringify(archived));
        renderArchive();
    }
}
