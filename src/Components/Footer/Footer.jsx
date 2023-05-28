import style from './Footer.module.css'
const Footer = () => {
   return (
      <div className={style.footer + ' ' + "d-flex justify-content-around"}>
         <div className={style.footer__about}>
            <h1>About Project :</h1>
            <p>This project was made to show my knowledge in the field React.On this project, I used the provided free access kinopoisk API.</p>
         </div>
         <div className={style.footer__about_library}>
            <h1>List of libraries used on this project :</h1>
            <ul>
               <li>redux</li>
               <li>react-redux</li>
               <li>react-router-dom</li>
               <li>react-spring</li>
               <li>bootstrap</li>
               <li>nouislider-react</li>
               <li>react-paginate</li>
            </ul>
         </div>
         <div className={style.footer__about_library}>
            <h1>Social Network :</h1>
            <ul className="d-flex flex-column">
               <a href="https://www.instagram.com/pes.onion_/">Instagram</a>
               <a href="https://vk.com/goroshenko98">VK</a>
               <a href="https://tlgg.ru/Onion_212">Telegram</a>
               <a href="https://github.com/OnionGL">GitHub</a>
            </ul>
         </div>
      </div>
   )
}
export default Footer