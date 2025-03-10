*,
*::after,
*::before{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root{
    --color-text : black;
    --background-color: rgb(255, 255, 255);
    --cards-box-shadow-hover: 0px 0px 6px 0px rgba(0, 0, 0, 0.4), 1px 2px 6px 0px rgba(0, 0, 0, 0.2);
    --bg-circle: rgba(0, 0, 0, 0.1);
    --side-bar-active-clr: hsl(45, 87%, 75%);
    --side-bar-hover: rgba(0, 0, 0, 0.1);
    --nav-bar-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.4);
    --scrollbar-clr: rgba(0, 0, 0, 0.3);
    --scrollbar-hover: rgba(0, 0, 0, 0.5);
    --chalk: rgb(239, 239, 241);
    --clay: rgb(233, 227, 212);
    --blossom: rgb(246, 226, 221);
    --dusk: rgb(211, 191, 219);
    --storm: rgb(174, 204, 220);
    --fog: rgb(212, 228, 237);
    --sage: rgb(180, 221, 211);
    --mint: rgb(226, 246, 211);
    --sand: rgb(255, 248, 184);
    --peach: rgb(243, 159, 118);
    --coral: rgb(250, 175, 168);
    --scroll-y : 0px;
}

body{
    font-family: "Poppins", serif;
    overflow-x: hidden;
    overflow-y: scroll;
    color: var(--color-text);
    background-color: var(--background-color);
}

body.dark-mode{
    --color-text : #fff;
    --background-color:rgb(32, 33, 36);
    --cards-box-shadow-hover: 0px 0px 0px 0.3px rgba(255, 255, 255, 1);
    --bg-circle: rgba(255, 255, 255, 0.1);
    --side-bar-active-clr: hsl(51, 100%, 16%);
    --side-bar-hover: rgba(200, 200, 200, 0.1);
    --nav-bar-box-shadow: 0px 1px 2px 0px rgba(255, 255, 255, 0.4);
    --scrollbar-clr: rgba(255, 255, 255, 0.3);
    --scrollbar-hover: rgba(255, 255, 255, 0.5);
    --chalk: rgb(35, 36, 39);
    --clay: rgb(75, 68, 58);
    --blossom: rgb(108, 57, 79);
    --dusk: rgb(71, 46, 91);
    --storm: rgb(40, 66, 85);
    --fog: rgb(37, 99, 119);
    --sage: rgb(12, 98, 93);
    --mint: rgb(38, 77, 59);
    --sand: rgb(124, 74, 3);
    --peach: rgb(105, 43, 23);
    --coral: rgb(119, 23, 46);
}

body::-webkit-scrollbar{
    width: 10px;
}

body::-webkit-scrollbar-thumb{
    background-color: var(--scrollbar-clr);
}

body::-webkit-scrollbar-thumb:hover{
    background-color: var(--scrollbar-hover);
}

body::-webkit-scrollbar-track{
    outline: 0.5px solid rgba(0, 0, 0, 0.2);;
}

.nav-bar{
    padding-inline: 16px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-inline: auto;
    background-color: var(--background-color);
    position: sticky;
    top: 0;
    box-shadow: var(--nav-bar-box-shadow);
    z-index: 10;
}

.nav-left, .nav-right{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 18px;
}

.bg-circle{
    background-color: var(--bg-circle);
}

.nav-left .element{
    cursor: pointer;
    height: 46px;
    width: 46px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-tap-highlight-color: transparent;
}

.nav-left .element i{
    color: var(--color-text);
    font-size: 28px;
}

.nav-left img{
    cursor: pointer;
}

.app-name{
    color: var(--color-text);
    font-weight: 600;
    font-size: 20px;
}

.nav-center{
    display: flex;
    position: relative;
    width: 47%;
    height: 45px;
    padding: 8px 24px;
    justify-content: center;
    align-items: center;
    background-color: var(--side-bar-hover);
    border-radius: 5px;
    margin: 8px;
}

.search-input{
    width: 100%;
    height: 100%;
    border: none;
    font-size: 16px;
    background-color: transparent;
    margin-inline: 14px;
    color: var(--color-text);
}

.nav-center > p{
    cursor: pointer;
    height: 38px;
    width: 38px;
    font-size: 16px;
    position: absolute;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    color: var(--color-text);
}

.search-icon{
    display: flex;
    left: 0;
}

.search-close{
    right: 0;
    display: none;
}

