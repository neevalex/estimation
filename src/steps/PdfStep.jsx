import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';

// Create styles


Font.register({
  family: 'OpenSans',
  src: '/assets/fonts/OpenSans-Regular.ttf'
});

Font.register({
  family: 'OpenSansBold',
  src: '/assets/fonts/OpenSans-Semibold.ttf'
});


const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: 'OpenSans',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  author: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 11,
  },
  text: {
    fontSize: 11,
    lineHeight: 1.5,

  },
  textbold: {
    fontSize: 11,
    textAlign: 'justify',
    fontFamily: 'OpenSansBold',
    marginBottom: 5,
    width: '100%'
  },
  heading: {
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'OpenSansBold',
    marginBottom: 5,
    width: '100%'
  },
  textsmall: {
    fontSize: 10,
    textAlign: 'justify',
    fontFamily: 'OpenSansBold',
    width: '100%'
  },
  logo: {
    height: 40, 
    width: 114,
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  textrowsmall: {
    fontSize: 9,
    width: '100%'
  },
  textrowsmallgray: {
    fontSize: 9,
    width: '100%',
    color: '#505050',
  },
  row: {
    flexDirection: 'row',
    flexGrow: 1,
    maxHeight: 280,
  },
  left: {
    // width: '33%',//<- working alternative
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 220,
  },
  graybox: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    maxWidth: 400,
  },
  right: {
    padding: 5,
    flexDirection: 'row',
    width: '30%', //<- working alternative
    flexShrink: 0,
    flexGrow: 1,
    flexWrap: 'wrap',
    textAlign: 'right',
    justifyContent: 'flex-end',
    alignContent: 'flex-start'

  },
  estimrow: {
    flexDirection: 'row',
    flexGrow: 1,
    fontSize: 10,
  },
  estimrowsub: {
    flexDirection: 'row',
    flexGrow: 1,
    fontSize: 9,
    paddingLeft: 10,
  },
  estimrowleft: {
    width: '70%',
  },
  estimrowright: {
    width: '30%', 
    textAlign: 'right',
  },
  grayboxtop: {
    width: '80%', 
    backgroundColor: '#f0f0f0',
    padding: 10,
  }, room: {
    fontSize: 12,
    fontFamily: 'OpenSansBold',
  }
});

