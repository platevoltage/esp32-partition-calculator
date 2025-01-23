import { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import "bootstrap-icons/font/bootstrap-icons.css";
import Options from './components/Options';
import Bar from './components/Bar';
import {Partition} from './components/Row';



function App() {
  const [flashSize, setFlashSize] = useState<number>(4096);
  const [table, setTable] = useState<Partition[]>([]);
  const [displayDec, setDisplayDec] = useState<boolean>(true);
  const [flashSizeHighlight, setFlashSizeHighlight] = useState<boolean>(false);

  useEffect(() => { //update local storage
    if (table.length > 0) {
      window.localStorage.setItem("currentTable", JSON.stringify(table));
    }
  },[table]);


  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <h1>ESP32 Partition Calculator</h1>
        <Table table={table} setTable={setTable} flashSize={flashSize*1024} displayDec={displayDec} setFlashSizeHighlight={setFlashSizeHighlight} />
        {/* <Bar table={table} /> */}
        <Options flashSize={flashSize} displayDec={displayDec} setFlashSize={setFlashSize} setDisplayDec={setDisplayDec} table={table} setTable={setTable} flashSizeHighlight={flashSizeHighlight} />

        <div className="footer">
          <span>Written by Garrett Corbin &nbsp; x &nbsp; </span>
          <a href="https://jgarrettcorbin.com" target="_blank" rel="noreferrer">https://jgarrettcorbin.com</a>
          <br></br><br></br>
          <a style={{fontSize: "2em", margin: "0px 6px"}} href="https://github.com/platevoltage" target="_blank" rel="noreferrer"><i className="bi bi-github"></i></a>
          <a style={{fontSize: "2em", margin: "0px 6px"}} href="https://www.linkedin.com/in/garrett-corbin-7a7777227/" target="_blank" rel="noreferrer"><i className="bi bi-linkedin"></i></a>
          {/* <a style={{fontSize: "2em", margin: "0px 6px"}} href="https://github.com/platevoltage" target="_blank" rel="noreferrer"><i className="bi bi-github"></i></a> */}
          

        <hr />
          <p>If you like my tool and find it useful, please help an independent developer out.</p>
          <div>

          
          <a href="https://venmo.com/Joseph-Corbin-2" target="_blank" rel="noreferrer">
              <button className="svg-button" style={{backgroundColor: "#008CFF", color: "white", padding: "10px 20px", borderRadius: "5px", margin: "0px 10px"}}>
                <svg width="111" height="21" viewBox="0 -6 211 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M34.5771 0.822021C35.9974 3.16733 36.6377 5.58301 36.6377 8.63451C36.6377 18.3672 28.3277 31.0107 21.5832 39.8888H6.17825L0 2.95296L13.4887 1.67258L16.7552 27.9548C19.8074 22.9834 23.5738 15.171 23.5738 9.84453C23.5738 6.92902 23.0743 4.94318 22.2935 3.30806L34.5771 0.822021Z" fill="#ffffff"/>
                <path d="M52.0595 17.0887C54.5417 17.0887 60.7907 15.9534 60.7907 12.4024C60.7907 10.6973 59.5848 9.84676 58.1637 9.84676C55.6776 9.84676 52.415 12.8275 52.0595 17.0887ZM51.7751 24.1214C51.7751 28.4573 54.1865 30.1584 57.3834 30.1584C60.8647 30.1584 64.1979 29.3078 68.5303 27.1065L66.8985 38.1852C63.846 39.6763 59.0888 40.6713 54.4713 40.6713C42.7584 40.6713 38.5664 33.5693 38.5664 24.6908C38.5664 13.1834 45.3853 0.9646 59.4436 0.9646C67.1837 0.9646 71.5117 5.30013 71.5117 11.3371C71.5124 21.0695 59.0188 24.051 51.7751 24.1214Z" fill="#ffffff"/>
                <path d="M110.439 9.34835C110.439 10.7687 110.224 12.8289 110.009 14.1753L105.962 39.7474H92.8275L96.5196 16.3059C96.5896 15.6701 96.8048 14.3901 96.8048 13.6799C96.8048 11.9747 95.7393 11.5493 94.4583 11.5493C92.7568 11.5493 91.0513 12.3298 89.9155 12.8997L85.7278 39.7477H72.5195L78.5537 1.46185H89.9855L90.1302 4.51773C92.8272 2.74224 96.3785 0.822022 101.417 0.822022C108.093 0.821292 110.439 4.2319 110.439 9.34835Z" fill="#ffffff"/>
                <path d="M149.432 5.15577C153.194 2.45936 156.746 0.9646 161.643 0.9646C168.387 0.9646 170.733 4.37521 170.733 9.49167C170.733 10.9121 170.518 12.9723 170.304 14.3187L166.261 39.8907H153.123L156.886 15.9538C156.955 15.3139 157.101 14.5334 157.101 14.0383C157.101 12.1184 156.035 11.6926 154.754 11.6926C153.123 11.6926 151.492 12.4028 150.281 13.043L146.094 39.8911H132.96L136.722 15.9541C136.791 15.3143 136.933 14.5338 136.933 14.0387C136.933 12.1188 135.866 11.693 134.59 11.693C132.885 11.693 131.183 12.4735 130.047 13.0434L125.856 39.8915H112.652L118.686 1.60552H129.978L130.333 4.80176C132.96 2.88628 136.508 0.966057 141.265 0.966057C145.384 0.964599 148.08 2.74045 149.432 5.15577Z" fill="#ffffff"/>
                <path d="M196.869 16.3076C196.869 13.1821 196.087 11.0512 193.746 11.0512C188.563 11.0512 187.498 20.2133 187.498 24.9003C187.498 28.456 188.493 30.6566 190.834 30.6566C195.733 30.6566 196.869 20.9942 196.869 16.3076ZM174.15 24.3345C174.15 12.2608 180.539 0.963379 195.238 0.963379C206.314 0.963379 210.363 7.49985 210.363 16.522C210.363 28.4556 204.043 40.814 188.989 40.814C177.842 40.814 174.15 33.497 174.15 24.3345Z" fill="#ffffff"/>
                </svg>
              </button>
          </a>

          <a  href="https://www.paypal.com/donate/?hosted_button_id=AULC5CV84S2QC" target="_blank" rel="noreferrer">
              <button className="svg-button" style={{backgroundColor: "#ffffff", color: "white", padding: "10px 20px", borderRadius: "5px", margin: "0px 10px"}}>
<svg xmlns="http://www.w3.org/2000/svg" width="111" height="21" viewBox="0 0 338.667 89.785"><g transform="translate(936.898 -21.779)"><path clipPath="none" d="M-828.604 39.734c-.697 0-1.289.506-1.398 1.195l-8.068 51.165a1.31 1.31 0 0 0 1.294 1.513h9.568c.696 0 1.289-.507 1.398-1.195l2.37-15.025c.108-.688.701-1.195 1.398-1.195h8.699c10.164 0 18.792-7.416 20.368-17.465 1.589-10.134-6.328-18.971-17.549-18.993zm9.301 11.422h6.96c5.73 0 7.596 3.381 7.006 7.12-.59 3.747-3.488 6.507-9.031 6.507h-7.084zm45.788 3.478c-2.416.009-5.196.504-8.317 1.804-7.159 2.984-10.597 9.151-12.057 13.647 0 0-4.647 13.717 5.852 21.253 0 0 9.737 7.255 20.698-.447l-.189 1.203a1.31 1.31 0 0 0 1.292 1.513h9.083c.697 0 1.289-.507 1.398-1.195l5.525-35.038a1.31 1.31 0 0 0-1.292-1.515h-9.083c-.697 0-1.29.507-1.398 1.195l-.297 1.886s-3.967-4.333-11.216-4.306zm.297 11.067c1.043 0 1.997.144 2.853.419 3.919 1.258 6.141 5.023 5.498 9.104-.793 5.025-4.914 8.725-10.199 8.725-1.042 0-1.996-.143-2.853-.418-3.918-1.258-6.154-5.023-5.511-9.104.793-5.025 4.927-8.727 10.212-8.727z" fill="#003087"/><path clipPath="none" d="M-697.804 39.734c-.697 0-1.289.506-1.398 1.195l-8.068 51.165a1.31 1.31 0 0 0 1.294 1.513h9.568c.696 0 1.289-.507 1.398-1.195l2.37-15.025c.108-.688.701-1.195 1.398-1.195h8.699c10.164 0 18.791-7.416 20.366-17.465 1.59-10.134-6.326-18.971-17.547-18.993zm9.301 11.422h6.96c5.73 0 7.596 3.381 7.006 7.12-.59 3.747-3.487 6.507-9.031 6.507h-7.084zm45.787 3.478c-2.416.009-5.196.504-8.317 1.804-7.159 2.984-10.597 9.151-12.057 13.647 0 0-4.645 13.717 5.854 21.253 0 0 9.735 7.255 20.697-.447l-.189 1.203a1.31 1.31 0 0 0 1.294 1.513h9.082c.697 0 1.289-.507 1.398-1.195l5.527-35.038a1.31 1.31 0 0 0-1.294-1.515h-9.083c-.697 0-1.29.507-1.398 1.195l-.297 1.886s-3.967-4.333-11.216-4.306zm.297 11.067c1.043 0 1.997.144 2.853.419 3.919 1.258 6.141 5.023 5.498 9.104-.793 5.025-4.914 8.725-10.199 8.725-1.042 0-1.996-.143-2.853-.418-3.918-1.258-6.154-5.023-5.511-9.104.793-5.025 4.927-8.727 10.212-8.727z" fill="#0070e0"/><path clipPath="none" d="M-745.92 55.859c-.72 0-1.232.703-1.012 1.388l9.958 30.901-9.004 14.562c-.437.707.071 1.62.902 1.62h10.642a1.77 1.77 0 0 0 1.513-.854l27.811-46.007c.427-.707-.083-1.611-.909-1.611h-10.641a1.77 1.77 0 0 0-1.522.869l-10.947 18.482-5.557-18.345c-.181-.597-.732-1.006-1.355-1.006z" fill="#003087"/><path clipPath="none" d="M-609.107 39.734c-.696 0-1.289.507-1.398 1.195l-8.07 51.163a1.31 1.31 0 0 0 1.294 1.515h9.568c.696 0 1.289-.507 1.398-1.195l8.068-51.165a1.31 1.31 0 0 0-1.292-1.513z" fill="#0070e0"/><path clipPath="none" d="M-908.37 39.734a2.59 2.59 0 0 0-2.556 2.185l-4.247 26.936c.198-1.258 1.282-2.185 2.556-2.185h12.445c12.525 0 23.153-9.137 25.095-21.519a20.76 20.76 0 0 0 .245-2.793c-3.183-1.669-6.922-2.624-11.019-2.624z" fill="#001c64"/><path clipPath="none" d="M-874.832 42.359a20.76 20.76 0 0 1-.245 2.793c-1.942 12.382-12.571 21.519-25.095 21.519h-12.445c-1.273 0-2.358.926-2.556 2.185l-3.905 24.752-2.446 15.528a2.1 2.1 0 0 0 2.075 2.43h13.508a2.59 2.59 0 0 0 2.556-2.185l3.558-22.567a2.59 2.59 0 0 1 2.558-2.185h7.953c12.525 0 23.153-9.137 25.095-21.519 1.379-8.788-3.047-16.784-10.611-20.75z" fill="#0070e0"/><path clipPath="none" d="M-923.716 21.779c-1.273 0-2.358.926-2.556 2.183l-10.6 67.216c-.201 1.276.785 2.43 2.077 2.43h15.719l3.903-24.752 4.247-26.936a2.59 2.59 0 0 1 2.556-2.185h22.519c4.098 0 7.836.956 11.019 2.624.218-11.273-9.084-20.58-21.873-20.58z" fill="#003087"/></g></svg>
              </button>
          </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