.show{
    display: flex;
}

.input:focus{
    outline: none;
}

.search-input::placeholder{
    font-size: 16px;
    color: var(--color-text);
}

.list-icon, .grid-icon{
    height: 44px;
    width: 44px;
    font-size: 20px;
    cursor: pointer;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
}

.list-icon, .grid-icon.show{
    display: flex;
}

.grid-icon, .hide{
    display: none;
}


.mode{
    height: 44px;
    width: 44px;
    font-size: 20px;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-block: 8px;
    -webkit-tap-highlight-color: transparent;
}

/* ************************************ */

.side-bar{
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 60px;
    height: 100dvh;
    background-color: var(--background-color);
    z-index: 5;
}

.side-bar .bar{
    padding-left: 16px;
    transition-duration: 0.3s;
    text-decoration: none;
    color: var(--color-text);
    -webkit-tap-highlight-color: transparent;
}

.side-bar .bar:hover{
    background-color: var(--side-bar-hover);    
}

.side-bar .icon{  
    height: 48px;
    width: 48px;
    font-size: 20px;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-duration: 0.5s;
}

.side-bar span{
    display: none;
}

.side-bar .bar:nth-child(1){
    margin-top: 8px;
}

.side-bar .active-bar,
.side-bar .active-bar:hover{
    transition-duration: 0.5s;
    background-color: var(--side-bar-active-clr);
}


/* ******************************* */

.container{
    display: grid;
    grid-template-columns: repeat(5, 240px);
    gap: 8px;
    margin-top: 36px;
    margin-left: 9.5%;
    min-height: 52dvh;
    max-width: fit-content;
    height: auto;
    padding-bottom: 190px;
    position: relative;
}

.container.flex-view{
    margin-left: 30%;
}

.flex-view{
    display: flex;
    flex-direction: column;
    min-width: 600px;
    gap: 48px;
}

.container .note-card,
.container .archive-card,
.container .deleted-card,
.container .reminder-card{
    position: relative;
    width: 100%;
    max-height: fit-content;
    border-radius: 5px;
    border: 1px solid rgb(190, 190, 190);
    padding: 4px 16px 42px;
    overflow: hidden;
    cursor: default;
    transition: box-shadow 0.3s ease;
    transition-duration: 0.3s;
    margin-inline: auto;
}

.note-card.static,
.archive-card.static,
.deleted-card.static,
.reminder-card{
    position: static;
}

.note-card:hover,
.archive-card:hover,
.deleted-card:hover,
.reminder-card:hover{
    box-shadow: var(--cards-box-shadow-hover)
}

.note-card .title,
.archive-card .title,
.deleted-card .title,
.reminder-card .title{
    font-size: 15px;
    outline: none;
    border: none;
    font-weight: bold;
    overflow: hidden;
    resize: none;
    max-height: fit-content;
    width: 100%;
    background-color: transparent;
    padding-top: 16px;
    color: var(--color-text);
}

.deleted-card .title{
    pointer-events: none;
}

.note-card .content,
.archive-card .content,
.deleted-card .content,
.reminder-card .content{
    margin-bottom: 28px;
    font-size: 14px;
    overflow: hidden;
    outline: none;
    border: none;
    max-height: 210px;
    min-height: 48px;
    color: var(--color-text);
}

.note-card .options,
.archive-card .options,
.deleted-card .options,
.reminder-card .options{
    position: absolute;
    bottom: 0px;
    display: flex;
    justify-content: space-between;
    width: 70%;
    transition-duration: 0.5s;
    opacity: 0;
}

.deleted-card .options{
    width: 25%;
}

.container.flex-view .options{
    width: 30%;
}

.note-card:hover .options,
.archive-card:hover .options,
.deleted-card:hover .options,
.reminder-card:hover .options{
    opacity: 1;
}

.note-card .options.show,
.archive-card .options.show,
.deleted-card .options.show,
.reminder-card .options.show{
    opacity: 1;
}

.note-card .options > *,
.archive-card .options > *,
.deleted-card .options > *,
.reminder-card .options > *{
    cursor: pointer;
    border-radius: 50%;
    padding: 4px 8px;
    position: relative;
}

.note-card .options > *:hover,
.archive-card .options > *:hover,
.deleted-card .options > *:hover,
.reminder-card .options > *:hover{
    background-color: var(--side-bar-hover);
}

