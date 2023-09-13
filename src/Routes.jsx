import { useEffect, useState } from "react";
import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";
import App from './App';
import PdfViewer from './PdfViewer';


const RoutesPage = () => {
  
    const [data, setData] = useState({});

    const getData = async () => {
        const url = process.env.REACT_APP_BACKEND_HOST;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if( data ) setData( data );
            })
            .catch(rejected => {
                console.log(rejected);
            });
    }

    const getTranslation = (keyword) => {
        if (!data) return keyword;
        if (!data.translations) return keyword;
        if (data.translations.hasOwnProperty(keyword)) {
            return data.translations[keyword];
        }
        return keyword;
    }

    const getOption = (keyword) => {
        if (!data) return keyword;
        if (!data.options) return keyword;
        if (data.options.hasOwnProperty(keyword)) {
            return data.options[keyword];
        }
        return false;
    }

    useEffect(() => {
        getData();
    }, []);
    
    
    
    return (
        <Router>
            {data && (<Routes>
                <Route exact path="/" element={<App getOption={ getOption } getData={getData} data={data} getTranslation={getTranslation} />} />
                <Route path="/pdf" element={<PdfViewer getOption={ getOption } data={data} getTranslation={getTranslation} />} />
            </Routes>)} 
        </Router>
    );
  };

  
  
  export default RoutesPage;