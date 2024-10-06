import { useState ,useCallback, useEffect ,useRef} from "react"

function App() {
  const [length, setLength] = useState(8)
  const [numallow, setnumallow]=useState(false)
  const [charallow, setcharallow] =useState(false)
  const [pass,setpass ] = useState("")

//useRef hook
const passwordRef = useRef(null)

const passGen =useCallback( ()=> {
  let password= ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
 if(numallow) str+="0123456789"
 if(charallow) str+="~!@#$%^&*()_+{}[]"

for(let i=1;i<=length;i++){
  let char = (Math.random()* str.length+1)

  password += str.charAt(char)
}

setpass(password)

},[length,numallow,charallow,setpass])  

const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,100)
  window.navigator.clipboard.writeText(pass)
}, [pass])

useEffect(()=>{
  passGen()},[length,numallow, charallow,passGen])
  return (
    <>
<div  style={{
    backgroundImage: "url('/images/password.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
     backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
    position: "absolute",
    top: 0,
    left: 0,
  }}>
 <div className="w-full max-w-md h-40 mx-auto shadow-md rounded-lg px-4 my-11  bg-cyan-200" 
>
  
<h1 className="text-center text-red-600 font-bold my-3">Password Generator</h1><br />

  <div className="flex shadow rounded-lg  overflow-hidden mb-4">

  <input type="text" 
  value={pass}
  className="outline-none w-full py-1 px-3"
  placeholder="Password"
  readOnly
  ref={passwordRef}
  />
  <button 
  onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5v shrink-0">copy</button>
</div><br />

<div className="flex text-sm gap-x-2">

<div className="flex items-center gap-x-3
">
  <input type="range"
  min={6}
  max={100}
  value={length}
  className="cursor-pointer" 
  onChange={(e) => {setLength(e.target.value)}}
  />
</div>
  <label > Length : {length}</label>

<div className="flex items-center gap-x-1">
  <input type="checkbox"
  defaultChecked={numallow}
  id="numInput"
  onChange={()=>{
    setnumallow((prev)=>(!prev));
  }} />
    <label
    htmlFor="numInput">Numbers</label>
</div>


<div className="flex items-center gap-x-1">
  <input type="checkbox"
  defaultChecked={charallow}
  id="charInput"
  onChange={()=>{
    setcharallow((prev)=>(!prev));
  }} />
   <label
    htmlFor="charInput">Characters</label>
</div>


</div>

 </div>
 </div>

      </>
  )
}

export default App