.option-label{
    position: absolute;
    background: var(--color-text);
    color: var(--background-color);
    padding: 4px 8px;
    border-radius: 5px;
    font-size: 12px;
    z-index: 20;
}

/* ****************** */

.remind-card{
    display: none;
    position: absolute;
    background-color: var(--background-color);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.4), 1px 2px 6px 0px rgba(0, 0, 0, 0.2);
    font-size: 14px;    
    color: var(--color-text);
    min-height: 180px;
    padding: 20px 16px;
    z-index: 20;
}

.remind-card.active{
    display: block;
}

.remind-card > input{
    position: absolute;
    left: 16px;
    border: none;
    outline: none;
    width: 65%;
    padding: 2px 4px;
    font-size: 16px;
    cursor: pointer;
    color: var(--color-text);
    background-color: var(--background-color);
}

.remind-card > input:hover{
    background-color: var(--side-bar-hover);
    border-radius: 4px;
}

.remind-card p{
    margin-bottom: 16px;
}

.remind-card #title{
    color: gray;
}

.date-input{
    top: 52%;
}

.clock{
    margin-right: 4px;
}

.save-reminder{
    position: absolute;
    bottom: 0;
    right: 16px;
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 4px;
}

.save-reminder:hover{
    background-color: var(--side-bar-hover);
}

.date-tag{
    margin-top: 16px;
    max-width: fit-content;
    border-radius: 12px;;
    padding: 2px 8px;
    font-size: 13px;
}

.date-tag .cancel{
    opacity: 0;
    margin-left: -12px;  
    transition-duration: 0.2s;
    cursor: pointer;
}  

.date-tag:hover .cancel{
    opacity: 1;
    margin-left: -4px;
    margin-right: -8px;
    border-radius: 50%;
    padding: 2px 4px;
}

.date-tag .cancel:hover{
    color: var(--color-text);
    background-color: var(--scrollbar-clr);
}

.date-tag:hover {
    color: var(--color-text);
    background-color: var(--side-bar-hover);
}


/* ************************** */

.new-card-container{
    width: 100%;
    margin-top: 32px;
}

.new-card{
    width: 600px;
    max-width: 95%;
    border-radius: 12px;
    margin-inline: auto;
    padding: 20px 24px;
    transition: all 0.3s ease;
    margin-left: 30%;
}

.new-card .new-title{
    width: 100%;
    font-weight: 520;
    resize: none;
    overflow: hidden;
    display: none;
    font-size: 16px;
    outline: none;
    border: none;
    font-family: 'poppins', serif;
    margin-bottom: 18px;
    background-color: var(--background-color);
    color: var(--color-text);
}

.new-card .new-textarea{
    display: none;
    border-radius: 5px;
    border: none;
    outline: none;
    width: 100%;
    line-height: 16px;
    resize: none;
    font-family: 'poppins', serif;
    overflow-y: scroll;
    min-height: 48px;
    max-height: 400px;
    margin-bottom: 8px;
    background-color: var(--background-color);
    color: var(--color-text);
}

.new-card .new-textarea::-webkit-scrollbar{
    width: 0px;
}

.button-box, 
.recording-controls{
    display: flex;
    justify-content: space-between;
}

.button-box{
    width: 400px;
    margin-left: 14.5%;
}

.button-box > * {
    padding: 12px 20px;
    border-radius: 5px;
    border: none;
    font-size: 16px;
    background-color: rgb(100, 100, 100);
    color: #fff;
    cursor: pointer;
    transition-duration: 0.3s;
    font-weight: 600;
}

.new-card .done,
.new-card .close,
.new-card .close-2,
.start-recording,
.stop-recording{
    font-size: 16px;
    border-radius: 5px;
    border: none;
    width: fit-content;
    padding: 8px 12px;
    display: none;
    cursor: pointer;
    color: #fff;
    background-color: rgb(100, 100, 100);
    transition-duration: 0.3s;
}

.new-card .btn:hover{
    background-color: rgb(58, 58, 58);
}

.audio{
    width: 100%;
    margin-top: 32px;
    outline: none;
}

.choice-btns{
    display: flex;
    justify-content: space-between;
}

.container .selected-card{
    position: absolute;
    max-height: fit-content;
    z-index: 20;
    left: 50%;
    transform: translateX(-50%);
    cursor: auto;
    transition-duration: 0.3s;
    background-color: var(--background-color);
    padding: 4px 0px 42px 8px;
    width: 620px;
    max-width: 100%;
    top: calc(var(--scroll-y) - 56px);
}

