import { useEffect, useState } from "react";
import axios from "axios";

const TextSharing = () => {
  const [text, setText] = useState("");
  const [code, setCode] = useState("");
  const [isShared, setIsShared] = useState(false);

  // const generateCode = () =>{
    // Math.random().toString(36).substr(2, 6).toUpperCase();
    // console.log(generateCode())

    const generateCode = (length = 6) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let code = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
      }
      return code
    };

    useEffect(()=>{
      const newcode = generateCode()
      setCode(newcode)
    },[])

    const handleShare = () => {

      if (!text.trim()) {
        alert("Please enter some text.");
        return;
      }
     
        apiCall()
        console.log(code)


      //   try {

      //     axios.post("https://jsonplaceholder.typicode.com/posts", {
      //   title: "My Post",
      //   body: "This is a test post.",
      //   userId: 1
      // })
      // .then((response) => {
      //   console.log("Post successful:", response.data);
      // })
      // .catch((error) => {
      //   console.error("Error posting data:", error);
      // });

      //     // // Simulated API call
      //     // fetch("/api/share", {
      //     //   method: "POST",
      //     //   headers: { "Content-Type": "application/json" },
      //     //   body: JSON.stringify({ text: text, code: code }),
      //     // })
      //     //   .then((res) => console.log("Response:", res))
      //     //   .then(() => setIsShared(true))
      //     //   .catch((err) => console.error("Error:", err));
      //   } catch (err) {
      //     console.error("Failed to copy:", err);
      //     alert("Failed to copy code to clipboard");
      //   }
    };

    const apiCall = () =>{
      axios
      .post('/api/share', {
        text: text,
        code: code,
      })
      .then((response) => {
        console.log('Response:', response.data);
        setIsShared(true); // Indicate that the code has been shared
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
    
 

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="border-b border-gray-700">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ShadowShare
          </h1>
          <div className="space-x-4">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              FAQ
            </a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700">
          {!isShared ? (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-cyan-400 mb-2">
                Enter Your Text
              </h2>
              <textarea
                rows="5"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-100 placeholder-gray-400"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here..."
              />
              <button
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2.5 rounded-lg transition-colors font-medium"
                onClick={handleShare}
              >
                Generate Code
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-cyan-400 mb-2">
                Share Code
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-center font-mono text-cyan-400 text-lg tracking-wide focus:outline-none"
                  value={code}
                  readOnly
                />
                <p className="text-gray-400 text-sm">
                  Share this code with the recipient to access the text
                </p>
                <button
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2.5 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                  onClick={copyToClipboard}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
                    <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                  </svg>
                  Copy Code
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TextSharing;