// Create Document Component
const MyDocument = ({ getTranslation, getImageURL, pdfRows, total,vat, total_ttc, cfData  }) => (
  <Document>
    <Page style={styles.body}>
      
    <View style={styles.row}>
        <View  style={styles.left}>
          
          <Image
            style={styles.logo}
            src="/assets/img/logo.png"
          />

          <Text style={[{ height: '20' }]}></Text>
          <Text style={styles.textbold}>{ getTranslation('company_name')}</Text>
          <Text style={[styles.textrowsmall]}>{ getTranslation('address1')}</Text>
          <Text style={[styles.textrowsmall]}>{ getTranslation('address2')}</Text>
          <Text style={[styles.textrowsmall]}>{ getTranslation('address3')}</Text>
          <Text style={[styles.textrowsmall]}>{ getTranslation('address4')}</Text>
          <Text style={[styles.textrowsmall]}>{ getTranslation('address5')}</Text>
          <Text style={[{ height: '10' }]}></Text>
          <Text style={[styles.textrowsmallgray]}>{ getTranslation('company1')}</Text>
          <Text style={[styles.textrowsmallgray]}>{ getTranslation('company2')}</Text>
          <Text style={[styles.textrowsmallgray]}>{ getTranslation('company3')}</Text>
          <Text style={[styles.textrowsmallgray]}>{ getTranslation('company4')}</Text>
          <Text style={[styles.textrowsmallgray]}>{ getTranslation('company5')}</Text>

        </View>
        <View style={styles.right}>
          <View  style={styles.grayboxtop}>
            <Text style={[styles.textbold, { textAlign: 'right' }]}>
              A l'attention de :
            </Text>
            <Text style={[ styles.textsmall , { textAlign: 'right' }]}>
              { cfData.address }
            </Text>
          </View>
        </View>
      </View>
      
      <Text style={[{ height: '20' }]}></Text>
      <Text style={styles.heading}>{ getTranslation('text1')}</Text>
      <Text style={[{ height: '1' }]}></Text>
      <Text style={styles.text}>{ getTranslation('text2')}</Text>
      <Text style={styles.text}>{ getTranslation('text3')}</Text>
      <Text style={styles.text}>{ getTranslation('text4')} </Text>
      <Text style={styles.text}>{ getTranslation('text5')} </Text>
      <Text style={[{ height: '20' }]}></Text>

      <View style={styles.graybox}>
        <Text style={[styles.textbold]}>{ getTranslation('text6')}</Text>

        {pdfRows && Object.keys(pdfRows).map((room, roomindex) => (
          <>
            {pdfRows[room].map((row, index) => (
            <>
                {row.roomTotal && row.roomTotal > 0 && (
                  <>
                    <Text style={[styles.room]}>{room + ' ' + (index + 1)}</Text>
                    {(
                      <View>
                        <View style={styles.estimrow}>
                          <Text style={[styles.estimrowleft]}>{index + 1}. {row.name}</Text>
                          <Text style={[styles.estimrowright]}>{row.amount > 0 ? row.amount + '€' : ''}</Text>
                        </View>

                        {row['additional'] && Object.keys(row['additional']).map((additional_key, index) => (
                          <View style={styles.estimrowsub}>
                            <Text style={[styles.estimrowleft]}>- {row['additional'][additional_key].key}</Text>
                            <Text style={[styles.estimrowright]}>{row['additional'][additional_key].amount}€</Text>
                          </View>
                        ))}
                
                        <Text style={[{ height: '2' }]}></Text>
                      </View>
                
                    )}
                
                    <View style={styles.estimrow}>
                      <Text style={[styles.estimrowleft]}>{ getTranslation('installation_text')}</Text>
                      <Text style={[styles.estimrowright]}>60€</Text>
                    </View>
                    <Text style={[{ height: '10' }]}></Text>
                  </>)}
                </>
            ))}
            
            
          </>
         ))}
    

        <Text style={[{ height: '20' }]}></Text>

        <View style={ styles.estimrow }>
          <Text style={[styles.estimrowleft ]}>{ getTranslation('total1')}</Text>
          <Text style={[styles.estimrowright]}>{ total.toFixed(2) }€</Text>
        </View>


        <View style={ styles.estimrow }>
          <Text style={[styles.estimrowleft]}>{ getTranslation('total2')}{ total }</Text>
          <Text style={[styles.estimrowright]}>{ vat.toFixed(2) }€</Text>
        </View>


        <View style={ styles.estimrow }>
          <Text style={[styles.estimrowleft ]}>{ getTranslation('total3')}</Text>
          <Text style={[styles.estimrowright]}>{ total_ttc.toFixed(2)  }€</Text>
        </View>

        <Text style={[{ height: '20' }]}></Text>

        <View style={[ styles.estimrow , { fontSize: 12, fontFamily:'OpenSansBold' }]}>
          <Text style={[styles.estimrowleft ]}>{ getTranslation('total4')}</Text>
          <Text style={[styles.estimrowright]}>{ total_ttc.toFixed(2)  }€</Text>
        </View>
      </View>


      <Text style={[{ height: '40' }]}></Text>
      <Text style={styles.heading}>{ getTranslation('text7')}</Text>
      <Text style={[{ height: '1' }]}></Text>
      <Text style={styles.text}>{ getTranslation('text7')}</Text>
    
    <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
      `${pageNumber} / ${totalPages}`
    )} fixed />
  </Page>
</Document>
);




const App = ({ getTranslation, getImageURL, pdfRows, total, cfData }) => {
  

  let vat = total * 0.1;
  let total_ttc = total + vat;

  return (
    <div className="pdf">
      <div className="message">
        <img src="/assets/img/renovationsupport.jpg" alt="Close" />
      
        <h1>{ getTranslation('schedule1')}</h1>
        <p>{ getTranslation('schedule2')}</p>

        <div className="button"  >
        { getTranslation('get_support')} 
        </div>

     </div>
      <PDFViewer scale={0.56}>
        <MyDocument cfData={ cfData } getTranslation={ getTranslation } getImageURL={getImageURL} pdfRows={pdfRows} total={total} vat={vat} total_ttc={ total_ttc } />
      </PDFViewer>
    
    </div>
  );
};
// ReactDOM.render(<App />, document.getElementById('root'));


export default App;