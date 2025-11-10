import  {useContext , createContext , useState , useEffect} from 'react'

const DarkModeContext = createContext()

export const DarkModeProvider = ({children})=>{
  const [isDarkMode , setIsDarkMode] = useState(false );

  useEffect(()=>{
    const  theme = localStorage.getItem('theme' )
    const darkTheme = 'dark'
    const lightTheme  = 'light'
    if(theme === darkTheme){
      setIsDarkMode(true)
      document.documentElement.classList.add(darkTheme)
    }
    else if(theme === lightTheme){
      setIsDarkMode(false)
      document.documentElement.classList.remove(darkTheme)
    }
    else{
    const preferColor = window.matchMedia("(prefers-color-schema: dark)").matches;
    setIsDarkMode(preferColor)
    document.documentElement.classList.toggle("dark" , preferColor)
    }
  },[isDarkMode])

  const ToggleMode = ()=>{
    setIsDarkMode(prevTheme =>{
      const newTheme = !prevTheme
      localStorage.setItem('theme', newTheme? 'dark' : 'light')
      return newTheme
    } )
  }

  return <DarkModeContext.Provider  value={{isDarkMode , ToggleMode}}>
    {children}
  </DarkModeContext.Provider>
}


export const useDarkMode = ()=> useContext(DarkModeContext)