.container .note-card.selected-card{
    top: calc(var(--scroll-y) - 170px);
}


.container .selected-card .main-content{
    max-height: 74dvh;
    padding-right: 4px;
    overflow-y: scroll;
    overflow-x: hidden;
}

.main-content::-webkit-scrollbar{
    width: 10px;
}

.main-content::-webkit-scrollbar-thumb{
    background-color: var(--scrollbar-clr);
}

.main-content::-webkit-scrollbar-thumb:hover {
    background-color: var(--scrollbar-hover);
}

.selected-card .title{
    font-size: 20px;
    font-weight: 530;
}

.selected-card .content{
    max-height: fit-content;
    font-size: 16px;
}

.selected-card .options{
    opacity: 1;
    width: 40%;
}

.bg-img{
    max-height: 50dvh;
    width: 116%;
    margin-left: -8%;
    margin-top: -2%;
}

.selected-card .audio{
    width: 50%;
}

.completed{
    display: none;
    border: none;
    position: absolute;
    right: 1%;
    bottom: 1%;
    padding: 8px 12px;
    border-radius: 15px;
    cursor: pointer;
    color: var(--color-text);
    background-color: transparent;
}

.completed:hover{
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
}

.disable-bg.active{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 15;
}

.bg-card{
    display: none;
    justify-content: space-between;
    height: fit-content;
    border-radius: 5px;
    overflow: hidden;
    position: absolute;
    background-color: var(--background-color);
    border: 1px solid grey;
    padding: 6px;
    z-index: 20;
    font-size: 14px;
}

.bg-card.active{
    display: flex;
}

.bg-card .color {
    height: 32px;
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
}

.bg-card .color:hover{
    border: 2px solid var(--color-text);
}

.bg-card .default{
    background-color: var(--background-color);
    border: 2px solid lightgray;
    color: var(--color-text);
}

.bg-card .chalk{
    background-color: var(--chalk);
}

.bg-card .clay{
    background-color: var(--clay);
}

.bg-card .blossom{
    background-color: var(--blossom);
}

.bg-card .dusk{
    background-color: var(--dusk);
}

.bg-card .storm{
    background-color: var(--storm);
}

.bg-card .fog{
    background-color: var(--fog);
}

.bg-card .sage{
    background-color: var(--sage);
}

.bg-card .mint{
    background-color: var(--mint);
}

.bg-card .sand{
    background-color: var(--sand);
}

.bg-card .peach{
    background-color: var(--peach);
}

.bg-card .coral{
    background-color: var(--coral);
}

.color-label{
    position: absolute;
    z-index: 20;
    padding: 4px 8px;
    border-radius: 5px;
    font-size: 12px;
    background: var(--color-text);
    color: var(--background-color);
}




@media (max-width: 1380px) {
    .container{
        grid-template-columns: repeat(4, 240px);
        margin-left: 15%;
    }

    .container.flex-view{
        margin-left: 29%;
    }

    .button-box{
        margin-left: 14%;
    }

    .new-card{
        margin-left: 30%;
    }
}

@media (max-width: 1170px) {
    .container{
        grid-template-columns: repeat(3, 240px);
        margin-left: 20%;
    }

    .container.flex-view{
        margin-left: 26%;
    }

    .button-box{
        margin-left: 15%;
    }

    .new-card{
        margin-left: 26%;
    }
}

@media (max-width: 940px) {
    .container{
        margin-left: 12%;
    }

    .container.flex-view{
        margin-left: 20%;
    }

    .button-box{
        margin-left: 10%;
    }

    .new-card{
        margin-left: 22%;
    }
}

@media (max-width: 854px) {
    .container{
        grid-template-columns: repeat(2, 1fr);
        margin-left: 13%;
        gap: 32px;
        max-width: 85%;
    }

    .container.flex-view{
        margin-left: 13%;
        max-width: 85%;
    }

    .new-card{
        margin-left: 19%;
    }

    .button-box{
        margin-left: 14%;
        width: 390px;
    }

    .container .selected-card{
        top: calc(var(--scroll-y) - 78px);
    }

    .container .note-card.selected-card{
        top: calc(var(--scroll-y) - 190px);
    }

    .color-label{
        display: none;
    }
}

@media (max-width: 664px) {

    .nav-center{
        display: none;
        width: 75%;
    }

    .app-name{
        font-size: 18px;
    }

    .search-icon{
        display: flex;
    }

    .search-icon-2{
        display: flex;
        height: 44px;
        width: 44px;
        cursor: pointer;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        -webkit-tap-highlight-color: transparent;
    }

    .search-back{
        display: none;
        left: 0;
    }

    .search-input{
        margin-inline: 24px;
    }

    .container{
        grid-template-columns: repeat(2,1fr);
        margin-left: 1%;
        max-width: 98%;
        gap: 8px;
    }

    .container.flex-view{
        display: flex;
        flex-direction: column;
        max-width: 98%;
        margin-left: 1%;
    }

    .flex-view{
        min-width: 0px;
    }

    .button-box{
        margin-left: 12%;
        width: 360px;
    }

    .nav-left, .nav-right{
        gap: 10px;
    }

    .new-card{
        margin-left: 15%;
        max-width: 81.5%;
    }

}

@media (max-width: 543px) {

    .button-box{
        margin-left: 0%;
        width: 330px;
    }
    
    .side-bar .bar,
    .side-bar .bar:hover{
        transition-duration: 0.2s;
        background-color: transparent;
    }

    .side-bar .active-bar,
    .side-bar .active-bar:hover{
        background-color: var(--side-bar-active-clr);
    }

    .container .note-card, 
    .container .archive-card, 
    .container .deleted-card, 
    .container .reminder-card{
        padding: 0px 6px 8px 8px;
    }

    .container .note-card.selected-card, 
    .container .archive-card.selected-card, 
    .container .deleted-card.selected-card, 
    .container .reminder-card.selected-card{
        padding: 4px 16px 56px;
    }

    .note-card .options,
    .archive-card .options,
    .deleted-card .options,
    .reminder-card .options{
        display: none;
        opacity: 0;
    }

    .note-card.selected-card .options,
    .archive-card.selected-card .options,
    .deleted-card.selected-card .options,
    .reminder-card.selected-card .options{
        margin-bottom: 12px;
        width: 60%;
        display: flex;
        opacity: 1;
    }
    
    .completed{
        bottom: 1.5%;
    }
    
    .nav-bar{
        padding-inline: 0;
    }
}

@media (max-width: 434px) {

    .new-card-container{
        margin-top: 0;
    }
    
    .new-card{
        margin-left: 0%;
        max-width: 100%;
    }
    
    .new-card .new-textarea{
        min-height: 76dvh;
        max-height: 76dvh;
    }
    
    .button-box{
        margin-top: 32px;
        width: 310px;
        margin-left: 11%;
    }

    .side-bar{
        left: -20%;
    }
    
    .container .selected-card {
        top: calc(var(--scroll-y) - 95px);
        max-width: 102%;
        min-height: 100dvh;
        border-color: var(--background-color);
        border-radius: 0;
    }
    
    .container .note-card.selected-card {
        top: calc(var(--scroll-y) - 210px);
    }

    .container .selected-card .main-content{
        max-height: 90dvh;
    }
}

@media (max-width: 415px) {

    .button-box{
        width: 200px;
        display: flex;
        flex-direction: column;
        gap: 30px;
        margin-left: 22%;
    }

    .bg-card .color{
        height: 28px;
        width: 28px;
    }

    .container .note-card.selected-card {
        top: calc(var(--scroll-y) - 284px);
    }

    .new-card .new-textarea{
        max-height: 75dvh;
        min-height: 75dvh;
    }

}

@media (max-width: 392px) {
    .note-card.selected-card .options, 
    .archive-card.selected-card .options, 
    .deleted-card.selected-card .options, 
    .reminder-card.selected-card .options{
        margin-bottom: 16px;
    }

    .completed{
        bottom: 2.2%;
    }

    .new-card .new-textarea{
        max-height: 74dvh;
        min-height: 74dvh;
    }
}

@media (max-width: 376px) {
    
    .container .selected-card .main-content{
        max-height: 87dvh;
    }

    .new-card .new-textarea{
        max-height: 67dvh;
        min-height: 67dvh;
    }
}

@media (max-width: 362px) {

    .new-card .new-textarea{
        max-height: 70dvh;
        min-height: 70dvh;
    }

    .container{
        gap: 4px;
    }
    
    .container .selected-card {
        top: calc(var(--scroll-y) - 107px);
    }
    
    .container .note-card.selected-card {
        top: calc(var(--scroll-y) - 289px);
    }

    .button-box{
        margin-left: 17%;
    }
}
